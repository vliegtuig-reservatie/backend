import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  LessThan,
  MongoEntityManager,
  MoreThan,
  Repository,
} from 'typeorm'
import { Flight } from '../entities/FlightEntity'
import { Seat } from '../entities/SeatEntity'
import {
  DoubleFlightQuery,
  FlightQuery,
  SeatQuery,
} from '../entities/QueryEntities'
import { User } from '../entities/UserEntity'

@Resolver()
export class FlightResolver {
  repository: Repository<Flight> = getRepository(Flight)
  seatRepository: Repository<Seat> = getRepository(Seat)
  userRepository: Repository<User> = getRepository(User)

  @Authorized()
  @Query(() => [Flight], { nullable: true })
  async getFlights(): Promise<Flight[]> {
    return await this.repository.find({
      relations: [
        'departureLocation',
        'arrivalLocation',
        'plane',
        'bookedSeats',
        'bookedSeats.passager',
        'bookedSeats.flight',
        'reviews',
      ],
    })
  }

  @Authorized()
  @Query(() => Flight, { nullable: true })
  async getFlightById(
    @Arg('id') id: string,
  ): Promise<Flight | undefined | null> {
    const res = await this.repository.findOne({
      where: { id: id },
      relations: [
        'departureLocation',
        'arrivalLocation',
        'plane',
        'bookedSeats',
        'bookedSeats.passager',
        'reviews',
      ],
    })
    return res
  }

  @Authorized()
  @Query(() => DoubleFlightQuery, { nullable: true })
  async findFlight(
    @Arg('data') flightdata: FlightQuery,
    @Arg('doubleFlight') doubleFlight: boolean,
    @Arg('seats') requestedSeats: number,
  ): Promise<DoubleFlightQuery | undefined | null> {
    const res = new DoubleFlightQuery()

    let filteredDepartureFlight: Flight[]
    const departureFlight: Flight[] = await this.repository.find({
      where: {
        departureLocation: flightdata.departureLocation,
        arrivalLocation: flightdata.arrivalLocation,
        departureTime: flightdata.departureTime,
      },
      relations: [
        'departureLocation',
        'arrivalLocation',
        'plane',
        'bookedSeats',
        'bookedSeats.passager',
        'reviews',
      ],
    })

    departureFlight.forEach(i => {
      if (
        i.bookedSeats.length <=
        i.plane.rowCount * i.plane.columncount - requestedSeats
      ) {
        filteredDepartureFlight.push(i)
      }
    })

    res.departureFlights = departureFlight

    if (doubleFlight) {
      const returnFlight: Flight[] = await this.repository.find({
        where: {
          departureLocation: flightdata.arrivalLocation,
          arrivalLocation: flightdata.departureLocation,
          departureTime: flightdata.returnTime,
        },
        relations: [
          'departureLocation',
          'arrivalLocation',
          'plane',
          'bookedSeats',
          'bookedSeats.passager',
          'reviews',
        ],
      })

      departureFlight.forEach(i => {
        if (
          i.bookedSeats.length <=
          i.plane.rowCount * i.plane.columncount - requestedSeats
        ) {
          filteredDepartureFlight.push(i)
        }
      })

      res.returnFlights = returnFlight
    }

    return res
  }

  @Authorized()
  @Mutation(() => Flight, { nullable: true })
  async createFlight(@Arg('data') newFlightData: Flight): Promise<Flight> {
    const flight: Flight = await this.repository.create(newFlightData)
    const res = this.repository.save(flight)
    return res
  }

  @Authorized()
  @Mutation(() => Seat, { nullable: true })
  async addBookedSeat(
    @Arg('data') newSeatData: SeatQuery,
    @Arg('flightId') flightId: string,
    @Arg('userId') userId: string,
  ): Promise<Seat> {
    const seat: Seat = await this.seatRepository.create(newSeatData)
    const flight: Flight = await this.repository.findOne({
      where: {
        id: flightId,
      },
    })
    const user: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })

    seat.flight = flight
    seat.passager = user

    const savedseat = this.seatRepository.save(seat)

    return savedseat
  }

  @Authorized()
  @Mutation(() => Flight, { nullable: true })
  async updateFlight(
    @Arg('data') newFlightData: Flight,
    @Arg('id') id: string,
  ): Promise<Flight> {
    const flight: Flight = await this.repository.findOne(id)

    flight.departureTime = newFlightData.departureTime
    flight.arrivalTime = newFlightData.arrivalTime
    flight.departureLocation = newFlightData.departureLocation
    flight.arrivalLocation = newFlightData.arrivalLocation
    flight.stops = newFlightData.stops

    const res = this.repository.save(flight)
    return res
  }

  @Authorized()
  @Mutation(() => Flight, { nullable: true })
  async deleteFlight(@Arg('id') id: string): Promise<Flight> {
    const flight: Flight = await this.repository.findOne({ where: { id: id } })

    this.repository.remove(flight)
    return flight
  }
}

// findFlight // vlucht vinden op vertrek-, besteminglocaties en datum(s) / maybe vluchten ook vinden op aangevraagde stoelen zodat je geen vluchten ziet met te weinig stoelen
