/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'

/* - React -*/
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

/* - Hooks - */
import { useGlobalStyle } from '../../hooks/useGlobalStyle.hook'
import { useAuth } from '../../hooks/useAuth.hook'
import { useProfile } from '../../hooks/useProfile.hook'

/* - Layouts - */
import { NavigationLayout } from './Navigation/Navigation.layout'
import { MainLayout } from './Main/Main.layout'
import { TypographyComponent } from '../../components/Dashboard/Typography.component'
import { requestAuthProfile } from '../../api/Auth.api'
import { useNotification } from '../../hooks/useNotification.hook.'

/* - Types - */
/* DashboardStyledType */
type DashboardStyledType = {
  backgroundColor: string
}

type TransitionProps = Omit<SlideProps, 'direction'>

/* | - Dashboard Layout - | */
/* DashboardLayout */
export const DashboardLayout: React.FC = (): JSX.Element => {
  /* - Consts -*/
  const TransitionUp: React.FC<TransitionProps> = (prop): JSX.Element => {
    return <Slide {...prop} direction="up" />
  }

  /* - Hooks - */
  const { CSS } = useGlobalStyle()
  const { isAuth } = useAuth()
  const { setProfile } = useProfile()

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(true)

  const [isHiddenAnimation, setIsHiddenAnimation] = useState(true)

  const { status, message, isActiveNotification, setNotification } = useNotification()

  useEffect(() => {
    const timer = setTimeout((): void => {
      loadProfile()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  /* - Funcs - */
  const loadProfile = async (): Promise<void> => {
    const resAuthProfile = await requestAuthProfile()
    setProfile(resAuthProfile.data.account, resAuthProfile.data.stats)
    setIsLoadingAnimation(false)
  }

  const loadingAnimationComplete = (): void => {
    setIsLoading(false)
  }

  const hiddenAnimationComplete = (): void => {
    setIsHiddenAnimation(false)
  }

  /* handleCloseSnackBar */
  const handleCloseSnackBar = (_event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      //
    }
    setNotification('info', '', false)
  }

  /* - Return - */
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />
  }

  if (isLoading) {
    return (
      <DashboardStyled backgroundColor={CSS.background.color}>
        <LoadingStyled
          className={isLoadingAnimation ? 'trueLoading' : 'falseLoading'}
          onAnimationEnd={loadingAnimationComplete}
        >
          <CircularProgress sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          <TypographyComponent variant="subtitle2">
            {'Cargando, por favor espere unos segundos...'}
          </TypographyComponent>
        </LoadingStyled>
      </DashboardStyled>
    )
  } else {
    return (
      <DashboardStyled backgroundColor={CSS.background.color}>
        <Snackbar
          open={isActiveNotification}
          autoHideDuration={5000}
          TransitionComponent={TransitionUp}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Alert onClose={handleCloseSnackBar} severity={status}>
            {message}
          </Alert>
        </Snackbar>
        <NavigationLayout />
        <MainLayout />
        <HiddenEffect
          className={isHiddenAnimation ? 'trueHidden' : 'falseHidden'}
          onAnimationEnd={hiddenAnimationComplete}
        />
      </DashboardStyled>
    )
  }
}

/* | - Styled - | */
/* - DashboardStyled - */
const DashboardStyled = styled.div<DashboardStyledType>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: ${(p): string => p.backgroundColor};

  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
`

/* LoadingStyled */
const LoadingStyled = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  flex-grow: 1;

  &.trueLoading {
    display: flex;
  }

  &.falseLoading {
    display: flex;
    animation: animateOpacity 1s;
    animation-iteration-count: 1;
    opacity: 0;

    @keyframes animateOpacity {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  }
`

/* HiddenEffect */
const HiddenEffect = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  display: none;
  min-width: 100%;
  min-height: 100%;
  background-color: rgb(23, 23, 23);
  z-index: 9;
  opacity: 1;

  &.falseHidden {
    display: none;
  }

  &.trueHidden {
    display: flex;
    animation: animateOpacity 1s;
    animation-iteration-count: 1;
    opacity: 0;

    @keyframes animateOpacity {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  }
`
