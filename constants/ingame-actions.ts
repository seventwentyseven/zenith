export const getActionStringFromInt = (
  actionInteger: number,
  actionText: string
) => {
  switch (actionInteger) {
    case 0:
      return 'Idle'
    case 1:
      return 'AFK'
    case 2:
      return `Playing ${actionText}`
    case 3:
      return `Editing ${actionText}`
    case 4:
      return `Modding ${actionText}`
    case 5:
      return 'In multiplayer (Selecting song)'
    case 6:
      return `Watching ${actionText}`
    case 8:
      return `Testing ${actionText}`
    case 9:
      return `Submitting ${actionText}`
    case 11:
      return 'In multiplayer (Idle)'
    case 12:
      return `In multiplayer (Playing ${actionText})`
    case 13:
      return 'Looking for maps in osu! direct'
    default:
      return 'Unimplemented action'
  }
}
