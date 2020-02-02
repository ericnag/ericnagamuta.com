import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem 
      slug="/about/"
      background="red"
      category="Misc"
      date="2 de Fevereiro de 2019"
      timeToRead="2"
      title="Só virei Dev depois de engajar no mercado de trabalho"
      description="Um pouco da experiência que eu tive ao entrar no mercado de trabalho como desenvolvedor."
    />
  </Layout>
)

export default IndexPage
