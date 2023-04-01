const getLevelScoreRequirement = (level: number) => {
  if (level <= 0) return 0
  if (level <= 100)
    return Number(
      Math.floor(
        (5000 / 3) * (4 * Math.pow(level, 3) - 3 * Math.pow(level, 2) - level) +
          Math.floor(1.25 * Math.pow(1.8, level - 60))
      )
    )
  return Number(26931190827 + 99999999999 * (level - 100))
}

const getLevelFromScore = (totalScore: number) => {
  let i = 1
  while (getLevelScoreRequirement(i) < totalScore) i += 1
  return Number(i)
}

export { getLevelScoreRequirement, getLevelFromScore }
