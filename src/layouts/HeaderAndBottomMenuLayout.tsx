import { BackIcon } from '@/components/atoms/icons/BackIcon'
import { CartIcon } from '@/components/atoms/icons/CartIcon'
import { MenuIcon } from '@/components/atoms/icons/MenuIcon'
import { Dialog } from '@/components/organisms/Dialog'
import { Header } from '@/components/organisms/Header'
import { CartProvider } from '@/contexts/CartContext'
import { Back, Cart, LeftIcon, Menu, RightIcon } from '@/types/headerIcon'
import { Box, CssBaseline, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type GetLayoutWithHeader = (
  page: ReactNode,
  pageTitle?: string,
  leftIcon?: LeftIcon,
  rightIcon?: RightIcon,
) => ReactElement

type Tabs = 'shopping' | 'history'
const tabContents = [
  { key: 'shopping', value: '買い物' },
  { key: 'history', value: '履歴' },
]

type ModalProps = {
  children: React.ReactNode
}
const ModalPortal = ({ children }: ModalProps) => {
  const [target, setTarget] = useState<Element | null>(null)

  useEffect(() => {
    setTarget(document.querySelector('.container.end'))
  }, [])

  if (target) {
    return createPortal(children, target)
  }
  return <></>
}

export const HeaderAndBottomMenuLayout: GetLayoutWithHeader = (
  page,
  pageTitle,
  leftIcon,
  rightIcon,
) => {
  const [tabValue, setTabValue] = useState<Tabs>('shopping')
  const handleChange = (event: React.SyntheticEvent, newValue: Tabs) => {
    setTabValue(newValue)
  }
  const [dialogState, setDialogState] = useState(false)
  const headerHeight = '56px'
  const footerMenuHeight = '50px'

  const router = useRouter()

  const iconHandlers = {
    [Menu]: {
      icon: <MenuIcon />,
      clickHandler: () => alert(),
    },
    [Back]: {
      icon: <BackIcon />,
      clickHandler: () => router.back(),
    },
    [Cart]: {
      icon: <CartIcon />,
      clickHandler: () => setDialogState(true),
    },
  }

  return (
    <CartProvider>
      <CssBaseline />
      <Header
        pageTitle={pageTitle}
        leftIcon={leftIcon && iconHandlers[leftIcon]}
        rightIcon={rightIcon && iconHandlers[rightIcon]}
      />
      <main>
        <Box sx={{ height: `calc(100vh - ${headerHeight} - ${footerMenuHeight} )` }}>{page}</Box>
      </main>
      <Tabs
        sx={{ height: footerMenuHeight }}
        value={tabValue}
        onChange={(event, newValue) => handleChange(event, newValue)}
        aria-label='wrapped label tabs example'
        variant='fullWidth'
      >
        {tabContents.map((content) => (
          <Tab key={content.key} value={content.key} label={content.value} />
        ))}
      </Tabs>
      <Box className={'container end'} />
      {dialogState && (
        <ModalPortal>
          <Dialog
            dialogState={dialogState}
            onClose={() => setDialogState(false)}
            selectedValue={''}
          />
        </ModalPortal>
      )}
    </CartProvider>
  )
}
