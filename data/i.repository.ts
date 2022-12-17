export default interface IRepository<T> {
  getAll(): Promise<T[]>
  save(object: T, query: any): Promise<void>
  saveAll(data: T[]): Promise<void>
}
