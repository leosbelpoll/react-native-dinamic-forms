import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, AsyncStorage, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles";
import { ACCESS_TOKEN_IDENTIFIER, API_URL, USER_NAME } from "../configs";
import Header from "../components/Header";
import Loading from "./Loading";

export default function SubStandards(props) {
    const [substandards, setSubStandards] = useState();
    const { standard, project } = props.route.params;
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();

    const fetchMyAPI = async () => {
        setLoading(true);
        AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
            .then(token => {
                fetch(`${API_URL}/standards?parent=${standard.id}`, {
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
                            setSubStandards(null);
                            setLoading(false);
                        } else {
                            setError(null);
                            setSubStandards(res);
                            setLoading(false);
                        }
                    });
            })
            .done();

        AsyncStorage.getItem(USER_NAME)
            .then(username => {
                setUsername(username);
            })
            .done();
    };

    useEffect(() => {
        fetchMyAPI();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Header {...props} />
            {error && <Text style={styles.notificationError}>Error cargando elementos.</Text>}
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>Elige</Text>
                    {(!substandards || !substandards.length) && !error && <Text>No hay elementos. AQUI DEBE IR UN FORMULARIO</Text>}
                    {substandards &&
                        substandards.map(substandard => (
                            <TouchableOpacity
                                key={substandard.id}
                                style={styles.buttom}
                                onPress={() => {
                                    if (substandard.type === "VEHICLE") {
                                        props.navigation.navigate("Vehicle", {
                                            project,
                                            standard: substandard,
                                            username,
                                        });
                                    } else {
                                        Alert.alert("Work in progress");
                                    }
                                }}
                            >
                                <Text style={styles.textButton}>{substandard.name}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
}

SubStandards.navigationOptions = {
    name: "SubStandards",
};
