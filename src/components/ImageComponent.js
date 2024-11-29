import { View, Text, StyleSheet , TouchableOpacity , Image } from 'react-native'
import React , {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const ImageComponent = (props) => { 
    const { pickImage ,product, setProduct } = props;
    const pickImages = async (keyImage) => {
        //no premiss need 
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[100 ,100],
            quality:1,
        });
        console.log(result);
        if (!result.canceled) {
            setProduct(prevProduct => ({
                ...prevProduct,
                photo: {
                  ...prevProduct.photo,
                  [keyImage]: result.assets[0] // Add the new photo to the object with the new key
                }
            }))
        }else {
            Alert.alert('','عملیات توسط شما کنسل شد')
        }
    }

    const deleteImage = (keyImage) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            photo: {
              ...prevProduct.photo,
              [keyImage]: ''
            }
        }))
    }
  return (
        <View style={styles.addImage} >
            <TouchableOpacity onPress={()=>pickImages(pickImage)} >
            {product.photo[pickImage]? 
                <View style={{alignItems: 'center',}} >
                    <Image  source={{ uri: product.photo[pickImage].uri }} style={styles.addPhotoIcon} />
                </View>
                : <Image source={require('../assets/addPhoto.jpg')} style={styles.addPhotoIcon} /> }
                </TouchableOpacity>
                {product.photo[pickImage] && 
                <TouchableOpacity onPress={()=> deleteImage(pickImage)} >
                    <Icon name='delete' size={20} color='#333' style={{paddingTop:15}}/>
                </TouchableOpacity>
                }
        </View>
  )
}
const styles = StyleSheet.create({
    addImage: {
        // flex:1,
        // borderWidth: 0.5,
        // borderColor: 'black',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5,
        padding: 4,
    },
    addPhotoIcon : {
        width: 60,
        height: 60,
        alignItems: 'center',
        },
})
export default ImageComponent