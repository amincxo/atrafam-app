import React, { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([
        {
            photo: {
                assetId: null,
                base64: null,
                duration: null,
                exif: null,
                fileName: "6e08396f-96e7-4245-9309-fd8769b460cf.jpeg",
                fileSize: 384422,
                height: 725,
                mimeType: "image/jpeg",
                rotation: null,
                type: "image",
                uri: require('../assets/logo.png'),
                width: 725
            },
            owner: 'امین بروایه',
            storeName: 'فروشگاه بزرگ تعاون',
            email: 'amincxo@gmail.com',
            username: 'amincxo',
            password: '123456',
            storeLocation: {
                latitude: 35.723807970664076,
                longitude: 51.34062007069588
            },
            phone: '09300293709',
            fromDataset: true,
            products: [
                {
                    id: 1,
                    name: 'صابون',
                    number: 5,
                    price: '2000',
                    photo: {
                        img0:require('../assets/profileUser.jpg'),
                        img1:'',
                        img2:'',
                        img3:'',
                        img4:'',
                    },
                    description: 'شسیب'
                }
            ]
        }
    ]);

    return (
        <UserContext.Provider value={{ users, setUsers, sellers, setSellers }}>
            {children}
        </UserContext.Provider>
    );
};

// A hook to use the Context
export const useUserContext = () => {
    return useContext(UserContext);
};