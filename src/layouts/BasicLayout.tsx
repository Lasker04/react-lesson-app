import { Box, CssBaseline } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'

type GetLayoutWithHeader = (page: ReactNode) => ReactNode

export const BasicLayout: GetLayoutWithHeader = (page) => {
  return (
    <>
      <CssBaseline />
      <main>
        <Box px={2} height={'100vh'}>
          {page}
        </Box>
      </main>
    </>
  )
}
