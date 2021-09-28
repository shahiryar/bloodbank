import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid'
import Firebase from '../config/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadPicture({navigation}) {
  console.log(navigation)
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {params} = useRoute()
  // console.log('Mil gaya2',params)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = Firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  const uploadPic = async () => {
    setLoading(true)
    let imgURI = image
    // console.log(imgURI)
    let filename = imgURI.split('/').pop();
    // console.log(filename) 
    const uploadUrl = await uploadImageAsync(imgURI);
    // console.log(uploadUrl)
    var obj2 = params
    var user = {...obj2, ...{'imgURI' : uploadUrl}}
    // console.log(user)
    Firebase.database().ref('users').child(user.uid).set(user);
    setLoading(false);
    Alert.alert('Congratulations','Account Created Successfully', [
      {text: 'Finish', onPress: () => storeData(user.uid)}
    ])
}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
  });

  if (!result.cancelled) {
    setImage(result.uri);
  }
};

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('user', value)
    navigation.navigate('Home')
  } catch (e) {
    // saving error
  }
}

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size={100} animating={true} color="#d60505" style={styles.loading} /> : null }

      {/* -------- Logo Container -------------- */}
      <View style={styles.LogoContainer}>
        <Image
          source={require('../images/Logo.png')}
          style={styles.LogoImage}
        />
      </View>

      {/* -------- Text Container --------- */}
      <View style={{marginBottom: 20}}>
        <Text
          style={{color: '#d60505', fontSize: 26, fontWeight: 'bold', marginLeft: 25}}>
          Almost Done,
        </Text>
        <Text
          style={{color: '#000000', fontSize: 16, marginLeft: 25}}>
          Upload Your Picture to Finish
        </Text>
      </View>

      {/* -------- Image --------- */}
      <View style={{alignItems: 'center', position: 'relative'}}>
        {image ? <Image source={{ uri: image }} style={styles.Image} /> :
            <Image source={{ uri: 'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png' }} style={styles.Image} />
        }

      {/* ------------ Icons ------------ */}
        <TouchableOpacity
            activeOpacity={.6}
            onPress={pickImage}
            style={{position: 'absolute', bottom: 25}}
        >
            <MaterialIcons name="camera-enhance" size={40} color= '#d60505' />
        </TouchableOpacity>
      </View>

        {/* Finish Button */}
      <View style={{paddingHorizontal: 20, marginTop: 60}}>  
        <Button 
                title="Finish"
                color="#d60505"
                onPress={uploadPic}
                disabled = {false}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LogoContainer:{
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  LogoImage: {
    height: 100,
    width: 100,
  },
  Image: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    borderRadius: 400,
    marginVertical: 40,
 },
 loading: {
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'white',
  opacity: 0.8,
  height: '100%',
  width: '100%'
}
});
