import { View, Text, TouchableOpacity, Image } from "react-native";
import { Audio } from 'expo-av';
import { EvilIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import Modal from "../../components/Modal";
import ColorPicker from "../../components/ColorPicker";
import InputNumber from "../../components/InputNumber";

import { useConfigApp } from "../../contexts/ConfigAppContext";

import { styles } from "./styles";

interface ModesTimerProps {
    timer: number;
    title: string;
}

const modesApp = {
    pomodoro: {
        timer: 25 * 60,
        title: 'POMODORO'
    },
    short_break: {
        timer: 5 * 60,
        title: 'SHORT BREAK'
    },
    long_break: {
        timer: 15 * 60,
        title: 'LONG BREAK'
    },
}

let intervalApp = 4;

export default function Home() {

    const [modesTimer, setModesTimer] = useState<ModesTimerProps>(modesApp.pomodoro);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalRulesApp, setModalRulesApp] = useState<boolean>(false);

    const [timerShortBreak, setTimerShortBreak] = useState<number>(modesApp.short_break.timer);
    const [timerLongBreak, setTimerLongBreak] = useState<number>(modesApp.long_break.timer);
    const [timerPomodoro, setTimerPomodoro] = useState<number>(modesApp.pomodoro.timer);

    const [currentInterval, setCurrentIntervalApp] = useState<number>(0);

    const { colorConfigApp, getColorApp, setColorConfigApp } = useConfigApp();

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

    const handleSetModeTime = (timerSelected: ModesTimerProps) => {
        if(isStarted){
            alert('Não é possível alterar o cronometro com tempo em andamento');
        }else{
            setModesTimer(timerSelected);
        }
    }

    useEffect(() => {
        if (modesTimer.timer === 0 && modesTimer.title === 'LONG BREAK') {
            playSound();
            setCurrentIntervalApp(0);
            setIsStarted(false);
            setModesTimer(modesApp.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title === 'SHORT BREAK') {
            playSound();
            setIsStarted(false);
            setModesTimer(modesApp.pomodoro);
            return;
        }

        if (modesTimer.timer === 0 && modesTimer.title == 'POMODORO') {
            playSound();
            setIsStarted(false);
            setModesTimer(modesApp.short_break);
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
            setModesTimer(modesApp.long_break);
        }
    }, [currentInterval])

    useEffect(() => {
        getColorApp();
    }, []);

    const minutes = Math.floor(modesTimer.timer / 60);
    const seconds = modesTimer.timer % 60;

    return (
        <View style={styles.container}>
            <View style={styles.contentButtons}>
                <TouchableOpacity
                    style={
                        [styles.button,
                        {
                            backgroundColor: colorConfigApp,
                            borderWidth: modesTimer.title === 'POMODORO' ? 2 : 0,
                        }
                        ]
                    }
                    onPress={() => handleSetModeTime(modesApp.pomodoro)}
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
                            backgroundColor: colorConfigApp,
                            borderWidth: modesTimer.title === 'SHORT BREAK' ? 2 : 0,
                        }
                        ]
                    }
                    onPress={() => handleSetModeTime(modesApp.short_break)}
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
                            backgroundColor: colorConfigApp,
                            borderWidth: modesTimer.title === 'LONG BREAK' ? 2 : 0,
                        }
                        ]
                    }
                    onPress={() => handleSetModeTime(modesApp.long_break)}
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
                    style={[styles.buttonAction, { backgroundColor: colorConfigApp }]}
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
                            color={colorConfigApp}
                            colorPicker="#F47272"
                            setColor={setColorConfigApp}
                        />
                        <ColorPicker
                            color={colorConfigApp}
                            colorPicker="#DA82F9"
                            setColor={setColorConfigApp}
                        />
                        <ColorPicker
                            color={colorConfigApp}
                            colorPicker="#73F2F7"
                            setColor={setColorConfigApp}
                        />
                    </View>
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
    )
}