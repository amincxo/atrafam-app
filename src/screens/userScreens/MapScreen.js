// screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function MapScreen({ route }) {
  const { searchQuery } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRadius = 5000; // شعاع 5 کیلومتری

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('خطا', 'دسترسی به موقعیت مکانی مجاز نیست');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // پس از دریافت موقعیت کاربر، فروشگاه‌های اطراف را دریافت می‌کنیم
      fetchNearbyStores(location.coords);
    } catch (error) {
      Alert.alert('خطا', 'خطا در دریافت موقعیت مکانی');
    }
  };

  const fetchNearbyStores = async (userCoords) => {
    // در اینجا باید از API برای دریافت فروشگاه‌های اطراف استفاده کنید
    // این داده‌ها نمونه هستند
    const mockNearbyStores = [
      {
        id: '1',
        name: 'فروشگاه رفاه',
        products: ['لپتاپ', 'موبایل', 'تبلت'],
        coordinate: {
          latitude: userCoords.latitude + 0.002,
          longitude: userCoords.longitude + 0.002,
        },
        phone: '02112345678',
        hasProduct: true,
        price: '25,000,000',
        address: 'تهران، خیابان ولیعصر',
        distance: '300 متر',
      },
      {
        id: '2',
        name: 'فروشگاه شهروند',
        products: ['موبایل', 'ساعت هوشمند'],
        coordinate: {
          latitude: userCoords.latitude - 0.002,
          longitude: userCoords.longitude + 0.001,
        },
        phone: '02187654321',
        hasProduct: true,
        price: '24,500,000',
        address: 'تهران، خیابان شریعتی',
        distance: '500 متر',
      },
      {
        id: '3',
        name: 'هایپراستار',
        products: ['تبلت'],
        coordinate: {
          latitude: userCoords.latitude + 0.001,
          longitude: userCoords.longitude - 0.002,
        },
        phone: '02198765432',
        hasProduct: false,
        price: '',
        address: 'تهران، خیابان پاسداران',
        distance: '800 متر',
      },
    ];

    setStores(mockNearbyStores);
    setLoading(false);
  };

  // محاسبه فاصله بین دو نقطه
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // شعاع زمین به کیلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleNavigation = (coordinate) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${coordinate.latitude},${coordinate.longitude}`;
    const url = Platform.select({
      ios: `${scheme}${latLng}`,
      android: `${scheme}${latLng}`
    });
    
    Linking.openURL(url);
  };

  const handleShowcase = (storeId) => {
    // انتقال به صفحه ویترین فروشگاه
    console.log('نمایش ویترین فروشگاه:', storeId);
  };

  const renderStoreCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.address} numberOfLines={1}>
            {item.address} • {item.distance}
          </Text>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.searchResult}>
            {searchQuery}: {' '}
            {item.hasProduct ? (
              <Text style={styles.available}>موجود</Text>
            ) : (
              <Text style={styles.unavailable}>ناموجود</Text>
            )}
          </Text>
          {item.hasProduct && (
            <Text style={styles.price}>{item.price} تومان</Text>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShowcase(item.id)}
          >
            <Ionicons name="storefront-outline" size={24} color="#007AFF" />
            <Text style={styles.buttonText}>ویترین</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleNavigation(item.coordinate)}
          >
            <Ionicons name="navigate-outline" size={24} color="#4CAF50" />
            <Text style={styles.buttonText}>مسیریابی</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCall(item.phone)}
          >
            <Ionicons name="call-outline" size={24} color="#FF9800" />
            <Text style={styles.buttonText}>تماس</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!userLocation || loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>در حال دریافت موقعیت مکانی...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* دایره نمایش محدوده جستجو */}
        <Circle
          center={userLocation}
          radius={searchRadius}
          fillColor="rgba(0, 150, 255, 0.1)"
          strokeColor="rgba(0, 150, 255, 0.3)"
          strokeWidth={1}
        />

        {/* نشانگر موقعیت کاربر */}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="موقعیت شما"
          pinColor="blue"
        />

        {/* نشانگرهای فروشگاه‌ها */}
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={store.coordinate}
            title={store.name}
            description={store.hasProduct ? `${searchQuery} موجود است` : `${searchQuery} ناموجود است`}
          />
        ))}
      </MapView>
      
      <FlatList
        data={stores}
        renderItem={renderStoreCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        inverted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  productInfo: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResult: {
    fontSize: 16,
    marginBottom: 5,
  },
  available: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  unavailable: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
});