export default interface IDbModel  {
    getAll() : any;
    save (object: any, query: any): Promise<void>;
    saveAll(data: any[] ): Promise<void>;
}