import EntityKey from "./entity.key";

export default interface IEntity{
    key(): EntityKey;
    equals(object: IEntity) : boolean;
}