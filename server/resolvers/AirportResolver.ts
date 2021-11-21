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

  @Query(() => [Airport], { nullable: true })
  async getAirports(): Promise<Airport[]> {
    return await this.repository.find()
  }

  @Query(() => Airport, { nullable: true })
  async getAirportById(
    @Arg('id') id: string,
  ): Promise<Airport | undefined | null> {
    const res = await this.repository.findOne({ where: { id: id } })
    return res
  }

  @Query(() => Airport, { nullable: true })
  async getAirportByIATA(
    @Arg('iatacode') iatacode: string,
  ): Promise<Airport | undefined | null> {
    const res = await this.repository.findOne({
      where: {
        IATACode: iatacode,
      },
    })
    return res
  }

  @Mutation(() => Airport, { nullable: true })
  async createAirport(@Arg('data') newAirportData: Airport): Promise<Airport> {
    const airport: Airport = await this.repository.create(newAirportData)
    this.repository.save(airport)
    return airport
  }
}
