import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // import آیکون
import Profile from './Profile';
import AddProduct from './AddProduct';
import Products from './Products';
import { useAuth } from '../../context/AuthContext'
import { Image, View } from 'react-native';

const Tab = createBottomTabNavigator();


const SellerPage = () => {
    const {user} = useAuth();
    console.log(user.fromDataset)
    return (
        
      <Tab.Navigator>
            <Tab.Screen 
          name="Products" 
          component={Products} 
          options={{
            headerShown: false,
            title: 'محصولات',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size+1} />
            )
          }}
          />
        <Tab.Screen 
          name="AddProduct" 
          component={AddProduct} 
          options={{
            headerShown:false,
            title: 'افزودن محصول',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" color={color} size={size+1} />
            )
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            headerShown:false,
            title: `${user.storeName}`,
            tabBarIcon: ({ color, size }) => (
                <View style={{
                    borderWidth: 2, 
                    borderColor: color, 
                    borderRadius: size / 2,
                    overflow: 'hidden', 
                    width: size+1, 
                    height: size+1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                  }}>
                    <Image 
                    source={user.fromDataset ? user.photo.uri : user.photo.uri ? { uri: user.photo.uri } : require('../../assets/noProfileUser.jpg')}
                      style={{ width: size, height: size }} // اندازه تصویر را از size بگیرید
                    />
                  </View>
            )
          }}
        />
      </Tab.Navigator>
    );
};
  
export default SellerPage