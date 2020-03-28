import React, { useState, useEffect, useRef } from "react"

import { Clear } from "styled-icons/material/Clear"
import * as S from "./styled"
import PostList from "../PostList"

const Search = ({ props }) => {
  const posts = props.data.allMarkdownRemark.edges
  const refInput = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    const results = posts.filter(({ node: { frontmatter } }) => {
      const values = Object.values(frontmatter) || []
      return values.some(child => {
        const filterValue = String(searchTerm)
          .trim()
          .toLowerCase()
        return child
          .trim()
          .toLowerCase()
          .includes(filterValue)
      })
    })
    setSearchResults(results)
  }, [searchTerm])

  const statsString = () => {
    const number = `${
      searchResults.length === 0 ? "Nenhum" : searchResults.length
    }`
    const plural = searchResults.length > 1 ? "s" : ""
    return `${number} resultado${plural} encontrado${plural}`
  }

  return (
    <S.SearchWrapper>
      <S.SearchBox>
        <S.SearchInput>
          <input
            placeholder="Pesquisar..."
            autoFocus
            value={searchTerm}
            onChange={handleChange}
            ref={refInput}
          />
          {refInput && refInput.current && refInput.current.value && (
            <span
              onClick={() => {
                refInput.current.value = ""
                refInput.current.focus()
                setSearchTerm('')
              }}
            >
              <Clear />
            </span>
          )}
        </S.SearchInput>
        <S.Stats>{statsString()}</S.Stats>
      </S.SearchBox>
      <PostList posts={searchResults} />
    </S.SearchWrapper>
  )
}

export default Search
