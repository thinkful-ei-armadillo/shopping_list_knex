const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list');
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0]);
  },
  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .first();
  },
  updateItem(knex, id, newItem) {
    return knex
      .from('shopping_list')
      .where({ id })
      .update(newItem);
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete();
  }
};

module.exports = ShoppingListService;