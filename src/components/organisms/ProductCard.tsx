import { Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {
  name: string
  category: string
  fileName: string
}

export const ProductCard = ({ name, category, fileName }: Props) => {
  return (
    <Box display={'flex'} border={'1px solid gray'} borderRadius={'4px'} width={'100%'}>
      <Box
        width={'150px'}
        height={'128px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        position='relative'
      >
        <Image
          src={`/img/products/${fileName}.png`}
          alt='Description'
          style={{ objectFit: 'contain' }}
          fill
        />
      </Box>
      <Divider orientation='vertical' />
      <Box padding={'8px'} width={'100%'}>
        <Typography variant='body1'>{name}</Typography>
        <Typography variant='body2'># {category}</Typography>
      </Box>
    </Box>
  )
}
