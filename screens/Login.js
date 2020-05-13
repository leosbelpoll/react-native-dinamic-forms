import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, AsyncStorage, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles";

import { API_URL, ACCESS_TOKEN_IDENTIFIER } from "../configs";

export default function Login(props) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onLogin = async () => {
        setLoading(true);
        setError(null);
        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(async res => {
                if (res.error === "Unauthorized") {
                    setError("Unauthorized");
                    setLoading(false);
                } else {
                    setError(null);
                    AsyncStorage.setItem(ACCESS_TOKEN_IDENTIFIER, res["access_token"]);
                    setLoading(false);
                    props.navigation.navigate("Projects");
                }
            })
            .catch(err => {
                setError(err);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text style={styles.title}> Inicio de Sesión </Text>

                    {error && <Text style={styles.textError}>Usuario o contraseña incorrecta.</Text>}

                    <TextInput style={styles.inputs} placeholder="Usuario" onChangeText={text => setUsername(text)} value={username} />

                    <TextInput
                        style={styles.inputs}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={pass => setPassword(pass)}
                        value={password}
                    />

                    <TouchableOpacity style={styles.buttom} onPress={() => onLogin()}>
                        <Text style={styles.textButton}>{loading ? "Loading ..." : "Iniciar Sesión"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

Login.navigationOptions = {
    name: "Login",
};
