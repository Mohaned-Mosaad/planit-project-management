import { StatusValue } from './StatusDocument'

export type StatisticsObject = {
  totalCount: number
} & {
  [key in StatusValue]: number
}
