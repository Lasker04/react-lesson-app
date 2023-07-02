import type { NextApiRequest, NextApiResponse } from 'next'
import { productsData } from '@/dummyData/products'

type Response = {
  products: Product[]
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

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { method, query } = req
  const { keyword } = query

  switch (method) {
    case 'GET':
      const products: Product[] = productsData
      const filteredProducts = products.filter((product) =>
        product.name.ja.includes(keyword as string),
      )

      return res.status(200).json({ products: filteredProducts })
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// curl http://localhost:3000/api/products
