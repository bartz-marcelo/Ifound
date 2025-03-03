import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// *** IMPORTANTE: ASSUMIMOS QUE O ARQUIVO logo.png ESTÁ NA MESMA PASTA QUE O InicialScreen.js ***
// *** SE O logo.png ESTIVER EM OUTRA PASTA, VOCÊ DEVERÁ AJUSTAR O CAMINHO AQUI! ***
import logoImg from '../assets/logo.png'; // Importando o logo

function InicialScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        // Função para navegar para a tela de Login após 3 segundos
        const timer = setTimeout(() => {
            navigation.replace('Login'); // 'replace' substitui a tela Inicial na pilha de navegação
        }, 3000); // 3000 milissegundos = 3 segundos

        // Limpar o timeout caso o componente seja desmontado antes dos 3 segundos
        return () => clearTimeout(timer);
    }, [navigation]); // Dependência em 'navigation' para o useEffect


    return (
        <View style={styles.container}>
            <Image
                source={logoImg} // Usando a imagem importada
                style={styles.logo} // Aplicando estilos para o logo
                resizeMode="contain" // Para garantir que o logo caiba dentro do container sem cortar
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red', // Fundo vermelho conforme solicitado
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150, // *** TAMANHO DO LOGO REDUZIDO PELA METADE (VALORES ORIGINAIS ERAM 300x300 - EXEMPLO) ***
        height: 150, // *** AJUSTE ESTES VALORES PARA METADE DO TAMANHO ORIGINAL DO SEU logo.png ***
        // *** SE O TAMANHO ORIGINAL DO SEU LOGO FOR DIFERENTE DE 300x300, AJUSTE OS VALORES width E height AQUI! ***
    },
});

export default InicialScreen;