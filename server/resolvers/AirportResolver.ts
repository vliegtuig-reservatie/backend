import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Airport } from '../entities/AirportEntity'

@Resolver()
export class AirportResolver {
  repository: Repository<Airport> = getRepository(Airport)

  @Authorized()
  @Query(() => [Airport], { nullable: true })
  async getAirports(): Promise<Airport[]> {
    return await this.repository.find({
      relations: [
        'departureFlights',
        'departureFlights.arrivalLocation',
        'departureFlights.plane',
      ]
    })
  }

  @Authorized()
  @Query(() => Airport, { nullable: true })
  async getAirportById(
    @Arg('id') id: string,
  ): Promise<Airport | undefined | null> {
    const res = await this.repository.findOne({ where: { id: id },
      relations: [
        'departureFlights',
        'departureFlights.arrivalLocation',
        'departureFlights.plane',
      ]
    })
    return res
  }

  @Authorized()
  @Query(() => Airport, { nullable: true })
  async getAirportByIATA(
    @Arg('iatacode') iatacode: string,
  ): Promise<Airport | undefined | null> {
    const res = await this.repository.findOne({
      where: {
        IATACode: iatacode,
      },
        relations: [
          'departureFlights',
          'departureFlights.arrivalLocation',
          'departureFlights.plane',
        ]
    })
    return res
  }

  @Authorized()
  @Mutation(() => Airport, { nullable: true })
  async createAirport(@Arg('data') newAirportData: Airport): Promise<Airport> {
    const airport: Airport = await this.repository.create(newAirportData)
    const res = this.repository.save(airport)
    return res
  }

  @Authorized()
  @Mutation(() => Airport, { nullable: true })
  async updateAirport(
    @Arg('data') newAirportData: Airport,
    @Arg('id') id: string
  ): Promise<Airport> {
    const airport: Airport = await this.repository.findOne({ where: { id: id },
      relations: [
        'departureFlights',
        'departureFlights.arrivalLocation',
        'departureFlights.plane',
      ]
    })

    airport.name = newAirportData.name
    airport.IATACode = newAirportData.IATACode
    airport.latitude = newAirportData.latitude
    airport.longitude = newAirportData.longitude

    const res = this.repository.save(airport)
    return res
  }

  @Authorized()
  @Mutation(() => Airport, { nullable: true })
  async deleteAirport(
    @Arg('id') id: string
  ): Promise<Airport> {
    const airport: Airport = await this.repository.findOne({ where: { id: id } })

    this.repository.remove(airport)
    return airport
  }
}
