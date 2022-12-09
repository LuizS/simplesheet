"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dbModel = function (collectionName) {
    const client = new mongodb_1.MongoClient("mongodb://0.0.0.0:27017/");
    function getCollection() {
        //console.log("connection to mongo client");
        client.connect();
        //console.log("selecting db");
        const db = client.db("simplesheet");
        //console.log("opening collection");
        return db.collection(collectionName);
    }
    return {
        getAll: function () {
            try {
                //console.log("find collection");
                return getCollection().find();
            }
            catch (e) {
                console.log(`A MongoReadException occurred: ${e}.`);
            }
            finally {
                // console.log("closing mongodb connection");
                // client.close();
            }
        },
        get: async function (query) {
            try {
                //console.log("find find one");
                const result = await getCollection().findOne(query);
                console.log(`${result === null || result === void 0 ? void 0 : result._id} document was found.`);
                return result;
            }
            catch (e) {
                console.log(`A MongoReadException occurred: ${e}.`);
            }
            finally {
                console.log("closing mongodb connection");
                client.close();
            }
        },
        save: async function (object) {
            try {
                console.log("upsert element");
                const updatedDocument = await getCollection().updateOne({ _id: object._id }, { $set: object }, { upsert: true });
                console.log(`${updatedDocument.upsertedCount} documents were upserted.`);
            }
            catch (e) {
                console.log(`A MongoWriteException occurred: ${e}.`);
            }
            finally {
                console.log("closing mongodb connection");
                client.close();
            }
        },
        saveAll: async function (data) {
            try {
                // console.log("opening collection");
                const collection = getCollection();
                console.log("clear collection");
                const deletedDocuments = await collection.deleteMany({});
                console.log(`${deletedDocuments.deletedCount} documents were deleted.`);
                // console.log(`insert elements ${data}`);
                const insertManyresult = await collection.insertMany(data);
                let ids = insertManyresult.insertedIds;
                console.log(`${insertManyresult.insertedCount} documents were inserted.`);
                return ids;
            }
            catch (e) {
                console.log(`A MongoBulkWriteException occurred: ${e}.`);
            }
            finally {
                console.log("closing mongodb connection");
                client.close();
            }
        }
    };
};
exports.default = dbModel;
