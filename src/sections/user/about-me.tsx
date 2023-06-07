import { useContext } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { UserContext } from '~/pages/user/[user]'

const AboutMe = () => {
  const { userData: ctx } = useContext(UserContext)
  if (!ctx.userpage_content) return null
  const content = ctx.userpage_content.replaceAll('\n', '\n\n')

  return (
    <section className="my-3 flex w-full flex-col rounded-3xl bg-hsl-35-10 bg-opacity-80 px-8 py-4">
      <div className="ml-2 w-min whitespace-nowrap border-b-2 border-hsl-50 pb-0.5 text-xl font-bold">
        About Me
      </div>
      <div className="prose prose-invert max-w-full p-2">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </section>
  )
}

export default AboutMe
