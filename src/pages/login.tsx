import { useUser } from '@/contexts/UserContext'
import { HeaderAndBottomMenuLayout } from '@/layouts/HeaderAndBottomMenuLayout'
import { Back } from '@/types/headerIcon'
import { NextPageWithLayout } from '@/types/layout'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const { setName } = useUser()
  const [isDisable, setIsDisable] = useState<boolean>(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (email === '' || password === '') {
      setIsDisable(true)
      return
    }
    setIsDisable(false)
  }, [email, password])

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: email,
        password: password,
      })
      setName(response.data.name)
      router.push('/product')
    } catch (error) {
      console.error(error)
    }
  }

  const userNameRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus()
    }
  }, [])

  return (
    <Box display={'flex'} height={'100vh'} flexDirection={'column'} justifyContent={'start'}>
      <Box mt={'40px'}>
        <Typography variant='body1'>メールアドレス</Typography>
        <TextField fullWidth onChange={(e) => setEmail(e.target.value)} inputRef={userNameRef} />
      </Box>
      <Box mt={'16px'}>
        <Typography variant='body1'>パスワード</Typography>
        <TextField fullWidth onChange={(e) => setPassword(e.target.value)} />
        <Typography variant='caption'>※半角英数8文字以上</Typography>
      </Box>
      <Box mt={'56px'}>
        <Button
          variant='contained'
          fullWidth
          disabled={isDisable}
          onClick={() => handleLogin()}
          sx={{ borderRadius: '50px' }}
        >
          ログインする
        </Button>
      </Box>
    </Box>
  )
}

Login.getLayout = (page) => HeaderAndBottomMenuLayout(page, 'ログイン', Back)

export default Login
