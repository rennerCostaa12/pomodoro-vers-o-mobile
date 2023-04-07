import React, { createContext, useContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConfigAppContextProviderProps {
    children: React.ReactNode;
}

interface ConfigAppContextProps{
    getColorApp: () => void;
    colorConfigApp: string;
    setColorConfigApp: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfigAppContext = createContext({} as ConfigAppContextProps);

export const ConfigAppContextProvider = ({ children }: ConfigAppContextProviderProps) => {
    
    const [colorConfigApp, setColorConfigApp] = useState<string>('#F47272');

    const setColorApp = async (color: string) => {
        await AsyncStorage.setItem("@appPomodoro:colorApp", color);
    }

    const getColorApp = async () => {
        const color = await AsyncStorage.getItem("@appPomodoro:colorApp");
        if(color){
            setColorConfigApp(color);
        }
    }

    useEffect(() => {
        setColorApp(colorConfigApp);
    }, [colorConfigApp]);

    return (
        <ConfigAppContext.Provider value={{ getColorApp, colorConfigApp, setColorConfigApp }}>
            {children}
        </ConfigAppContext.Provider>
    )
}

export const useConfigApp = () => {
    const context = useContext(ConfigAppContext);

    if(context === undefined){
        throw new Error("useConfigApp precisa ser usado dentro do FormProvider");
    }

    return context;
}