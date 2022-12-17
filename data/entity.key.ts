/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EntityKey{

    private _keys:Record<string,any>[];
    
    get(): Record<string,any>[]{
        return this._keys;
    }

    constructor(...keys:Record<string,any>[]){
        this._keys = keys;
    }

}