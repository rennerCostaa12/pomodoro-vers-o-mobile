import { View, TextInput } from "react-native"

import { styles } from "./styles"

interface InputNumberProps {
    value: string;
    setValue: (data: any) => void;
}

export default function InputNumber({ setValue, value }: InputNumberProps) {

    const handleTextChange = (text: string) => {

        const numericValue = text.replace(/[^0-9]/g, '');
        setValue(String(numericValue));
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={value}
                onChangeText={handleTextChange}
            />
        </View>
    )
}