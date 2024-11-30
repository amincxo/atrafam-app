import { View, StyleSheet , TextInput,TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ProductsCard from '../../components/ProductsCard';
import { useAuth } from '../../context/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons';



const Products = () => {
    const { user , setUser } = useAuth();

    useFocusEffect(
        React.useCallback(() => {
            console.log(user.product)
        }, [user]) // وابستگی به sellers
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { /* Navigate to settings */ }}>
                    <Icon name="settings-outline" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>مدیریت محصولات</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="جستجو"
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Icon name="search" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>  فیلتر</Text>
                    <Icon name="filter" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>اضافه کردن</Text>
                    <Icon name="add" size={20} color="#007AFF" />
                </TouchableOpacity>
            </View>


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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    searchInput: {
        flex: 1,
        // padding: 10,
        // marginRight: 10,
    },
    searchButton: {
        padding: 10,
    },
    filterButton: {
        flex: 1,
        backgroundColor: '#007AFF', // پس‌زمینه آبی
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterButtonText: {
        color: '#fff', // متن سفید
        fontSize: 16,
        marginLeft: 5, // فاصله بین آیکون و متن
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    list: {
        width: '100%',
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    addButton: {
        flex: 1,
        backgroundColor: '#fff', // پس‌زمینه سفید
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#007AFF', // حاشیه آبی
    },
    addButtonText: {
        color: '#007AFF', // متن آبی
        fontSize: 16,
        marginLeft: 5, // فاصله بین آیکون و متن
    },
});

export default Products;