import { useEffect, useState } from 'react'
import { TDate } from 'timeago-react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const PPChart = ({
  userid,
  gamemode
}: {
  userid: number
  gamemode: number
}) => {
  const [ppArray, setPpArray] = useState<number[]>([])
  const [datesArray, setDatesArray] = useState<TDate[]>([])

  let chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      background: 'rgba(0,0,0,0)'
    },
    stroke: { curve: 'smooth', width: 3 },
    legend: { show: false },
    colors: ['hsl(var(--main), 60%, 60%)'],
    grid: { show: false },
    theme: {
      mode: 'dark'
    },
    markers: {
      size: 0,
      colors: 'hsl(var(--main), 50%, 50%)',
      strokeWidth: 0,
      hover: { size: 7 }
    },
    // Data
    series: [
      {
        name: 'PP',
        data: ppArray
      }
    ],
    xaxis: {
      categories: datesArray,
      labels: { show: false },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: { labels: { show: false } }
  }

  useEffect(() => {
    const fetchPpHistory = async () => {
      console.log(`userid: ${userid}`)
      console.log(`gamemode: ${gamemode}`)

      let newDatesArray: TDate[] = []
      let newPpArray: number[] = []

      const response = await fetch(
        `https://seventwentyseven.xyz/wapi/get_pp_history?u=${userid}&m=${gamemode}`
      )
      const ppHistory = await response.json()

      for (let entry of ppHistory.data) {
        newDatesArray.push(
          new Date(entry.date).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })
        )
        newPpArray.push(entry.pp)
      }

      setPpArray(newPpArray)
      setDatesArray(newDatesArray)
    }
    fetchPpHistory()
  }, [userid, gamemode])

  if (ppArray.length === 0 || datesArray.length === 0)
    return <div>No pp data found</div>

  return (
    <ApexCharts
      width={600}
      height={200}
      type="line"
      options={chartOptions}
      series={[{ name: 'pp', data: ppArray }]}
    />
  )
}

export default PPChart
