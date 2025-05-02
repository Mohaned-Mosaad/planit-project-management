export const StatusesArray = [
  'not started',
  'in progress',
  'completed',
  'deferred',
] as const

export type StatusValue = (typeof StatusesArray)[number]

type BaseStatus = {
  status: StatusValue
}
export type StatusDocument = BaseStatus & {
  $id: string
  $createdAt: string
  $updatedAt: string
}
