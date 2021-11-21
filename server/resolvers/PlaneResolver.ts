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

  @Query(() => [Plane], { nullable: true })
  async getPlanes(): Promise<Plane[]> {
    return await this.repository.find({ relations: ['flights'] })
  }

  @Query(() => Plane, { nullable: true })
  async getPlaneById(@Arg('id') id: string): Promise<Plane | undefined | null> {
    const res = await this.repository.findOne(id)
    return res
  }

  @Mutation(() => Plane, { nullable: true })
  async createPlane(@Arg('data') newPlaneData: Plane): Promise<Plane> {
    const plane: Plane = await this.repository.create(newPlaneData)
    this.repository.save(plane)
    return plane
  }
}
