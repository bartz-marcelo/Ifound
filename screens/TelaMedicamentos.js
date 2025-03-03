import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, Keyboard, BackHandler } from 'react-native'; // Importando BackHandler
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TelaMedicamentosScreen() {
    const navigation = useNavigation();
    const [nomeMedicamento, setNomeMedicamento] = useState('');
    const [localArmazenamento, setLocalArmazenamento] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [medicamentoPesquisado, setMedicamentoPesquisado] = useState(null);
    const [mensagemSalvoVisible, setMensagemSalvoVisible] = useState(false);
    const [mensagemDeletadoVisible, setMensagemDeletadoVisible] = useState(false);

    useEffect(() => {
        if (mensagemDeletadoVisible) {
            const timer = setTimeout(() => {
                setMensagemDeletadoVisible(false);
            }, 3000); // 3 segundos
            return () => clearTimeout(timer);
        }
    }, [mensagemDeletadoVisible]);


    const handleSalvarMedicamento = async () => {
        if (!nomeMedicamento || !localArmazenamento) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const novoMedicamento = {
                nome: nomeMedicamento,
                local: localArmazenamento
            };
            await AsyncStorage.setItem(`@Medicamento_${nomeMedicamento}`, JSON.stringify(novoMedicamento));
            setNomeMedicamento('');
            setLocalArmazenamento('');
            Keyboard.dismiss(); // Oculta o teclado após salvar
            setMensagemSalvoVisible(true); // Para mostrar mensagem "Medicamento Salvo" - usando Alert.alert abaixo para simplicidade.
            Alert.alert('Sucesso', 'Medicamento Salvo'); // Mensagem "Medicamento Salvo" como Alert.

        } catch (error) {
            console.error('Erro ao salvar medicamento:', error);
            Alert.alert('Erro', 'Erro ao salvar medicamento. Tente novamente.');
        }
    };

    const handlePesquisarMedicamento = async () => {
        if (!nomeMedicamento) {
            Alert.alert('Erro', 'Por favor, digite o nome do medicamento para pesquisar.');
            return;
        }

        try {
            const medicamentoJSON = await AsyncStorage.getItem(`@Medicamento_${nomeMedicamento}`);
            const medicamento = medicamentoJSON ? JSON.parse(medicamentoJSON) : null;
            setMedicamentoPesquisado(medicamento);
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao pesquisar medicamento:', error);
            Alert.alert('Erro', 'Erro ao pesquisar medicamento. Tente novamente.');
        }
    };

    const handleDeletarMedicamento = async () => {
        if (!nomeMedicamento) {
            Alert.alert('Erro', 'Por favor, digite o nome do medicamento para deletar.');
            return;
        }

        try {
            await AsyncStorage.removeItem(`@Medicamento_${nomeMedicamento}`);
            setNomeMedicamento('');
            setLocalArmazenamento('');
            Keyboard.dismiss(); // Oculta o teclado após deletar
            setMensagemDeletadoVisible(true);
        } catch (error) {
            console.error('Erro ao deletar medicamento:', error);
            Alert.alert('Erro', 'Erro ao deletar medicamento. Tente novamente.');
        }
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    const handleSair = async () => {
        console.log('Botão Sair pressionado.');

        try {
            // *** PONTO DE EXTENSÃO: ADICIONE AQUI CÓDIGO PARA SALVAR DADOS ADICIONAIS NO AsyncStorage ANTES DE SAIR, SE NECESSÁRIO! ***
            // *** EXEMPLO:
            // await AsyncStorage.setItem('@MyApp_algum_dado_adicional', JSON.stringify(algumDadoAdicional));
            // console.log('Dados adicionais salvos no AsyncStorage antes de sair.');


            // Navegar para a tela de Login
            navigation.replace('Login'); // OU navigation.navigate('Login') - 'replace' é geralmente melhor para "Sair"
            console.log('Navegando para a Tela de Login.');

        } catch (error) {
            console.error('Erro ao sair:', error); // Log de erro genérico ao sair
            Alert.alert('Erro ao Sair', 'Ocorreu um erro ao tentar sair do aplicativo. Tente novamente.');
            navigation.replace('Login'); // Mesmo em caso de erro, tenta navegar para a tela de login
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Medicamentos</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome Medicamento:"
                placeholderTextColor="#999"
                value={nomeMedicamento}
                onChangeText={setNomeMedicamento}
            />
            <TextInput
                style={styles.input}
                placeholder="Local de Armazenamento:"
                placeholderTextColor="#999"
                value={localArmazenamento}
                onChangeText={setLocalArmazenamento}
            />

            <TouchableOpacity style={styles.buttonCinza} onPress={handleSalvarMedicamento}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCinza} onPress={handlePesquisarMedicamento}>
                <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCinza} onPress={handleDeletarMedicamento}>
                <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>

            {/* Botão "Sair" - FUNCIONALIDADE ADICIONADA! */}
            <TouchableOpacity style={styles.buttonCinza} onPress={handleSair}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ifound Informa</Text>
                        {medicamentoPesquisado ? (
                            <View>
                                <Text style={styles.modalTextRed}>Nome: {medicamentoPesquisado.nome}</Text>
                                <Text style={styles.modalTextRed}>Local: {medicamentoPesquisado.local}</Text>
                            </View>
                        ) : (
                            <Text style={styles.modalTextRed}>Medicamento não encontrado.</Text>
                        )}
                        <TouchableOpacity style={styles.buttonFecharModal} onPress={fecharModal}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {mensagemDeletadoVisible && (
                <View style={styles.mensagemDeletadoContainer}>
                    <Text style={styles.mensagemDeletadoText}>Medicamento Deletado</Text>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center', // Mantém o alinhamento central dos itens no container principal
        paddingTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    input: {
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 18,
        color: '#333',
        backgroundColor: '#f8f8f8',
    },
    buttonCinza: {
        backgroundColor: 'gray',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%', // *** ADICIONADO: LARGURA FIXA PARA OS BOTÕES (80% da largura da tela) ***
        alignSelf: 'center', // *** ADICIONADO: CENTRALIZAR OS BOTÕES HORIZONTALMENTE ***
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalTextRed: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonFecharModal: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 20,
    },
    mensagemDeletadoContainer: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    mensagemDeletadoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TelaMedicamentosScreen;