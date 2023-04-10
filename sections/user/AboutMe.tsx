import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const AboutMeSection = ({ aboutMe }: { aboutMe: string | null }) => {
  if (aboutMe === null) return <></>

  return (
    <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
      <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
        About Me
      </div>
      <div className="p-2">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {aboutMe.replaceAll('\n', '  \n\n')}
        </ReactMarkdown>
      </div>
    </section>
  )
}

export default AboutMeSection
