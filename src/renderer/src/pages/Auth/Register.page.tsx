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
import { requestAuthRegister } from '../../api/Auth.api'

/* - Componenets - */
import { ButtonFormComponent } from '../../components/Auth/ButtonForm.component'
import { DividerComponent } from '../../components/Auth/Divider.component'
import { TextFieldComponent } from '../../components/Auth/TextField.component'
import { TypographyComponent } from '../../components/Auth/Typography.component'

/* - React - */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

/* - Schema - */
import { AuthRegisterSchema } from '../../schemas/Auth/RegisterPage.schema'

/* - Hooks - */
import { useAuth } from '../../hooks/useAuth.hook'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type RegisterPageType = {
  fullname: string
  username: string
  password: string
  email: string
}

type ResError = {
  message: string
}

type TransitionProps = Omit<SlideProps, 'direction'>

/* | - Register Page - | */
/* RegisterPage */
export const RegisterPage: React.FC = (): JSX.Element => {
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
    formState: { errors, isSubmitting }
  } = useForm<RegisterPageType>({
    resolver: zodResolver(AuthRegisterSchema)
  })

  useEffect((): void => {
    setFocus('fullname')
  }, [])

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async (data) => {
    handleCloseSnackBar()

    try {
      const resAuthRegister = await requestAuthRegister(data)
      setToken(resAuthRegister.data.token)
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
    navigate('/auth/login')
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
        <FormStyled onSubmit={onSubmit} autoComplete="off" noValidate>
          <TypographyComponent variant="h5">{'Registrarse'}</TypographyComponent>
          <TextFieldComponent
            error={errors.fullname ? true : false}
            required
            label="Nombre completo"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.fullname?.message}
            /* Reack hook form */
            {...register('fullname')}
          />
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
          <TextFieldComponent
            error={errors.email ? true : false}
            required
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.email?.message}
            /* Reack hook form */
            {...register('email')}
          />
          <ButtonFormComponent
            disableRipple={true}
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </ButtonFormComponent>
          <DividerComponentDivStyled>
            <DividerComponent variant="middle">{'o'}</DividerComponent>
          </DividerComponentDivStyled>
          <ButtonFormComponent disableRipple={true} type="button" onClick={handleNavigate}>
            {'Inicia sesión'}
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
  justify-content: center;
  width: 100%;
`

/* FormStyled */
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  width: 50%;

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
