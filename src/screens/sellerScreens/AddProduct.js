import { View, Text ,TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import React,{ useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { productTamplate } from '../../database/database'
import ImageComponent from '../../components/ImageComponent';
import { useUserContext } from '../../context/UsersContext'; 
const AddProduct = ({navigation}) => {
    const { sellers } = useUserContext();
    const {user} = useAuth();
    const [product, setProduct] = useState(productTamplate);


    useEffect(()=>{
        console.log(product)
        console.log(JSON.stringify(sellers))
    },[product])
    const handleInputChange = (field, value) => {
        if (field === 'price' && !/^[0-9]*$/.test(value)) {
            return; 
        }
        setProduct(prevProduct => ({
            ...prevProduct,
            [field]: value,
        }));
    };

      const addProductHandler = (username, newProduct) => {
       // جستجو برای کاربر با نام کاربری مشخص
        const user = sellers.find(seller => seller.username === username);
    
        // اگر کاربر پیدا شد، محصول را به آرایه محصولات کاربر اضافه کن
        if (user) {
            if (!Array.isArray(user.products)) {
                user.products = []; 
            }
            const lastProductId = user.products.length > 0 
            ? user.products[user.products.length - 1].id 
            : 0; 

            newProduct.id = +lastProductId + 1; 
            user.products.push(newProduct);  
            console.log('محصول اضافه شد به کاربر:', username, newProduct);
            setProduct(productTamplate);
            navigation.navigate('Products');

        } else {
            console.log('کاربر پیدا نشد.');
        }
    };
  return (
    <View style={styles.container} >
        <Text style={styles.inputTitle} >عکس محصول</Text>
        <View style={styles.addImageHolder}  >
                <ImageComponent product={product} pickImage='img0' setProduct={setProduct} />
            {(product.photo.img0 ||  product.photo.img1) && 
                <ImageComponent product={product} pickImage='img1' setProduct={setProduct} />}
            {(product.photo.img1 || product.photo.img2) && 
                <ImageComponent product={product} pickImage='img2' setProduct={setProduct} />}
            {(product.photo.img2 || product.photo.img3) && 
                <ImageComponent product={product} pickImage='img3' setProduct={setProduct} />}
            {(product.photo.img3 || product.photo.img4) && 
                <ImageComponent product={product} pickImage='img4' setProduct={setProduct} />}
        </View>
        <Text style={styles.inputTitle} >نام محصول</Text>
        <TextInput style={styles.input}
            value={product.name}
            onChangeText={(text) => handleInputChange('name', text)}
            autoCapitalize='none' />
        <Text style={styles.inputTitle} >قیمت  (تومان)</Text>
        <TextInput style={styles.input}
            value={product.price}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('price', text)}
            autoCapitalize='none' />
        <Text style={styles.inputTitle} >توضیحات </Text>
        <TextInput style={styles.inputDescript} 
        multiline={true} 
        numberOfLines={5}
        textAlignVertical="top"
        value={product.description}
        onChangeText={(text) => handleInputChange('description', text)}
        autoCapitalize='none' 
        />

        <TouchableOpacity style={styles.button} onPress={()=> addProductHandler(user.username , product)}  >
            <Text style={styles.buttonText} > ثبت محصول </Text>
        </TouchableOpacity>
    </View>
    )
}

const styles =  StyleSheet.create({
    container : {
        flex: 1,
        direction:'rtl',
        marginTop:20,
        marginRight:20,
        marginLeft:20,
        },
    addImageHolder : {
      height:100,
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'flex-start'
    },
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
    addImageText: {
        textAlign:'center',
        fontFamily:'BYekanBold',
        fontSize:12,
        },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop:20
          },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
          },
    inputTitle :{
        marginBottom: 10,
        marginTop: 10,
          },
    input: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
    },
    inputDescript: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        height:120,
        padding:8,
        },

    }
)
export default AddProduct