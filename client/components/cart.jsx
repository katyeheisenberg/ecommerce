import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Table from './common/table'

/*
картинка товара(.product__image)
заголовок(.product__title)
цена за единицу(.product__price)
количество товаров в корзине(.product__amount)
цена за все товары(.product__total_price)
кнопка минус(.product__remove) - удаляет один товар из текущеего списка.
Если количество товаров равно нуля, то он исчезачет
*/

const Cart = () => {
  // const product = useSelector((store) => store.products.list)
  const { totalAmount, totalPrice, list: productInCart } = useSelector((s) => s.cart)
  const { rates, currencyName } = useSelector((store) => store.settings)

  return (
    <div className="flex flex-col">
      <Head title="Cart" />
      <Header caption="SkillCrucial 5 Shop" />
      <Table data={Object.values(productInCart)} />
      <div id="total-amount">{totalAmount}</div>
      <div id="total-price">{(totalPrice * rates[currencyName]).toFixed(2)} {currencyName}</div>
    </div>
  )
}

export default React.memo(Cart)
