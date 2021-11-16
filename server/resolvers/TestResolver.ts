import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'

import { TestEntity } from '../entities/TestEntity'

/**
 *
 * @description Resolver behaves like a controller in REST.
 * A resolver holds all the queries and mutations we want to perform on an entity.
 * Is a singleton instance
 */
@Resolver()
export class TestEntityResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  //@Authorized('SOME_ROLE') // Optional role checking -> needs some customisation further on ;-)
  @Query(() => [TestEntity], { nullable: true })
  async getTestEntities(): Promise<TestEntity[]> {
    // Because we create the manager inside the resolver, we must prefix it with "this." to use it.
    const testEntities = await this.manager
      .find<TestEntity>(TestEntity)
      .then((d) => d)

    return testEntities
  }

  @Query(() => TestEntity, { nullable: true })
  async getTestEntityById(
    @Arg('id') id: string,
  ): Promise<TestEntity | undefined | null> {
    return await this.manager.findOne<TestEntity>(TestEntity, id)
  }

  @Mutation(() => TestEntity)
  createTestEntity(@Arg('data') newTestEntityData: TestEntity): TestEntity {
    const testEntity = this.manager.create(TestEntity, newTestEntityData)
    this.manager.save(testEntity)
    return testEntity
  }
}