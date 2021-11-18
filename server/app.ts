import 'reflect-metadata'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { createConnection } from 'typeorm'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/UserResolver'
import { GraphQLSchema } from 'graphql'
import { User } from './entities/UserEntity'

// APP SETUP
const app = express(),
  port = process.env.PORT || 8888

app.use(cors())

// MIDDLEWARE
app.use(express.json()) // for parsing application/json
;(async () => {
  const conn: MongoConnectionOptions = {
    name: 'mongodb', // Useful for reference later on
    type: 'mongodb',
    url: 'mongodb+srv://docent:Password@jetlistcluster.ngz7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', // Url to the database eg. mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin
    useNewUrlParser: true,
    logging: true,
    useUnifiedTopology: true,
    entities: [`${__dirname}/entities/*{.ts,.js}`],
    //entities: [TestEntity, User],
  }

  await createConnection(conn).catch(ex => console.log(ex))
  // ROUTES
  app.get('/', (request: Request, response: Response) => {
    response.send(`Welcome, just know: you matter!`)
  })

  /**
   *
   * @description create the graphql schema with the imported resolvers
   */
  let schema: GraphQLSchema = {} as GraphQLSchema
  const createSchema = async () => {
    await buildSchema({
      resolvers: [`${__dirname}/resolvers/*{.ts,.js}`],
    }).then(_ => {
      schema = _
    })
  }
  // GraphQL init middleware
  app.use(
    '/v1/', // Url, do you want to keep track of a version?
    graphqlHTTP((request, response) => ({
      schema: schema,
      context: { request, response },
      graphiql: true,
    })),
  )

  // APP START -> also covered in basic Express part
  app.listen(port, () => {
    console.info(`\nWelcome 👋\nGraphQL server @ http://localhost:${port}/v1\n`)
  })

  createSchema()
})()
