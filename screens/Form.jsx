import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, TextInput, AsyncStorage, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";

import Header from "../components/Header";
import styles, { COLOR_DARK_GREY } from "../styles";
import { API_URL, ACCESS_TOKEN_IDENTIFIER } from "../configs";
import Loading from "./Loading";

export default function Form(props) {
    const [loading, setLoading] = useState(true);
    const [selectors, setSelectors] = useState({});
    const { standard } = props.route.params;
    const { formulario } = standard;

    const fetchApi = async () => {
        setLoading(true);
        await formulario.fields.forEach((field) => {
            if (field.type === "SELECTOR") {
                console.log("Encontre un selector", field.name);
                let url = API_URL;
                switch (field.selector) {
                    case "NO_PLACA":
                        url += "/no-placas";
                        break;
                    case "BOMBA_ABASTECIMIENTO":
                        url += "/bombas-abastecimiento";
                        break;
                    case "SISTEMA_AMORTIGUACION":
                        url += "/sistemas-amortiguacion";
                        break;
                    case "ESTADO_MEDICION":
                        url += "/estados-medicion";
                        break;
                    case "GENERADOR_GASOLINA":
                        url += "/generadores-gasolina";
                        break;
                    default:
                        Alert.alert("Error", "Hay un selector desconocido");
                        break;
                }
                AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
                    .then((token) => {
                        fetch(url, {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                                    AsyncStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
                                    AsyncStorage.removeItem(USER_NAME);
                                    props.navigation.navigate("Login", {
                                        notification: {
                                            type: "error",
                                            message: "Ingrese nuevamente por favor"
                                        }
                                    });
                                } else {
                                    setSelectors({
                                        ...selectors,
                                        [field.selector]: res.map((item) => ({ value: item.id, label: item.name }))
                                    });
                                }
                            })
                            .finally(() => setLoading(false));
                    })
                    .done();
            }
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const saveData = async () => {
        // await AsyncStorage.setItem("foo", "bar");
        // const result = await AsyncStorage.getItem("foo");
        // const networkStatus = await Network.getNetworkStateAsync();
        // if (networkStatus.isConnected) {
        //   Alert.alert("Esta conectado");
        // } else {
        //   Alert.alert("No esta conectado");
        // }
        console.log(formulario.fields.length);
        Alert.alert("TODO", "Save data");
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Header {...props} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerForm}>
                <View>
                    {formulario.fields
                        .sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0))
                        .map((field) => (
                            <React.Fragment key={field.id}>
                                <Text style={styles.label}>{field.type !== "IMAGE" && (field.label || field.name)}</Text>
                                {["NUMBER", "SHORT_TEXT", "LONG_TEXT"].includes(field.type) && (
                                    <TextInput
                                        keyboardType={field.type === "NUMBER" ? "numeric" : "default"}
                                        style={[styles.inputs, field.type === "LONG_TEXT" && styles.inputArea]}
                                        placeholder={field.placeholder}
                                    />
                                )}
                                {field.type === "SELECTOR" && (
                                    <View style={styles.select}>
                                        <Picker>
                                            {selectors[field.selector].map((item) => (
                                                <Picker.Item key={item.value} label={item.label} value={item.value} />
                                            ))}
                                        </Picker>
                                    </View>
                                )}
                                {field.type === "IMAGE" && (
                                    <View style={styles.floatRight}>
                                        <TouchableOpacity style={styles.buttonEmptyFile} onPress={() => openGalleryRecorridoInicial()}>
                                <Text style={styles.textLight}>Seleccionar {field.label || field.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </React.Fragment>
                        ))}
                    <View style={styles.floatRight}>
                        <TouchableOpacity style={styles.buttomAction} onPress={() => saveData()}>
                            <Text style={styles.textButton}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

Form.navigationOptions = {
    name: "Form"
};
