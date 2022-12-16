export default interface IDbModel<T> {
  getAll(): Promise<T[]>
  save(object: T, query: any): Promise<void>
  saveAll(data: T[]): Promise<void>
}
