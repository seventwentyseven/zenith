import Grade from '../../Grade'

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
    <div className="grid grid-cols-6 grid-rows-2 gap-y-3 w-11/12 mx-auto items-center justify-center mt-6 ml-5 pointer-events-none select-none">
      <div className="flex flex-col w-16 items-center justify-center col-span-3 ml-[38px]">
        <Grade name="XH" />
        <span>{xh_count}</span>
      </div>
      <div className="flex flex-col w-16 items-center justify-center col-span-3 mr-[38px]">
        <Grade name="X" />
        <span>{x_count}</span>
      </div>
      <div className="flex flex-col w-16 items-center justify-center col-span-2">
        <Grade name="SH" />
        <span>{sh_count}</span>
      </div>
      <div className="flex flex-col w-16 items-center justify-center col-span-2">
        <Grade name="S" />
        <span>{s_count}</span>
      </div>
      <div className="flex flex-col w-16 items-center justify-center col-span-2">
        <Grade name="A" />
        <span>{a_count}</span>
      </div>
    </div>
  )
}

export default GradeBlock
