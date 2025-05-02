import { createContext, useEffect, useState } from 'react'

import { UserDocument } from '@/types/api'
import { RawUserDocument } from '@/types/api/UserDocument'
import {
  useFetchCurrentUser,
  useCreateSession,
  useLogoutUser,
  useRegisterUser,
} from '@/hooks/api/users'

type AuthContextType = {
  user: UserDocument | null
  isLoggedIn: boolean
  register: (user: RawUserDocument) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>

  isLoggingOut: boolean
  isRegistering: boolean
  isLoadingUser: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { fetchCurrentUser } = useFetchCurrentUser()

  const [user, setUser] = useState<UserDocument | null>(null)
  const isLoggedIn = user !== null

  const [isLoadingUser, setIsLoadingUser] = useState(true) // true important

  const { createUserSession } = useCreateSession()

  const { register: registerUser, isLoading: isRegistering } = useRegisterUser()

  const { logout: logoutUser, isLoading: isLoggingOut } = useLogoutUser()

  const register = async (user: RawUserDocument): Promise<boolean> => {
    const responseUser = await registerUser(user)
    if (!responseUser) return false
    return await login(user.email, user.password)
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    const sessionResponse = await createUserSession(email, password)
    if (sessionResponse === null) return false
    setIsLoadingUser(true)
    const fetchedUser = await fetchCurrentUser()
    setIsLoadingUser(false)

    if (!fetchedUser) return false
    setUser(fetchedUser)
    return true
  }

  const logout = async () => {
    const response = await logoutUser()
    if (response === null) return
    setUser(null)
  }

  useEffect(() => {
    const initUser = async () => {
      setIsLoadingUser(true)
      const fetchedUser = await fetchCurrentUser()
      setIsLoadingUser(false)
      setUser(fetchedUser)
    }

    initUser()
  }, [fetchCurrentUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        register,
        login,
        isLoggingOut,
        isRegistering,
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
