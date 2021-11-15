import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Plane } from '../entities/PlaneEntity'

@Resolver()
export class PlaneResolver {
  manager: MongoEntityManager = getMongoManager()

  @Query(() => [Plane], { nullable: true })
  async getPlanes(): Promise<Plane[]> {
    return await this.manager.find<Plane>(Plane)
  }

  @Query(() => Plane, { nullable: true })
  async getPlaneById(
    @Arg('id') id: string,
  ): Promise<Plane | undefined | null> {
    const res = await this.manager.findOne<Plane>(Plane, { id: id })
    return res
  }

  @Mutation(() => Plane, { nullable: true })
  async createPlane(@Arg('data') newPlaneData: Plane): Promise<Plane> {
    const plane: Plane = await this.manager.create(Plane, newPlaneData)
    this.manager.save(plane)
    return plane
  }
}
