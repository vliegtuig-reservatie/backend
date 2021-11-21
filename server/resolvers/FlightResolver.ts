import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Flight } from '../entities/FlightEntity'
import { Seat } from '../entities/SeatEntity'

@Resolver()
export class FlightResolver {
  repository: Repository<Flight> = getRepository(Flight)
  seatRepository: Repository<Seat> = getRepository(Seat)

  @Query(() => [Flight], { nullable: true })
  async getFlights(): Promise<Flight[]> {
    return await this.repository.find({
      relations: [
        'departureLocation',
        'arrivalLocation',
        'plane',
        'bookedSeats',
        'reviews',
      ],
    })
  }

  @Query(() => Flight, { nullable: true })
  async getFlightById(
    @Arg('id') id: string,
  ): Promise<Flight | undefined | null> {
    const res = await this.repository.findOne({ where: { id: id } })
    return res
  }

  @Mutation(() => Flight, { nullable: true })
  async createFlight(@Arg('data') newFlightData: Flight): Promise<Flight> {
    const flight: Flight = await this.repository.create(newFlightData)
    this.repository.save(flight)
    return flight
  }

  @Mutation(() => Flight, { nullable: true })
  async addBookedSeat(
    @Arg('data') newSeatData: Seat,
    @Arg('flightId') flightId: string,
  ): Promise<Flight> {
    const seat: Seat = await this.seatRepository.create(newSeatData)
    const flight: Flight = await this.repository.findOne({
      where: {
        id: flightId,
      },
    })

    flight.bookedSeats.push(seat)

    this.repository.save(seat)
    this.repository.save(flight)

    return flight
  }
}

// addBookedSeat
// findFlight // vlucht vinden op vertrek-, besteminglocaties en datum(s) / maybe vluchten ook vinden op aangevraagde stoelen zodat je geen vluchten ziet met te weinig stoelen
