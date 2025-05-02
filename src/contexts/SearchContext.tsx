import { createContext, useContext, useState } from 'react'

type SearchContextType = {
  searchInput: string
  setSearchInput: (input: string) => void
  isAllowed: (path: string) => boolean
}
const SearchContext = createContext<SearchContextType | undefined>(undefined)

type SearchProviderType = {
  children: React.ReactNode
}
export const SearchProvider: React.FC<SearchProviderType> = ({ children }) => {
  const [searchInput, setSearchInput] = useState('')

  const allowedPaths = ['/tasks', '/categories']

  const isAllowed = (path: string) => allowedPaths.includes(path)

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput, isAllowed }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
