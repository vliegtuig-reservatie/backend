import 'reflect-metadata'
import express, { Request, Response } from 'express'
import cors from 'cors'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import seedDatabase from './seeders/seeder'
;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions() // This line will get the connection options from the typeorm
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database created successfully!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)
      // APP SETUP
      const app = express(),
        port = process.env.PORT || 8888

      app.use(cors())

      // MIDDLEWARE
      app.use(express.json()) // for parsing application/json

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
        console.info(
          `\nWelcome 👋\nGraphQL server @ http://localhost:${port}/v1\n`,
        )
      })

      createSchema()
    })
    .catch(error => console.error(error)) // If it crashed anywhere, let's log the error!
})()
