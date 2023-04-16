import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Screens/Home";
import Splash from "../components/Splash";

export default function Routes(){

    const { Navigator, Screen } = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Screen name="Splash" component={Splash} />
                <Screen name="Home" component={Home} />
            </Navigator>
        </NavigationContainer>
    )
}