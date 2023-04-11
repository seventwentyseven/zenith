import Mod1K from '../assets/mods/Mod1K.png'
import Mod2K from '../assets/mods/Mod2K.png'
import Mod3K from '../assets/mods/Mod3K.png'
import Mod4K from '../assets/mods/Mod4K.png'
import Mod5K from '../assets/mods/Mod5K.png'
import Mod6K from '../assets/mods/Mod6K.png'
import Mod7K from '../assets/mods/Mod7K.png'
import Mod8K from '../assets/mods/Mod8K.png'
import Mod9K from '../assets/mods/Mod9K.png'
import ModAutopilot from '../assets/mods/ModAutopilot.png'
import ModAutoplay from '../assets/mods/ModAutoplay.png'
import ModCinema from '../assets/mods/ModCinema.png'
import ModCOOP from '../assets/mods/ModCOOP.png'
import ModDoubleTime from '../assets/mods/ModDoubleTime.png'
import ModEasy from '../assets/mods/ModEasy.png'
import ModFader from '../assets/mods/ModFader.png'
import ModFlashlight from '../assets/mods/ModFlashlight.png'
import ModHalfTime from '../assets/mods/ModHalfTime.png'
import ModHardRock from '../assets/mods/ModHardRock.png'
import ModHidden from '../assets/mods/ModHidden.png'
import ModMirror from '../assets/mods/ModMirror.png'
import ModNightcore from '../assets/mods/ModNightcore.png'
import ModNoFail from '../assets/mods/ModNoFail.png'
import ModPerfect from '../assets/mods/ModPerfect.png'
import ModRandom from '../assets/mods/ModRandom.png'
import ModRelax from '../assets/mods/ModRelax.png'
import ModScoreV2 from '../assets/mods/ModScoreV2.png'
import ModSpunOut from '../assets/mods/ModSpunOut.png'
import ModSuddenDeath from '../assets/mods/ModSuddenDeath.png'
import ModTargetPractice from '../assets/mods/ModTargetPractice.png'
import ModTouchDevice from '../assets/mods/ModTouchDevice.png'

export enum Mods {
  NoMod = 0,
  NoFail = 1 << 0,
  Easy = 1 << 1,
  Touchdevice = 1 << 2, // old: 'NOVIDEO'
  Hidden = 1 << 3,
  HardRock = 1 << 4,
  SuddenDeath = 1 << 5,
  DoubleTime = 1 << 6,
  Relax = 1 << 7,
  HalfTime = 1 << 8,
  Nightcore = 1 << 9,
  Flashlight = 1 << 10,
  Autoplay = 1 << 11,
  SpunOut = 1 << 12,
  Autopilot = 1 << 13,
  Perfect = 1 << 14,
  Key4 = 1 << 15,
  Key5 = 1 << 16,
  Key6 = 1 << 17,
  Key7 = 1 << 18,
  Key8 = 1 << 19,
  Fader = 1 << 20,
  Random = 1 << 21,
  Cinema = 1 << 22,
  Target = 1 << 23,
  Key9 = 1 << 24,
  KeyCOOP = 1 << 25,
  Key1 = 1 << 26,
  Key3 = 1 << 27,
  Key2 = 1 << 28,
  ScoreV2 = 1 << 29,
  Mirror = 1 << 30
}

export const ModImages = [
  { mod: Mods.NoFail, source: ModNoFail },
  { mod: Mods.Easy, source: ModEasy },
  { mod: Mods.Touchdevice, source: ModTouchDevice },
  { mod: Mods.Hidden, source: ModHidden },
  { mod: Mods.HardRock, source: ModHardRock },
  { mod: Mods.SuddenDeath, source: ModSuddenDeath },
  { mod: Mods.DoubleTime, source: ModDoubleTime },
  { mod: Mods.Relax, source: ModRelax },
  { mod: Mods.HalfTime, source: ModHalfTime },
  { mod: Mods.Nightcore, source: ModNightcore },
  { mod: Mods.Flashlight, source: ModFlashlight },
  { mod: Mods.Autoplay, source: ModAutoplay },
  { mod: Mods.SpunOut, source: ModSpunOut },
  { mod: Mods.Autopilot, source: ModAutopilot },
  { mod: Mods.Perfect, source: ModPerfect },
  { mod: Mods.Key4, source: Mod4K },
  { mod: Mods.Key5, source: Mod5K },
  { mod: Mods.Key6, source: Mod6K },
  { mod: Mods.Key7, source: Mod7K },
  { mod: Mods.Key8, source: Mod8K },
  { mod: Mods.Fader, source: ModFader },
  { mod: Mods.Random, source: ModRandom },
  { mod: Mods.Cinema, source: ModCinema },
  { mod: Mods.Target, source: ModTargetPractice },
  { mod: Mods.Key9, source: Mod9K },
  { mod: Mods.KeyCOOP, source: ModCOOP },
  { mod: Mods.Key1, source: Mod1K },
  { mod: Mods.Key3, source: Mod3K },
  { mod: Mods.Key2, source: Mod2K },
  { mod: Mods.ScoreV2, source: ModScoreV2 },
  { mod: Mods.Mirror, source: ModMirror }
]
