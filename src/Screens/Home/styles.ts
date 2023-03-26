import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    contentButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    button: {
        padding: 10,
        marginLeft: 10,
        borderRadius: 5
    },
    textButton: {
        fontSize: 18
    },
    contentTimer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    timer: {
        fontSize: 100,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 20
    },
    buttonAction: {
        backgroundColor: '#F47272',
        borderRadius: 5,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 20
    },
    textButtonAction: {
        fontSize: 30,
        color: '#ffffff'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        margin: 30,
    }
})