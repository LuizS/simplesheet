import mongo, { MongoClient } from 'mongodb';

const dbModel = function(collectionName: string) {
    
    const client = new MongoClient("mongodb://0.0.0.0:27017/");

    function getCollection(){
        //console.log("connection to mongo client");
        client.connect();
        //console.log("selecting db");
        const db = client.db("simplesheet");
        //console.log("opening collection");
        return db.collection(collectionName);
    }
        return {
            getAll: function(){
                try {
                    //console.log("find collection");
                    return getCollection().find();
                } catch(e) {
                    console.log(`A MongoReadException occurred: ${e}.`);
                } finally {
                     // console.log("closing mongodb connection");
                    // client.close();
                }
            },
            get: async function(query:object){
                try {
                    //console.log("find find one");
                    const result = await getCollection().findOne(query);
                    console.log(`${result?._id} document was found.`);
                    return result;
                } catch(e) {
                    console.log(`A MongoReadException occurred: ${e}.`);
                } finally {
                     console.log("closing mongodb connection");
                     client.close();
                }
            },
            save: async function(object: any, query: any){
                try {
                    console.log("upsert element");
                    const updatedDocument = await getCollection().updateOne(query, { $set: object},  { upsert: true });
                } catch(e) {
                    console.log(`A MongoWriteException occurred: ${e}.`);
                } finally {
                     console.log("closing mongodb connection");
                     client.close();
                }
            },
            saveAll: async function(data: any[] ){
                try {
                    // console.log("opening collection");
                    const collection = getCollection();
                    //console.log("clear collection");
                    const deletedDocuments = await collection.deleteMany({})
                    console.log(`${deletedDocuments.deletedCount} documents were deleted.`);
                    // console.log(`insert elements ${data}`);
                    const insertManyresult = await collection.insertMany(data);
                    let ids = insertManyresult.insertedIds;
                    console.log(`${insertManyresult.insertedCount} documents were inserted.`);
                    return ids;
                } catch(e) {
                    console.log(`A MongoBulkWriteException occurred: ${e}.`);
                } finally {
                     console.log("closing mongodb connection");
                     client.close();
                }
            }
        }
    
}
export default dbModel;