import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addItem } from '../redux/reducers/cart'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { rates, currencyName } = useSelector((store) => store.settings)
  const { list } = useSelector((store) => store.cart)

  return (
    <div className="flex flex-col border rounded-md m-1 p-2 w-40" title={product.description}>
      <div className="font-semibold">
        <p className="card__title truncate">{product.title}</p>
      </div>
      <div>
        <img className="card__image object-cover h-40 w-full" src={product.image} alt={product.title} />
      </div>
      <div>Price: <span className="card__price">{(product.price * rates[currencyName]).toFixed(2)} <span className="currency">{currencyName}</span></span></div>
      <div>
        <button type="button" className="border rounded-md p-1" onClick={() => dispatch(addItem(product.id))}>Buy</button>
        <span className="card__product-amount ml-2">{list[product.id]?.amount}</span>
      </div>
    </div>
  )
}

export default React.memo(ProductCard)
