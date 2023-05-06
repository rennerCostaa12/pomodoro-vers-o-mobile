import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

import { useState } from "react";

import { styles } from "./styles"
import { TaskProps } from "../../Screens/Home";

import { useConfigApp } from "../../contexts/ConfigAppContext";

interface CardTaskProps{
    data: TaskProps;
    setTaskId: (id: string | number[]) => void;
    setModalAddTask: (data: boolean) => void;
    setDatasTaskModal: (data: TaskProps) => void;
    taskId: string | number[];
}

export default function CardTask({ data, setTaskId, taskId, setModalAddTask, setDatasTaskModal }: CardTaskProps){
    const { state } = useConfigApp();

    const handleEditTask = () => {
        setModalAddTask(true);
        setDatasTaskModal(data);
    }

    const truncateText = (text: string) => {
        let textFormated;
        if(text.length > 15){
            textFormated = `${text.substring(0, 15)}...`
        }else{
            textFormated = text;
        }

        return textFormated;
    }

    return(
        <TouchableOpacity 
            style={[styles.container, { borderWidth: taskId == data.id ? 2 : 0, borderColor: taskId == data.id ? state.color_button : '' }]} 
            onPress={() => setTaskId(data.id)}
        >
            <View style={styles.column1}>
                <AntDesign name="checkcircle" size={24} color={data?.quantityInital >= data?.quantityPomodoros ? "#00D100" : "#778899"} />
                <Text style={styles.titleTask}>{truncateText(data.name)}</Text>
            </View>
            <View style={styles.column2}>
                <Text style={styles.quantityTask}>{data.quantityInital} / {data.quantityPomodoros}</Text>
                <TouchableOpacity style={styles.buttonEdit} onPress={handleEditTask}>
                    <FontAwesome name="ellipsis-v" size={24} color="#778899" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}