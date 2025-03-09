import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        console.log('Botão Entrar pressionado. Email:', email, 'Senha:', senha);

        try {
            const usersJSON = await AsyncStorage.getItem('@MyApp_users');
            const storedUsers = usersJSON ? JSON.parse(usersJSON) : [];

            console.log('Dados de TODOS os usuários LIDOS do AsyncStorage NO LOGIN:', storedUsers);

            if (storedUsers) {
                const user = storedUsers.find(user => user.email === email && user.senha === senha);

                if (user) {
                    
                    navigation.replace('TelaMedicamentos');
                } else {
                    console.log('Login Falhou! (SIMULAÇÃO) - Usuário não encontrado (email não cadastrado)');
                    Alert.alert('Login Falhou', 'Email ou senha incorretos. Verifique suas credenciais.');
                }
            } else {
                console.log('Login Falhou! (SIMULAÇÃO) - Nenhum usuário cadastrado encontrado no AsyncStorage.');
                Alert.alert('Login Falhou', 'Nenhum usuário cadastrado encontrado. Cadastre-se primeiro.');
            }

        } catch (error) {
            console.error('Erro ao buscar usuários no AsyncStorage:', error);
            Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao buscar os dados do usuário. Tente novamente.');
        }
    };

    const handleCadastroNavigation = () => {
        navigation.navigate('Cadastro');
    };
    const handleAjudaNavigation = () => {
        navigation.navigate('Ajuda');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="grey" 
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                placeholderTextColor="grey" 
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCadastroNavigation}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAjudaNavigation}>
                <Text style={styles.buttonText}>Esqueceu seu login? Aperte aqui.</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red', 
        padding: 20,
        justifyContent: 'flex-start',
        paddingTop: 80,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'lightgrey', 
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black', 
        backgroundColor: 'white', 
    },
    button: {
        backgroundColor: 'grey', 
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
    },
});

export default LoginScreen;