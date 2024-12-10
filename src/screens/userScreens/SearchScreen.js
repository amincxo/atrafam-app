// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';


export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const {user} = useAuth();

  const handleSearch = () => {
    navigation.navigate('Map', { searchQuery: searchText });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText} > {user?.name} خوش آمدید </Text>
      <TextInput
        style={styles.input}
        placeholder="جستجوی کالا..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>جستجو</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      margin: 10,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 8,
      margin: 10,
      alignItems: 'center',
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'right',
        color: '#333',
      },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    cardList: {
      flex: 1,
      backgroundColor: 'white',
    },
    card: {
      padding: 15,
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    shopName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });