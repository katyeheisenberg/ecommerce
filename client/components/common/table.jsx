import React from 'react'
import { useSelector } from 'react-redux'

import TableRow from './table-row'

const Table = ({ data }) => {
  const { sort, sortType } = useSelector((s) => s.settings)
  const sortProductsList = (arrayOfProducts, type, direction) => {
    switch (type) {
      case 'name': {
        arrayOfProducts.sort((a, b) => {
          if (direction) {
            return a.title.localeCompare(b.title)
          }
          return b.title.localeCompare(a.title)
        })
        break
      }
      case 'price': {
        arrayOfProducts.sort((a, b) => {
          if (direction) {
            return a.price - b.price
          }
          return b.price - a.price
        })
        break
      }
      default:
        return arrayOfProducts
    }
    return arrayOfProducts
  }
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {
          sortProductsList(data, sortType, sort[sortType]).map((prod, index) => <TableRow key={prod.id} id={prod.id} n={index + 1} />)
        }
      </tbody>
    </table>
  )
}

export default Table
