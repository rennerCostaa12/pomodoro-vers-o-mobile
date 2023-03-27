import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

interface ColorPickerProps{
    colorPicker: string;
    setColor: (data: string) => void;
    color: string;
}

export default function ColorPicker({colorPicker, setColor, color }: ColorPickerProps){
    return(
        <TouchableOpacity
            style={[styles.container, { backgroundColor: colorPicker, borderWidth: color === colorPicker ? 2 : 0 }]}
            onPress={() => setColor(colorPicker)}
        >
        </TouchableOpacity>
    )
}