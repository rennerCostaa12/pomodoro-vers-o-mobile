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
        height: 380,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonClose: {
        alignSelf: 'flex-end',
        margin: 10
    }
})