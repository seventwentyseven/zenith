import { Table } from 'flowbite-react'
import { ISODateString } from 'next-auth'

interface IAccountStandingEntry {
  id: number
  msg: string
  date: ISODateString
  // rest is optional
  from_id?: number
  from_name?: string
  from_country?: string
  to_id?: number
  to_name?: string
  to_country?: string
}

// depending on requester privileges show this block as
// normal: Account Standing
// staff: Account History
// head admin: Account History + Edit button
const AccountStandingSection = () => {
  // Fetch
  return (
    <section className="flex flex-col w-full py-4 bg-hsl-10 bg-opacity-50 backdrop-blur-xl px-8 rounded-3xl -z-10 my-3">
      <div className="text-xl font-bold border-b-2 border-hsl-50 pb-0.5 w-min whitespace-nowrap ml-2">
        Account Standing
      </div>
      {/* Table with following fields 
        Moderator: flag + username
        Action: Bullet badge with action taken
        Reason: String (Add duration in case of timed actions)
        Date: Date
        Additionaly, if Head Admin or owner, On right edit button

        // Data for normal users
        Action
        Reason
        Date
      */}
      <div className="relative overflow-x-auto mt-1">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs text-hsl-80 uppercase">
            <tr>
              <th scope="col" className="px-2 py-3">
                Admin
              </th>
              <th scope="col" className="px-7 py-3">
                Action
              </th>
              <th scope="col" className="px-3 py-3">
                Reason
              </th>
              <th scope="col" className="px-3 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/PL.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    def750
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                <div className="w-28 py-0.5 inline-flex bg-red-500 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-red-900 uppercase pl-2">
                    TOURN. BAN
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                1 year, cheating
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">1 day ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/PL.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    def750
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                <div className="w-28 py-0.5 inline-flex bg-lime-500 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-green-900 uppercase pl-2">
                    UNRESTRICT
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                2nd Chance
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">1 day ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/PT.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    Dolphin_
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                {/* bullet badge */}
                <div className="w-28 py-0.5 inline-flex bg-red-500 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-rose-900 uppercase pl-2">
                    RESTRICT
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                Cheating (Blatant)
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">4 months ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/JP.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    minatoaqua2
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                {/* bullet badge */}
                <div className="w-28 py-0.5 inline-flex bg-yellow-300 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-yellow-900 uppercase pl-2">
                    SILENCE
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                Harassment (30 days) (Expired)
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">5 months ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/PL.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    dzifors
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                {/* bullet badge */}
                <div className="w-28 py-0.5 inline-flex bg-blue-500 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-teal-900 uppercase pl-2">
                    NOTE
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                Previous Multiaccounts + Ban Evasion on Userids: 334, 557, 1075,
                2230, 3340. All restricted
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">1 year ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                ></a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/GB.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    Thief
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                {/* bullet badge */}
                <div className="w-28 py-0.5 inline-flex bg-lime-500 rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-green-900 uppercase pl-2">
                    UNSILENCE
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                Nah
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">1 year ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td className="pl-2 pr-4 mb-2 mr-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://seventwentyseven.xyz/static/images/flags/BR.png`}
                    alt={`Poland`}
                    className="h-5 w-auto"
                  />
                  <a
                    href="#"
                    className="font-medium text-hsl-90 hover:text-hsl-80 hover:underline transition-colors duration-100"
                  >
                    Min60
                  </a>
                </div>
              </td>
              <td className="px-6 mb-2">
                {/* bullet badge */}
                <div className="w-28 py-0.5 inline-flex bg-[#05041d] rounded-full">
                  <span className="text-sm leading-5 font-bold font-nunito text-yellow-300 uppercase pl-2">
                    DEMOTION
                  </span>
                </div>
              </td>
              <th scope="row" className="px-3 mb-2 font-medium ">
                Lying, banning people for no reason, being a general asshole
              </th>
              <td className="px-3 mb-2 whitespace-nowrap">2 years ago</td>
              <td className="pl-3 mb-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AccountStandingSection
