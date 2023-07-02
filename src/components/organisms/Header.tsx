import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { IconButton } from '@/components/atoms/IconButton'

type Props = {
  pageTitle?: string
  leftIcon?: {
    icon: React.JSX.Element
    clickHandler: () => void
  } | null
  rightIcon?: {
    icon: React.JSX.Element
    clickHandler: () => void
  } | null
}

export const Header = ({ pageTitle, leftIcon, rightIcon }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar
          sx={{
            minHeight: {
              sm: '56px',
            },
          }}
        >
          {leftIcon && <IconButton icon={leftIcon.icon} clickHandler={leftIcon.clickHandler} />}
          <Typography variant='h6' component='div' textAlign={'center'} sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          {rightIcon && <IconButton icon={rightIcon.icon} clickHandler={rightIcon.clickHandler} />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
