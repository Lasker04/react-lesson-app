import { productsData } from '@/dummyData/products'
import { HeaderAndBottomMenuLayout } from '@/layouts/HeaderAndBottomMenuLayout'
import { NextPageWithLayout } from '@/types/layout'
import { Add, Remove } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { Product } from '../api/get-product-list'
import { useSelectProductNumber } from '@/hooks/useSelectProductNumber'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/router'
import { Back, Cart } from '@/types/headerIcon'

type Tabs = 'all' | 'vegetables' | 'meat' | 'seafood' | 'fruits'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  if (!params) {
    return { notFound: true }
  }

  const productId = params.id
  const productData = productsData.find((product) => product.id.toString() === productId)
  return {
    props: { productData },
  }
}

type Props = {
  productData: Product
}

const Product: NextPageWithLayout<Props> = ({ productData }: Props) => {
  const { addOrUpdateProduct, getProductQuantity } = useCart()
  const { num, numArray, increase, decrease, select } = useSelectProductNumber(
    getProductQuantity(productData.id),
    100,
  )
  const router = useRouter()

  const selectHandleChange = (event: SelectChangeEvent) => {
    select(event.target.value as unknown as number)
  }

  const addCart = () => {
    addOrUpdateProduct(productData.id, num)
    router.push('/product')
  }
  return (
    <Box display={'flex'} height={'100%'} flexDirection={'column'}>
      <Box>
        <Typography>{productData.name.ja}</Typography>
        <Typography># {productData.category.ja}</Typography>
        <Box
          minWidth={'342px'}
          minHeight={'170px'}
          border={'1px solid black'}
          borderRadius={'8px'}
          position='relative'
        >
          <Image
            src={`/img/products/${productData.name.en}.png`}
            alt='Description'
            style={{ objectFit: 'contain' }}
            fill
          />
        </Box>
      </Box>
      <Box mt={'24px'} gap={'8px'}>
        <Typography variant='body1'>商品説明</Typography>
        <Typography variant='body2'>{productData.description}</Typography>
      </Box>
      <Box display={'flex'} mt={'56px'} alignItems={'center'} gap={'24px'}>
        <IconButton sx={{ border: '1px solid black' }} onClick={() => decrease()}>
          <Remove />
        </IconButton>
        <FormControl fullWidth sx={{ minWidth: '214px' }}>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={num.toString()}
            defaultValue={numArray[0].toString()}
            onChange={selectHandleChange}
            sx={{
              '&.MuiSelect-select': {
                backgroundColor: 'red',
              },
            }}
          >
            {numArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton sx={{ border: '1px solid black' }} onClick={() => increase()}>
          <Add />
        </IconButton>
      </Box>
      <Button
        variant='contained'
        fullWidth
        sx={{ borderRadius: '50px', mt: '24px' }}
        onClick={addCart}
      >
        カートに追加
      </Button>
    </Box>
  )
}

Product.getLayout = (page) => HeaderAndBottomMenuLayout(page, '詳細ページ', Back, Cart)

export default Product
