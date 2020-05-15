import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, AsyncStorage } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL, ACCESS_TOKEN_IDENTIFIER } from "../configs";
import Header from "../components/Header";
import Loading from "./Loading";

export default function Projects(props) {
    const { navigation } = props;
    const [projects, setProjects] = useState();
    const [notification, setNotification] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const fetchMyAPI = async () => {
        setLoading(true);
        AsyncStorage.getItem(ACCESS_TOKEN_IDENTIFIER)
            .then(token => {
                fetch(`${API_URL}/projects`, {
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
                            setProjects(null);
                            setLoading(false);
                        } else {
                            setError(null);
                            setProjects(res);
                            setLoading(false);
                        }
                    });
                
            })
            .done();
    };

    useEffect(() => {
        const { route } = props;
        // let isThere = false;
        if (route.params && route.params.notification) {
            setNotification(route.params.notification);
            // isThere = true;
        }
        fetchMyAPI();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Header {...props} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>Elige un Projecto</Text>
                    {loading && <Text>Loading ...</Text>}
                    {error && <Text style={styles.textError}>Error cargando elementos.</Text>}
                    {(!projects || !projects.length) && !error && <Text>No hay elementos.</Text>}
                    {projects &&
                        projects.map(project => (
                            <TouchableOpacity
                                key={project.id}
                                style={styles.buttom}
                                onPress={() =>
                                    props.navigation.navigate("Standards", {
										project
                                    })
                                }
                            >
                                <Text style={styles.textButton}>{project.name}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
            {notification && <Text style={notification.type === "success" ? styles.notificationSuccess : styles.notificationError} onPress={() => setNotification(null)}>{notification.message}</Text>}
        </View>
    );
}

Projects.navigationOptions = {
    name: "Projects",
};
