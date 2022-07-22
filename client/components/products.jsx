import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsFromServer } from '../redux/reducers/products'
import ProductCard from './product-card'

const Products = () => {
  const productList = useSelector((s) => s.products.list)
  const { loaded } = useSelector((s) => s.settings)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!loaded) {
      dispatch(getProductsFromServer())
    }
  }, [])
  return (
    <div className="flex flex-wrap m-2">
      {
        Object.values(productList).map((prod) => <ProductCard key={prod.id} product={prod} />)
      }
    </div>
  )
}

export default React.memo(Products)
