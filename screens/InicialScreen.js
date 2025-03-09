import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import logoImg from '../assets/logo.png'; 

function InicialScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        
        const timer = setTimeout(() => {
            navigation.replace('Login'); 
        }, 3000); 

        return () => clearTimeout(timer);
    }, [navigation]); 


    return (
        <View style={styles.container}>
            <Image
                source={logoImg} 
                style={styles.logo} 
                resizeMode="contain" 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150, 
        height: 150, 
    },
});

export default InicialScreen;