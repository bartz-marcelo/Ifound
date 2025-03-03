import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AjudaScreen() {
    const [email, setEmail] = useState('');
    const [mensagemStatus, setMensagemStatus] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (mensagemStatus) {
            const timer = setTimeout(() => {
                setMensagemStatus('');
                setEmail(''); // *** ADICIONADO: LIMPAR O CAMPO DE EMAIL! ***
            }, 3000); // 3 segundos
            return () => clearTimeout(timer);
        }
    }, [mensagemStatus]);

    const handleRecuperarAcesso = async () => {
        try {
            const usersJSON = await AsyncStorage.getItem('@MyApp_users');
            const storedUsers = usersJSON ? JSON.parse(usersJSON) : [];

            console.log('usersJSON:', usersJSON); // *** ADICIONADO: LOG DO usersJSON ***
            console.log('storedUsers:', storedUsers); // *** ADICIONADO: LOG DO storedUsers ***

            const emailEncontrado = storedUsers.some(user => {
                console.log('user.email:', user.email); // *** ADICIONADO: LOG DE user.email ***
                return user.email === email;
            });

            if (emailEncontrado) {
                setMensagemStatus('Enviada mensagem para recadastrar senha.');
            } else {
                Alert.alert('Erro', 'E-mail não cadastrado.');
            }
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação. Tente novamente.');
        }
    };

    const handleRetornarLogin = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.tituloMensagem}>Para recuperar seu acesso, digite seu email cadastrado.</Text>

            <TextInput
                style={styles.inputEmail}
                placeholder="Email cadastrado"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="grey"
            />

            <TouchableOpacity style={styles.botaoConcluir} onPress={handleRecuperarAcesso}>
                <Text style={styles.textoBotaoConcluir}>Aperte aqui para concluir.</Text>
            </TouchableOpacity>

            {mensagemStatus ? (
                <View style={styles.mensagemStatusContainer}>
                    <Text style={styles.mensagemStatusText}>{mensagemStatus}</Text>
                </View>
            ) : null}


            <TouchableOpacity style={styles.botaoRetornarLogin} onPress={handleRetornarLogin}>
                <Text style={styles.textoBotaoRetornarLogin}>Retornar ao login.</Text>
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
        alignItems: 'flex-start', // Alinhar à esquerda no container principal
        paddingTop: 80,
    },
    tituloMensagem: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left', // Alinhar texto à esquerda
        marginBottom: 10,
    },
    inputEmail: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black',
    },
    botaoConcluir: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%', // Largura total para os botões terem o mesmo tamanho
        alignItems: 'center', // Centralizar texto no botão
    },
    textoBotaoConcluir: {
        fontSize: 20, // Mantive fontSize 20, corrigindo a solicitação de fontSize 0
        fontWeight: 'bold',
        color: 'white',
    },
    botaoRetornarLogin: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%', // Largura total para os botões terem o mesmo tamanho
        alignItems: 'center', // Centralizar texto no botão
    },
    textoBotaoRetornarLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    mensagemStatusContainer: {
        position: 'absolute', // Posicionamento absoluto para centralizar na tela
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Opcional: fundo semi-transparente para destaque
    },
    mensagemStatusText: {
        fontSize: 20, // Mantive fontSize 20, como solicitado
        fontWeight: 'bold',
        color: 'red', // *** ALTERADO: COR DA FONTE PARA VERMELHO! ***
        textAlign: 'center',
        backgroundColor: 'white', // *** ALTERADO: FUNDO PARA BRANCO! ***
        padding: 20,
        borderRadius: 10,
    },
});

export default AjudaScreen;
