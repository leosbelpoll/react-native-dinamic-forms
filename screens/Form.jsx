import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, TextInput, AsyncStorage, Alert, CheckBox } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Header from "../components/Header";
import styles from "../styles";
import { API_URL, ACCESS_TOKEN_IDENTIFIER, USER_NAME } from "../configs";
import Loading from "./Loading";

export default function Form(props) {
    const [loading, setLoading] = useState(false);
    const [selectors, setSelectors] = useState({});
    const [innerForm, setInnerForm] = useState({});
    const [isValidating, setIsValidating] = useState(false);
    const [isInvalidForm, setIsInvalidForm] = useState(false);
    const { standard, project } = props.route.params;
    const { formulario } = standard;

    const updateFieldInnerForm = async (fieldId, value) => {
        setInnerForm({
            ...innerForm,
            [fieldId]: {
                value
            }
        });
    };

    const isFieldValid = (field) => {
        let isFieldValid = true;

        if (field.type === "CHECK_OPTIONS_SI_NO_OTRO") {
            if (innerForm[field.id] && innerForm[field.id].value.check === "Otro" && !innerForm[field.id].value.text) {
                isFieldValid = false;
            }
        }

        if (field.rules && field.rules.includes("required")) {
            if (field.type === "DATE") {
                if (!innerForm[field.id] || innerForm[field.id].value.length !== 10) {
                    isFieldValid = false;
                }
            }

            isFieldValid = isFieldValid && innerForm[field.id] && innerForm[field.id].value;
        }

        return isFieldValid;
    };

    const isCheckedOption = (fieldId, value) => {
        return innerForm[fieldId] && innerForm[fieldId].value && innerForm[fieldId].value.split("|").includes(value);
    };

    const toggleCheckOption = (fieldId, value) => {
        if (isCheckedOption(fieldId, value)) {
            setInnerForm({
                ...innerForm,
                [fieldId]: {
                    value: innerForm[fieldId].value
                        .split("|")
                        .filter((option) => option !== value)
                        .join("|")
                }
            });
        } else if (!innerForm[fieldId]) {
            setInnerForm({
                ...innerForm,
                [fieldId]: {
                    value: value
                }
            });
        } else {
            setInnerForm({
                ...innerForm,
                [fieldId]: {
                    value: innerForm[fieldId] && innerForm[fieldId].value + "|" + value
                }
            });
        }
    };

    const getFile = (uri) => {
        let localUri = uri;
        let filename = localUri.split("/").pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        return { uri: localUri, name: filename, type };
    };

    const throwAccountError = () => {
        AsyncStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
        AsyncStorage.removeItem(USER_NAME);
        props.navigation.navigate("Login", {
            notification: {
                type: "error",
                message: "Ingrese nuevamente por favor"
            }
        });
    };

    const saveData = async () => {
        // await AsyncStorage.setItem("foo", "bar");
        // const result = await AsyncStorage.getItem("foo");
        // const networkStatus = await Network.getNetworkStateAsync();
        // if (networkStatus.isConnected) {
        //   Alert.alert("Esta conectado");
        // } else {
        //   Alert.alert("No esta conectado");
        // }
        setIsValidating(true);
        let isThereSomeError = !!formulario.fields.find((field) => !isFieldValid(field));
        if (isThereSomeError) {
            setIsInvalidForm(true);
        } else {
            setIsInvalidForm(false);
            setLoading(true);
            AsyncStorage.getItem(USER_NAME)
                .then((username) => {
                    AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
                        .then((token) => {
                            const formData = new FormData();
                            formData.append("project_id", project.id);
                            formData.append("standard_id", standard.id);
                            formData.append("username", username);
                            formData.append("formulario_id", formulario.id);
                            const arrayInnerForm = [];
                            for (const key in innerForm) {
                                if (innerForm.hasOwnProperty(key)) {
                                    const element = innerForm[key];
                                    if (innerForm[key].value) {
                                        arrayInnerForm.push({
                                            id: key,
                                            value: innerForm[key].value
                                        });
                                    }
                                }
                            }
                            formulario.fields.forEach((field) => {
                                if (field.type === "IMAGE" && innerForm[field.id]) {
                                    formData.append(`field_${field.id}`, getFile(innerForm[field.id].value));
                                }
                            });
                            formData.append("fields", JSON.stringify(arrayInnerForm));

                            fetch(`${API_URL}/save-values`, {
                                method: "POST",
                                body: formData,
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                                        throwAccountError();
                                    } else {
                                        props.navigation.navigate("Projects", {
                                            project,
                                            standard,
                                            username,
                                            notification: {
                                                type: "success",
                                                message: `Formulario enviado correctamente`
                                            }
                                        });
                                    }
                                })
                                .finally(() => setLoading(false));
                        })
                        .done();
                })
                .done();
        }
    };

    const fetchApi = async () => {
        const { fields } = formulario;
        if (fields.find((field) => field.type === "SELECTOR_NOMENCLADOR")) {
            setLoading(true);
        }

        fields.forEach((field) => {
            if (field.type === "SELECTOR_NOMENCLADOR") {
                let url = API_URL;
                switch (field.selector) {
                    case "AUTOMOVIL":
                        url += "/automoviles";
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

    const getGalleryImage = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (resultPermission) {
            const resultImagePiker = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            });
            return resultImagePiker;
        }
    };

    const openCamera = async (operation) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        if (status === "granted") {
            props.navigation.navigate("Camera", {
                operation
            });
        } else {
            Alert.alert("La app no tiene permisos para usar la camara");
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Header {...props} />
            {isInvalidForm && <Text style={styles.notificationError}>Verifique los campos del formulario.</Text>}
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerForm}>
                <View>
                    {formulario.fields
                        .sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0))
                        .map((field) => (
                            <React.Fragment key={field.id}>
                                {field.label && <Text style={styles.label}>{field.label}</Text>}
                                {!field.label && <View style={{ marginBottom: 20 }}></View>}
                                {["NUMBER", "SHORT_TEXT", "LONG_TEXT"].includes(field.type) && (
                                    <>
                                        <TextInput
                                            keyboardType={field.type === "NUMBER" ? "numeric" : "default"}
                                            style={[
                                                isValidating && !isFieldValid(field) ? styles.inputError : styles.inputs,
                                                field.type === "LONG_TEXT" && styles.inputArea
                                            ]}
                                            placeholder={field.placeholder}
                                            onChangeText={(text) => updateFieldInnerForm(field.id, text)}
                                        />
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                    </>
                                )}
                                {field.type === "SELECTOR_NOMENCLADOR" && (
                                    <>
                                        <View style={[styles.select, isValidating && !isFieldValid(field) && styles.selectError]}>
                                            <Picker
                                                onValueChange={(itemValue) => updateFieldInnerForm(field.id, itemValue)}
                                                selectedValue={innerForm[field.id] && innerForm[field.id].value}
                                            >
                                                <Picker.Item label=" - Seleccione una opción - " value={null} />
                                                {selectors[field.selector] &&
                                                    selectors[field.selector].map((item) => (
                                                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                                                    ))}
                                            </Picker>
                                        </View>
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                    </>
                                )}
                                {field.type === "IMAGE" && (
                                    <>
                                        <View style={styles.floatRight}>
                                            <TouchableOpacity
                                                style={innerForm[field.id] && innerForm[field.id] ? styles.buttonFile : styles.buttonEmptyFile}
                                                onPress={async () => {
                                                    const setImage = (uri) => {
                                                        updateFieldInnerForm(field.id, uri);
                                                    };
                                                    props.navigation.navigate("Camera", {
                                                        operation: setImage
                                                    });
                                                }}
                                            >
                                                <Text style={styles.textLight}>Seleccionar imágen</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {isValidating && !isFieldValid(field) && (
                                            <Text style={[styles.textRight, styles.textError]}>Imágen requerida</Text>
                                        )}
                                    </>
                                )}
                                {field.type === "DATE" && (
                                    <>
                                        <TextInputMask
                                            type={"datetime"}
                                            options={{
                                                format: "DD/MM/YYYY"
                                            }}
                                            style={isValidating && !isFieldValid(field) ? styles.inputError : styles.inputs}
                                            placeholder="DD/MM/YYYY"
                                            value={innerForm[field.id] && innerForm[field.id].value}
                                            onChangeText={(text) => updateFieldInnerForm(field.id, text)}
                                        />
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                    </>
                                )}
                                {field.type === "SELECTOR_OPTIONS" && (
                                    <>
                                        <View style={[styles.select, isValidating && !isFieldValid(field) && styles.selectError]}>
                                            <Picker
                                                onValueChange={(itemValue) => updateFieldInnerForm(field.id, itemValue)}
                                                selectedValue={innerForm[field.id] && innerForm[field.id].value}
                                            >
                                                <Picker.Item label=" - Seleccione una opción - " value={null} />
                                                {field.options &&
                                                    field.options.split("|").map((item) => <Picker.Item key={item} label={item} value={item} />)}
                                            </Picker>
                                        </View>
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                    </>
                                )}
                                {field.type === "CHECK_OPTIONS" && (
                                    <>
                                        {field.options &&
                                            field.options.split("|").map((item) => (
                                                <View style={{ flexDirection: "column" }} key={item}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <CheckBox
                                                            onValueChange={() => toggleCheckOption(field.id, item)}
                                                            value={isCheckedOption(field.id, item)}
                                                        />
                                                        <Text style={{ marginTop: 5 }}> {item}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                        <View style={{ marginBottom: 10 }}></View>
                                    </>
                                )}
                                {field.type === "CHECK_OPTIONS_SI_NO_OTRO" && (
                                    <>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <CheckBox
                                                    value={innerForm[field.id] && innerForm[field.id].value === "Si"}
                                                    onValueChange={() => updateFieldInnerForm(field.id, "Si")}
                                                />
                                                <Text style={{ marginTop: 5 }}> Si</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <CheckBox
                                                    value={innerForm[field.id] && innerForm[field.id].value === "No"}
                                                    onValueChange={() => updateFieldInnerForm(field.id, "No")}
                                                />
                                                <Text style={{ marginTop: 5 }}> No</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <CheckBox
                                                    value={
                                                        innerForm[field.id] &&
                                                        innerForm[field.id].value &&
                                                        ![undefined, "Si", "No"].includes(innerForm[field.id].value)
                                                    }
                                                    onValueChange={() => updateFieldInnerForm(field.id, "")}
                                                />
                                                <Text style={{ marginTop: 5 }}> Otro</Text>
                                                <TextInput
                                                    style={{
                                                        borderBottomColor: "rgba(0, 0, 0, 0.2)",
                                                        borderBottomWidth: 1,
                                                        width: 200,
                                                        marginLeft: 10
                                                    }}
                                                    value={
                                                        innerForm[field.id] &&
                                                        !["Si", "No"].includes(innerForm[field.id].value) &&
                                                        innerForm[field.id].value
                                                    }
                                                    onChangeText={(text) => updateFieldInnerForm(field.id, text)}
                                                />
                                            </View>
                                        </View>
                                        {isValidating && !isFieldValid(field) && <Text style={styles.textError}>Campo requerido</Text>}
                                    </>
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
