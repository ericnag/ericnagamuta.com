import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import * as S from "./about-styled"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <S.Container>
      <h1>Quem é Eric Nagamuta?</h1>

      <p>
        Desenvolvedor Full-Stack que preza por explorar novas tecnologias e encarar grandes desafios. Entusiasta da linguagem JavaScript e seus frameworks, além de explorar as áreas de Machine Learning e Inteligência Artificial. Atualmente atua como desenvolvedor Java Back-End.
      </p>

      <p>
        Graduado pela Universidade Federal da Grande Dourados(UFGD) no curso Bacharelado em Sistemas de Informação. Durante a graduação participou do Programa Institucional de Iniciação Científica desenvolvendo o plano de trabalho “Conversão Automática, para Relações Binárias, de Relações de Associação Extraídas de Forma Automatizada”.
      </p>

      <p>
      Seu maior objetivo é se tornar uma referência na área de atuação, sempre aprendendo, compartilhando conhecimentos e claro com muita dedicação. Além disso, acredita que com uma equipe exemplar, dedicada, onde todos colaboram e cada um faz sua parte, algo extraordinário acontece. 
      </p>
    </S.Container>
  </Layout>
)

export default AboutPage
