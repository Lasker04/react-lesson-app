import { type } from 'os'
import { useReducer, useState } from 'react'

const initialState = 1

type BaseAction = {
  type: string
}

type IncreaseAction = BaseAction & {
  type: 'increase'
}

type DecreaseAction = BaseAction & {
  type: 'decrease'
}

type SelectAction = BaseAction & {
  type: 'select'
  payload: number
}

type Action = IncreaseAction | DecreaseAction | SelectAction

export const useSelectProductNumber = (alreadyState: number | null, maxNum: number) => {
  const numArray = Array.from({ length: maxNum }, (_, i) => i + 1)
  const [num, dispatch] = useReducer((prev: number, action: Action) => {
    switch (action.type) {
      case 'increase':
        return prev < 100 ? prev + 1 : prev
      case 'decrease':
        return prev > 1 ? prev - 1 : prev
      case 'select':
        return action.payload
      default:
        throw new Error('Invalid action')
    }
  }, alreadyState ?? initialState)

  const increase = () => {
    dispatch({ type: 'increase' })
  }

  const decrease = () => {
    dispatch({ type: 'decrease' })
  }

  const select = (payload: number) => {
    dispatch({ type: 'select', payload })
  }
  return { num, numArray, increase, decrease, select }
}
