import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Flight } from '../entities/FlightEntity'

@Resolver()
export class FlightResolver {
  manager: MongoEntityManager = getMongoManager()

  @Query(() => [Flight], { nullable: true })
  async getFlights(): Promise<Flight[]> {
    return await this.manager.find<Flight>(Flight)
  }

  @Query(() => Flight, { nullable: true })
  async getFlightById(
    @Arg('id') id: string,
  ): Promise<Flight | undefined | null> {
    const res = await this.manager.findOne<Flight>(Flight, { id: id })
    return res
  }

  @Mutation(() => Flight, { nullable: true })
  async createFlight(@Arg('data') newFlightData: Flight): Promise<Flight> {
    const flight: Flight = await this.manager.create(Flight, newFlightData)
    this.manager.save(flight)
    return flight
  }
}


// addBookedSeat