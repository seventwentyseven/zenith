// From - To
export const BadgeGradients = {
  Iron: ['#BAB3AB', '#BAB3AB'],
  Bronze: ['#B88F7A', '#855C47'],
  Silver: ['#E0E0EB', '#A3A3C2'],
  Gold: ['#F0E4A8', '#E0C952'],
  Platinum: ['#A8F0EF', '#52E0DF'],
  Rhodium: ['#D9F8D3', '#A0CF96'],
  Radiant: ['#97DCFF', '#ED82FF'],
  Lustrous: ['#FFE600', '#ED82FF']
}

export const RankColor = (rank: number) => {
  if (rank == 1) {
    return BadgeGradients.Lustrous
  } else if (rank <= 10) {
    return BadgeGradients.Radiant
  } else if (rank <= 50) {
    return BadgeGradients.Rhodium
  } else if (rank <= 100) {
    return BadgeGradients.Platinum
  } else if (rank <= 250) {
    return BadgeGradients.Gold
  } else if (rank <= 500) {
    return BadgeGradients.Silver
  } else if (rank <= 1000) {
    return BadgeGradients.Bronze
  } else {
    return BadgeGradients.Iron
  }
}

export const LevelBadgeColor = (level: number) => {
  if (level <= 19) {
    return BadgeGradients.Iron
  } else if (level <= 39) {
    return BadgeGradients.Bronze
  } else if (level <= 59) {
    return BadgeGradients.Silver
  } else if (level <= 79) {
    return BadgeGradients.Gold
  } else if (level <= 99) {
    return BadgeGradients.Platinum
  } else if (level <= 104) {
    return BadgeGradients.Rhodium
  } else if (level <= 109) {
    return BadgeGradients.Radiant
  } else {
    return BadgeGradients.Lustrous
  }
}

export const SupporterBadgeColor = (months: number) => {
  if (months <= 0) {
    return BadgeGradients.Iron
  } else if (months <= 1) {
    return BadgeGradients.Bronze
  } else if (months <= 3) {
    return BadgeGradients.Silver
  } else if (months <= 6) {
    return BadgeGradients.Gold
  } else if (months <= 9) {
    return BadgeGradients.Platinum
  } else if (months <= 12) {
    return BadgeGradients.Rhodium
  } else if (months <= 24) {
    return BadgeGradients.Radiant
  } else {
    return BadgeGradients.Lustrous
  }
}
