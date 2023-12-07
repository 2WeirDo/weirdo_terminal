import { CommandType } from '../../command'
import { useTerminalConfigStore } from '../../../stores/terminalConfigStore'

/**
 * background 命令
 * @author weirdo
 */
const backgroundList = [
  'linear-gradient(to top, #413a59 0%, #313838 100%)',
  'linear-gradient(to top, #4e5446 0%, #313838 100%)',
  'linear-gradient(to top, #4f4b43 0%, #313838 100%)',
  'linear-gradient(to top, #5aaaaa 0%, #313838 100%)',
  'linear-gradient(to top, #baaaaa 0%, #313838 100%)',
  'linear-gradient(to top, #48544d 0%, #313838 100%)',
  'linear-gradient(to top, #4b4f5c 0%, #313838 100%)',
  'linear-gradient(to top, #4e435c 0%, #313838 100%)',
  'linear-gradient(to top, #4e435c 0%, #313838 100%)',
  'linear-gradient(to top, #4e435c 0%, #313838 100%)',
  'linear-gradient(to top, #706258 0%, #313838 100%)',
  'linear-gradient(to top, #516161 0%, #313838 100%)',
  'linear-gradient(to top, #543835 0%, #313838 100%)'
]

const colorNames: any = {
  LightPink: 'LightPink',
  Pink: 'Pink',
  Crimson: 'Crimson',
  LavenderBlush: 'LavenderBlush',
  PaleVioletRed: 'PaleVioletRed',
  HotPink: 'HotPink',
  DeepPink: 'DeepPink',
  MediumVioletRed: 'MediumVioletRed',
  Orchid: 'Orchid',
  Thistle: 'Thistle',
  Plum: 'Plum',
  Violet: 'Violet',
  Magenta: 'Magenta',
  Fuchsia: 'Fuchsia',
  DarkMagenta: 'DarkMagenta',
  Purple: 'Purple',
  MediumOrchid: 'MediumOrchid',
  DarkVoilet: 'DarkVoilet',
  DarkOrchid: 'DarkOrchid',
  Indigo: 'Indigo',
  BlueViolet: 'BlueViolet',
  MediumPurple: 'MediumPurple',
  MediumSlateBlue: 'MediumSlateBlue',
  SlateBlue: 'SlateBlue',
  DarkSlateBlue: 'DarkSlateBlue',
  Lavender: 'Lavender',
  GhostWhite: 'GhostWhite',
  Blue: 'Blue',
  MediumBlue: 'MediumBlue',
  MidnightBlue: 'MidnightBlue',
  DarkBlue: 'DarkBlue',
  Navy: 'Navy',
  RoyalBlue: 'RoyalBlue',
  CornflowerBlue: 'CornflowerBlue',
  LightSteelBlue: 'LightSteelBlue',
  LightSlateGray: 'LightSlateGray',
  SlateGray: 'SlateGray',
  DoderBlue: 'DoderBlue',
  AliceBlue: 'AliceBlue',
  SteelBlue: 'SteelBlue',
  LightSkyBlue: 'LightSkyBlue',
  SkyBlue: 'SkyBlue',
  DeepSkyBlue: 'DeepSkyBlue',
  LightBLue: 'LightBLue',
  PowDerBlue: 'PowDerBlue',
  CadetBlue: 'CadetBlue',
  Azure: 'Azure',
  LightCyan: 'LightCyan',
  PaleTurquoise: 'PaleTurquoise',
  Cyan: 'Cyan',
  Aqua: 'Aqua',
  DarkTurquoise: 'DarkTurquoise',
  DarkSlateGray: 'DarkSlateGray',
  DarkCyan: 'DarkCyan',
  Teal: 'Teal',
  MediumTurquoise: 'MediumTurquoise',
  LightSeaGreen: 'LightSeaGreen',
  Turquoise: 'Turquoise',
  Auqamarin: 'Auqamarin',
  MediumAquamarine: 'MediumAquamarine',
  MediumSpringGreen: 'MediumSpringGreen',
  MintCream: 'MintCream',
  SpringGreen: 'SpringGreen',
  SeaGreen: 'SeaGreen',
  Honeydew: 'Honeydew',
  LightGreen: 'LightGreen',
  PaleGreen: 'PaleGreen',
  DarkSeaGreen: 'DarkSeaGreen',
  LimeGreen: 'LimeGreen',
  Lime: 'Lime',
  ForestGreen: 'ForestGreen',
  Green: 'Green',
  DarkGreen: 'DarkGreen',
  Chartreuse: 'Chartreuse',
  LawnGreen: 'LawnGreen',
  GreenYellow: 'GreenYellow',
  OliveDrab: 'OliveDrab',
  Beige: 'Beige',
  LightGoldenrodYellow: 'LightGoldenrodYellow',
  Ivory: 'Ivory',
  LightYellow: 'LightYellow',
  Yellow: 'Yellow',
  Olive: 'Olive',
  DarkKhaki: 'DarkKhaki',
  LemonChiffon: 'LemonChiffon',
  PaleGodenrod: 'PaleGodenrod',
  Khaki: 'Khaki',
  Gold: 'Gold',
  Cornislk: 'Cornislk',
  GoldEnrod: 'GoldEnrod',
  FloralWhite: 'FloralWhite',
  OldLace: 'OldLace',
  Wheat: 'Wheat',
  Moccasin: 'Moccasin',
  Orange: 'Orange',
  PapayaWhip: 'PapayaWhip',
  BlanchedAlmond: 'BlanchedAlmond',
  NavajoWhite: 'NavajoWhite',
  AntiqueWhite: 'AntiqueWhite',
  Tan: 'Tan',
  BrulyWood: 'BrulyWood',
  Bisque: 'Bisque',
  DarkOrange: 'DarkOrange',
  Linen: 'Linen',
  Peru: 'Peru',
  PeachPuff: 'PeachPuff',
  SandyBrown: 'SandyBrown',
  Chocolate: 'Chocolate',
  SaddleBrown: 'SaddleBrown',
  SeaShell: 'SeaShell',
  Sienna: 'Sienna',
  LightSalmon: 'LightSalmon',
  Coral: 'Coral',
  OrangeRed: 'OrangeRed',
  DarkSalmon: 'DarkSalmon',
  Tomato: 'Tomato',
  MistyRose: 'MistyRose',
  Salmon: 'Salmon',
  Snow: 'Snow',
  LightCoral: 'LightCoral',
  RosyBrown: 'RosyBrown',
  IndianRed: 'IndianRed',
  Red: 'Red',
  Brown: 'Brown',
  FireBrick: 'FireBrick',
  DarkRed: 'DarkRed',
  Maroon: 'Maroon',
  White: 'White',
  WhiteSmoke: 'WhiteSmoke',
  Gainsboro: 'Gainsboro',
  LightGrey: 'LightGrey',
  Silver: 'Silver',
  DarkGray: 'DarkGray',
  Gray: 'Gray',
  DimGray: 'DimGray',
  Black: 'Black'
}

const lowerCaseColorNames: any = {}
for (const key in colorNames) {
  if (colorNames.hasOwnProperty(key)) {
    lowerCaseColorNames[key.toLowerCase()] = colorNames[key]
  }
}

const backColorCommand: CommandType = {
  // func只能小写
  func: 'backcolor',
  alias: ['bgc'],
  name: '切换背景颜色',
  desc: '暂时废弃',
  params: [
    {
      key: 'color',
      desc: '英文颜色名(不填则随机)',
      required: false
    }
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options
    let url = _[0]
    if (_.length >= 2 && !lowerCaseColorNames[url]) {
      terminal.writeTextErrorResult('参数不匹配')
    }
    const { setBackColor } = useTerminalConfigStore()
    if (url && lowerCaseColorNames[url]) {
      setBackColor(url)
      return
    }
    const res = backgroundList[Math.floor(Math.random() * backgroundList.length)]
    setBackColor(res)
  }
}

export default backColorCommand
