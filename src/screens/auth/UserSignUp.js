import { View, TextInput ,Image , Text ,TouchableOpacity , StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userTamplate } from '../../database/database'
import { users } from '../../database/database'
import { sellers } from '../../database/database'
import * as ImagePicker from 'expo-image-picker'



const UserSignUp = ({navigation}) => {
    const [user , setUser] = useState(userTamplate)
    useEffect(()=>{
        console.log(user)
    },[user])


    const LoginHandler = () => {

        const authenticateUser  = (inputUsername) => {
            const foundUser = users.find(user => user.username === inputUsername) || 
                  sellers.find(seller => seller?.username === inputUsername) || 
                  null;
            if (foundUser) {
                Alert.alert('خطا','یوزرنیم تکراری میباشد')
            }
            else {
                users.push(user,)
                console.log(users)
                Alert.alert('' , "لطفا وارد شوید ")
                Alert.alert('' , " با موفقیت ثبت نام شدید")
                navigation.replace('Login')
            }

          };
    
          authenticateUser(user.username)




    }

    const handleInputChange = (field, value) => {
        setUser (prevUser  => ({
          ...prevUser ,
          [field]: value, 
        }));
      };


      const pickImage = async () => {
        //no premiss need 
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[100 ,100],
            quality:1,
        });
        console.log(result);
        if (!result.canceled) {
            setUser(prevUser => ({
                ...prevUser,
                photo: result.assets[0]
            }))
        }else {
            Alert.alert('','عملیات توسط شما کنسل شد')
        }

    }

  return (
    <View style={styles.container} >
        {/* <Text style={styles.title} >ثبت نام کاربران </Text> */}
        <View style={styles.imageholder} >
            <TouchableOpacity onPress={pickImage} >
                {user.photo? <Image source={{ uri: user.photo.uri }} style={styles.image} /> : <Image source={require('../../assets/profileUser.jpg')} style={styles.image} /> }
            </TouchableOpacity>
        </View>
        <TextInput style={styles.input}
        placeholder='ایمیل'
        value={user.email}
        onChangeText={(text) => handleInputChange('email', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='نام '
        value={user.name}
        onChangeText={(text) => handleInputChange('name', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='نام کاربری'
        value={user.username}
        onChangeText={(text) => handleInputChange('username', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='رمز عبور'
        value={user.password}
        onChangeText={(text) => handleInputChange('password', text)}
        autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={LoginHandler} >
            <Text style={styles.buttonText} > ثبت نام </Text>
        </TouchableOpacity>
    </View>
  )
}

export default UserSignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
      },
      button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius:50
      },
      imageholder : {
        display: 'flex',
        alignItems: 'center'
      }
})