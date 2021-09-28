import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView } from 'react-native';
import { Formik } from 'formik'
import Firebase from '../config/firebaseConfig'
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reviewSchema = yup.object({
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  password: yup.string().required('Password is Required'),
})

export default function Login({navigation}) {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
      navigation.navigate('Home')
      console.log('gs')
    } catch (e) {
      // saving error
    }
  }

  const LoginUser = async (values) => {
    Firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid)
      storeData(user.uid)
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var error = errorMessage.includes("assword")
        console.log(errorMessage)
      if(error){
        setPasswordError('The Password is Invalid')        
        setEmailError(null)
        console.log(error)
      } else{
        setEmailError(`${values.email} is not registered emailssssss`)        
        setPasswordError(null)        
        console.log(error)
      }
      // ..
    });
  }


  // console.log(Firebase)
  return (
    <View style={styles.container}>
    <ScrollView>
      {/* -------- Logo Container --------- */}
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
          Welcome,
        </Text>
        <Text
          style={{color: '#000000', fontSize: 16, marginLeft: 25}}>
          Signin to Continue
        </Text>
      </View>

      {/* -------- Form Container --------- */}
      <Formik
        validationSchema = {reviewSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit = {(values, actions) => {
        actions.resetForm()
        LoginUser(values)
        // console.log(values)
        }}
      >
      {(props)=>(
        <View style={styles.FormContainer}>
          <TextInput 
            onChangeText = {props.handleChange('email')}
            value = {props.values.email}          
            style={styles.input}
            placeholder = 'Enter your Email'
          />
          {emailError ? 
            <Text style={styles.errorText}>{emailError}</Text>
            :
            null
          }
          <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

          <TextInput 
            onChangeText = {props.handleChange('password')}
            value = {props.values.password}
            style={styles.input}
            placeholder = 'Password'
          />
          {passwordError ? 
            <Text style={styles.errorText}>{passwordError}</Text>
            :
            null
          }
          <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

          <Button 
            title="Login"
            color="#d60505"
            // onPress={()=>{navigation.navigate('Home')}}
            onPress={props.handleSubmit}
          />
          <View
            style={{marginTop: 85}}>
            <Button 
              title="Create New Account"
              color="#000000"
              onPress={()=>{navigation.navigate('Signup')}}
            />
          </View>
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
  },
  LogoContainer:{
    flex: 2,
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  TextContainer:{
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 30,
  },
  FormContainer:{
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  LogoImage: {
    height: 150,
    width: 150,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#d60505',
    width: '100%',
    padding: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'crimson',
  },
});