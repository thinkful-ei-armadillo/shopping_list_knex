const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful');

function searchAllThatContainText(searchTerm) {
  knexInstance
    .select()
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
// searchAllThatContainText('fish');

function getAllItemsPaginated(pageNumber) {
  const perPage = 6;
  const offset = perPage * (pageNumber -1);
  knexInstance
    .select()
    .from('shopping_list')
    .limit(perPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
getAllItemsPaginated(4);