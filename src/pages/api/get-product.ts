import type { NextApiRequest, NextApiResponse } from 'next'
import { productsData } from '@/dummyData/products'

type Response = {
  product: Product
}

type ErrorResponse = {
  message: string
}

export type Product = {
  id: number
  name: {
    ja: string
    en: string
  }
  category: {
    ja: string
    en: string
  }
  description: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>,
) {
  const { query } = req
  const { id } = query

  if (id === undefined) return res.status(400).json({ message: 'Missing required ideter id' })
  if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid parameter id' })

  const productId = Number(id)

  const product: Product | undefined = productsData.find((product) => product.id === productId)
  if (product === undefined) return res.status(404).json({ message: 'Product not found' })

  return res.status(200).json({ product: product })
}

// curl "http://localhost:3000/api/get-product?id=1"
