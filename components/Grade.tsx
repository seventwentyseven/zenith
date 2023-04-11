import gradeA from '../assets/grades/A.png'
import gradeB from '../assets/grades/B.png'
import gradeC from '../assets/grades/C.png'
import gradeD from '../assets/grades/D.png'
import gradeF from '../assets/grades/F.png'
import gradeS from '../assets/grades/S.png'
import gradeSH from '../assets/grades/SH.png'
import gradeX from '../assets/grades/X.png'
import gradeXH from '../assets/grades/XH.png'

import Image, { StaticImageData } from 'next/image'

interface IProps {
  name: string
}

interface IGradeImageMap {
  [key: string]: StaticImageData
}

const GradeImageMap: IGradeImageMap = {
  XH: gradeXH,
  X: gradeX,
  SH: gradeSH,
  S: gradeS,
  A: gradeA,
  B: gradeB,
  C: gradeC,
  D: gradeD,
  F: gradeF
}

const Grade = ({ name }: IProps) => {
  return <Image src={GradeImageMap[name] || gradeF} alt={name} />
}

export default Grade
