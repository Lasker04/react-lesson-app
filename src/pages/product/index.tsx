import { ProductCard } from '@/components/organisms/ProductCard'
import { useUser } from '@/contexts/UserContext'
import { BasicLayout } from '@/layouts/BasicLayout'
import { HeaderAndBottomMenuLayout } from '@/layouts/HeaderAndBottomMenuLayout'
import { NextPageWithLayout } from '@/types/layout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Product } from '../api/get-product-list'
import { NextRouter, useRouter } from 'next/router'
import { Back, Cart, Menu } from '@/types/headerIcon'

type Tabs = 'all' | 'vegetables' | 'meat' | 'seafood' | 'fruits' | null
const tabContents = [
  { key: 'all', value: '全て' },
  { key: 'vegetables', value: '野菜' },
  { key: 'meat', value: '肉' },
  { key: 'seafood', value: '魚介類' },
  { key: 'fruits', value: 'フルーツ' },
]

const Product: NextPageWithLayout = () => {
  const router = useRouter()
  const [tabValue, setTabValue] = useState<Tabs>('all')
  const [products, setProducts] = useState<Product[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const { name } = useUser()
  const handleChange = (event: React.SyntheticEvent, newValue: Tabs) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-product-list', {
          params: { category: tabValue },
        })
        setProducts(response.data.products)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [tabValue])

  const onSearch = async () => {
    try {
      const response = await axios.get('/api/search-product-list', {
        params: { keyword: searchKeyword },
      })
      setProducts(response.data.products)
    } catch (error) {
      console.error(error)
    }
    setSearchKeyword('')
    setTabValue(null)
  }

  return (
    <Box display={'flex'} height={'100%'} flexDirection={'column'} justifyContent={'start'}>
      <Typography variant='body1' sx={{ mt: '40px' }}>
        こんにちは、{name}さん
      </Typography>
      <Box display={'flex'} alignItems={'center'} gap={'8px'} sx={{ mt: '24px' }}>
        <TextField
          fullWidth
          value={searchKeyword}
          placeholder='商品名'
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant='outlined' onClick={onSearch} sx={{borderRadius: '50px'}}>
          検索
        </Button>
      </Box>
      <Tabs
        value={tabValue}
        onChange={(event, newValue) => handleChange(event, newValue)}
        aria-label='wrapped label tabs example'
        variant='fullWidth'
      >
        {tabContents.map((content) => (
          <Tab key={content.key} value={content.key} label={content.value} />
        ))}
      </Tabs>
      <List sx={{ height: '100%', overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
        {products.map((product) => (
          <ListItem
            key={product.id}
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <ProductCard
              name={product.name.ja}
              category={product.category.ja}
              fileName={product.name.en}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

Product.getLayout = (page) => {
  return HeaderAndBottomMenuLayout(page, 'お買い物トップ', 'back', 'cart')
}
export default Product
