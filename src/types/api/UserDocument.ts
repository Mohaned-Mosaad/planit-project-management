export type UserDocument = {
  $id: string
  $createdAt: string
  name: string
  email: string
}

export type RawUserDocument = {
  email: string
  password: string
  name: string
}
