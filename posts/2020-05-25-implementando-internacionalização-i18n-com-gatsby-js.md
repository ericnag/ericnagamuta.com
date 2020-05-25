---
title: Implementando internacionalização(i18n) com Gatsby.js
description: >-
  Nesse post explico como implementei a internacionalização(i18n) na tela "Sobre
  mim" deste blog
date: '2020-05-24 08:20:00'
image: assets/img/internacionalizacao.png
category: js
background: '#D6BA32'
---
![internacionalizacao](/assets/img/internacionalizacao.png)

Neste primeiro post decidi escrever sobre como implementei internacionalização(i18n) no meu blog. Por enquanto só atribui essa *feature* à tela "Sobre mim", porém é bem simples de *globaliza-la* na aplicação, o maior trabalho, de fato, será  traduzir os textos😅. A internacionalização permite sua aplicação se expandir e se diversificar no âmbito internacional, além de transmitir uma ótima experiência de usuário.

Existem diversas bibliotecas que auxiliam no processo de internacionalização em uma aplicação, porém a que eu vi que se adapta melhor ao Gatsby.js é a [i18next](https://www.i18next.com/).

Sem mais delongas, vamos a implementação!

## 1 - Instalação

Primeiro, você deve instalar os seguintes pacotes: *i18next* o principal para internacionalização e *react-i18next* que permite o funcionamento com e framework React.

```bash
$ npm install i18next react-i18next --save

// ou utilizando yarn:

$ yarn add i18next react-i18next
```

Agora vamos criar uma pasta `i18n` para armazenar os arquivos de configuração e *wrapper* do componente que vamos criar em seguida. Também, uma pasta vazia `locales` para adicionarmos arquivos JSON com textos traduzidos em diferentes idiomas.

A estrutura de arquivos deve ficar assim:

```bash
project
└───src
│   └───components
│   └───i18n
│       │   config.js
│       │   withTrans.js (nosso componente wrapper)
│   └───locales
│   └───pages
│	...
```



## 2 - Configuração

No arquivo `config.js`, configurei para ter os idiomas português(pt) e inglês(en) :

```react
import i18next from 'i18next';

i18next.init({
    fallbackLng: 'pt',
    resources: {
        'pt': {
            translations: require('../locales/pt/translations.json')
        },
        en: {
            translations: require('../locales/en/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
});

i18next.languages = ['pt', 'en'];

export default i18next;
```

Estou colocando os textos de um certo idioma apenas no arquivo *translations.json*, porém é possível separar os textos em mítiplos arquivos, apenas populando a array `ns: []`.



## 3 - Criando um componente *wrapper* passando a instância do i18next

Este componente é implementado no arquivo `withTrans.js`:

```react
import React, { Component } from 'react';
import i18next from './config';
import { I18nextProvider, withTranslation } from 'react-i18next';

export function withTrans(WrappedComponent) {
    WrappedComponent = withTranslation()(WrappedComponent);

    return class extends Component {
      render() {
        return (
          <I18nextProvider i18n={i18next}>
            <WrappedComponent {...this.props} language={i18next.language} />
          </I18nextProvider>
        );
      }
    }
}
```

O código acima será usado como um [componente de ordem superior (HOC, do inglês Higher-Order Component)](https://pt-br.reactjs.org/docs/higher-order-components.html) para trabalhar com o componente About(usado na página "Sobre mim"). Para disponibilizar a configuração do i18next em todos os nossos componentes e páginas, precisamos envolver o componente de layout com o `I18nextProvider`.

A função `withTranslation()` fornecida pelo react-18next passa via *props* a função *t* e a instância de i18n para o  `WrappedComponent` que no nosso caso é o About.



## 4 - Usando HOC no componente About e traduzindo texto

Vamos importar o componente *wrapper* que criamos, dentro do component About:

```react
import React from "react"
import LanguageMenu from "../components/LanguageMenu"
import { withTrans } from "../i18n/withTrans"

const About = ({ children, t, i18n }) => {
  return (
    <div>
      <LanguageMenu />

      <h1>{t("header")}</h1>

      <p>{t("paragraph1")}</p>

      <p>{t("paragraph2")}</p>

      <p>{t("paragraph3")}</p>
    </div>
  )
}

export default withTrans(About)
```

O componente *wrapper* é um HOC para obter a função t e a instância i18n dentro do componente About. Isso pode nos ajudar a traduzir qualquer texto no cabeçalho e rodapé. 

Eu uso a desestruturação de objetos para simplificar como obtemos os objetos dentro do componente About. Assim que obtivermos a função t, ela procurará as chaves do nosso *namespace* padrão "translations". Os arquivos JSON com os textos traduzidos devem ser estruturados da seguinte forma:

```bash
|____locales
| |____pt
| | |____translations.json
| |____en
| | |____translations.json
```

Exemplo de arquivo `translations.json`:

```json
{
    "header": "Cabeçalho em português",
    "paragraph1":"Texto paragrafo 1 em português",
    "paragraph2": "Texto paragrafo 2 em português",
    "paragraph3": "Texto paragrafo 3 em português"
}
```



## 5 - Adicionando menu *dropdown* para o usuário selecionar entre diferentes linguagens

A última coisa a ser feita é fazer um dropdown para que usuários consigam selecionar o idioma de sua preferência.

Optei por utilizar o Material-UI, em um primeiro momento, para facilitar, porém irei criar meu próprio componente *dropdown* ou *toggle* posteriormente.

Para instalar o Material-UI, basta executar os seguintes comandos:

```bash
$ npm install @material-ui/core

// ou utilizando yarn:

$ yarn add @material-ui/core
```

Chamei o *dropdown* de `LanguageMenu`, ficará da seguinte forma:

```react
import React, { useState } from "react"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from "react-i18next"

import ptLogo from "../../../assets/pt.png"
import enLogo from "../../../assets/en.png"

const LanguageMenu = (props) => {
  const { t, i18n } = useTranslation()
  
  const [values, setValues] = useState({
    language: 'pt'
  });

  function handleChange(event) {
    i18n.changeLanguage(event.target.value)

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return(
    <Select
      value={values.language}
      onChange={(e) => handleChange(e)}
      disableUnderline
      inputProps={{
        name: 'language'
      }}
    >
      <MenuItem value={'en'}><img src={enLogo} alt="EN" /></MenuItem>
      <MenuItem value={'pt'}><img src={ptLogo} alt="PT" /></MenuItem>
    </Select>
  )
}

export default LanguageMenu
```

Utilizamos o *hook* `useTranslation()` da lib `react-i18next` para "pegar" a instância do i18n criada, assim conseguimos lidar com a troca de idioma selecionado no *dropdown* pelo usuário, utilizando a função `handleChang()`.

A seguir a tela onde apliquei internacionalização aqui no blog. Dá uma conferida lá!

![internacionalizacao-about](/assets/img/i18n-blog-about.png)

Essa foi uma breve implementação de internacionalização (i18n) com Gatsby, ainda vou aplicar este processo em todos os textos do blog. Se você estiver interessado no código completo do blog, pode encontrar [aqui](https://github.com/ericnag/ericnagamuta.com). Qualquer comentário ou feedback fique à vontade. Até a próxima!