import { IconButton as MuiIconButton } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'

type Props = {
  icon: ReactElement
  clickHandler: () => void
}
export const IconButton = ({ icon, clickHandler }: Props) => {
  return (
    <MuiIconButton
      size='large'
      edge='start'
      aria-label='menu'
      sx={{ mr: 2 }}
      onClick={() => clickHandler()}
    >
      {icon}
    </MuiIconButton>
  )
}
