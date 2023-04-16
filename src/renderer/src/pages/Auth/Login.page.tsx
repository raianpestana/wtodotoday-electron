/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'

/* - Api - */
import { AxiosError } from 'axios'
import { requestAuthLogin } from '../../api/Auth.api'

/* - Componenets - */
import { ButtonFormComponent } from '../../components/Auth/ButtonForm.component'
import { DividerComponent } from '../../components/Auth/Divider.component'
import { TextFieldComponent } from '../../components/Auth/TextField.component'
import { TypographyComponent } from '../../components/Auth/Typography.component'
import Avatar from '@mui/material/Avatar'
// import { TypographyLinkComponent } from '../../components/Auth/TypographyLink.component'

import LogoPNG from '../../assets/images/logo.png'

/* - React - */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

/* - Schema - */
import { AuthLoginSchema } from '../../schemas/Auth/LoginPage.schema'

/* - Hooks - */
import { useAuth } from '../../hooks/useAuth.hook'

/* - SVG - */
import { LoginOrganizingSvg } from '../../svg/Auth/LoginOrganizing.svg'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type LoginPageType = {
  username: string
  password: string
}

type ResError = {
  message: string
}

type TransitionProps = Omit<SlideProps, 'direction'>

/* | - Login Page - | */
/* LoginPage */
export const LoginPage: React.FC = (): JSX.Element => {
  /* - Consts -*/
  const TransitionUp: React.FC<TransitionProps> = (prop): JSX.Element => {
    return <Slide {...prop} direction="down" />
  }

  /* - Hooks - */
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState<string>('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [activeAnimation, setActiveAnimation] = useState(false)

  /* React hook form with zod */
  const {
    setFocus,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginPageType>({
    resolver: zodResolver(AuthLoginSchema)
  })

  useEffect((): void => {
    setFocus('username')
  }, [])

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async ({ username, password }) => {
    handleCloseSnackBar()

    try {
      const resAuthLogin = await requestAuthLogin(username, password)
      setToken(resAuthLogin.data.token)
      setActiveAnimation(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          const resError: ResError = error.response.data
          setErrorApi(resError.message)
          setOpenSnackbar(true)
        }
      }
    }
  })

  /* handleCloseSnackBar */
  const handleCloseSnackBar = (_event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      //
    }
    setOpenSnackbar(false)
  }

  const handleNavigate = (): void => {
    navigate('/auth/register')
  }

  /* - Return - */
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        TransitionComponent={TransitionUp}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        sx={{ minWidth: '80%' }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ minWidth: '60%', width: '80%' }}
        >
          <AlertTitle>Error</AlertTitle>
          {errorApi} — <strong>¡Échale un vistazo!</strong>
        </Alert>
      </Snackbar>
      <LoginStyled>
        <DivLeftStyled>
          <Avatar src={LogoPNG} />
          <TypographyComponent variant="h5">{'<todo.today/>'}</TypographyComponent>
          <TypographyComponent variant="subtitle2">{'¿Qué haremos hoy?'}</TypographyComponent>
          <DivSvgStyled>
            <LoginOrganizingSvg width="100%" height="100%" fillOne="#292929" fillTwo="#111111" />
          </DivSvgStyled>
        </DivLeftStyled>
        <FormStyled onSubmit={onSubmit} autoComplete="off" noValidate>
          <TextFieldComponent
            error={errors.username ? true : false}
            required
            label="Nombre de usuario"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.username?.message}
            /* Reack hook form */
            {...register('username')}
          />
          <TextFieldComponent
            error={errors.password ? true : false}
            required
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            helperText={errors.password?.message}
            /* Reack hook form */
            {...register('password')}
          />
          <ButtonFormComponent
            disableRipple={true}
            type="submit"
            disabled={!isValid || isSubmitting ? true : false}
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
          </ButtonFormComponent>
          {/* <TypographyLinkComponentDivStyled>
            <TypographyLinkComponent variant="caption">
              {"¿Olvidaste tu contraseña?"}
            </TypographyLinkComponent>
          </TypographyLinkComponentDivStyled> */}
          <DividerComponentDivStyled>
            <DividerComponent variant="middle">{'o'}</DividerComponent>
          </DividerComponentDivStyled>
          <ButtonFormComponent disableRipple={true} type="button" onClick={handleNavigate}>
            {'Crear cuenta nueva'}
          </ButtonFormComponent>
          <HiddenEffect
            className={activeAnimation ? 'open' : 'close'}
            onAnimationEnd={(): void => {
              navigate('/dashboard')
            }}
          />
        </FormStyled>
      </LoginStyled>
    </>
  )
}

/* | - Styled - | */
/* LoginStyled */
const LoginStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

/* DivLeftStyled */
const DivLeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  row-gap: 1rem;
  padding: 1rem;
  flex-grow: 1;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.07), rgba(0, 0, 0, 0)) 1 1%;

  @media only screen and (max-width: 32rem) {
    display: none;
  }
`

/* DivSvgStyled */
const DivSvgStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

/* FormStyled */
const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  width: 40%;

  @media only screen and (max-width: 32rem) {
    width: 100%;
  }
`

/* TypographyLinkComponentDivStyled */
// const TypographyLinkComponentDivStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// `

/* DividerComponentDivStyled */
const DividerComponentDivStyled = styled.div`
  user-select: none;
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

  &.close {
    display: none;
  }

  &.open {
    display: flex;
    animation: animateOpacity 1.5s;
    animation-iteration-count: 1;

    @keyframes animateOpacity {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  }
`
