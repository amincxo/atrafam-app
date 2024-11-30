import React, { useState, useCallback, useMemo, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity,
    Image,
    Dimensions,
    I18nManager,
    ActivityIndicator,
    RefreshControl,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import Carousel from 'react-native-snap-carousel';

import {BannerCarousel} from '../../components/BannerCarousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const DEFAULT_IMAGE = require('../../assets/summer-sale.jpg');



const DashboardScreen = () => {
    const [totalSales, setTotalSales] = useState(1250000);
    const [profit, setProfit] = useState(350000);
    const [salesGrowth, setSalesGrowth] = useState(15.5);
    const [profitGrowth, setProfitGrowth] = useState(22.3);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const carouselRef = useRef(null);

    const banners = useMemo(() => [
        {
            id: '1',
            title: 'آموزش فروش حرفه‌ای',
            image: require('../../assets/sales-training.jpg'),
            description: 'دوره جامع افزایش فروش'
        },
        {
            id: '2',
            title: 'رویداد فروش تابستانه',
            image: require('../../assets/summer-sale.jpg'),
            description: '۵۰٪ تخفیف ویژه'
        },
        {
            id: '3',
            title: 'استراتژی بازاریابی',
            image: require('../../assets/marketing-event.jpg'), 
            description: 'کارگاه تخصصی بازاریابی'
        }
    ].filter(Boolean), []);

    const chartConfig = useMemo(() => ({
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 0,
        formatYLabel: (value) => formatCurrency(value),
    }), []);

    const salesData = useMemo(() => ({
        labels: ["فروردین", "اردیبهشت", "خرداد"],
        datasets: [
            {
                data: [500000, 750000, 1250000].filter(value => !isNaN(value)),
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                strokeWidth: 2
            }
        ]
    }), []);

    const categoryData = useMemo(() => [
        {
            name: "لوازم الکترونیکی",
            population: 45,
            color: "#007AFF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "لباس و پوشاک",
            population: 25,
            color: "#4CAF50",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "لوازم خانگی",
            population: 20,
            color: "#FF9800",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "سایر محصولات",
            population: 10,
            color: "#9C27B0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        }
    ].filter(item => item.population > 0), []);

    const formatCurrency = useCallback((amount) => {
        try {
            return new Intl.NumberFormat('fa-IR').format(amount || 0);
        } catch (error) {
            console.error('Currency format error:', error);
            return '0';
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setError(null);
        try {
            // API call simulation
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Update data here
        } catch (error) {
            console.error('Refresh error:', error);
            setError('خطا در بارگذاری اطلاعات');
        } finally {
            setRefreshing(false);
        }
    }, []);


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>در حال بارگذاری...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={onRefresh}
                >
                    <Text style={styles.retryButtonText}>تلاش مجدد</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.notificationButton}
                        onPress={() => {}}
                    >
                        <Icon name="notifications" size={24} color="#007AFF" />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View style={styles.titleContainer}>
                        <Text style={styles.sellerText}>فروشندگان</Text>
                        <Text style={styles.headerTitle}>اطرافم</Text>
                    </View>

                    <TouchableOpacity onPress={() => {}}>
                        <Icon name="settings-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
                


                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#007AFF']}
                            tintColor="#007AFF"
                        />
                    }
                >
                            {Array.isArray(banners) && banners.length > 0 && (
                                <BannerCarousel banners={banners} />
                            )}

                    {typeof totalSales === 'number' && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>میزان فروش کل</Text>
                                <Icon name="trending-up" size={24} color="#4CAF50" />
                            </View>
                            <Text style={styles.cardAmount}>
                                {formatCurrency(totalSales)} تومان
                            </Text>
                            <View style={styles.cardFooter}>
                                <Text style={styles.growthText}>
                                    + {salesGrowth?.toFixed(1) || 0}%
                                </Text>
                                <Text style={styles.comparisonText}>
                                    نسبت به ماه گذشته
                                </Text>
                            </View>
                        </View>
                    )}

                    {typeof profit === 'number' && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>سود خالص</Text>
                                <Icon name="cash-outline" size={24} color="#4CAF50" />
                            </View>
                            <Text style={styles.cardAmount}>
                                {formatCurrency(profit)} تومان
                            </Text>
                            <View style={styles.cardFooter}>
                                <Text style={styles.growthText}>
                                    + {profitGrowth?.toFixed(1) || 0}%
                                </Text>
                                <Text style={styles.comparisonText}>
                                    نسبت به ماه گذشته
                                </Text>
                            </View>
                        </View>
                    )}



                    {Array.isArray(categoryData) && categoryData.length > 0 && (
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>دسته‌بندی فروش</Text>
                            <PieChart
                                data={categoryData}
                                width={windowWidth - 40}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                center={[10, 0]}
                                absolute
                            />
                        </View>
                    )}

                    {salesData?.datasets?.[0]?.data?.length > 0 && (
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>نمودار فروش ماهانه</Text>
                            <LineChart
                                data={salesData}
                                width={windowWidth - 40}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                                style={styles.lineChart}
                            />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 1, // This allows the title container to take up available space
        justifyContent: 'center', // Center the titles
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginRight: 5, // Space between "اطرافم" and "فروشندگان"
    },
    sellerText: {
        fontSize: 10, // Smaller font size
        color: '#ef5C00', // Dark orange color
        marginRight: 5, // Slightly lower than "اطرافم"
        marginBottom: 1, 
        fontWeight: 'bold',

    },
    notificationButton: {
        position: 'relative',
        padding: 5,
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    notificationBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },

    defaultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
    },
    defaultText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
    },
    loadingText: {
        marginTop: 10,
        color: '#007AFF',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    notificationButton: {
        position: 'relative',
        padding: 5,
    },


    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    cardAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: I18nManager.isRTL ? 'left' : 'right',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    growthText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 14,
    },
    comparisonText: {
        color: '#666',
        fontSize: 12,
    },
    carouselContainer: {
        marginVertical: 15,
    },
    bannerItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bannerImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#F0F0F0',
    },
    bannerContent: {
        padding: 15,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 5,
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    bannerDescription: {
        fontSize: 12,
        color: '#666',
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    chartCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    lineChart: {
        marginVertical: 8,
        borderRadius: 8,
    },
});


export default DashboardScreen;