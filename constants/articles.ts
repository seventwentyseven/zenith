export interface IArticle {
  articleId: number
  articleTitle: string
  articleBody: string
  articleThumbnail: string
  articleCreationDate: number
  authorId: number
  authorName: string
}

export const articles: IArticle[] = [
  {
    articleId: 1,
    articleTitle: 'Article numero uno',
    articleBody: 'Lorem ipsum dolor sit amet',
    articleThumbnail: 'https://seventwentyseven.xyz/banners/26',
    articleCreationDate: 142387651234687,
    authorId: 4,
    authorName: 'def750',
  },
  {
    articleId: 2,
    articleTitle: 'Article numero dos',
    articleBody:
      'I live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your wallsI live in your walls',
    articleThumbnail: 'https://seventwentyseven.xyz/banners/26',
    articleCreationDate: 2345768436758,
    authorId: 3,
    authorName: 'dzifors'
  }
]
