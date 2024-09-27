import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "./pages/Main/Main";
import { Article } from "./pages/Article/Article";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "./types/RootStackParamList";
import { AllNews } from "./pages/AllNews/AllNews";
import { BlurView } from "expo-blur";

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
            headerTintColor: "#000",
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
              <BlurView
                intensity={5}
                style={navigationStyles.backButtonBlur}
              >
                <TouchableOpacity
                  style={navigationStyles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
              </BlurView>
            ),
          })}
        />
        <Stack.Screen
          name="AllNews"
          component={AllNews}
          options={({ navigation }) => ({
            headerTitle: "",
            headerTintColor: "#000",
            headerTransparent: true,
            headerLeft: () => (
              <BlurView
                style={navigationStyles.backButtonBlur}
                intensity={5}
              >
                <TouchableOpacity
                  style={navigationStyles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
              </BlurView>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const navigationStyles = StyleSheet.create({
  backButtonBlur: {
    height: 32,
    width: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    overflow: "hidden",
    backgroundColor: "rgba(164, 163, 171, 0.5)",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
