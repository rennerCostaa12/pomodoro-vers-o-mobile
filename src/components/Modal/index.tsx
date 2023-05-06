import { ReactNode } from "react";
import { View, Modal as ModalReact, TouchableOpacity, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setOpenModal: (data: boolean) => void;
    titleModal?: string;
}

export default function Modal({ children, visible, setOpenModal, titleModal }: ModalProps) {

    return (
        <ModalReact
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setOpenModal(!visible)}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.titleModal}>{titleModal}</Text>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => setOpenModal(!visible)}>
                            <AntDesign name="close" size={30} color='#000000' />
                        </TouchableOpacity>
                    </View>
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