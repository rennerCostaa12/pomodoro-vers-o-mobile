import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        elevation: 5
    },
    content: {
        backgroundColor: '#ffffff',
        width: 380,
        height: 350,
        borderRadius: 5
    },
    buttonClose: {
        alignSelf: 'flex-end',
        margin: 10
    }
})