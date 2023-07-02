import { theme } from '@/configs/theme'
import { CartProvider } from '@/contexts/CartContext'
import { UserProvider } from '@/contexts/UserContext'
import { AppPropsWithLayout } from '@/types/layout'
import { ThemeProvider } from '@mui/material'
import React from 'react'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <ThemeProvider theme={theme}>
      <UserProvider>
        {/* <CartProvider> */}
        <Component {...pageProps} />
        {/* </CartProvider> */}
      </UserProvider>
    </ThemeProvider>,
    pageProps,
  )
}
