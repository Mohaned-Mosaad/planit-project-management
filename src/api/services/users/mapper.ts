import { UserDocument } from '@/types/api'

export const mapper = (doc: unknown): UserDocument => {
  if (
    typeof doc === 'object' &&
    doc !== null &&
    '$id' in doc &&
    '$createdAt' in doc &&
    'name' in doc &&
    'email' in doc
  ) {
    return {
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      name: doc.name,
      email: doc.email,
    } as UserDocument
  }

  throw new Error('Invalid UserDocument shape')
}
