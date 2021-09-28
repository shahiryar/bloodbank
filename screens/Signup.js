import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik'
import * as yup from 'yup';
import Firebase from '../config/firebaseConfig'
import Constants from 'expo-constants'; 

const reviewSchema = yup.object({
  name: yup.string().required('Name is Required').min(4),
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  bloodGroup: yup.string().required('Please choose your Blood Group'),
  age: yup.string().required('Age is Required'),
  medicalCondition: yup.string().required('Medical Condition is Required'),
  password: yup.string().required('Password is Required').min(8),
  address: yup.string().required('Address is Required'),
  city: yup.string().required('City is Required'),
})

export default function Signup({navigation}) {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  // const [uid, setUID] = useState(null)

  const createUser = async (values) => {
    Firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // console.log('usama ---> ',user.uid)
      var obj = {uid: user.uid, ...values}
      // console.log('data',obj)
      navigation.navigate('UploadPicture',obj)      
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      var error = errorMessage.includes("assword")
      if(error){
        setPasswordError(errorMessage)        
        setEmailError(null)
        console.log(error)
      } else{
        setPasswordError(null)        
        setEmailError(errorMessage)
        console.log(error)
      }
      // ..
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>

      {/* ------------ Icons ------------ */}
      <TouchableOpacity
        style={{marginTop: 35, marginLeft: 20}}
        onPress={()=> navigation.navigate('Login')}
      >
        <MaterialIcons name="arrow-back" size={30} color= '#d60505' />
      </TouchableOpacity>

      {/* -------- Logo Container -------------- */}
      <View style={styles.LogoContainer}>
        <Image
          source={require('../images/Logo.png')}
          style={styles.LogoImage}
        />
      </View>

      {/* -------- Text Container --------- */}
      <View style={styles.TextContainer}>
        <Text
          style={{color: '#d60505', fontSize: 26, fontWeight: 'bold', marginLeft: 25}}>
          Sign Up,
        </Text>
        <Text
          style={{color: '#000000', fontSize: 16, marginLeft: 25}}>
          Create new Account
        </Text>
      </View>

        {/* -------- Form Container --------- */}
      <Formik
        validationSchema = {reviewSchema}
        initialValues={{
          name: '',
          email: '',
          bloodGroup: '',
          age: '',
          medicalCondition: '',
          password: '',
          address: '',
          city: '',
          donor: true,
        }}
        onSubmit = {(values, actions) => {
        // console.log(values)
        createUser(values)
        // console.log('My Id -->', uid)
        // navigation.navigate('UploadPicture')  
        }}
      >
      {(props)=>(
        <View style={styles.FormContainer}>

          <TextInput 
            style={styles.input}
            placeholder = 'Enter your Name'
            onChangeText = {props.handleChange('name')}
            value = {props.values.name}
            onBlur = {props.handleBlur('name')}
          />
          <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>

          <TextInput 
            style={styles.input}
            placeholder = 'Enter your Email'
            onChangeText = {props.handleChange('email')}
            value = {props.values.email}
            onBlur = {props.handleBlur('email')}
          />
          {emailError ? 
            <Text style={styles.errorText}>{emailError}</Text>
            :
            null
          }
          <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

          <View style = {styles.pickerView}>
            <Picker 
              dropdownIconColor= '#d60505'
              selectedValue={props.values.bloodGroup}
              onValueChange={props.handleChange('bloodGroup')}
            >
              <Picker.Item label="Choose Your Blood Group" value="" />
              <Picker.Item  label="O+" value="O+" />
              <Picker.Item  label="O-" value="O-" />
              <Picker.Item  label="A+" value="A+" />
              <Picker.Item  label="A-" value="A-" />
              <Picker.Item  label="B+" value="B+" />
              <Picker.Item  label="B-" value="B-" />
              <Picker.Item  label="AB+" value="AB+" />
              <Picker.Item  label="AB-" value="AB-" />
            </Picker>
          </View>
          <Text style={styles.errorText}>{props.touched.bloodGroup && props.errors.bloodGroup}</Text>
      
          <TextInput 
            style={styles.input}
            placeholder = 'Enter your Age'
            onChangeText = {props.handleChange('age')}
            value = {props.values.age}
            onBlur = {props.handleBlur('age')}
            keyboardType = 'numeric'
          />
          <Text style={styles.errorText}>{props.touched.age && props.errors.age}</Text>

          <TextInput 
            style={styles.input}
            placeholder = 'Enter your Medical Condition'
            onChangeText = {props.handleChange('medicalCondition')}
            value = {props.values.medicalCondition}
            onBlur = {props.handleBlur('medicalCondition')}
          />
          <Text style={styles.errorText}>{props.touched.medicalCondition && props.errors.medicalCondition}</Text>  

          <TextInput 
            style={styles.input}
            placeholder = 'Password'
            onChangeText = {props.handleChange('password')}
            value = {props.values.password}
            onBlur = {props.handleBlur('password')}
          />
          {passwordError ? 
            <Text style={styles.errorText}>{passwordError}</Text>
            :
            null
          }
          <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

          <TextInput 
            style={styles.input}
            placeholder = 'Enter Your Address'
            onChangeText = {props.handleChange('address')}
            value = {props.values.address}
            onBlur = {props.handleBlur('address')}
          />
          <Text style={styles.errorText}>{props.touched.address && props.errors.address}</Text>

          <View style = {styles.pickerView}>
            <Picker 
              dropdownIconColor= '#d60505'
              selectedValue={props.values.city}
              onValueChange={props.handleChange('city')}
            >
              <Picker.Item label="Choose Your City" value="" />
              <Picker.Item  label="Lahore" value="Lahore" />
              <Picker.Item  label="Karachi" value="Karachi" />
              <Picker.Item  label="Hyderabad" value="Hyderabad" />
              <Picker.Item  label="Islamabad" value="Islamabad" />
              <Picker.Item  label="Peshawar" value="Peshawar" />
              <Picker.Item  label="Quetta" value="Quetta" />
            </Picker>
          </View>
          <Text style={styles.errorText}>{props.touched.city && props.errors.city}</Text>

          <Button 
            title="Next ->"
            color="#d60505"
            onPress={props.handleSubmit}
            // onPress={()=>{navigation.navigate('UploadPicture')}}
          />
        
      </View>
    )}
    </Formik>

    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
  LogoContainer:{
    alignItems: 'center',
  },
  FormContainer:{
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  LogoImage: {
    height: 100,
    width: 100,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#d60505',
    width: '100%',
    padding: 8,
    fontSize: 16,
  },
    pickerView: {
    fontSize: 16,
    width: "100%",
    color: '#d60505',
    borderBottomWidth: 2,
    borderColor: '#d60505',
},
errorText: {
  color: 'crimson',
},
});
