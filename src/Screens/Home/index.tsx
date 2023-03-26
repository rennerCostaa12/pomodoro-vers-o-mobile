import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import { EvilIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import Modal from "../../components/Modal";

import { styles } from "./styles";

interface ModesTimerProps {
    timer: number;
    backgroundColor: string;
    colorButton: string;
    colorText: string;
}

const modesApp = {
    pomodoro: {
        timer: 1 * 60,
        backgroundColor: '#1E2240',
        colorButton: '#F47272',
        colorText: '#FFFFFF'
    },
    short_break: {
        timer: 5 * 60,
        backgroundColor: '#4154e0',
        colorButton: '#dd3f3f',
        colorText: '#FFFFFF'
    },
    long_break: {
        timer: 15 * 60,
        backgroundColor: '#0c144d',
        colorButton: '#b42727',
        colorText: '#FFFFFF'
    },
}

export default function Home() {

    const [modesTimer, setModesTimer] = useState<ModesTimerProps>(modesApp.pomodoro);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

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

    useEffect(() => {
        if (modesTimer.timer === 0) {
            playSound();
            setIsStarted(false);
            return;
        }

        if (isStarted) {
            setTimeout(() => {
                const newTime = modesTimer.timer - 1;
                const newObject: ModesTimerProps = {
                    backgroundColor: modesTimer.backgroundColor,
                    colorButton: modesTimer.colorButton,
                    colorText: modesTimer.colorText,
                    timer: newTime
                }
                setModesTimer(newObject);
            }, 1000);
        }
    }, [modesTimer, isStarted]);

    const minutes = Math.floor(modesTimer.timer / 60);
    const seconds = modesTimer.timer % 60;

    return (
        <View style={[styles.container, { backgroundColor: modesTimer.backgroundColor }]}>
            <View style={styles.contentButtons}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: modesTimer.colorButton }]}
                    onPress={() => setModesTimer(modesApp.pomodoro)}
                >
                    <Text
                        style={[styles.textButton, { color: modesTimer.colorText }]}
                    >
                        Pomodoro
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: modesTimer.colorButton }]}
                    onPress={() => setModesTimer(modesApp.short_break)}
                >
                    <Text
                        style={[styles.textButton, { color: modesTimer.colorText }]}
                    >
                        Short Break
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: modesTimer.colorButton }]}
                    onPress={() => setModesTimer(modesApp.long_break)}
                >
                    <Text
                        style={[styles.textButton, { color: modesTimer.colorText }]}
                    >
                        Long Break
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentTimer}>
                <Text style={[styles.timer, { color: modesTimer.colorText }]}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </Text>
                <TouchableOpacity
                    style={[styles.buttonAction, { backgroundColor: modesTimer.colorButton }]}
                    onPress={handleStartTimer}
                >
                    <Text
                        style={[styles.textButtonAction, { color: modesTimer.colorText }]}
                    >
                        {isStarted ? 'STOP' : 'START'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <EvilIcons name="gear" color={"#ffffff"} size={50} />
                </TouchableOpacity>
            </View>

            <Modal setOpenModal={setModalOpen} visible={modalOpen}>
                <Text>MODAL</Text>
            </Modal>
        </View>
    )
}