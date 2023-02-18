import Link from 'next/link'
import TimeAgo from 'timeago-react'
import { articles } from '../../constants/articles'
import Card from '../cards/card'

const ArticleList = () => {
  return (
    <div className="h-full w-[calc(70%+2rem)] mx-2 flex flex-col items-center justify-center mt-2">
      {articles.map((article, index) => (
        <Card
          key={`article-${index}`}
          callToAction=<Link
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            href={`/articles/${article.articleId}`}
          >
            Read more
          </Link>
          title=<Link
            href={`/articles/${article.articleId}`}
            className="mx-auto text-xl font-semibold mb-2 cursor-pointer select-none duration-100 text-white hover:text-hsl-60"
          >
            {article.articleTitle}
          </Link>
          description={article.articleBody}
          topBlock=<img
            src={article.articleThumbnail}
            alt="Article thumbnail"
            className="rounded-t-lg"
          ></img>
          bottomBlock=<div className="text-white/60">
            Created by{' '}
            <Link
              href={`/user/${article.authorId}`}
              className="duration-100 hover:text-hsl-60"
            >
              {article.authorName}
            </Link>{' '}
            <TimeAgo datetime={article.articleCreationDate}></TimeAgo>
          </div>
        />
      ))}
    </div>
  )
}

export default ArticleList
