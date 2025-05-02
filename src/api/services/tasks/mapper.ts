import { TaskDocument } from '@/types/api'

import { mapper as categoryMapper } from '../categories/mapper'
import { mapper as statusMapper } from '../statuses/mapper'

export const mapper = (doc: unknown): TaskDocument => {
  if (
    typeof doc === 'object' &&
    doc !== null &&
    'category' in doc &&
    'status' in doc &&
    '$id' in doc &&
    '$createdAt' in doc &&
    '$updatedAt' in doc &&
    'content' in doc
  ) {
    return {
      category: categoryMapper(doc.category),
      status: statusMapper(doc.status),
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      content: doc.content,
    } as TaskDocument
  }

  throw new Error('Invalid TaskDocument shape')
}
