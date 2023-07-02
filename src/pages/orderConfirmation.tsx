import { HeaderAndBottomMenuLayout } from '@/layouts/HeaderAndBottomMenuLayout'
import { NextPageWithLayout } from '@/types/layout'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const OrderConfirmaton: NextPageWithLayout = () => {
  const [counter, setCounter] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (counter === 0) {
      router.push('/product')
    }
  }, [counter, router])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Typography variant='h6' mt={'40px'}>
        注文が完了しました。
      </Typography>
      <Typography variant='subtitle1'>このページは {counter} 秒後に自動的に閉じます。</Typography>
    </Box>
  )
}

OrderConfirmaton.getLayout = (page) => {
  return HeaderAndBottomMenuLayout(page, '注文完了')
}
export default OrderConfirmaton
