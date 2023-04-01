import Link from 'next/link'
import TimeAgo from 'timeago-react'
import { articles } from '../../constants/articles'
import Card from '../Card'

const ArticleList = () => {
  return (
    <div className="h-full w-[calc(70%+2rem)] mx-2 flex flex-col items-center justify-center mt-2">
      {articles.reverse().map((article, index) => (
        <Card
          key={`article-${index}`}
          callToAction={
            <Link
              className="btn btn-md btn-primary"
              style={{ display: 'inline-block' }}
              href={`/articles/${article.articleId}`}
            >
              Read more
            </Link>
          }
          title={
            <Link
              href={`/articles/${article.articleId}`}
              className="mx-auto text-xl font-semibold mb-2 cursor-pointer select-none duration-100 text-white hover:text-hsl-60"
            >
              {article.articleTitle}
            </Link>
          }
          description={article.articleBody}
          topBlock={
            <img
              src={article.articleThumbnail}
              alt="Article thumbnail"
              className="rounded-t-lg"
            />
          }
          bottomBlock={
            <div className="text-white/60">
              Created by{' '}
              <Link
                href={`/user/${article.authorId}`}
                className="duration-100 hover:text-hsl-60"
              >
                {article.authorName}
              </Link>{' '}
              <TimeAgo datetime={article.articleCreationDate} />
            </div>
          }
        />
      ))}
    </div>
  )
}

export default ArticleList
