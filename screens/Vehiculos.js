import React, { useEffect, useState } from "react";
import * as Network from 'expo-network'
import {
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

import { API_URL, ACCESS_TOKEN_IDENTIFIER } from "../configs";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';




export default function Vehiculos(props) {
    const [noplacas, setNoPlacas] = useState([]);
    const [bombasAbastecimiento, setBombasAbastecimiento] = useState([]);
    const [sistemasAmortiguacion, setSistemasAmortiguacion] = useState([]);
    const [estadosMedicion, setEstadosMedicion] = useState([]);
    const [error, setError] = useState();
    const [noplaca, setNoPlaca] = useState();
    const [recorridoInicial, setRecorridoInicial] = useState("");
    const [recorridoFinal, setRecorridoFinal] = useState("");
    const [galonesComprados, setGalonesComprados] = useState("");
    const [bombaAbastecimiento, setBombaAbastecimiento] = useState();
    const [sistemaAmortiguacion, setSistemaAmortiguacion] = useState();
    const [explicacionCapacitacion, setExplicacionCapacitacion] = useState("");
    const [estadoMedicion, setEstadoMedicion] = useState();
    const [presionNeumaticos, setPresionNeumaticos] = useState("");
    const [recorridoInicialImagen, setRecorridoInicialImagen] = ("");
    const [recorridoFinalImagen, setRecorridoFinalImagen] = ("");
    const [galonesCompradosImagen, setGalonesCompradosImagen] = ("");
    const [isValidating, setIsValidating] = useState(false);

    const openGallery = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (resultPermission) {
            const resultImagePiker = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
            });
            console.log(resultImagePiker);
        }
    };

    const openCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        if (status === 'granted') {
            props.navigation.navigate("Camera");
        } else {
            Alert.alert('La app no tiene permisos para usar la camara')
        }
    };

    const saveData = async () => {
        // const networkStatus = await Network.getNetworkStateAsync();
        // if (networkStatus.isConnected) {
        //     Alert.alert("Esta conectado");
        // } else {
        //     Alert.alert("No esta conectado");
        // }

        setIsValidating(true)
        // verificar si todo estabien antes
        console.log("Enviandooooo")
    };

    const fetchMyAPI = async () => {
        AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
            .then(token => {
                fetch(`${API_URL}/no-placas`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                            setError("Unauthorized");
                            setNoPlacas(null);
                        } else {
                            setError(null);
                            setNoPlacas(res.map(obj => ({ value: obj.id, label: obj.name })));
                        }
                    });
                fetch(`${API_URL}/bombas-abastecimiento`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                            setError("Unauthorized");
                            setBombasAbastecimiento(null);
                        } else {
                            setError(null);
                            setBombasAbastecimiento(res.map(obj => ({ value: obj.id, label: obj.name })));
                        }
                    });

                fetch(`${API_URL}/sistemas-amortiguacion`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                            setError("Unauthorized");
                            setSistemasAmortiguacion(null);
                        } else {
                            setError(null);
                            setSistemasAmortiguacion(res.map(obj => ({ value: obj.id, label: obj.name })));
                        }
                    });

                fetch(`${API_URL}/estados-medicion`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                            setError("Unauthorized");
                            setEstadosMedicion(null);
                        } else {
                            setError(null);
                            setEstadosMedicion(res.map(obj => ({ value: obj.id, label: obj.name })));
                        }
                    });

            })
            .done();

    }


    useEffect(() => {
        fetchMyAPI();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View>
                    <Text style={styles.title}>vehículo</Text>

                    <Text style={styles.label}>{noplaca}No Placa</Text>
                    <SelectInput style={styles.select} options={noplacas} placeholder="Seleccione" onValueChange={(text) => setNoPlaca(text)} />
                    {/* {(!noplaca && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(noplaca)) && <Text style={styles.textError}>Campo numérico</Text>} */}



                    <Text style={styles.label}>Recorrido Inicial</Text>
                    <TextInput style={((!recorridoInicial || isNaN(recorridoInicial)) && isValidating) ? styles.inputError : styles.inputs} placeholder="Km/h" onChangeText={(text) => setRecorridoInicial(text)} />
                    {(!recorridoInicial && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(recorridoInicial)) && <Text style={styles.textError}>Campo numérico</Text>}
                    <View style={styles.padreButtom}>
                        <TouchableOpacity
                            style={styles.buttonFile}
                            onPress={() => openCamera()}
                        >
                            <Text style={styles.textButton}>Seleccionar archivo</Text>
                        </TouchableOpacity>
                    </View>
                    {(!recorridoInicialImagen && isValidating) && <Text style={styles.textErrorRight}>Campo requerido</Text>}


                    <Text style={styles.label}>Recorrido Final</Text>
                    <TextInput style={((!recorridoFinal || isNaN(recorridoFinal)) && isValidating) ? styles.inputError : styles.inputs} placeholder="Km/h" onChangeText={(text) => setRecorridoFinal(text)} />
                    {(!recorridoFinal && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(recorridoFinal)) && <Text style={styles.textError}>Campo numérico</Text>}
                    <View style={styles.padreButtom}>
                        <TouchableOpacity
                            style={styles.buttonFile}
                            onPress={() => openCamera()}
                        >
                            <Text style={styles.textButton}>Seleccionar archivo</Text>
                        </TouchableOpacity>
                    </View>
                    {(!recorridoFinalImagen && isValidating) && <Text style={styles.textErrorRight}>Campo requerido</Text>}





                    <Text style={styles.label}>Galones Comprados</Text>
                    <TextInput style={((!galonesComprados || isNaN(galonesComprados)) && isValidating) ? styles.inputError : styles.inputs} placeholder="Cant" onChangeText={(text) => setGalonesComprados(text)} />
                    {(!galonesComprados && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(galonesComprados)) && <Text style={styles.textError}>Campo numérico</Text>}
                    <View style={styles.padreButtom}>
                        <TouchableOpacity
                            style={styles.buttonFile}
                            onPress={() => openCamera()}
                        >
                            <Text style={styles.textButton}>Seleccionar archivo</Text>
                        </TouchableOpacity>
                    </View>
                    {(!galonesCompradosImagen && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}



                    <Text style={styles.label}>Bomba Abastecio</Text>
                    <SelectInput style={styles.select} options={bombasAbastecimiento} placeholder="Seleccione" onValueChange={(text) => setBombaAbastecimiento(text)} />
                    {/* {(!bombaAbastecimiento && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(bombaAbastecimiento)) && <Text style={styles.textError}>Campo numérico</Text>} */}



                    <Text style={styles.label}>Sistema de amortiguación del vehículo</Text>
                    <SelectInput style={styles.select} options={sistemasAmortiguacion} placeholder="Seleccione" onValueChange={(text) => setSistemaAmortiguacion(text)} />
                    {/* {(!sistemaAmortiguacion && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(sistemaAmortiguacion)) && <Text style={styles.textError}>Campo numérico</Text>} */}


                    <Text style={styles.label}>Breve explicación capacitación de buenas práctica de hoy.</Text>
                    <TextInput style={(!explicacionCapacitacion  && isValidating) ? styles.inputAreaError : [styles.inputs, styles.inputArea]}
                        multiline={true}
                        placeholder="Escriba"
                        onChangeText={(text) => setExplicacionCapacitacion(text)}
                    />
                    {(!explicacionCapacitacion && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}



                    <Text style={styles.label}>Estado de Medición vehículo</Text>
                    <SelectInput style={styles.select} options={estadosMedicion} placeholder="Seleccione" onValueChange={(text) => setEstadoMedicion(text)} />
                    {/* {(!estadoMedicion && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(estadoMedicion)) && <Text style={styles.textError}>Campo numérico</Text>} */}


                    <Text style={styles.label}>Presión de los neumático</Text>
                    <TextInput style={((!presionNeumaticos || isNaN(presionNeumaticos)) && isValidating) ? styles.inputError : styles.inputs} placeholder="Psi" onChangeText={(text) => setPresionNeumaticos(text)} />
                    {(!presionNeumaticos && isValidating) && <Text style={styles.textError}>Campo requerido</Text>}
                    {(isValidating && isNaN(presionNeumaticos)) && <Text style={styles.textError}>Campo numérico</Text>}

                    <View style={styles.padreButtom}>
                        <TouchableOpacity
                            style={styles.buttomPequeno}
                            onPress={() => saveData()}
                        >
                            <Text style={styles.textButton}>Enviar</Text>
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
    inputError: {
        borderRadius: 15,
        borderColor: "rgba(255,0,0,0.7)",
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
    selectError: {
        borderRadius: 15,
        borderColor: "rgba(255,0,0,0.7)",
        borderWidth: 1,
        paddingHorizontal: 20,
    },
    inputArea: {
        minHeight: 140,
    },
    inputAreaError: {
        minHeight: 140,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(255,0,0,0.7)",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    label: {
        color: "rgba(0,0,0,0.6)",
        paddingLeft: 10,
        marginTop: 15,
        marginBottom: 5,
    },
    textError: {
        color: "rgba(255,0,0,0.7)",
    },
    textErrorRight: {
        color: "rgba(255,0,0,0.7)",
        textAlign: "right"
    },
    padreButtom: {
        alignItems: "flex-end",
    },
    buttonFile: {
        backgroundColor: "rgba(44, 84, 151,0.7)",
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    buttomPequeno: {
        backgroundColor: "#b7c62f",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 30,
        marginVertical: 25,
    },
    textButton: {
        color: "white",
        textAlign: "center",
    },

});
