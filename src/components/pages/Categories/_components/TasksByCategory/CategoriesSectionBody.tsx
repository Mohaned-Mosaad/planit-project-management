import LoadersInitiator from '@/components/shared/LoadersInitiator'
import CategoryColumn from './CategoryColumn'

import SharedPagination from '@/components/shared/SharedPagination'

import { useFetchPaginatedCategories } from '@/hooks/api/categories'
import CategoryColumnSkeleton from '@/components/loaders/CategoryColumnSkeleton'
import { NoDocuments } from '@/components/errors/NoDocuments'

const CategoriesSectionBody = () => {
  const { categories, categoriesPerPage, setPage, isLoading } =
    useFetchPaginatedCategories()

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5'>
        <LoadersInitiator
          isLoading={isLoading}
          loaderComponent={<CategoryColumnSkeleton />}
          loadersCount={4}
        >
          {categories?.documents.length === 0 && (
            <div className='col-span-full h-[300px] flex items-center justify-center'>
              <NoDocuments title='No categories found' />
            </div>
          )}
          {categories?.documents.map((obj) => {
            return <CategoryColumn key={obj.$id} categoryObject={obj} />
          })}
        </LoadersInitiator>
      </div>

      <SharedPagination
        pages={
          categories?.total
            ? Math.ceil(categories.total / categoriesPerPage)
            : 1
        }
        onPageChange={setPage}
      />
    </div>
  )
}

export default CategoriesSectionBody
