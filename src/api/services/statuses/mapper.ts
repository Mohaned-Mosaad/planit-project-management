import { StatusDocument, StatusValue } from '@/types/api'
import { StatusesArray } from '@/types/api/StatusDocument'

export const mapper = (doc: unknown): StatusDocument => {
  if (
    typeof doc === 'object' &&
    doc !== null &&
    'status' in doc &&
    '$id' in doc &&
    '$createdAt' in doc &&
    '$updatedAt' in doc
  ) {
    if (!StatusesArray.includes(doc.status as StatusValue)) {
      throw new Error('Invalid StatusDocument shape')
    }
    return {
      status: doc.status,
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    } as StatusDocument
  }

  throw new Error('Invalid StatusDocument shape')
}
