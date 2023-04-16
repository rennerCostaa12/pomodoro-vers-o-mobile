import { useNavigation } from '@react-navigation/native';

import { View, Image } from "react-native";
import { useEffect } from "react";

import { styles } from "./styles";

export default function Splash(){

    const navigate = useNavigation() as any;

    useEffect(() => {
        setTimeout(() => {
            navigate.navigate('Home');
        }, 1000);
    }, []);

    return(
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../../../assets/splash.png')}
            />
        </View>
    )
}