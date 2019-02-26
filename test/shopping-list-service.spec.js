const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

/* global expect */

describe('Shopping list CRUD tests', () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Steak',
      date_added: new Date('2019-02-26T20:06:28.140Z'),
      checked: false,
      price: '0.01',
      category: 'Main'
    },
    {
      id: 2,
      name: 'Steak 2',
      date_added: new Date('2019-02-26T20:06:28.140Z'),
      checked: false,
      price: '6.01',
      category: 'Lunch'
    },
    {
      id: 3,
      name: 'Steak 3',
      date_added: new Date('2019-02-26T20:06:28.140Z'),
      checked: false,
      price: '0.23',
      category: 'Main'
    },
    {
      id: 4,
      name: 'Steak 4',
      date_added: new Date('2019-02-26T20:06:28.140Z'),
      checked: false,
      price: '88.01',
      category: 'Snack'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL_TEST
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list').insert(testItems);
    });

    it('getAllItems() resolves all items from the table', () => {
      return ShoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });

    it("getItemById() should resolve an item by id from 'shopping_list'", () => {
      const id = 3;
      return ShoppingListService.getItemById(db, id).then(actual => {
        expect(actual).to.eql(testItems[id - 1]);
      });
    });

    it(`deleteItem() removes an item by id from the shopping_list table`, () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });

    it(`updateItem() updates an item from the shopping_list table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'bag o chips',
        price: '4.50',
        category: 'Snack',
        date_added: new Date('2019-02-26T20:06:28.140Z'),
        checked: false
      };
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getItemById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData
          });
        });
    });
  });

  context(`Given shopping_list has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
  });

  it('insertItem() inserts an item and resolves the item', () => {
    const newItem = {
      name: 'Test item',
      price: '5.55',
      date_added: new Date('2019-02-26T20:06:28.140Z'),
      checked: false,
      category: 'Snack'
    };
    return ShoppingListService.insertItem(db, newItem).then(actual => {
      expect(actual).to.eql({
        id: 1,
        name: newItem.name,
        price: newItem.price,
        date_added: newItem.date_added,
        checked: newItem.checked,
        category: newItem.category
      });
    });
  });
});
