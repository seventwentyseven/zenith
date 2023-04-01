export interface IRecentRanked {
  bmapId: number
  bmapSetId: number
  bmapArtist: string
  bmapTitle: string
  bmapRankedStatus: string
  bmapGamemode: number
  nominatorId: number
  nominatorName: string
  nominationDate: Date
}

export const recentRanked: IRecentRanked[] = [
  {
    bmapId: 432765,
    bmapSetId: 915929,
    bmapArtist: 'DJ SHARPNEL',
    bmapTitle: 'BLUE NOAH 2006',
    bmapRankedStatus: 'Ranked',
    bmapGamemode: 3,
    nominatorId: 4,
    nominationDate: new Date('2022-12-14 11:30:59'),
    nominatorName: 'def750'
  },
  {
    bmapId: 432765,
    bmapSetId: 1067061,
    bmapArtist: 'B.S.E. (Backbone Sebone Ensemble)',
    bmapTitle: 'volcanator',
    bmapRankedStatus: 'Loved',
    bmapGamemode: 3,
    nominatorId: 4,
    nominationDate: new Date('2022-08-14 11:30:59'),
    nominatorName: 'def750'
  }
]
