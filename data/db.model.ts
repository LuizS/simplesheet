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


        //console.log("connection to mongo client");
        void this.client.connect();
        //console.log("selecting db");
        const db = this.client.db(process.env.MONGODB_NAME);
        //console.log("opening collection");
        return db.collection(this.collectionName);
    }

    public getAll(){
        try {
            //console.log("find collection");
            return this.getCollection().find();
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        } finally {
                // console.log("closing mongodb connection");
            // client.close();
        }
    }

    public async get(query:object){
        try {
            //console.log("find find one");
            const result = await this.getCollection().findOne(query);
            const id:string = result!== null?result._id.toString():"";
            console.log(`${id} document was found.`);
            return result;
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        } finally {
            console.log("closing mongodb connection");
          //  void this.client.close();
        }
    }

     public async save (object: any, query: any){
        try {
            console.log("upsert element");
            await this.getCollection().updateOne(query, { $set: object},  { upsert: true });
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoWriteException occurred: ${error.message}.`);
        } finally {
            console.log("closing mongodb connection");
          //  void this.client.close();
        }
    }

    public async saveAll(data: any[] ){
        try {
            // console.log("opening collection");
            const collection = this.getCollection();
            //console.log("clear collection");
            const deletedDocuments = await collection.deleteMany({})
            console.log(`${deletedDocuments.deletedCount} documents were deleted.`);
            console.log(`insert elements ${data}`);
            void collection.insertMany(data);
        } catch(e) {
            const error:Error=e as Error;
            console.log(`A MongoReadException occurred: ${error.message}.`);
        } finally {
            console.log("closing mongodb connection");
          //  void this.client.close();
        }
    }
}
    

