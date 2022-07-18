import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function'
import { Sequelize } from 'sequelize'
import gameModel from './game'
// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/database.sqlite'
})

const authCheck = async () => {
  try {
    await sequelize.authenticate()
    console.log('authenticated to database :)')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
authCheck()

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

// const sequelize = new Sequelize('db-name', 'db-user', 'db-paasword', {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })

const db: any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.games = gameModel(sequelize, Sequelize)
// //...

export default db
