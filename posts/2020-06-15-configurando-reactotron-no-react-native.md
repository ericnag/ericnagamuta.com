---
title: Configurando Reactotron no React Native
description: Breve tutorial de como configurar o Reactotron em uma aplicação React Native
date: '2020-06-14 08:51:56'
image: assets/img/reactotron.png
category: js
background: '#D6BA32'
---
[Reactotron](https://github.com/infinitered/reactotron) é um inspecionador desktop para aplicações ReactJS e React Native. Com Reactotron fica muito mais fácil monitorar logs de console, requisições à API, ações no Redux e Redux Saga, pois às vezes o fluxo acabado ficando bem complexo de entender. É possível instalar o programa em todas plataformas(Linux, macOS, Windows) através deste [link](https://github.com/infinitered/reactotron/releases).

Eu particularmente gosto muito de utilizá-lo no React Native, pois realizar a inspeção pelo próprio console do navegador deixa a renderização da aplicação mais lenta.

## Configurando Reactotron no projeto

A seguir o passo a passo da configuração, assumindo que você já tenha [criado a aplicação React Native](https://reactnative.dev/docs/environment-setup). 

Em sua aplicação execute:

```bash
$ npm i --save-dev reactotron-react-native

// ou utilizando yarn:

$ yarn add reactotron-react-native
```

Agora em uma pasta de configurações("config/"), crie o arquivo  `ReactotronConfig.js`:

```jsx
import Reactotron from 'reactotron-react-native';
import { AsyncStorage } from 'react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  console.tron = tron;

  tron.clear();
}
```

Como você pode ver essa configuração só funciona em DEV, por motivos de segurança. O `AsyncStorage` eu importei por precaução, pois dependendo da versão que você estiver usando do React Native, a cada *refresh* na aplicação o Reactotron podre abrir uma nova conexão com o emulador.

## Troubleshooting no Android

Caso o Reactotron do Desktop não consiga se conectar com o emulador/dispositivo adicione o IP do seu computador no `Reactotron.configure()`, dessa forma:

```jsx
const tron = Reactotron.configure({ host: 'seu-ip' })
```

Caso o problema ainda persiste, é necessário fazer um redirecionamento de portas no adb do Andorid, com o seguinte comando:

```bash
$ adb reverse tcp:9090 tcp:9090

## caso a variavel adb não esteja configurada no PATH, execute:
$ ~/<local_pasta_Android>/Sdk/plataform-tools/adb reverse tcp:9090 tcp:9090
```

## Utilização

```jsx
import React, {Component} from 'react';
import {View, Text} from 'react-native';

import './config/ReactotronConfig';

console.tron.log('Hello Reactotron!!!!');

export default class App extends Component {
  render() {
    return (
      <View>
        <Text> React Native APP </Text>
      </View>
    );
  }
}
```

Basta importar o `ReactotronConfig` e utilizar o `console.tron.log()` para ver a mensagem no Reactotron:

![reactotron](/assets/img/reactotron.png)

Simples não? E com isto você vai conseguir debuggar sua aplicação com muito mais facilidade!

Um dos motivos de eu ter feito este post é para minha própria consulta, pois sempre que vou criar um projeto React Native do zero, preciso configurar o Reactotron e queria algo breve e direto, assim como este post😅.

Para finalizar, aqui vai uns links interessantes caso queira integrar o [Reactotron com o Redux](https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md) ou [utilizar uma imagem como overlay na estilização do App](https://blog.rocketseat.com.br/3-ferramentas-de-debug-para-react-native/)(conteúdo no final do post feito pelo mestre Diego Fernandes da Rocketseat).