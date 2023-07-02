import { createContext, useState, useContext } from 'react'

type UserContextData = {
  name: string
  setName: (name: string) => void
}

const UserContext = createContext<UserContextData>({ name: '', setName: () => {} })

type Props = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [name, setName] = useState('')

  return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextData => useContext(UserContext)
