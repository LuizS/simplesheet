require('dotenv').config()
import  {  MongoClient } from 'mongodb';
import IDbModel from './i.db.model';

export default class DbModel implements IDbModel {

    private collectionName:string;
      
    private client = new MongoClient(process.env.MONGODB_URI || "");    

    constructor(collectionName: string){
        this.collectionName = collectionName;           
    }

    private getCollection(){
        void this.client.connect();
        const db = this.client.db(process.env.MONGODB_NAME);
        return db.collection(this.collectionName);
    }

    public getAll(){
        try {
            return this.getCollection().find();
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        } 
    }

    public async get(query:object){
        try {
            const result = await this.getCollection().findOne(query);
            const id:string = result!== null?result._id.toString():"";
            console.log(`${id} document was found.`);
            return result;
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        }
    }

     public async save (object: any, query: any){
        try {
            await this.getCollection().updateOne(query, { $set: object},  { upsert: true });
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoWriteException occurred: ${error.message}.`);
        } 
    }

    public async saveAll(data: any[] ){
        try {
            const collection = this.getCollection();
            const deletedDocuments = await collection.deleteMany({})
            void collection.insertMany(data);
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        } 
    }
}
    

