import Image from 'next/image'

//? Grade images
import gradeXH from '../public/grades/XH.png'
import gradeX from '../public/grades/X.png'
import gradeSH from '../public/grades/SH.png'
import gradeS from '../public/grades/S.png'
import gradeA from '../public/grades/A.png'

interface IProps {
  xh_count: number
  x_count: number
  sh_count: number
  s_count: number
  a_count: number
}

const GradeBlock = ({
  xh_count,
  x_count,
  sh_count,
  s_count,
  a_count
}: IProps) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={gradeXH}
          width={64}
          height={64}
          alt="Grade SS +Hidden"
          className="shadow-xl z-10"
        />
        <span>{xh_count}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={gradeX}
          width={64}
          height={64}
          alt="Grade SS"
          className="shadow-xl z-10"
        />
        <span>{x_count}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={gradeSH}
          width={64}
          height={64}
          alt="Grade S +Hidden"
          className="shadow-xl z-10"
        />
        <span>{sh_count}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={gradeS}
          width={64}
          height={64}
          alt="Grade S"
          className="shadow-xl z-10"
        />
        <span>{s_count}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={gradeA}
          width={64}
          height={64}
          alt="Grade A"
          className="shadow-xl z-10"
        />
        <span>{a_count}</span>
      </div>
    </div>
  )
}

export default GradeBlock
