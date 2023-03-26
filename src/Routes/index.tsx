import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Screens/Home";

export default function Routes(){

    const { Navigator, Screen } = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Home" component={Home} />
            </Navigator>
        </NavigationContainer>
    )
}