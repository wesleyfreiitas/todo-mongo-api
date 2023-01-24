// Não vamos fazer require pois o dotenv não será usado em prod
// require('dotenv').config()

//Vamos usar o mongoose e nao o mongodb
// const { MongoClient } = require('mongodb');
const app = require('./src/app')

const connectDB = require('./src/db/connect')

const PORT = process.env.PORT || 3000

const url = process.env.MONGO_URL;
/**
  O código abaixo é a conexão com o mongodb, mas vamos usar o mongoose
  
  const { propfind } = require('./src/app')
  // or as an es module:
  // import { MongoClient } from 'mongodb'
  
  // Connection URL
  const client = new MongoClient(url);
  
  // Database Name
  const dbName = 'myFirstProject';
  
  async function main() {
      // Use connect method to connect to the server
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('documents');
  
      // the following code examples can be pasted here...
      const insertResult = await collection.insertMany([{title:"task 1", completed:false},{title:"task 2", completed:true}]);
      console.log('Inserted documents =>', insertResult);
      return 'done.';
  }
  
  main()
      .then(() => {
              
          })
      .catch(console.error)
      .finally(() => client.close());
 */
const main = async () => {
    try {
        await connectDB(url)
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

main()