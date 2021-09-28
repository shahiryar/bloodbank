import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import UploadPicture from '../screens/UploadPicture'
import ViewDonors from '../screens/ViewDonors'

const Stack = createStackNavigator();
export default function HomeStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
                <Stack.Screen name="Signup" component={Signup} options={{
                    headerShown: false }}/>
                <Stack.Screen name="ViewDonors" component={ViewDonors} options={{
                    headerShown: true, title: 'View Donors',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#df1f26',
                    },}}/>
                <Stack.Screen name="UploadPicture" component={UploadPicture} options={{headerShown: false,}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}