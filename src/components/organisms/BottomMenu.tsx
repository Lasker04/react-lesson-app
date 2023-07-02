import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'

export const BottomMenu = () => {
  const [value, setValue] = React.useState(0)

  return (
    <Box height={'60px'}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label='お買い物' icon={<RestoreIcon />} />
        <BottomNavigationAction label='注文履歴' icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  )
}
