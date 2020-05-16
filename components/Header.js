import React from "react";
import { Image, View, AsyncStorage } from "react-native";
// import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles";
import { ACCESS_TOKEN_IDENTIFIER, USER_NAME } from "../configs";

export default function Header(props) {
    return (
        <View style={styles.containerHeader}>
            <View>
                <Image source={require("../assets/images/header-app.png")} style={styles.imagenHeader} />
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                }}
            >
                <View
                    style={{
                        paddingRight: 20,
                        marginTop: 2
                    }}
                >
                    <FontAwesome name="search" size={20} color="black" />
                </View>
                <View>
                    {/* <FontAwesome5 name="user" size={24} color="#4f5b84" /> */}
                    <MaterialCommunityIcons
                        name="logout"
                        size={24}
                        color="black"
                        onPress={() => {
                            AsyncStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
                            AsyncStorage.removeItem(USER_NAME);
                            props.navigation.navigate("Login");
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
