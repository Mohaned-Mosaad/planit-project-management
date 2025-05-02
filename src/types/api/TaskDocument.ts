import { CategoryDocument } from './CategoryDocument'
import { StatusDocument } from './StatusDocument'
type BaseTask = {
  content: string
}

export type TaskDocument = BaseTask & {
  category: CategoryDocument
  status: StatusDocument
  $id: string
  $createdAt: string
  $updatedAt: string
}

export type RawTaskDocument = BaseTask & {
  status: string
  category: string
}
