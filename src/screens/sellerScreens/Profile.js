import { View, Image ,Text ,StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {

    const {user} = useAuth();
    console.log(user)
  return (
    <View style={styles.container} >
        <View>
            {user.photo? <Image source={{ uri: user.photo.uri }} style={styles.image} /> : <Image source={require('../../assets/profileUser.jpg')} style={styles.image} /> }
        </View>
    <Text style={styles.storename} > {user.storeName}</Text>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        margin:0,
        paddingBottom: 0 ,
        paddingTop: 40,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
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
      storename : {
        fontWeight:700,
        fontSize:20,
      }
})