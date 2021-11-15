import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { User } from '../entities/UserEntity'

@Resolver()
export class UserResolver {
  manager: MongoEntityManager = getMongoManager()

  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.manager.find<User>(User)
  }

  @Query(() => User, { nullable: true })
  async getUserById(
    @Arg('id') id: string,
  ): Promise<User | undefined | null> {
    const res = await this.manager.findOne<User>(User, { id: id })
    return res
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') newUserData: User): Promise<User> {
    const user: User = await this.manager.create(User, newUserData)
    this.manager.save(user)
    return user
  }
}