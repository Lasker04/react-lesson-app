import { createContext, useState, useContext } from 'react'

type ProductItem = {
  productId: number
  items: number
}

type CartContextData = {
  productItems: ProductItem[]
  addOrUpdateProduct: (productId: number, items: number) => void
  deleteProduct: (productId: number) => void
  getProductQuantity: (productId: number) => number | null
  clearCart: () => void
}

const CartContext = createContext<CartContextData>({
  productItems: [],
  addOrUpdateProduct: () => {},
  deleteProduct: () => {},
  getProductQuantity: () => null,
  clearCart: () => {},
})

type Props = {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [productItems, setProductItems] = useState<ProductItem[]>([])

  const addOrUpdateProduct = (productId: number, items: number) => {
    setProductItems((prevProductItems) => {
      const productIndex = prevProductItems.findIndex((product) => product.productId === productId)

      if (productIndex !== -1) {
        const newProductItems = [...prevProductItems]
        newProductItems[productIndex] = { productId, items }

        return newProductItems
      } else {
        return [...prevProductItems, { productId, items }]
      }
    })
  }

  const getProductQuantity = (productId: number): number | null => {
    const productItem = productItems.find((item) => item.productId === productId)
    return productItem ? productItem.items : null
  }

  const deleteProduct = (productId: number) => {
    const unDeleteProductItem = productItems.filter((item) => item.productId !== productId)
    return setProductItems(unDeleteProductItem)
  }

  const clearCart = () => {
    setProductItems([])
  }

  return (
    <CartContext.Provider
      value={{ productItems, addOrUpdateProduct, getProductQuantity, deleteProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextData => useContext(CartContext)
