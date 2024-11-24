import React , {useState} from 'react'
import { View, Text , Image , TextInput , TouchableOpacity , StyleSheet , Alert} from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { users } from '../../database/database'
import { sellers } from '../../database/database'

export default function LoginScreen ({ navigation }) {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const { setUser } = useAuth();

    const LoginHandler = () => {
        if (username && password ){
            authenticateUser (username, password)

                
            
        } else {
            Alert.alert('خطا', 'لطفاً نام کاربری و رمز عبور را وارد کنید');        }
    }

    const authenticateUser  = (inputUsername, inputPassword) => {
        const userF = users.find(user => user.username === inputUsername);
        const sellerF = sellers.find(seller => seller.username === inputUsername);
        if (userF) {
          if (userF.password === inputPassword) {
            setUser(userF)
            navigation.replace('Search');
          }
          else {
            Alert.alert('نام کاربری یافت نشد');
            return false; // نام کاربری یافت نشد
          }
        }
        else if(sellerF){
            if(sellerF.password === inputPassword){
                setUser(sellerF)
                navigation.replace('SellerPage');
            }
            else {
                Alert.alert('نام کاربری یافت نشد');
                return false; // نام کاربری یافت نشد
              }
        }
        else {
          Alert.alert('نام کاربری یافت نشد');
          return false; // نام کاربری یافت نشد
        }
      };

    const SignInHandler = () => {
        navigation.navigate('SignUpSelctor')
    }

  return (
    <View style={styles.container} >
        <View style={styles.logo}>
            <Image source={require('../../assets/logo.png')} style={styles.logoText}/>      
        </View>
        {/* <Text style={styles.title} >ورود به حساب کاربری</Text> */}
        <TextInput style={styles.input}
        placeholder='نام کاربری'
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
        />
        <TextInput 
        style={styles.input}
        placeholder='رمز عبور'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={LoginHandler} >
            <Text style={styles.buttonText} > ورود </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signinText} onPress={SignInHandler} >
            <Text> اکانت ندارید ؟ ثبت نام کنید </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    welcomeText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'right',
      color: '#333',
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
    signinText:{
        marginTop: 20,
    },
    logo: {
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
      },
      logoText: {
        fontSize: 60,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
      },
  });