import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { getCurrentUser, DBUser } from "@/lib/appwrite"

export interface GlobalContextValue {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: DBUser | null
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContextValue: GlobalContextValue = {
  isLoggedIn: false,
  setIsLoggedIn: () => {}, // No-op function
  user: null,
  setUser: () => {}, // No-op function
  isLoading: true,
  setIsLoading: () => {}, // No-op function
}

const GlobalContext = createContext(defaultContextValue)
export const useGlobalContext = () => useContext(GlobalContext)

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<DBUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [isLoggedIn])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
