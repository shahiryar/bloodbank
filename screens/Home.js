import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'; 
import Firebase from '../config/firebaseConfig'
import Header from '../components/Header'
import Profile from '../components/Profile'
import FindDonor from '../components/FindDonor'

export default function Home({navigation}) {
  const [user, setUser] = useState([])

  useEffect(() => {
    // Fetching Doctor Data
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('user')
        if(value !== null) {
          console.log('data',value)
          const userData =  Firebase.database().ref('users').child(value);
          userData.on('value',data => {
          setUser(data.val())
          // console.log('Data Recieved Hogaya', user)
          }) 
        }
      } catch(e) {
        // error reading value
      }
    }

    getData()

  }, []);

  const Logout = () => {
    navigation.navigate('Login')
    // console.log('sds')
  }

  const viewDonors = () => {
    navigation.navigate('ViewDonors',user.uid)
    // console.log('sds')
  }

    // console.log(navigation)
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header image = {user.imgURI} Logout = {Logout} />
      <Profile userId = {user.uid} donor = {user.donor} username = {user.name} bloodGroup = {user.bloodGroup} medicalCondition = {user.medicalCondition} city = {user.city} />
      <FindDonor viewDonors = {viewDonors} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
});
