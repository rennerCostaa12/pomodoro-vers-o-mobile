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
        height: 500,
        alignItems: 'center',
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
    contentInterval: {
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#d6d6d6c0',
        borderRadius: 5,
        padding: 5,
    },
    contentModalAddTask: {
        flex: 1,
        alignItems: 'center',
    },
    textInputAddTask: {
        borderWidth: 1,
        fontSize: 25,
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    contentQuantityPomodoro: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    textQuantityPomodoro: {
        fontSize: 20,
        margin: 15
    },
    contentTasks: {
        width: 350,
        height: 165,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },
    contentButtonModalTask: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0
    },
    buttonModalTask: {
        marginBottom: -15,
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    textButtonModalTask: {
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    buttonDeleteTask: {
        marginBottom: -15,
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#DC143C',
        marginRight: 10
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        margin: 20,
        alignItems: 'center'
    },
    textRules: {
        color: 'gray',
        fontSize: 25,
        marginTop: 10,
    },
    imageRules:{
        width: '100%',
        height: 200,
        marginTop: 20
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
    },
    buttonSaveModal: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    textButtonSaveModal: {
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    }
})