import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // import آیکون
import Profile from './Profile';
import AddProduct from './AddProduct';
import Products from './Products';

const Tab = createBottomTabNavigator();
  
const SellerPage = () => {
    return (
        
      <Tab.Navigator>
            <Tab.Screen 
          name="Products" 
          component={Products} 
          options={{
            headerShown: false,
            title: 'محصولات',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
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
              <Ionicons name="add-circle" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            headerShown:false,
            title: 'مشخصات فروشگاه',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    );
};
  
export default SellerPage