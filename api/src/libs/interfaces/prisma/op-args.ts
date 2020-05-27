export interface OpArgs<T, V> {
  where?: T
  orderBy?: V
  skip?: number
  after?: string
  before?: string
  first?: number
  last?: number
}
