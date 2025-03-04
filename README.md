# PTI 4º Semestre 
Nome dos membros do grupo:
1. Caroleen  Ahmad Fadel,
2. Eriberto Simão da Silva,
3. Luís Marcelo Bartz de Ávila,
4. Rolf Santana Sokolonski,
5. Renan Leite Cardoso Augusto.
## Ifound! – Aplicativo Multiplataforma Mobile
Objetivo:
Permitir que usuários de remédios que tem, entre os sintomas de suas doenças, a perda de memória, seja amena ou grave, localizem o local de armazenamento de seus remédios.
Neste primeiro momento Ifound! é um MVP. Com o desenvolvimento, se tem a intenção de acrescentar funções como alertas de horários de consumo de remédios e monitoramentos, através de dispositivos vestíveis, entre outros.
Instalação do Ambiente de Desenvolvimento
Para desenvolver o aplicativo foi escolhido o React Native Expo por oferecer ferramentas de fácil manipulação. 
O aplicativo pode ser aberto em um dispositivo físico se nele estiver instalado o aplicativo Expo Go, com download gratuito nas principais lojas de aplicativos, ou através de um emulador virtual, mas, para isso, é necessário, a instalação do Android Studio, por exemplo. Para poupar recursos do hardware, optou-se, no caso do Ifound!, pelo uso do aplicativo.
1. Localizar a pasta raiz do projeto, abri-la com o prompt de comando e digitar: npx expo start.
2. Em seguida, vai aparecer uma tela com um QR code. Use o aplicativo Expo Go para ler. Imediatamente, vai abrir o Ifound! no dispositivo.
3. A partir desse momento, é possível testar as funcionalidades do aplicativo e qualquer alteração no IDE, como o VS Code, é visível no aplicativo, através de atualizações.
4. Se preferir, aparecerá opções para uso de outros meios, como emuladores virtuais.

![image](https://github.com/user-attachments/assets/02eb6953-cab7-4d36-bedb-5309f577c96e)


Uso

Para começar é necessário o cadastro do usuário.

Após isso, é possível acessar a tela de login.

Se esquecer o login, é possível solicitar recuperação (essa função no aplicativo como MVP, simula uma mensagem por e-mail para esse fim).

Na tela “Seus Medicamentos”, digite o nome do medicamento e o local de armazenamento e, depois para salvar, aperte” Salvar”.  Os dados serão armazenados no aparelho, em banco de dados local, Async-Storage, um componente da biblioteca do React Native.

Para pesquisar ou delatar basta digitar o nome do medicamento e apertar os botões correspondentes.

Com os desenvolvimentos de novas funções e maior número de dados, será necessário migrar para um banco de dados mais robusto.

Assista o vídeo para demonstração.

https://youtu.be/VrBVleb512o





