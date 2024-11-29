import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
const ProductsCard = (props) => {
    const { description, name, photo, price, number, fromDataset, setUser  } = props.product.item;
    const { user } = useAuth();
    console.log(fromDataset)

    const numberHandler = (action) => {
        // Create a copy of the product item
        const updatedProduct = { ...props.product.item };

        // Increase or decrease the number value
        if (action === 'Increase') {
            updatedProduct.number += 1; // Increment the number
        } else if (action === 'Decrease' && updatedProduct.number > 0) {
            updatedProduct.number -= 1; // Decrement the number
        }

        // Update the user state
        props.setUser ((prevUser ) => {
            const updatedProducts = prevUser .products.map((prod) =>
                prod.id === updatedProduct.id ? updatedProduct : prod
            );
            return { ...prevUser , products: updatedProducts };
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageHolder}>
                {fromDataset ? (
                    <Image source={photo.img0} style={styles.imges} />
                ) : photo.img0 ? (
                    <Image source={{ uri: photo.img0?.uri }} style={styles.imges} />
                ) : (
                    <Image source={require('../assets/profileUser.png')} style={styles.imges} />
                )}
            </View>
            <View style={styles.containerXm}>
                <View style={styles.containerXm1}>
                    <Text style={{ paddingTop: 5, color: '#636262' }}>{price} تومان</Text>
                    <Text style={{ fontSize: 18 }}> نام : {name}</Text>
                </View>
                <View style={styles.containerXm2}>
                    <Text style={{textAlign: 'right',writingDirection: 'rtl',alignSelf: 'flex-start'
        }} >توضیحات : {description}</Text>
                </View>
                <View style={[styles.containerXm3, { marginTop: 20 }]}>
                    <TouchableOpacity
                        style={{ paddingRight: 10, marginTop: 10 }}
                        onPress={() => numberHandler('Increase')}   
                    >
                        <Icon name="add-circle-outline" size={20} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10 , fontSize:16 }}>{number}</Text>
                    <TouchableOpacity
                        style={{ paddingLeft: 10, marginTop: 10 }}
                        onPress={() => numberHandler('Decrease')}  
                    >
                        <Icon name="remove-circle-outline" size={20} color="#007AFF" />
                    </TouchableOpacity>
                    <View style={styles.containerXm2}>
                        <Text>تعداد موجود در فروشگاه</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        padding: 10,
        justifyContent: 'space-between',
        marginBottom:20
    },
    containerXm: {
        flexDirection: 'column',
        flex: 3,
        paddingRight: 10,
    },
    containerXm1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerXm2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginTop: 5,
        
    },
    containerXm3: {
        flexDirection: 'row',
        alignItems:'center',
        flex: 1,
    },
    imges: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginRight: 20,
    },
    imageHolder: {
        flex: 1,
        marginRight: 20,
    },
});

export default ProductsCard;