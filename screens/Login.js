import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, AsyncStorage, View, TextInput, CheckBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles";

import { API_URL, ACCESS_TOKEN_IDENTIFIER, USER_NAME, REMEMBER_ME } from "../configs";
import Loading from "./Loading";

export default function Login(props) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    // const [rememberMe, setRememberMe] = useState(false);

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
                    setUsername("");
                    setPassword("");
                    setError(null);
                    AsyncStorage.setItem(ACCESS_TOKEN_IDENTIFIER, res["access_token"]);
                    AsyncStorage.setItem(USER_NAME, username);
                    // AsyncStorage.setItem(REMEMBER_ME, rememberMe);
                    setLoading(false);
                    props.navigation.navigate("Projects");
                }
            })
            .catch(err => {
                setError(err);
            });
    };

    const checkUser = async () => {
        setLoading(true);
        // AsyncStorage.getItem(REMEMBER_ME)
        //     .then(likeRemember => {
        //         console.log(likeRemember)
        //         if (likeRemember) {
        AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
            .then(token => {
                fetch(`${API_URL}/version`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (!["Unauthorized.", "Unauthenticated."].includes(res.message)) {
                            props.navigation.navigate("Projects");
                            setLoading(false);
                        } else {
                            setLoading(false);
                        }
                    });
            })
            .done();
        // }
        // })
        // .done();
    };

    useEffect(() => {
        checkUser();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: 100,
            }}
        >
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

                    {/* <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 30 }}>
                        <CheckBox value={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        <Text style={{ marginTop: 5 }} onPress={() => setRememberMe(!rememberMe)}>
                            Mantenerme logueado
                        </Text>
                    </View> */}

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
