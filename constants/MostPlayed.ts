export interface IMostPlayed {
  bmapId: number
  bmapSetId: number
  bmapArtist: string
  bmapTitle: string
  bmapVersion: string
  bmapGamemode: number
  playCount: number
}

export const mostPlayed: IMostPlayed[] = [
  {
    bmapId: 1236756,
    bmapSetId: 584575,
    bmapTitle: 'sans.',
    bmapArtist: 'toby fox',
    bmapGamemode: 0,
    bmapVersion: 'Hard',
    playCount: 3
  },
  {
    bmapId: 2269080,
    bmapSetId: 1085059,
    bmapTitle: 'Sasaki Ha Kirawarete Iru. (FALCHiON Bootleg)',
    bmapArtist: 'Sasaki Saku',
    bmapGamemode: 0,
    bmapVersion: 'Gravepassing',
    playCount: 1
  },
  {
    bmapId: 710881,
    bmapSetId: 319375,
    bmapTitle: 'Wings (Nu:Logic Remix)',
    bmapArtist: 'Birdy',
    bmapGamemode: 0,
    bmapVersion: 'Freedom',
    playCount: 1
  }
]
