import gradeXH from '../public/grades/XH.png'
import gradeX from '../public/grades/X.png'
import gradeSH from '../public/grades/SH.png'
import gradeS from '../public/grades/S.png'
import gradeA from '../public/grades/A.png'
import gradeB from '../public/grades/B.png'
import gradeC from '../public/grades/C.png'
import gradeD from '../public/grades/D.png'
import gradeF from '../public/grades/F.png'

import Image from 'next/image'

interface IProps {
  name: string
}

const GradeImage = ({ name }: IProps) => {
  let imageSrc

  switch (name) {
    case 'XH':
      imageSrc = gradeXH
      break
    case 'X':
      imageSrc = gradeX
      break
    case 'SH':
      imageSrc = gradeSH
      break
    case 'S':
      imageSrc = gradeS
      break
    case 'A':
      imageSrc = gradeA
      break
    case 'B':
      imageSrc = gradeB
      break
    case 'C':
      imageSrc = gradeC
      break
    case 'D':
      imageSrc = gradeD
      break
    case 'F':
    default:
      imageSrc = gradeF
      break
  }

  return <Image src={imageSrc} alt={name} />
}

export default GradeImage
