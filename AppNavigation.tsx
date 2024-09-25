import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Main } from './pages/Main/Main';
import { Article } from './pages/Article/Atticle';

export const AppNavigation = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen name="Article" component={Article}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
