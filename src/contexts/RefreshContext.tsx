import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react'

type Key = string

type RefreshContextType = {
  refreshKeys: Record<Key, number>
  triggerRefresh: (key: Key) => void
  registerKeys: (items: Iterable<{ $id: string }>) => void
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined)

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKeys, setRefreshKeys] = useState<Record<Key, number>>({
    all: 0,
  })

  const triggerRefresh = useCallback((key: Key) => {
    setRefreshKeys((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }))
  }, [])

  const registerKeys = useCallback((items: Iterable<{ $id: string }>) => {
    setRefreshKeys((prev) => {
      const newKeys = { ...prev }
      for (const item of items) {
        if (!(item.$id in newKeys)) {
          newKeys[item.$id] = 0
        }
      }
      return newKeys
    })
  }, [])

  return (
    <RefreshContext.Provider
      value={{
        refreshKeys,
        triggerRefresh,
        registerKeys,
      }}
    >
      {children}
    </RefreshContext.Provider>
  )
}

export const useRefresh = () => {
  const context = useContext(RefreshContext)
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider')
  }
  return context
}
