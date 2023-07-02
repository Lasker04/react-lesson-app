import { BasicLayout } from '@/layouts/BasicLayout'
import { NextPageWithLayout } from '@/types/layout'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const buildDate = dayjs().format('YYYY年MM月DD日')
  return {
    props: { buildDate },
  }
}

type Props = {
  buildDate: string
}

const Index: NextPageWithLayout<Props> = ({ buildDate }: Props) => {
  const router = useRouter()

  return (
    <Box display={'flex'} height={'100vh'} flexDirection={'column'} justifyContent={'start'}>
      <Typography
        variant='h3'
        whiteSpace={'pre-wrap'}
        textAlign={'center'}
        mt={'214px'}
      >{`お買い物\nアプリ`}</Typography>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'176px'} gap={2}>
        <Button
          variant='contained'
          fullWidth
          onClick={() => router.push('/login')}
          sx={{ borderRadius: '50px' }}
        >
          ログイン
        </Button>
        <Button variant='outlined' fullWidth sx={{ borderRadius: '50px' }}>
          新規登録
        </Button>
      </Box>
      <Box mt={'auto'}>
        <Typography>リリース日時：{buildDate}</Typography>
      </Box>
    </Box>
  )
}

Index.getLayout = (page) => BasicLayout(page)

export default Index
