import { View, Image ,Text ,StyleSheet,ScrollView , TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/Card';

const Profile = () => {

    const {user} = useAuth();
    console.log(user)
  return (
    < ScrollView style={{flex:1}} >
        <View style={styles.container} >
            <View>
            <Image 
                    source={user.fromDataset ? user.photo.uri : user.photo.uri ? { uri: user.photo.uri } : require('../../assets/noProfileUser.jpg')}
                      style={styles.image} 
                    />
            </View>
            <Text style={styles.storename} > {user.storeName}</Text>
            <Text style={styles.email} > {user.email}</Text>
            <TouchableOpacity style={styles.buttonHolder} >
                <View>
                    <Text style={styles.button} > ویرایش پروفایل </Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flex:3}} >
            <Text style={styles.categoreText} >انبار ها</Text>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='فروشگاه من' iconName='store' badge='' RFLG=''/>
                </View>
                <View style={styles.cardHoldernoBorder}>
                    <Card title='انبار من' iconName='store-settings' badge='+99'RFLG='' />
                </View>
            </View>
            <Text style={styles.categoreText} >طرح‌ها و اشتراک‌ها</Text>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='طرح ها' iconName='application-settings-outline' badge='+10' RFLG=''/>
                </View>
                <View style={styles.cardHolder}>
                    <Card title='مشاهده طرح‌های فعلی' iconName='application-cog-outline' badge=''RFLG='' />
                </View>
                <View style={styles.cardHolder}>
                    <Card title='ارتقاء یا کاهش طرح' iconName='application-edit-outline' badge=''RFLG='' />
                </View>
 
                <View style={styles.cardHoldernoBorder}>
                    <Card title='تاریخ انقضای اشتراک' iconName='application-variable-outline' badge=''RFLG='' />
                </View>
            </View>
            <Text style={styles.categoreText} >گزارش‌ها و آمار</Text>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='مشاهده آمار فروش' iconName='basket-outline' badge='+10'RFLG='' />
                </View>
                <View style={styles.cardHolder}>
                    <Card title='گزارشات مالی' iconName='basket-unfill' badge='2' RFLG=''/>
                </View>
                <View style={styles.cardHoldernoBorder}>
                    <Card title='تحلیل عملکرد' iconName='google-analytics' badge='' RFLG=''/>
                </View>
            </View>
            <Text style={styles.categoreText} >پشتیبانی و کمک</Text>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='ارسال درخواست پشتیبانی' iconName='account-supervisor-circle-outline' badge=''RFLG='' />
                </View>
                <View style={styles.cardHolder}>
                    <Card title='مشاهده سوالات متداول (FAQ)' iconName='human-handsup' badge='+99' RFLG=''/>
                </View>
                <View style={styles.cardHoldernoBorder}>
                    <Card title='چت آنلاین با پشتیبانی' iconName='chat-outline' badge='' RFLG=''/>
                </View>
            </View>
            <Text style={styles.categoreText} >تنظیمات برنامه </Text>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='تنظیمات اعلان‌ها' iconName='notification-clear-all' badge=''RFLG='' />
                </View>
                <View style={styles.cardHolder}>
                    <Card title='انتخاب زبان' iconName='keyboard' badge='' />
                </View>
                <View style={styles.cardHoldernoBorder}>
                    <Card title='تنظیمات حریم خصوصی' iconName='garage-lock' badge='' RFLG='' />
                </View>
            </View>
            <View style={styles.cardsHolder} >
                <View style={styles.cardHolder}>
                    <Card title='خروج از حساب کاربری' iconName='logout' badge='' RFLG='true' ontap='logout' />
                </View>
            </View>
        </View>


    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        flex:1,
        margin:0,
        paddingBottom: 0 ,
        paddingTop: 80,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
      },
    image: {
        width: 80,
        height: 80,
        borderRadius:50,
        borderWidth:2,
        borderColor:'#007AFF'
      },
      imageholder : {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
      },
      storename : {
        marginTop:18,
        fontWeight:700,
        fontSize:20,
      },
      categoreText: { 
        paddingRight:30 , 
        textAlign:"right", 
        marginTop:10,
        fontSize:14 ,
        fontWeight: 200,
        color:"#333332"
    },
      email: {
        paddingTop:4,
        fontSize:10,
        color:"#6e6e6e"
      },
      buttonHolder : {
          marginTop:20,
          width: 100, // عرض دایره
          height: 38, // ارتفاع دایره
          borderRadius: 50, // دایره کردن
          backgroundColor: '#007AFF', 
          justifyContent:"center"
        },
        button: {
            fontFamily: "BYekanBold",
            color:'white',
            textAlign:'center'
      },
      cardsHolder: {
        flex:1,
        marginTop:10,
        marginRight:20,
        marginLeft:20,
        marginBottom:15,
        borderColor: '#d4d4d4',
        borderWidth: 0.4,
        backgroundColor: 'white', // Background color
        borderRadius: 10, // Optional: round corners
        shadowColor: '#000', // Shadow color
        shadowOffset: {
          width: -2, // Negative width for left shadow
          height: 0, // No vertical shadow
        },
        shadowOpacity: 0.1, // Shadow transparency
        shadowRadius: 4, // Blur radius
        elevation: 3, // For Android
      },
      cardHolder: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#7d7c7c'  // می‌توانید کد رنگ هگز هم استفاده کنید
      },
      cardHoldernoBorder: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        paddingTop:10,
        paddingBottom:10,
      }
})