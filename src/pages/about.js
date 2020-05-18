import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import LanguageMenu from "../components/LanguageMenu"

import { withTrans } from "../i18n/withTrans"

import * as S from "../styles/about-styled.js"

const AboutPage = ({ children, t, i18n }) => {
  return (
    <Layout>
      <SEO title="About" />
      <S.Container>
        <S.Language>
         <LanguageMenu />
        </S.Language>
        <h1>{t("header")}</h1>

        <p>{t("paragraph1")}</p>

        <p>{t("paragraph2")}</p>

        <p>{t("paragraph3")}</p>
      </S.Container>
    </Layout>
  )
}

export default withTrans(AboutPage)
