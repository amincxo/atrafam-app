// App.js
import 'react-native-gesture-handler';
import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import SearchScreen from './src/screens/userScreens/SearchScreen';
import MapScreen from './src/screens/userScreens/MapScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpSelctor from './src/screens/auth/SignUpSelctor';
import SellerSignUp from './src/screens/auth/SellerSignUp';
import UserSignUp from './src/screens/auth/UserSignUp';
import SellerPage from './src/screens/sellerScreens/SellerPage';
import { UserProvider } from './src/context/UsersContext';


const Stack = createStackNavigator();


export default function App() {
  return (
    <AuthProvider>
        <UserProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown:false}} >
                        <Stack.Screen name='Splash' component={SplashScreen} />
                        <Stack.Screen name='SignUpSelctor' component={SignUpSelctor} />
                        <Stack.Screen name='SellerSignUp' component={SellerSignUp} />
                        <Stack.Screen name='UserSignUp' component={UserSignUp} />
                        <Stack.Screen name='SellerPage' component={SellerPage} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Search" component={SearchScreen} />
                        <Stack.Screen name="Map" component={MapScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </UserProvider>
    </AuthProvider>
  );
}