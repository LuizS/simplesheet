import IEntity from "../data/i.entity";
import EntityKey from "../data/entity.key"
export class Cell implements IEntity  {
    readonly column: number
    readonly row: number
    readonly content: string
    constructor(row: number, column: number, content: string){
        this.row = row
        this.column = column
        this.content = content
    }
    key = () => new EntityKey(["row", this.row], ["column", this.column])
    equals = (object: Cell) => object.key() === this.key() && object.content === this.content
}