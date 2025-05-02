import { useSearch } from '@/contexts/SearchContext'
import { useDebounce } from '@/hooks/useDebounce'
import { TaskDocument } from '@/types/api'
import { useMemo } from 'react'

const filter = (tasks: TaskDocument[], searchInput: string) => {
  return tasks.filter((task) =>
    task.content.toLowerCase().includes(searchInput.toLowerCase())
  )
}

export const useTaskSearch = (tasks: TaskDocument[]) => {
  const { searchInput } = useSearch()

  const debouncedSearchInput = useDebounce(searchInput, 200)

  const searchedTasks = useMemo(() => {
    if (!debouncedSearchInput) return tasks

    return filter(tasks, debouncedSearchInput)
  }, [tasks, debouncedSearchInput])

  return searchedTasks
}
