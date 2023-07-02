import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { IconButton, Radio } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { CloseIcon } from '../atoms/icons/CloseIcon'

type Props = {
  dialogState: boolean
  selectedValue: string
  onClose: (value: string) => void
}
export const Dialog = ({ dialogState, onClose, selectedValue }: Props) => {
  const { productItems, deleteProduct, clearCart } = useCart()
  const router = useRouter()
  const [combinedProducts, setCombinedProducts] = useState<Array<any>>([])
  const handleClose = () => {
    onClose(selectedValue)
  }
  const [selectedProduct, setSelectedProduct] = useState('')

  const handleEdit = () => {
    handleClose()
    router.push(`/product/${selectedProduct}`)
  }

  const handleOrder = () => {
    clearCart()
    handleClose()
    router.push(`/orderConfirmation`)
  }

  const handleDelete = () => deleteProduct(Number(selectedProduct))

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const responses = await Promise.all(
          productItems.map((item) =>
            axios.get('/api/get-product', {
              params: { id: item.productId },
            }),
          ),
        )
        const productDetails = responses.map((response) => response.data.product)
        const newCombinedProducts = productItems.map((item) => {
          const matchedProduct = productDetails.find((detail) => detail.id === item.productId)
          if (matchedProduct) {
            return {
              id: item.productId,
              name: matchedProduct.name.ja,
              items: item.items,
            }
          }
        })
        setCombinedProducts(newCombinedProducts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProductDetails()
  }, [productItems])

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          overflow: 'auto',
          maxHeight: '90vh', // 必要に応じて高さを調整します
          width: '80vw', // 必要に応じて幅を調整します
          borderRadius: '5px', // 角を丸める場合
          // その他のスタイル...
        }}
      >
        <DialogTitle sx={{ position: 'relative' }}>
          <Typography textAlign={'center'}>カート</Typography>
          <IconButton
            onClick={() => handleClose()}
            sx={{ position: 'absolute', right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: '450px' }}>
          <List>
            {combinedProducts.map((product) => (
              <ListItem
                key={product.id}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => setSelectedProduct(product.id)}
              >
                <Box>
                  <Radio checked={product.id === selectedProduct} />
                  {product.name}
                </Box>
                <Box>{product.items} 個</Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Box display={'flex'} gap={'8px'} flexDirection={'column'} width={'100%'}>
            <Grid container spacing={'16px'}>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{ borderRadius: '50px' }}
                  onClick={() => handleEdit()}
                >
                  編集
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='outlined'
                  fullWidth
                  sx={{ borderRadius: '50px' }}
                  onClick={() => handleDelete()}
                >
                  削除
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography textAlign={'center'}>商品数：{productItems ? productItems.length : 0}</Typography>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{ borderRadius: '50px' }}
                  onClick={() => handleOrder()}
                >
                  全て注文
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogActions>
      </Box>
    </Box>
  )
}
