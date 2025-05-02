import { CategoryDocument } from '@/types/api'

export const mapper = (doc: unknown): CategoryDocument => {
  if (
    typeof doc === 'object' &&
    doc !== null &&
    'category' in doc &&
    '$id' in doc &&
    '$createdAt' in doc &&
    '$updatedAt' in doc
  ) {
    return {
      category: doc.category,
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    } as CategoryDocument
  }

  throw new Error('Invalid CategoryDocument shape')
}
