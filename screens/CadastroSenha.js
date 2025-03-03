import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CadastroSenhaScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigation = useNavigation();

    const handleCadastro = async () => {
        console.log('Botão Cadastrar pressionado. Email:', email, 'Senha:', senha, 'Confirmar Senha:', confirmarSenha);

        if (!email || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const usersJSON = await AsyncStorage.getItem('@MyApp_users');
            let storedUsers = usersJSON ? JSON.parse(usersJSON) : [];

            console.log('Usuários lidos do AsyncStorage (se existirem):', storedUsers);

            const emailExists = storedUsers.some(user => user.email === email);
            if (emailExists) {
                Alert.alert('Erro', 'Este email já está cadastrado. Use outro email ou faça login.');
                return;
            }

            const newUser = { email, senha };
            storedUsers.push(newUser);

            const updatedUsers = storedUsers;

            await AsyncStorage.setItem('@MyApp_users', JSON.stringify(updatedUsers));

            console.log('Dados salvos no AsyncStorage APÓS CADASTRO:');
            console.log('Chave:', '@MyApp_users');
            console.log('Valor:', JSON.stringify(updatedUsers));

            console.log('Usuário cadastrado e salvo no AsyncStorage com sucesso!');

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            console.error('Erro ao salvar usuário no AsyncStorage:', error);
            Alert.alert('Erro ao cadastrar', 'Ocorreu um erro ao salvar o usuário. Tente novamente.');
        }
    };

    const handleVoltarNavigation = () => {
        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Cadastro</Text>

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
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholderTextColor="grey"
            />

            <TouchableOpacity style={styles.buttonCadastrar} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonVoltar} onPress={handleVoltarNavigation}>
                <Text style={styles.buttonText}>Voltar para Login</Text>
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
    titleText: {
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
    buttonCadastrar: {
        backgroundColor: 'grey',
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonVoltar: {
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

export default CadastroSenhaScreen;