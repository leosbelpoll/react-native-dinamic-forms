import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import * as Network from 'expo-network'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    AsyncStorage,
    Alert,
} from "react-native";
import SelectInput from 'react-native-select-input-ios';
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

export default function Vehiculos(props) {
    const options = [
        { value: 0, label: 'un valor' },
        { value: 1, label: 'segundo dato' },
        { value: 2, label: 'un valor' },
        { value: 3, label: 'segundo dato' },
        { value: 4, label: 'un valor' },
        { value: 5, label: 'segundo dato' },
        { value: 6, label: 'un valor' },
        { value: 7, label: 'segundo dato' },
        { value: 8, label: 'un valor' },
        { value: 9, label: 'segundo dato' },
        { value: 10, label: 'un valor' },
        { value: 11, label: 'segundo dato' },
        { value: 12, label: 'un valor' },
        { value: 13, label: 'segundo dato' },
        { value: 14, label: 'un valor' },
        { value: 15, label: 'segundo dato' },
        { value: 16, label: 'un valor' },
        { value: 17, label: 'segundo dato' },
    ]
    const saveData = async () => {
        await AsyncStorage.setItem("foo", "bar");
        const result = await AsyncStorage.getItem("foo");
        const networkStatus = await Network.getNetworkStateAsync();
        if (networkStatus.isConnected) {
            Alert.alert("Esta conectado");
        } else {
            Alert.alert("No esta conectado");
        }

    };
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View>
                    <Text style={styles.title}>Vehiculos</Text>

                    <Text style={styles.label}>No Placas</Text>
                    <SelectInput style={styles.select} options={options} placeholder="Seleccione" />

                    <Text style={styles.label}>Recorrido Inicial</Text>
                    <TextInput style={styles.inputs} placeholder="Km/h" />

                    <Text style={styles.label}>Recorrido Final</Text>
                    <TextInput style={styles.inputs} placeholder="Km/h" />

                    <Text style={styles.label}>Galones Comprados</Text>
                    <TextInput style={styles.inputs} placeholder="Cant" />

                    <Text style={styles.label}>Bomba Abastecio</Text>
                    <SelectInput style={styles.select} options={options} placeholder="Seleccione" />

                    <Text style={styles.label}>Sistema de amortiguacion del vehiculo</Text>
                    <SelectInput style={styles.select} options={options} placeholder="Seleccione" />

                    <Text style={styles.label}>
                        Breve explicacion capacitacion de buenas Practicas de hoy.
					</Text>
                    <TextInput
                        style={[styles.inputs, styles.inputArea]}
                        multiline={true}
                        placeholder="Escriba"
                    />
                    <Text style={styles.label}>Estado de Medicion Vehiculo</Text>
                    <SelectInput style={styles.select} options={options} placeholder="Seleccione" />

                    <Text style={styles.label}>Presion de los neumaticos</Text>
                    <TextInput style={styles.inputs} placeholder="Psi" />

                    <View style={styles.padreButtom}>
                        <TouchableOpacity
                            style={styles.buttomPequeno}
                            onPress={() => saveData()}
                        >
                            <Text style={styles.textButton}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

Vehiculos.navigationOptions = {
    name: "Vehiculos",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    contentContainer: {
        paddingTop: 30,
        paddingHorizontal: 35,
        paddingBottom: 130,
    },
    title: {
        fontSize: 25,
        textAlign: "center",
    },
    subtitle: {
        color: "rgba(0,0,0,0.6)",
    },
    inputs: {
        borderRadius: 15,
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    select: {
        borderRadius: 15,
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        paddingHorizontal: 20,
    },
    inputArea: {
        minHeight: 140,
    },
    label: {
        color: "rgba(0,0,0,0.6)",
        paddingLeft: 10,
        marginTop: 15,
        marginBottom: 5,
    },
    padreButtom: {
        alignItems: "flex-end",
    },
    buttomPequeno: {
        backgroundColor: "#b7c62f",
        borderRadius: 20,
        padding: 10,
        width: 150,
        marginVertical: 25,
    },
    textButton: {
        color: "white",
        textAlign: "center",
    },

});
