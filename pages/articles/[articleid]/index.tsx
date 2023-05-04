import { useRouter } from 'next/router'
import BackgroundImage from '../../../components/BackgroundImage'
import Layout from '../../../components/Layout'

import { articles } from '../../../constants/Articles'
import Link from 'next/link'
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '../../../components/ui/ScrollArea'

const ArticlePage = () => {
  const router = useRouter()

  const articleid = Number(router.query.articleid) - 1 || 0
  const currentArticle = articles[articleid]

  return (
    <Layout>
      <BackgroundImage />
      <div className="flex flex-row gap-3 max-w-screen-xl h-[40rem] w-full">
        <div className="w-3/12 flex flex-col items-center justify-start p-4 rounded-lg bg-hsl-15 bg-opacity-50 backdrop-blur-xl">
          <div className="border-b-px border-white w-full text-center mb-3 text-2xl font-semibold">
            Article List
          </div>
          {articles.map((article, index) => {
            return (
              <div key={`article-${index}`}>
                <Link href={`/articles/${article.articleId}`}>
                  {article.articleTitle}
                </Link>
              </div>
            )
          })}
        </div>
        <div className="w-9/12 max-h-[40rem] flex flex-col items-center justify-center gap-3">
          <div className="w-full h-14 flex flex-row items-center justify-between p-4 rounded-lg bg-hsl-15 bg-opacity-50 backdrop-blur-xl">
            <Link
              href={`/articles/${currentArticle.articleId - 1}`}
              className="btn btn-md btn-primary"
            >
              Previous article
            </Link>
            {currentArticle.articleTitle}
            <Link
              href={`/articles/${currentArticle.articleId + 1}`}
              className="btn btn-md btn-primary"
            >
              Next article
            </Link>
          </div>
          <div className="w-full h-[calc(100%-4.25rem)] flex flex-col items-center justify-start p-4 rounded-lg bg-hsl-15 bg-opacity-50 backdrop-blur-xl">
            <ScrollArea className="h-full">
              <ScrollAreaViewport className="h-full overflow-hidden">
                <span>{currentArticle.articleBody}</span>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaScrollbar orientation="horizontal">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>

            {/* <div className="flex flex-row justify-self-end gap-3">
              <Link
                href={`/articles/${currentArticle.articleId - 1}`}
                className="btn btn-md btn-primary"
              >
                Previous article
              </Link>
              <Link
                href={`/articles/${currentArticle.articleId + 1}`}
                className="btn btn-md btn-primary"
              >
                Next article
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ArticlePage
