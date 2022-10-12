import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ButtonGroup from './button-group'

const Header = ({ caption }) => {
  const { totalAmount, totalPrice } = useSelector((s) => s.cart)
  const { rates, currencyName } = useSelector((store) => store.settings)
  return (
    <div className="flex justify-between p-4 bg-gradient-to-r">
      <ButtonGroup />
      <div className="text-white text-center border-2 rounded border-white  p-2 w-fit items-center">
        <div>Contact me</div>
        <div className="underline">
          <a href="tel:PHONE_NUM"> +79114211544 </a>
        </div>
      </div>
      <Link to="/">
        <div
          className="p-3 border border-white rounded-md bg-gradient-to-r from-rose-500 to-rose-600 flex font-semibold text-gray-200 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          id="brand-name"
          cursor="pointer"
        >
          <a href="tel:PHONE_NUM"> +79114211544 </a>
          {caption}
        </div>
      </Link>
      <Link
        to="/cart"
        className="text-white text-center border border-white rounded-md p-2 bg-gradient-to-r from-rose-500 to-rose-600 font-semibold"
      >
        <div className="hover:text-blue-700">Cart</div>
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
