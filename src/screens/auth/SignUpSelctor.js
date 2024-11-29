import { View, Text,TouchableOpacity , StyleSheet } from 'react-native'
import React from 'react'

const SignUpSelctor = ({ navigation }) => {

    const bottomHandler = (name) => {
        switch (name) {
            case 'client':
                navigation.navigate('UserSignUp');
                break;
            case 'seller': 
                navigation.navigate('SellerSignUp');
                break;
            default:
                console.log('kolan eshtebahe')
                break;
        }
    }

  return (
    <View style={styles.container} >
        <Text style={styles.title} >لطفا انتخاب کنید</Text>
        <TouchableOpacity style={styles.button}  onPress={()=> bottomHandler('client')} >
            <Text style={styles.buttonText} >بخش ثبت نام برای کاربران</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=> bottomHandler('seller')} >
            <Text style={styles.buttonText} >  بخش ثبت نام برای فروشندگان</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SignUpSelctor

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Yekan',
        display:'flex',
        flex:1,
        justifyContent: 'center',
        padding:10
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      title: {
        fontFamily: 'Yekan',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
})