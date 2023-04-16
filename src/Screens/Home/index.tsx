import { View, Text, TouchableOpacity, Image } from "react-native";
import { Audio } from 'expo-av';
import { EvilIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import { Toast, ALERT_TYPE, AlertNotificationRoot } from "react-native-alert-notification";

import Modal from "../../components/Modal";
import ColorPicker from "../../components/ColorPicker";
import InputNumber from "../../components/InputNumber";

import { useConfigApp } from "../../contexts/ConfigAppContext";
import { TypesActionsProps, ConfigAppDefaultProps } from "../../contexts/ConfigAppContext";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ModesTimerProps {
    timer: number;
    title: string;
}

let intervalApp = 4;

export default function Home() {

    const { dispatch, state } = useConfigApp();

    const [colorConfigApp, setColorConfigApp] = useState<string>('#F47272');
    const [modesTimer, setModesTimer] = useState<ModesTimerProps>(state.pomodoro);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalRulesApp, setModalRulesApp] = useState<boolean>(false);

    const [timerShortBreak, setTimerShortBreak] = useState<number>(state.short_break.timer / 60);
    const [timerLongBreak, setTimerLongBreak] = useState<number>(state.long_break.timer / 60);
    const [timerPomodoro, setTimerPomodoro] = useState<number>(state.pomodoro.timer / 60);

    const [currentInterval, setCurrentIntervalApp] = useState<number>(0);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/alert_sound.wav'));
        return await sound.playAsync();
    }

    const handleStartTimer = () => {
        if (!isStarted) {
            setIsStarted(true);
        } else {
            setIsStarted(false);
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
        }catch(error){
            console.log(error);
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error saving settings',
                textBody: '',
            })
        }
    }

    const handleSetModeTime = (timerSelected: ModesTimerProps) => {
        if (isStarted) {
            alert('Não é possível alterar o cronometro com tempo em andamento');
        } else {
            setModesTimer(timerSelected);
        }
    }

    useEffect(() => {
        if (modesTimer.timer === 0 && modesTimer.title === 'LONG BREAK') {
            playSound();
            setCurrentIntervalApp(0);
            setIsStarted(false);
            setModesTimer(state.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title === 'SHORT BREAK') {
            playSound();
            setIsStarted(false);
            setModesTimer(state.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title == 'POMODORO') {
            playSound();
            setIsStarted(false);
            setModesTimer(state.short_break);
            setCurrentIntervalApp((currentValue) => currentValue + 1);
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
        const getConfigApp = async () => {
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
        }

        getConfigApp();
    }, []);

    const minutes = Math.floor(modesTimer.timer / 60);
    const seconds = modesTimer.timer % 60;

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
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
                        <Text style={styles.numberInterval}>{currentInterval} / {intervalApp}</Text>
                        <Text style={styles.textInterval}>Interval</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => setModalOpen(true)}>
                        <EvilIcons name="gear" color={"#ffffff"} size={50} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalRulesApp(true)}>
                        <Text style={styles.textRules}>RULES</Text>
                    </TouchableOpacity>
                </View>

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
                    setOpenModal={setModalRulesApp}
                    visible={modalRulesApp}
                >
                    <Image
                        source={require('../../assets/rules-pomodoro.webp')}
                        style={styles.imageRules}
                    />
                </Modal>
            </View>
        </AlertNotificationRoot>
    )
}