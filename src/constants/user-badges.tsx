import { ReactNode } from 'react'
import { UserPrivileges } from './user-privileges'
import {
  FaCrown,
  FaHeart,
  FaMusic,
  FaRegSnowflake,
  FaUserCheck,
  FaUserTie,
  FaUsers,
  FaWheelchair
} from 'react-icons/fa'
import { ImHammer2 } from 'react-icons/im'
import { MdCode, MdMusicNote, MdOutlineShield } from 'react-icons/md'

export type Badge = {
  privilege: UserPrivileges
  privilegeName: string
  className: string
  icon: ReactNode
}

export const Badges: Badge[] = [
  {
    privilege: UserPrivileges.OWNER,
    privilegeName: 'Owner',
    className: 'from-rose-600 to-pink-500 text-red-100',
    icon: <FaCrown className="text-xl" />
  },
  {
    privilege: UserPrivileges.DEVELOPER,
    privilegeName: 'Developer',
    className: 'from-purple-700 to-fuchsia-700 text-purple-100',
    icon: <MdCode className="text-xl" />
  },
  {
    privilege: UserPrivileges.HEAD_ADMIN,
    privilegeName: 'Head Administrator',
    className: 'from-red-500 to-red-700 text-red-100',
    icon: <FaUserTie className="text-xl" />
  },
  {
    privilege: UserPrivileges.ADMINISTRATOR,
    privilegeName: 'Administrator',
    className: 'from-yellow-600 to-amber-400 text-yellow-100',
    icon: <ImHammer2 className="text-xl" />
  },
  {
    privilege: UserPrivileges.MODERATOR,
    className: 'from-green-700 to-emerald-500 text-green-100',
    privilegeName: 'mod',
    icon: <MdOutlineShield className="text-xl" />
  },
  {
    privilege: UserPrivileges.COMMUNITY_MANAGER,
    privilegeName: 'Community Manager',
    className: 'from-blue-500 to-sky-700 text-blue-100',
    icon: <FaUsers className="text-xl" />
  },
  {
    privilege: UserPrivileges.QATS,
    privilegeName: 'Quality Assessor',
    className: 'from-sky-600 to-cyan-400 text-blue-100',
    icon: <FaMusic className="text-xl" />
  },
  {
    privilege: UserPrivileges.NOMINATORS,
    privilegeName: 'Nominator',
    className: 'from-blue-600 to-sky-400 text-blue-100',
    icon: <MdMusicNote className="text-xl" />
  },
  {
    privilege: UserPrivileges.ALUMNI,
    privilegeName: 'Alumni',
    className: 'from-gray-400 to-gray-500 text-black',
    icon: <FaWheelchair className="text-xl" />
  },
  {
    privilege: UserPrivileges.SUPPORTER,
    privilegeName: 'Supporter',
    className: 'from-pink-400 to-pink-500 text-pink-100',
    icon: <FaHeart className="text-xl" />
  },
  {
    privilege: UserPrivileges.WHITELISTED,
    privilegeName: 'Whitelisted',
    className: 'from-green-400 to-green-500 text-green-100',
    icon: <FaUserCheck className="text-xl" />
  },
  {
    privilege: UserPrivileges.FROZEN,
    privilegeName: 'Frozen',
    className: 'from-blue-200 to-gray-200 text-black',
    icon: <FaRegSnowflake className="text-xl" />
  }
]
