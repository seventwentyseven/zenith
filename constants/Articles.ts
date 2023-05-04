import { TDate } from 'timeago-react'

export interface IArticle {
  articleId: number
  articleTitle: string
  articleBody: string
  articleThumbnail: string
  articleCreationDate: TDate
  authorId: number
  authorName: string
}

export const articles: IArticle[] = [
  {
    articleId: 2,
    articleTitle: 'Article numero dos',
    articleBody:
      'I live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your walls',
    articleThumbnail: 'https://seventwentyseven.xyz/banners/26',
    articleCreationDate: 1674315533116,
    authorId: 3,
    authorName: 'dzifors'
  },
  {
    articleId: 1,
    articleTitle: 'Article numero uno',
    articleBody: 'Lorem ipsum dolor sit amet',
    articleThumbnail: 'https://seventwentyseven.xyz/banners/26',
    articleCreationDate: 1677005187000,
    authorId: 4,
    authorName: 'def750'
  },
]
