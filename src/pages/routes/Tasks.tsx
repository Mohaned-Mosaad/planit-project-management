import { StatusTasksSection } from '@/components/pages/Tasks'
import { DragProvider } from '@/contexts'
import { LayoutContainer } from '@/layouts'

const Tasks = () => {
  return (
    <LayoutContainer>
      <DragProvider>
        <StatusTasksSection />
      </DragProvider>
    </LayoutContainer>
  )
}

export default Tasks
