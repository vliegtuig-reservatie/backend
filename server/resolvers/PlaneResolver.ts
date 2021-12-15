import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Plane } from '../entities/PlaneEntity'

@Resolver()
export class PlaneResolver {
  repository: Repository<Plane> = getRepository(Plane)

  @Authorized()
  @Query(() => [Plane], { nullable: true })
  async getPlanes(): Promise<Plane[]> {
    return await this.repository.find({ relations: ['flights'] })
  }

  @Authorized()
  @Query(() => Plane, { nullable: true })
  async getPlaneById(@Arg('id') id: string): Promise<Plane | undefined | null> {
    const res = await this.repository.findOne(id)
    return res
  }

  @Authorized()
  @Mutation(() => Plane, { nullable: true })
  async createPlane(@Arg('data') newPlaneData: Plane): Promise<Plane> {
    const plane: Plane = await this.repository.create(newPlaneData)
    const res = this.repository.save(plane)
    return res
  }

  @Authorized()
  @Mutation(() => Plane, { nullable: true })
  async updatePlane(
    @Arg('data') newPlaneData: Plane,
    @Arg('id') id: string
  ): Promise<Plane> {
    const plane: Plane = await this.repository.findOne(id)

    plane.rowCount = newPlaneData.rowCount
    plane.columncount = newPlaneData.columncount
    plane.agency = newPlaneData.agency

    const res = this.repository.save(plane)
    return res
  }

  @Authorized()
  @Mutation(() => Plane, { nullable: true })
  async deletePlane(
    @Arg('id') id: string
  ): Promise<Plane> {
    const plane: Plane = await this.repository.findOne({ where: { id: id } })

    this.repository.remove(plane)
    return plane
  }
}
