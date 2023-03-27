import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#1E2240'
    },
    contentButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        gap: 20
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#ffffff'
    },
    textButton: {
        fontSize: 18,
        color: '#ffffff'
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
    },
    modalTitle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalSubTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    contentModal: {
        marginTop: 10,
        marginBottom: 10,
    },
    contentColors: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        gap: 20
    },
    modalTimers: {
        alignItems: 'center',
        margin: 15
    },
    timerTitle: {
        fontSize: 16,
    }
})