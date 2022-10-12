import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Table from './common/table'

const Cart = () => {
  const { totalAmount, totalPrice, list: productInCart } = useSelector((s) => s.cart)
  const { rates, currencyName } = useSelector((store) => store.settings)

  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-800 to-teal-800 h-screen text-white">
      <Head title="cart" />
      <Header caption="SkillCrucial 5 Shop" />
      <Table data={Object.values(productInCart)} />
      <div id="total-amount">{totalAmount}</div>
      <div id="total-price">
        {(totalPrice * rates[currencyName]).toFixed(2)} {currencyName}
      </div>
    </div>
  )
}

export default React.memo(Cart)
