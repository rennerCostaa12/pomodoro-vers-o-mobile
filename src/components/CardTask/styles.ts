import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        backgroundColor: '#ffffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5
    },
    column1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleTask: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10
    },
    quantityTask: {
        fontSize: 16,
        fontStyle: 'italic',
        marginRight: 10,
        color: '#778899'
    },
    buttonEdit: {
        borderWidth: 1,
        borderColor: '#778899',
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    }
})