import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ButtonGroup from './button-group'

const Header = ({ caption }) => {
  const { totalAmount, totalPrice } = useSelector((s) => s.cart)
  const { rates, currencyName } = useSelector((store) => store.settings)
  return (
    <div className="flex justify-between p-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <ButtonGroup />
      <Link to="/">
        <div className="flex font-semibold text-gray-200" id="brand-name" cursor="pointer">
          {caption}
        </div>
      </Link>
      <Link to="/cart" className="text-white text-center">
        <div>cart</div>
        <div id="order-count" className="text-center">
          Items: {totalAmount}
        </div>
        <div id="order-price" className="text-center">
          Total Price:{' '}
          {(Number.isNaN(totalPrice * rates[currencyName])
            ? 0
            : totalPrice * rates[currencyName]
          ).toFixed(2)}{' '}
          {currencyName}
        </div>
      </Link>
    </div>
  )
}

export default React.memo(Header)
