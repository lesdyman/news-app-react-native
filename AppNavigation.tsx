import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Main } from './pages/Main/Main';
import { Article } from './pages/Article/Atticle';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from 'react-native';
import { RootStackParamList } from "./types/RootStackParamList";

export const AppNavigation = () => {

  const Stack = createStackNavigator<RootStackParamList>();



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name="Article"
        component={Article}
        options={({ navigation }) => ({
          headerTintColor: '#000',
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
            style={navigationStyles.backButton}
            onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          )
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const navigationStyles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    backgroundColor: '#a4a3ab',
    borderRadius: 10,
    marginLeft: 15,
    opacity: 0.7,
  }
})