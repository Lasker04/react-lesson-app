import { Box, ListItem, Radio } from '@mui/material'
import React, { memo } from 'react'
type Props = {
  product: any
  setSelectedProduct: (value: string) => void
  isActive: boolean
}
export const RadioListItem = React.memo(({product,setSelectedProduct, isActive }: Props) => {
  console.log("render")
  return (
    <ListItem
    key={product.id}
    sx={{ display: 'flex', justifyContent: 'space-between' }}
    onClick={() => setSelectedProduct(product.id)}
  >
    <Box>
      <Radio checked={isActive} />
      {product.name}
    </Box>
    <Box>{product.items} 個</Box>
  </ListItem>
  )
})
