import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

export const BannerCarousel = ({ banners }) => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const renderBannerItem = ({ item }) => (
        <View style={styles.bannerItem}>
            <Image source={item.image} style={styles.bannerImage} />
        </View>
    );

    return (
        <View style={styles.carouselContainer}>
            <Carousel
                ref={carouselRef}
                data={banners}
                renderItem={renderBannerItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth * 0.90} // عرض آیتم‌ها کمتر از عرض اسلاید
                layout={'default'}
                loop={true}
                autoplay={true}
                autoplayDelay={100}
                autoplayInterval={5000}
                onSnapToItem={(index) => setActiveIndex(index)} // به‌روزرسانی ایندکس فعال
            />
            <Pagination
                dotsLength={banners.length}
                activeDotIndex={activeIndex}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.inactiveDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        marginVertical: 0,
        alignItems: 'center',
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
        marginHorizontal: 0, // فاصله بین آیتم‌ها
    },
    bannerImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#F0F0F0',
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    inactiveDot: {
        backgroundColor: '#333333',
    },
});