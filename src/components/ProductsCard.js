import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';

const ProductsCard = (props) => {
    const { description, name, photo, price, number, fromDataset, setUser  } = props.product.item;
    const { user } = useAuth();

    const numberHandler = (action) => {
        const updatedProduct = { ...props.product.item };

        if (action === 'Increase') {
            updatedProduct.number += 1;
        } else if (action === 'Decrease' && updatedProduct.number > 0) {
            updatedProduct.number -= 1;
        }

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
                    <Image source={photo.img0} style={styles.images} />
                ) : photo.img0 ? (
                    <Image source={{ uri: photo.img0?.uri }} style={styles.images} />
                ) : (
                    <Image source={require('../assets/profileUser.png')} style={styles.images} />
                )}
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.priceText}>{price} تومان</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <Text style={styles.descriptionText}> {description}</Text>
                <View style={styles.stockContainer}>
                    <Text style={styles.stockText}>تعداد موجود در فروشگاه</Text>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={() => numberHandler('Increase')}>
                        <Icon name="add-circle-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{number}</Text>
                    <TouchableOpacity onPress={() => numberHandler('Decrease')}>
                        <Icon name="remove-circle-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailsContainer: {
        flex: 3,
        paddingLeft: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    descriptionText: {
        marginTop: 5,
        color: '#636262',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    counterText: {
        marginHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    stockContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        marginTop: 10,
    },
    stockText: {
        color: '#636262',
        textAlign: 'right',
        writingDirection: 'rtl',
        marginRight:10,
        marginBottom: 3,
    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imageHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductsCard;