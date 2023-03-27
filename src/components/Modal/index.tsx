import { ReactNode } from "react";
import { View, Modal as ModalReact, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setOpenModal: (data: boolean) => void;
}

export default function Modal({ children, visible, setOpenModal }: ModalProps) {
    return (
        <ModalReact
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setOpenModal(!visible)}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.buttonClose} onPress={() => setOpenModal(!visible)}>
                        <AntDesign name="close" size={30} color='#000000' />
                    </TouchableOpacity>
                    {visible &&
                        <>
                            {children}
                        </>
                    }
                </View>
            </View>
        </ModalReact>
    )
}