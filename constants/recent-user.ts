export interface IRecentUser {
  name: string
  id: number
  joinDate: Date
}

export const recentUser: IRecentUser[] = [
  { name: 'dzifors', id: 3, joinDate: new Date('2022-12-14 11:30:59') },
  { name: 'def750', id: 4, joinDate: new Date('2022-08-14 11:30:59') }
]
