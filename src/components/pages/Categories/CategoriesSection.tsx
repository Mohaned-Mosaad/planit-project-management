import CategoriesSectionHeader from './_components/TasksByCategory/CategoriesSectionHeader'
import CategoriesSectionBody from './_components/TasksByCategory/CategoriesSectionBody'
import { DragProvider } from '@/contexts'

const CategoriesSection = () => {
  return (
    <DragProvider>
      <section className='space-y-8'>
        <CategoriesSectionHeader />

        <CategoriesSectionBody />
      </section>
    </DragProvider>
  )
}

export default CategoriesSection
