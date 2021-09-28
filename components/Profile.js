import React, {useState} from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebaseConfig'

export default function Profile(props) {
    const {city, medicalCondition, bloodGroup, username, userId, donor} = props
    const isEnabled = donor;
    const donorMode = () => {
        // setIsEnabled(previousState => !previousState);
        Firebase.database().ref('users').child(userId).update({
            donor: !donor,
        })
        console.log(isEnabled)
    }
    // console.log(image)

  return (
      <>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                Name
            </Text>
            <Text style={styles.text}>
                {username}
            </Text>
        </View>

    </View>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                Blood Group
            </Text>
            <Text style={styles.text}>
                {bloodGroup}
            </Text>
        </View>
    </View>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                Medical Condition
            </Text>
            <Text style={styles.text}>
                {medicalCondition}
            </Text>
        </View>
    </View>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                City
            </Text>
            <Text style={styles.text}>
                {city}
            </Text>
        </View>
    </View>

    <View style={styles.container}>
        <View style={styles.donor}>
            <Text style={{fontWeight: 'bold', color: '#df1f26'}}>
                Donor Mode
            </Text>
            <Switch
                trackColor={{ false: '#767577', true: '#df1f26' }}
                thumbColor={isEnabled ? '#767577' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={donorMode}
                value={isEnabled}
            />
        </View>
    </View>

    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: '#df1f26',
      height: 35,
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 15,
    },
    text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,   
    },
    donor: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        marginTop: 35,
        shadowColor: "#000",
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
  });