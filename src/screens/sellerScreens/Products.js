import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ProductsCard from '../../components/ProductsCard';
import { useAuth } from '../../context/AuthContext'


const Products = () => {
    const { user , setUser } = useAuth();

    useFocusEffect(
        React.useCallback(() => {
            console.log(user.product)
        }, [user]) // وابستگی به sellers
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>مدیریت محصولات</Text>
            {user.products ? <FlatList
                data={user.products} // اگر بخواهید لیست فروشندگان را نمایش دهید
                renderItem={( item ) => <ProductsCard key={item.id} product={item} setUser={setUser}  />}
                keyExtractor={(item) => item.id} // فرض بر این است که username کلید یکتای هر فروشنده است
                style={styles.list}
                /> : <Text>هیچ محصولی وجود ندارد</Text>}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    list: {
        width: '100%',
        flex:1,
        paddingBottom:40,
        paddingHorizontal: 20
    },
});

export default Products;