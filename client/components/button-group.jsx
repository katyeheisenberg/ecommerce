import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sortProducts } from '../redux/reducers/products'
import { changeCurrency, setSortToggle, getRates } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const dispatch = useDispatch()
  const { sort, rates } = useSelector((s) => s.settings)

  const sortByType = (sortType) => {
    return () => {
      dispatch(setSortToggle(sortType))
      dispatch(sortProducts(sortType, sort[sortType]))
    }
  }

  const onClickButton = (name = 'USD') => {
    dispatch(getRates())
    dispatch(changeCurrency(name.toUpperCase()))
  }

  const slyles = (n, last) => {
    switch (n) {
      case 0: {
        return 'ecommerce-btn-f'
      }
      case last: {
        return 'ecommerce-btn-l'
      }
      default:
        return 'ecommerce-btn'
    }
  }

  return (
    <>
      <div className="inline-flex shadow-sm rounded-md text-gray h-8" role="group">
        {Object.keys(rates).map((name, index, array) => (
          <button
            key={name.toLowerCase()}
            type="button"
            data-name={name.toLowerCase()}
            className={slyles(index, array.length - 1)}
            onClick={(e) => onClickButton(e.target.dataset.name)}
          >
            {name.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="inline-flex shadow-sm rounded-md h-8" role="group">
        <button
          type="button"
          className="border-2 border-white rounded-md bg-gradient-to-bl from-green-600 to-green-400 text-sm font-medium  mx-1 px-6 text-white text-center hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          onClick={sortByType('name')}
        >
          Name <span>{sort.name ? '▼' : '▲'}</span>
        </button>
        <button
          type="button"
          className="border-2 border-white rounded-md bg-gradient-to-bl from-green-600 to-green-400 text-sm font-medium  mx-1 px-6 text-white text-center hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          onClick={sortByType('price')}
        >
          Price <span>{sort.price ? '▼' : '▲'}</span>
        </button>
      </div>
    </>
  )
}

export default React.memo(ButtonGroup)
