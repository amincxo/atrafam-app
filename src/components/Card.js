import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { userTamplate } from '../database/database';

const Card = (props) => {
    const navigation = useNavigation();
    const { setUser } = useAuth();


    const pressHandler = (action) => {
        switch (action) {
            case 'logout':
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                });
                // setUser(userTamplate);
                break;
        
            default:
                break;
        }
    }

  return (
    <TouchableOpacity style={styles.container} onPress={() => pressHandler(props.ontap)} >
      <View style={styles.iconContainer}>
        <Icon name={props.iconName} size={32} color={props.RFLG ? '#f53b3b' : "#333" } />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text,{color: props.RFLG ? '#f53b3b' : "#333"}]} >{props.title}</Text>
        <View style={props.badge && styles.badge}>
          <Text style={styles.badgeText}>{props.badge}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Icon name="arrow-left" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    direction:'rtl',
    flexDirection: 'row',
    flex:1,
    // height:200,
    // width:200,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#fff',
    marginTop:5,
    marginBottom:5,
  },
  iconContainer: {
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  arrowContainer: {
    marginRight: 16,
  },
});

export default Card;