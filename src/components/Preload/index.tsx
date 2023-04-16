import { View, Image, Animated } from "react-native";

import { useEffect, useRef } from "react";

import { styles } from "./styles";

interface PreloadProps{
    visible: boolean;
}

export default function Preload({ visible }: PreloadProps){

    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
        Animated.timing(rotation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        })
        ).start();
    }, []);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    
    return(
        <>
            {visible && (
                <View style={styles.container}>
                    <Animated.Image
                        style={{ transform: [{ rotate: spin }], width: 150, height: 150 }}
                        source={require('../../assets/icon-loading.png')}
                    />
                </View>
            )}
        </>
    )
}