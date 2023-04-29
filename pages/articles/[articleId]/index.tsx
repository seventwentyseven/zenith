import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import BackgroundImage from '../../../components/BackgroundImage'

import { articles } from '../../../constants/Articles'

const ArticlePage = () => {
  const router = useRouter()
  const { articleId } = router.query
  return (
    <Layout>
      <BackgroundImage />
      <div>{articles[Number(articleId)].articleBody}</div>
    </Layout>
  )
}

export default ArticlePage
