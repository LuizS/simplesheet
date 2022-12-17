// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require('dotenv').config()
import { MongoClient } from 'mongodb'
import IRepository from '../i.repository'

export default class MongoRepository<T> implements IRepository<T> {
  private collectionName: string
  private client = new MongoClient(process.env.MONGODB_URI || '')

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  private getCollection() {
    void this.client.connect()
    const db = this.client.db(process.env.MONGODB_NAME)
    return db.collection(this.collectionName)
  }

  public async getAll() : Promise<T[]> {
    try {
      const cursor = this.getCollection().find();
      const data: T[] = []

      if (cursor !== undefined) {
        await cursor.forEach((e: unknown) => {
          const cell: T = e as T
          data.push(cell)
        })
  
        await cursor.close()
      }

      return data;

    } catch (e) {
      const error: Error = e as Error
      console.log(`A MongoReadException occurred: ${error.message}.`)
      return [];
    }
  }

  public async get(query: object) : Promise<T> {
    try {
      return await this.getCollection().findOne(query) as T
    } catch (e) {
      const error: Error = e as Error
      console.log(`A MongoReadException occurred: ${error.message}.`)
      return {} as T;
    }
  }

  public async save(object: T, query: any) {
    try {
      await this.getCollection().updateOne(
        query,
        { $set: object },
        { upsert: true },
      )
    } catch (e) {
      const error: Error = e as Error
      console.log(`A MongoWriteException occurred: ${error.message}.`)
    }
  }

  public async saveAll(data: T[]) {
    try {
      const collection = this.getCollection()
      await collection.deleteMany({}).then(() => collection.insertMany(data as Document[]))
    } catch (e) {
      const error: Error = e as Error
      console.log(`A MongoReadException occurred: ${error.message}.`)
    }
  }
}
