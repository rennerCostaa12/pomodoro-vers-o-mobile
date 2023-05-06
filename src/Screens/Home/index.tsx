import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView, SafeAreaView } from "react-native";
import { Audio } from 'expo-av';
import { EvilIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useState, useEffect } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Toast, ALERT_TYPE, AlertNotificationRoot } from "react-native-alert-notification";

import Modal from "../../components/Modal";
import ColorPicker from "../../components/ColorPicker";
import InputNumber from "../../components/InputNumber";
import Preload from "../../components/Preload";

import { useConfigApp } from "../../contexts/ConfigAppContext";
import { TypesActionsProps, ConfigAppDefaultProps } from "../../contexts/ConfigAppContext";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardTask from "../../components/CardTask";

interface ModesTimerProps {
    timer: number;
    title: string;
}

export interface TaskProps {
    id: string | number[];
    name: string,
    quantityPomodoros: number,
    quantityInital: number,
}

let intervalApp = 4;

export default function Home() {

    const { dispatch, state } = useConfigApp();

    const [colorConfigApp, setColorConfigApp] = useState<string>('#F47272');
    const [modesTimer, setModesTimer] = useState<ModesTimerProps>(state.pomodoro);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalRulesApp, setModalRulesApp] = useState<boolean>(false);
    const [modalAddTask, setModalAddTask] = useState<boolean>(false);

    const [datasTaskModal, setDatasTaskModal] = useState<TaskProps>();

    const [listTask, setListTask] = useState<TaskProps[]>([]);

    const [nameTask, setNameTask] = useState<string>('');
    const [quantityPomodoros, setQuantityPomodoros] = useState<number>(1);
    const [taskSelected, setTaskSelected] = useState<string | number[]>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [timerShortBreak, setTimerShortBreak] = useState<number>(state.short_break.timer / 60);
    const [timerLongBreak, setTimerLongBreak] = useState<number>(state.long_break.timer / 60);
    const [timerPomodoro, setTimerPomodoro] = useState<number>(state.pomodoro.timer / 60);

    const [currentInterval, setCurrentIntervalApp] = useState<number>(0);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/alert_sound.wav'));
        return await sound.playAsync();
    }

    const handleStartTimer = () => {
        if(!isStarted) {
            setIsStarted(true);
        } else {
            setIsStarted(false);
        }
    }

    const saveTasksStorage = async (listTask: TaskProps[]) => {
        setLoading(true);
        try{
            await AsyncStorage.setItem('@appPomodoro:listTasks', JSON.stringify(listTask));
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    const handleCreateTask = () => {
        if(!nameTask || !quantityPomodoros){
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Fill in the fields to create the task',
                textBody: '',
            })

            return;
        }

        const taskObject = {
            id: uuid.v4(),
            name: nameTask,
            quantityPomodoros: quantityPomodoros,
            quantityInital: 0
        }

        setListTask(currentList => [...currentList, taskObject]);

        setNameTask('');
        setQuantityPomodoros(1);
        setModalAddTask(false);

        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Task added successfully',
            textBody: '',
        });
    }

    const handleEditTask = () => {
        if(!nameTask || !quantityPomodoros){
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Fill in the fields to edit the task',
                textBody: '',
            });
            
            return;
        }

        setListTask(currentList => currentList.map(value => {
            if(value.id === datasTaskModal?.id){
                return {...value, name: nameTask, quantityPomodoros: quantityPomodoros};
            }

            return value;
        }))
        
        setNameTask('');
        setQuantityPomodoros(1);
        setModalAddTask(false);
        setDatasTaskModal(undefined);

        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Successfully edited task',
            textBody: '',
        });
    }

    const handleDeleteTask = (id: string | number[]) => {
        if(Object.keys(listTask).length > 1){
            setListTask(listTask.filter((data) => data.id !== id));
            setModalAddTask(false);
    
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Task deleted successfully',
                textBody: '',
            });
        }else{
            setListTask(listTask.filter((data) => data.id !== id));
            setModalAddTask(false);
    
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Task deleted successfully',
                textBody: '',
            });

            saveTasksStorage([]);
        }
    }

    const handleSaveConfig = async () => {
        dispatch({
            type: TypesActionsProps.setTimerPomodoro,
            payload: state.pomodoro.timer = timerPomodoro * 60,
        })

        dispatch({
            type: TypesActionsProps.setTimerLongBreak,
            payload: state.long_break.timer = timerLongBreak * 60
        })

        dispatch({
            type: TypesActionsProps.setTimerShortBreak,
            payload: state.short_break.timer = timerShortBreak * 60
        })

        dispatch({
            type: TypesActionsProps.setColorButton,
            payload: state.color_button = colorConfigApp,
        })

        try{
            await AsyncStorage.setItem("@appPomodoro:configApp", JSON.stringify(state));
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Settings saved successfully',
                textBody: '',
            })
            setModalOpen(false);
        }catch(error){
            console.log(error);
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error saving settings',
                textBody: '',
            })
        }
    }

    const handleSetModeTime = (timerSelected: ModesTimerProps) => {
        if (isStarted) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Unable to change stopwatch with running time',
                textBody: '',
            });
        } else {
            setModesTimer(timerSelected);
        }
    }

    useEffect(() => {
        if (modesTimer.timer === 0 && modesTimer.title === 'LONG BREAK') {
            setCurrentIntervalApp(0);
            setIsStarted(false);
            setModesTimer(state.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title === 'SHORT BREAK') {
            setIsStarted(false);
            setModesTimer(state.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title == 'POMODORO') {
            playSound();
            setIsStarted(false);
            setModesTimer(state.short_break);
            setCurrentIntervalApp((currentValue) => currentValue + 1);

            setListTask(currentList => currentList.map(value => {
                if(value.id === taskSelected){
                    return {...value, quantityInital: value.quantityInital + 1};
                }
    
                return value;
            }))

            return;
        }

        if (isStarted) {
            setTimeout(() => {
                const newTime = modesTimer.timer - 1;
                const newObject: ModesTimerProps = {
                    timer: newTime,
                    title: modesTimer.title
                }
                setModesTimer(newObject);
            }, 1000);
        }
    }, [modesTimer, isStarted]);

    useEffect(() => {
        if (currentInterval === intervalApp) {
            setModesTimer(state.long_break);
        }
    }, [currentInterval]);

    useEffect(() => {
        if(datasTaskModal){
            setNameTask(datasTaskModal.name);
            setQuantityPomodoros(datasTaskModal.quantityPomodoros);
        }

        if(!modalAddTask){
            setDatasTaskModal(undefined);
            setNameTask('');
            setQuantityPomodoros(1);
        }

    }, [datasTaskModal, modalAddTask]);

    useEffect(() => {
        const getConfigApp = async () => {
            setLoading(true);
            try{
                const responseDatasApp = await AsyncStorage.getItem("@appPomodoro:configApp");

                if(responseDatasApp){
                    const responseDatasFormatted:ConfigAppDefaultProps = JSON.parse(responseDatasApp);

                    dispatch({
                        type: TypesActionsProps.setTimerPomodoro,
                        payload: state.pomodoro.timer = responseDatasFormatted.pomodoro.timer,
                    })
            
                    dispatch({
                        type: TypesActionsProps.setTimerLongBreak,
                        payload: state.long_break.timer = responseDatasFormatted.long_break.timer
                    })
            
                    dispatch({
                        type: TypesActionsProps.setTimerShortBreak,
                        payload: state.short_break.timer = responseDatasFormatted.short_break.timer
                    })
            
                    dispatch({
                        type: TypesActionsProps.setColorButton,
                        payload: state.color_button = responseDatasFormatted.color_button,
                    })

                    setTimerLongBreak(responseDatasFormatted.long_break.timer / 60);
                    setTimerShortBreak(responseDatasFormatted.short_break.timer / 60);
                    setTimerPomodoro(responseDatasFormatted.pomodoro.timer / 60);
                }
                
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }

        getConfigApp();
    }, []);

    useEffect(() => {
        if(Object.keys(listTask).length > 0){
            saveTasksStorage(listTask);
        }
    }, [listTask]);

    useEffect(() => {
        const getTasksStorage = async () => {
            setLoading(true);
            try{
                const responseListTasks = await AsyncStorage.getItem('@appPomodoro:listTasks');
                if(responseListTasks){
                    setListTask(JSON.parse(responseListTasks));
                }
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }

        getTasksStorage();
    }, []);

    const minutes = Math.floor(modesTimer.timer / 60);
    const seconds = modesTimer.timer % 60;

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                {loading && <Preload visible={true} /> }
                {!loading && (
                    <>
                        <View style={styles.contentButtons}>
                            <TouchableOpacity
                                style={
                                    [styles.button,
                                    {
                                        backgroundColor: state.color_button,
                                        borderWidth: modesTimer.title === 'POMODORO' ? 2 : 0,
                                    }
                                    ]
                                }
                                onPress={() => handleSetModeTime(state.pomodoro)}
                            >
                                <Text
                                    style={styles.textButton}
                                >
                                    Pomodoro
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [styles.button,
                                    {
                                        backgroundColor: state.color_button,
                                        borderWidth: modesTimer.title === 'SHORT BREAK' ? 2 : 0,
                                    }
                                    ]
                                }
                                onPress={() => handleSetModeTime(state.short_break)}
                            >
                                <Text
                                    style={styles.textButton}
                                >
                                    Short Break
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [styles.button,
                                    {
                                        backgroundColor: state.color_button,
                                        borderWidth: modesTimer.title === 'LONG BREAK' ? 2 : 0,
                                    }
                                    ]
                                }
                                onPress={() => handleSetModeTime(state.long_break)}
                            >
                                <Text
                                    style={styles.textButton}
                                >
                                    Long Break
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contentTimer}>
                            <Text style={styles.timer}>
                                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </Text>
                            <TouchableOpacity
                                style={[styles.buttonAction, { backgroundColor: state.color_button }]}
                                onPress={handleStartTimer}
                            >
                                <Text
                                    style={styles.textButtonAction}
                                >
                                    {isStarted ? 'STOP' : 'START'}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.contentInterval}>
                                <TouchableOpacity onPress={() => setModalAddTask(true)}>
                                    <Ionicons name="add-outline" size={24} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                            {listTask.length > 0 && (
                                <SafeAreaView style={styles.contentTasks}>
                                    <FlatList
                                        data={listTask}
                                        renderItem={({ item }) => <CardTask setDatasTaskModal={setDatasTaskModal} setModalAddTask={setModalAddTask} taskId={taskSelected} setTaskId={setTaskSelected} key={item.id as any}  data={item}/>}
                                        keyExtractor={item => item.id as any}
                                    />
                                </SafeAreaView>
                            )}
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => setModalOpen(true)}>
                                <EvilIcons name="gear" color={"#ffffff"} size={50} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalRulesApp(true)}>
                                <Text style={styles.textRules}>RULES</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <Modal titleModal={datasTaskModal ? "EDIT TASK" : "ADD TASK"} setOpenModal={setModalAddTask} visible={modalAddTask}>
                            <View style={styles.contentModalAddTask}>
                                <TextInput 
                                    onChangeText={setNameTask}
                                    value={nameTask}
                                    style={styles.textInputAddTask}
                                    placeholder="What are you working on?"
                                />

                                <Text style={styles.textQuantityPomodoro}>Quantity Pomodoros</Text>
                                <View style={styles.contentQuantityPomodoro}>
                                    <TouchableOpacity
                                        onPress={() => setQuantityPomodoros(Number(quantityPomodoros) - 1)}
                                    >
                                        <Ionicons name="remove" size={30} color="black" />
                                    </TouchableOpacity>
                                    <InputNumber 
                                        setValue={setQuantityPomodoros} 
                                        value={String(quantityPomodoros)}
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setQuantityPomodoros(Number(quantityPomodoros) + 1)}
                                    >
                                        <Ionicons name="add" size={30} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.contentButtonModalTask}>
                                    {datasTaskModal && (
                                        <TouchableOpacity
                                            style={styles.buttonDeleteTask}
                                            onPress={() => handleDeleteTask(datasTaskModal?.id as any)}
                                        >
                                            <Text style={styles.textButtonModalTask}>DELETE</Text>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity 
                                        onPress={() => datasTaskModal ? handleEditTask() : handleCreateTask()}
                                        style={[styles.buttonModalTask, { backgroundColor: state.color_button }]}
                                    >
                                        <Text style={styles.textButtonModalTask}>
                                            {datasTaskModal ? 'EDIT' : 'SAVE'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <Modal setOpenModal={setModalOpen} visible={modalOpen}>
                            <Text style={styles.modalTitle}>CONFIGURATIONS</Text>

                            <View style={styles.contentModal}>
                                <Text style={styles.modalSubTitle}>TIME (MINUTES)</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.modalTimers}>
                                        <Text style={styles.timerTitle}>Pomodoro</Text>
                                        <InputNumber value={String(timerPomodoro)} setValue={setTimerPomodoro} />
                                    </View>
                                    <View style={styles.modalTimers}>
                                        <Text style={styles.timerTitle}>Short Break</Text>
                                        <InputNumber value={String(timerShortBreak)} setValue={setTimerShortBreak} />
                                    </View>
                                    <View style={styles.modalTimers}>
                                        <Text style={styles.timerTitle}>Long Break</Text>
                                        <InputNumber value={String(timerLongBreak)} setValue={setTimerLongBreak} />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.contentModal}>
                                <Text style={styles.modalSubTitle}>COLORS</Text>
                                <View style={styles.contentColors}>
                                    <ColorPicker
                                        color={state.color_button}
                                        colorPicker="#F47272"
                                        setColor={setColorConfigApp}
                                    />
                                    <ColorPicker
                                        color={state.color_button}
                                        colorPicker="#DA82F9"
                                        setColor={setColorConfigApp}
                                    />
                                    <ColorPicker
                                        color={state.color_button}
                                        colorPicker="#73F2F7"
                                        setColor={setColorConfigApp}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={handleSaveConfig}
                                    style={[styles.buttonSaveModal,
                                    { backgroundColor: state.color_button }]}
                                >
                                    <Text style={styles.textButtonSaveModal}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        <Modal
                            titleModal="APP RULES"
                            setOpenModal={setModalRulesApp}
                            visible={modalRulesApp}
                        >
                            <Image
                                source={require('../../assets/rules-pomodoro.webp')}
                                style={styles.imageRules}
                            />
                        </Modal>
                    </>
                )}
            </View>
        </AlertNotificationRoot>
    )
}