import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5' // Make sure to install this library
import { useAuth } from '../../context/AuthContext'
import { productTamplate } from '../../database/database'
import ImageComponent from '../../components/ImageComponent';
import { useUserContext } from '../../context/UsersContext'; 

const AddProduct = ({navigation}) => {
    const { sellers } = useUserContext();
    const {user} = useAuth();
    const [product, setProduct] = useState(productTamplate);

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
        // Your existing add product logic
        const user = sellers.find(seller => seller.username === username);
    
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

    const handleCancel = () => {
        setProduct(productTamplate);
        navigation.goBack(); // یا هر عملیات دلخواه دیگر
    };

  return (
    <View style={styles.container}>
        <View style={styles.addImageHolder}>
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

        <View style={styles.imageRecommendationContainer}>
            <Icon name="info-circle" size={16} color="#007AFF" style={styles.recommendationIcon} />
            <View style={styles.recommendationTextContainer}>
                <Text style={styles.recommendationText}>
                    • عکس با کیفیت و واضح باشد
                </Text>
                <Text style={styles.recommendationText}>
                    • پس‌زمینه سفید یا ساده انتخاب شود
                </Text>
                <Text style={styles.recommendationText}>
                    • تمام محصول در عکس مشخص باشد
                </Text>
                <Text style={styles.recommendationText}>
                    • از زوایای مختلف عکس بگیرید
                </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <Icon name="tag" size={20} style={styles.inputIcon} />
            <TextInput 
                style={styles.input}
                value={product.name}
                placeholder="نام محصول را وارد کنید"
                onChangeText={(text) => handleInputChange('name', text)}
                autoCapitalize='none' 
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon name="money-bill" size={20} style={styles.inputIcon} />
            <TextInput 
                style={styles.input}
                value={product.price}
                placeholder="قیمت محصول را وارد کنید (تومان)"
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('price', text)}
                autoCapitalize='none' 
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon name="align-left" size={20} style={styles.inputIcon} />
            <TextInput 
                style={styles.inputDescript} 
                multiline={true} 
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="توضیحات محصول را وارد کنید"
                value={product.description}
                onChangeText={(text) => handleInputChange('description', text)}
                autoCapitalize='none' 
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={[styles.button, styles.submitButton]} 
                onPress={() => addProductHandler(user.username, product)}
            >
                <Icon name="check" size={20} color="white" />
                <Text style={styles.buttonText}>  ثبت محصول</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={handleCancel}
            >
                <Icon name="times" size={20} color="#007AFF" />
                <Text style={styles.cancelButtonText}>  انصراف</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        direction: 'rtl',
        marginTop: 40,
        marginRight: 20,
        marginLeft: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 10,
    },
    inputIcon: {
        marginHorizontal: 10,
        color: 'gray',
    },
    input: {
        flex: 1,
        height: 50,
    },
    inputDescript: {
        flex: 1,
        height: 120,
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        
    },
    cancelButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#007AFF', // حاشیه آبی
    },
    buttonText: {
        color:'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    cancelButtonText: {
        color:'#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    addImageHolder: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    inputTitle: {
        marginBottom: 10,
        marginTop: 10,
    },
    imageRecommendationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F0F4F7',
        // padding: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
    },
    recommendationIcon: {
        marginRight: 1,
        marginLeft: 10,
        marginTop: 1,
    },
    recommendationTextContainer: {
        flex: 1,
        alignItems: 'flex-start', // برای چپ‌چین کردن متن‌ها
    },
    recommendationText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        textAlign: 'left', // برای چپ‌چین کردن متن
        width: '100%', // برای استفاده از تمام عرض
    },
})

export default AddProduct