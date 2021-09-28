import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Firebase from '../config/firebaseConfig'

export default function ViewDonors({navigation,route}) {
    const currentUser = route.params
    console.log('CUren',currentUser) 
  const [donors, setDonors] = useState([])

  useEffect(() => {
    // Fetching Doctor Data
    const userData =  Firebase.database().ref('users');
    userData.on('value',data => {
    const rawData = Object.values(data.val())
    var filterData = rawData.filter(user => user.donor == true)    
    var eliminateCurrentUser = filterData.filter(user => user.uid !== currentUser)    
    setDonors(eliminateCurrentUser)
    console.log('Data Recieved Hogaya', donors)
    }) 
  }, []);

return (
    <>
    <FlatList
      keyExtractor={(item)=>item.uid}
      data={donors}
      renderItem={({item})=>(
        <View style={styles.container}>
            <Image
            source={{ uri: item.imgURI }}
            style={styles.Image}
            />
            <View style={{marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', color: '#d60505', fontSize: 18}}>{item.name}</Text>
                <Text>Blood Group: {item.bloodGroup}</Text>
                <Text>Age: {item.age} Years</Text>
                <Text>Medical Condition : {item.medicalCondition}</Text>
                <Text>City: {item.city}</Text>
            </View>
        </View>
        )}
    />
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: '#fff',
      height: 140,
      width: '90%',
     justifyContent: 'flex-start',
     alignItems: 'center',
     alignSelf: 'center',
     paddingHorizontal: 15,
     marginTop: 15,
     borderRadius: 10,
      shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    Image: {
        resizeMode: 'contain',
        width: 80,
        height: 80,
        borderRadius: 400,
        marginVertical: 40,
     },
     LogoImage: {
        resizeMode: 'contain',
        // height: 20,
        width: 120,
      },
  });