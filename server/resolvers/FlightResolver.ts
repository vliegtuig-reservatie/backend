import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Flight } from '../entities/FlightEntity'
import { Seat } from '../entities/SeatEntity'

@Resolver()
export class FlightResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

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

  @Mutation(() => Flight, { nullable: true })
  async addBookedSeat(@Arg('data') newSeatData: Seat, @Arg('flightId') flightId: string): Promise<Flight> {
    const seat: Seat = await this.manager.create(Seat, newSeatData)
    const flight: Flight = await this.manager.findOne<Flight>(Flight, { id: flightId })

    flight.bookedSeats.push(seat)

    this.manager.save(seat)
    this.manager.save(flight)

    return flight
  }
}


// addBookedSeat