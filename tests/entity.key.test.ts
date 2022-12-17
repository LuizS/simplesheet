import EntityKey from '../data/entity.key'
import IEntity from '../data/i.entity'


describe('testing entity key', () => {
    test('an entity with one key returns its key', () => {
      
      const TestEntityClass = class EntityClass implements IEntity{
          
          _key: EntityKey

          key(): EntityKey {
              return this._key;
          }

          constructor(keyProperty: string){
            this._key = new EntityKey(["keyProp", keyProperty]);
          }

      } 
        
      const objectUnderTest = new TestEntityClass("test value");
      expect(objectUnderTest.key().get()[0]).toStrictEqual(["keyProp", "test value"])
  
    })

    test('an entity with two key returns its key', () => {
      
        const TestEntityClass = class EntityClass implements IEntity{
            
            _key: EntityKey
  
            key(): EntityKey {
                return this._key;
            }
  
            constructor(keyProperty: string, secondProperty: number){
              this._key = new EntityKey(["keyProp", keyProperty],["secondKey", secondProperty]);
            }
  
        } 
          
        const objectUnderTest = new TestEntityClass("test value",1500);
        expect(objectUnderTest.key().get()[0]).toStrictEqual(["keyProp", "test value"])
        expect(objectUnderTest.key().get()[1]).toStrictEqual(["secondKey", 1500])
    
      })
})