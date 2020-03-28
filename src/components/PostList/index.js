import React from 'react'
import PostItem from '../PostItem'

import * as S from '../ListWrapper/styled'

const PostList = ({ posts }) => (
    <S.ListWrapper>
        {posts.map(({ 
        node: {
            fields: { slug },
            frontmatter: { background, category, date, description, title },
            timeToRead
        }
        }, index) => (
        <PostItem 
            key={index}
            slug={slug}
            background={background}
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            description={description}
        />
        ))}
    </S.ListWrapper>
)

export default PostList