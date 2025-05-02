type BaseCategory = {
  category: string
}
export type CategoryDocument = BaseCategory & {
  $id: string
  $createdAt: string
  $updatedAt: string
}

export type RawCategoryDocument = BaseCategory
