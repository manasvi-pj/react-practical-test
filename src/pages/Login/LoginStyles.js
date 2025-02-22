import { colors } from '../../constants/colors'

export const errorMessage = () => ({ color: 'red', m: 0 })

export const loginCard = isTabletView => ({
  zIndex: 1,
  width: isTabletView ? 'auto' : '450px',
  boxShadow: 'rgba(76, 78, 100, 0.37) 0px 2px 10px 0px',
  borderRadius: '20px'
})

export const cardContentTheme = isTabletView => ({
  p: theme => `${theme.spacing(isTabletView ? 3 : 5, isTabletView ? 2.5 : 5)} !important`
})

export const cardBox = () => ({ mb: 5 })

export const boxTypography = () => ({
  mb: 1.5,
  fontWeight: 600,
  letterSpacing: '0.18px',
  textAlign: 'center'
})

export const formMargin = () => ({ mb: 2 })

export const errorColor = () => ({ '&.Mui-error': { color: 'red' } })

export const login = isTabletView => ({
  mb: isTabletView ? 2 : 2,
  fontWeight: 600,
  color: colors.white,
  backgroundColor: colors.darkThemeColor,
  '&:hover': {
    backgroundColor: colors.darkThemeColor
  }
})
