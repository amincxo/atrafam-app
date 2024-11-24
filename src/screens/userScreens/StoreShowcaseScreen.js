// screens/StoreShowcaseScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

export default function StoreShowcaseScreen({ route, navigation }) {
  const { storeId, storeName } = route.params;

  // این داده‌ها باید از API دریافت شوند
  const storeData = {
    image: require('../assets/store-image.jpg'), // تصویر فروشگاه
    name: 'فروشگاه علوی',
    products: [
      {
        id: '1',
        name: 'کت چرم لاین اورجینال (مردانه)',
        type: 'سایز بندی',
        image: require('../assets/product1.jpg'),
        sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
        price: '1,600,000',
      },
      {
        id: '2',
        name: 'کت چرم مشکی (مردانه)',
        type: 'سایز بندی',
        image: require('../assets/product2.jpg'),
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        price: '1,800,000',
      },
      // سایر محصولات...
    ],
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productType}>{item.type}</Text>
        <View style={styles.sizesContainer}>
          {item.sizes.map((size) => (
            <View key={size} style={styles.sizeChip}>
              <Text style={styles.sizeText}>{size}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.price}>{item.price} تومان</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
          <Text style={styles.detailsButtonText}>مشاهده و خرید</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={storeData.image} style={styles.storeImage} />
        <Text style={styles.storeName}>{storeData.name}</Text>
      </View>

      <FlatList
        data={storeData.products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  storeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  sizeChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2,
  },
  sizeText: {
    fontSize: 10,
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});