import React from 'react'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import ViewShot from 'react-native-view-shot'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles';

export default function Header() {
    return (
        <View style={styles.containerHeader}>
            <View>
                <Image source={require('../assets/images/header-app.png')}  style={styles.imagenHeader} />
            </View>
            <View style={styles.icons}>
                <View style={styles.iconSearch}>
                    <FontAwesome name="search" size={24} color="#4f5b84" />
                </View>
                <View>
                    <FontAwesome5 name="user" size={24} color="#4f5b84" />
                </View>

            </View>
 
        </View>
    )
}
