import styled from "styled-components"
import media from 'styled-media-query'

export const SearchWrapper = styled.section`
  background: var(--background);
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: opacity 0.4s;

    ${media.lessThan("large")`
        padding-bottom: 3.5rem;
    `}
`

export const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    padding: 6rem 3rem 0.5rem 3rem;

    ${media.lessThan("large")`
        padding: 1rem 1.0rem;
    `}
`
export const SearchInput = styled.div`
    color: var(--texts);
    display: flex;
    padding: 0.5rem;
    width: 100%;
    & input {
        color: var(--texts);
        background: none;
        border: none;
        border-bottom: 1px solid var(--borders);
        display: flex;
        font-size: 1.6rem;
        padding: 0.5rem;
        width: 100%;
        &::placeholder {
            color: var(--texts);
        }
    }
    & span {
        color: var(--texts);
        cursor: pointer;
        height: 3.75rem;
        padding: 0.6rem 3.8rem;
        position: absolute;
        right: 5.5rem;
        width: 3.75rem;

        ${media.lessThan("large")`
            right: 0;
        `}

        & svg {
            width: 1.8rem;
            height: 1.8rem;
        }
        &:hover {
            color: var(--highlight);
        }
    }
`

export const ClearIcon = styled.span`
  cursor: pointer;
  display: block;
  height: 3.75rem;
  padding: 1.1rem;
  position: absolute;
  right: 84px;
  width: 3.75rem;
  color:var(--borders);
  &:hover {
    color: var(--highlight);
  }
`

export const Stats = styled.div`
    padding: 0.5rem;
    color: var(--texts);
`