import React, { useReducer } from 'react'
import { initialState, reducer } from './reducer'
import GlobalContext from './GlobalContext'

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider