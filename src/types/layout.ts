import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type GetLayout = (page: ReactElement) => ReactNode

export type NextPageWithLayout<T = Record<string, any>> = NextPage<T> & {
  getLayout?: (page: ReactNode, props: T) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
