export const ADD_ITEM = '@cart/ADD_ITEM'
export const INCREASE_AMOUNT = '@cart/INCREASE_AMOUNT'
export const DECREASE_AMOUNT = '@cart/DECREASE_AMOUNT'
export const REMOVE_ITEM = '@cart/REMOVE_ITEM'
const TOTAL_VALUES = '@cart/TOTAL_VALUES'

const initialState = {
  list: {},
  totalPrice: 0,
  totalAmount: 0,
  ...JSON.parse(localStorage.getItem('cart'))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        list: action.payload.list,
        totalAmount: state.totalAmount + 1,
        totalPrice: state.totalPrice + action.payload.price,
      }
    }
    case INCREASE_AMOUNT:
    case DECREASE_AMOUNT: {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload.list
        }
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        list: action.payload.list
      }
    }
    case TOTAL_VALUES: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalAmount: action.payload.totalAmount
      }
    }
    default:
      return state
  }
}

export const addItem = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const product = getState().products.list[id]
    const itemAmount = typeof list[id] === 'undefined' ? 1 : list[id].amount + 1
    dispatch({
      type: ADD_ITEM,
      payload: {
        list: {
          ...list,
          [id]: { ...product, amount: itemAmount },
        },
        price: product.price,
        product
      }
    })
  }
}

export const changeItemAmount = (id, count) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const product = getState().cart.list[id]
    const { amount } = list[id]
    const newAmount = amount + count
    if (count > 0) {
      dispatch({
        type: INCREASE_AMOUNT,
        payload: {
          list: {
            [id]: { ...list[id], amount: newAmount }
          },
          product
        }
      })
    }
    if (count < 0) {
      dispatch({
        type: DECREASE_AMOUNT,
        payload: {
          list: {
            [id]: { ...list[id], amount: newAmount }
          },
          product
        }
      })
    }
    if (newAmount <= 0) {
      delete list[id]
      dispatch({
        type: REMOVE_ITEM,
        payload: {
          list,
          product
        }
      })
    }
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice + product.price * count,
        totalAmount: totalAmount + count
      }
    })
  }
}

export const removeCurrentItem = (id) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const product = getState().cart.list[id]
    const rmProdAmount = list[id].amount
    delete list[id]
    dispatch({
      type: REMOVE_ITEM,
      payload: {
        list,
        product
      }
    })
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice - product.price * rmProdAmount,
        totalAmount: totalAmount - rmProdAmount
      }
    })
  }
}
