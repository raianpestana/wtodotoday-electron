/* | - Imports - | */
/* - @mui/icons-material - */
/* ImageNotSupported */ import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined'
import GradientOutlinedIcon from '@mui/icons-material/GradientOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined'
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined'
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined'
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined'
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined'
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'

/* - Types - */
export const listDynamicIcon = [
  'Artículo',
  'Baloncesto',
  'Béisbol',
  'Casa',
  'Casino',
  'Cocina',
  'Fútbol americano',
  'Fútbol',
  'Gamepad',
  'Grandiente',
  'Paleta de colores',
  'Película',
  'Predeterminado',
  'Tenis',
  'Terminal',
  'Voleibol'
] as const

/* DynamicIconType */
export type DynamicIconType = (typeof listDynamicIcon)[number]

/* DynamicIconComponentType */
type DynamicIconComponentType = {
  icon: DynamicIconType
}

/* | - DynamicIcon Component - | */
/* DynamicIconComponent */
export const DynamicIconComponent: React.FC<DynamicIconComponentType> = (prop): JSX.Element => {
  if (prop.icon === 'Artículo') return <ArticleOutlinedIcon />

  if (prop.icon === 'Baloncesto') return <SportsBasketballOutlinedIcon />

  if (prop.icon === 'Béisbol') return <SportsBaseballOutlinedIcon />

  if (prop.icon === 'Casa') return <HomeOutlinedIcon />

  if (prop.icon === 'Casino') return <CasinoOutlinedIcon />

  if (prop.icon === 'Cocina') return <KitchenOutlinedIcon />

  if (prop.icon === 'Fútbol americano') return <SportsFootballOutlinedIcon />

  if (prop.icon === 'Fútbol') return <SportsSoccerOutlinedIcon />

  if (prop.icon === 'Gamepad') return <GamepadOutlinedIcon />

  if (prop.icon === 'Grandiente') return <GradientOutlinedIcon />

  if (prop.icon === 'Paleta de colores') return <PaletteOutlinedIcon />

  if (prop.icon === 'Película') return <MovieOutlinedIcon />

  if (prop.icon === 'Predeterminado') return <ImageNotSupportedOutlinedIcon />

  if (prop.icon === 'Tenis') return <SportsTennisOutlinedIcon />

  if (prop.icon === 'Terminal') return <TerminalOutlinedIcon />

  if (prop.icon === 'Voleibol') return <SportsVolleyballOutlinedIcon />

  /* - Return - */
  return <ImageNotSupportedOutlinedIcon />
}
