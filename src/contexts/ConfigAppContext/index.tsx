import React, { createContext, useContext, useReducer } from 'react';

interface ConfigAppContextProviderProps {
    children: React.ReactNode;
}

interface ConfigAppContextProps{
    state: ConfigAppDefaultProps;
    dispatch: (action: ActionProps) => void;
}

interface ActionProps{
    type: TypesActionsProps;
    payload: any;
}

export interface ConfigAppDefaultProps{
    pomodoro: {
        timer: number;
        title: 'POMODORO';
    };
    short_break: {
        timer: number;
        title: 'SHORT BREAK';
    };
    long_break: {
        timer: number;
        title: 'LONG BREAK';
    };
    color_button: string;
}

export enum TypesActionsProps{
    setColorButton,
    setTimerPomodoro,
    setTimerShortBreak,
    setTimerLongBreak
}

const configAppDefault: ConfigAppDefaultProps = {
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
    color_button: "#F47272"
}

const reducer = (state: ConfigAppDefaultProps, action: ActionProps) => {
    switch(action.type){
        case TypesActionsProps.setColorButton:
            return {...state, color_button: action.payload};
        case TypesActionsProps.setTimerLongBreak:
            return {...state, long_break: { ...state.long_break, timer: action.payload }}
        case TypesActionsProps.setTimerPomodoro:
            return {...state, pomodoro: { ...state.pomodoro, timer: action.payload }}
        case TypesActionsProps.setTimerShortBreak:
            return {...state, short_break: { ...state.short_break, timer: action.payload }}
        default: 
            return state;
    }
}

export const ConfigAppContext = createContext({} as ConfigAppContextProps);

export const ConfigAppContextProvider = ({ children }: ConfigAppContextProviderProps) => {
    
    const [state, dispatch] = useReducer(reducer, configAppDefault);
    return (
        <ConfigAppContext.Provider value={{ state, dispatch }}>
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