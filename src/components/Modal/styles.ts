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
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    titleModal: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonClose: {
        alignSelf: 'flex-end',
        margin: 10,
        textAlign: 'right',
        position: 'absolute',
        right: 0,
        top: 2
    }
})