import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function FindDonor(props) {
    const {viewDonors} = props
    // console.log(image)

  return (
    <View style={styles.container}>
        <Image
          source={require('../images/donor.png')}
          style={styles.LogoImage}
        />
        <View>
            <Text style={{fontWeight: 'bold', color: '#df1f26', fontSize: 20}} >Need Blood?</Text>
            <Text>Find Blood Donow Now</Text>
        </View>
            <TouchableOpacity
                onPress={viewDonors}
            >
                <Text style={styles.btn}>
                    Find
                </Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: '#fff',
      height: 100,
      width: '90%',
     justifyContent: "space-between",
     alignItems: 'center',
     alignSelf: 'center',
     paddingHorizontal: 15,
     marginTop: 50,
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
        width: 40,
        height: 40,
        borderRadius: 400,
        marginVertical: 40,
     },
     LogoImage: {
        resizeMode: 'contain',
        // height: 20,
        width: 60,
      },
      btn: {
          fontWeight: 'bold',
          backgroundColor: '#df1f26',
          color: 'white',
          paddingHorizontal: 10,
          paddingVertical: 2,
          borderRadius: 10,
        }
  });