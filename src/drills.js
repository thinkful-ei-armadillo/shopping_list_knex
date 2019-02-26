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
  const offset = perPage * (pageNumber - 1);
  knexInstance
    .select()
    .from('shopping_list')
    .limit(perPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
//getAllItemsPaginated(4);

function getAllItemsAfterDate(daysAgo) {
  knexInstance
    .select()
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result);
    });
}

//getAllItemsAfterDate(5);

function getTotalCostEachCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

getTotalCostEachCategory();

/* .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ])
    .then(result => {
      console.log(result);
    });
}*/

/*4. Get the total cost for each category

A function that takes no parameters
The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.
*/
