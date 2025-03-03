import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas aqui (verifique os caminhos dos arquivos!)
import InicialScreen from './screens/InicialScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroSenhaScreen from './screens/CadastroSenha';
import AjudaScreen from './screens/AjudaScreen';
import TelaMedicamentosScreen from './screens/TelaMedicamentos';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen
          name="Inicial"
          component={InicialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroSenhaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ajuda"
          component={AjudaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaMedicamentos"
          component={TelaMedicamentosScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;