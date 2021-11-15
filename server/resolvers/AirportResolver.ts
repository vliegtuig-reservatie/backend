import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Airport } from '../entities/AirportEntity'

@Resolver()
export class AirportResolver {
  manager: MongoEntityManager = getMongoManager()

  @Query(() => [Airport], { nullable: true })
  async getAirports(): Promise<Airport[]> {
    return await this.manager.find<Airport>(Airport)
  }

  @Query(() => Airport, { nullable: true })
  async getAirportById(
    @Arg('id') id: string,
  ): Promise<Airport | undefined | null> {
    const res = await this.manager.findOne<Airport>(Airport, { id: id })
    return res
  }

  @Mutation(() => Airport, { nullable: true })
  async createAirport(@Arg('data') newAirportData: Airport): Promise<Airport> {
    const airport: Airport = await this.manager.create(Airport, newAirportData)
    this.manager.save(airport)
    return airport
  }
}


// getAirportByJATACode