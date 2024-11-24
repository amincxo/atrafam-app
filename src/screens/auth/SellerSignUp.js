import { View, TextInput , Text , ScrollView  , Image,TouchableOpacity , StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sellerTamplate } from '../../database/database'
import * as ImagePicker from 'expo-image-picker'
import MapView , {Marker} from 'react-native-maps'
import { users } from '../../database/database'
import { sellers } from '../../database/database'


const SellerSignUp = ({navigation}) => {
    const [seller , setSeller] = useState(sellerTamplate)
    const [location, setLocation] = useState(null);


    useEffect(()=>{
        console.log(seller)
        console.log(sellers)
    },[seller])

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
            setSeller(prevSeller => ({
                ...prevSeller,
                photo: result.assets[0]
            }))
        }else {
            Alert.alert('','عملیات توسط شما کنسل شد')
        }
    }

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation(coordinate);
        console.log(location)
        handleInputChange('storeLocation', coordinate);
    };


    const LoginHandler = () => {

        const authenticateUser  = (inputUsername) => {

            const foundUser = users.find(user => user.username === inputUsername) || 
                  sellers.find(seller => seller?.username === inputUsername) || 
                  null;

            if (foundUser) {
                Alert.alert('خطا','یوزرنیم تکراری میباشد')
            }

            else {
                sellers.push(seller)
                console.log(sellers)
                Alert.alert('' , "لطفا وارد شوید ")
                Alert.alert('' , " با موفقیت ثبت نام شدید")
                navigation.replace('Login')
            }

          };
    
          authenticateUser(seller.username)

    }

    const handleInputChange = (field, value) => {
        setSeller (prevSeller  => ({
          ...prevSeller ,
          [field]: value, 
        }));
      };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.title} >ثبت نام فروشندگان </Text> */}
        <View style={styles.imageholder} >
            <TouchableOpacity onPress={pickImage} >
                {seller.photo? <Image source={{ uri: seller.photo.uri }} style={styles.image} /> : <Image source={require('../../assets/profileUser.jpg')} style={styles.image} /> }
            </TouchableOpacity>
        </View>
        <TextInput style={styles.input}
        placeholder='ایمیل'
        value={seller.email}
        onChangeText={(text) => handleInputChange('email', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='نام فروشگاه '
        value={seller.storeName}
        onChangeText={(text) => handleInputChange('storeName', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='نام مالک '
        value={seller.owner}
        onChangeText={(text) => handleInputChange('owner', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='شماره تلفن '
        value={seller.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        autoCapitalize='none'
        />
        
        <TextInput style={styles.input}
        placeholder='نام کاربری'
        value={seller.username}
        onChangeText={(text) => handleInputChange('username', text)}
        autoCapitalize='none'
        />
        <TextInput style={styles.input}
        placeholder='رمز عبور'
        value={seller.password}
        onChangeText={(text) => handleInputChange('password', text)}
        autoCapitalize='none'
        secureTextEntry
        />
        <Text style={styles.locationText}>
            لطفا مکان فروشگاه را تعیین کنید
        </Text>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 35.6892, // عرض جغرافیایی تهران
                longitude: 51.3890, // طول جغرافیایی تهران
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
        >
            {location && <Marker coordinate={location} />}
        </MapView>
        <TouchableOpacity style={styles.button} onPress={LoginHandler} >
            <Text style={styles.buttonText} > ثبت نام فروشنده</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default SellerSignUp

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        alignItems: 'center',
        marginBottom: 20,
      },
      mapContainer: {
        height: 300,
        marginBottom: 15,
    },
    map: {
        flex: 1,
        borderRadius: 8,
        height:200,
        marginBottom: 20,
    },
    locationText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'right', // متن را به راست تراز می‌کند
        marginRight: 10, // فاصله از سمت راست
    }
});