import React, { useReducer, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"
import Pagination from "../components/Pagination"

import { postsQuery } from "../utils/post_list_query"

import { postsReducer } from "../redux/reducer"
import { SET_POSTS } from "../redux/actions"

import * as S from "../components/ListWrapper/styled"

const BlogList = props => {
  //const [posts, dispatch] = useReducer(postsReducer, [])

  const posts = props.data.allMarkdownRemark.edges;
  // useEffect(() => {
  //   console.log('PROPS: ', props)
  //   //dispatch({ type: SET_POSTS, payload: props.data.allMarkdownRemark.edges })
  // }, [props])

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="Home" />
      <S.ListWrapper>
        {posts.map(
          ({
            node: {
              frontmatter: { background, category, date, description, title },
              timeToRead,
              fields: { slug },
            },
          }) => (
            <PostItem
              slug={slug}
              background={background}
              category={category}
              date={date}
              timeToRead={timeToRead}
              title={title}
              description={description}
            />
          )
        )}
      </S.ListWrapper>

      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Layout>
  )
}

export const query = postsQuery

export default BlogList
