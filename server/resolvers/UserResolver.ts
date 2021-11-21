import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { User } from '../entities/UserEntity'

@Resolver()
export class UserResolver {
  repository: Repository<User> = getRepository(User)

  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.repository.find({ relations: ['reviews', 'bookedSeats'] })
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | undefined | null> {
    return await this.repository.findOne(id)
  }

  @Query(() => User, { nullable: true })
  async getUserByUuid(
    @Arg('uuid') uuid: string,
  ): Promise<User | undefined | null> {
    const res = await this.repository.findOne({ where: { uuid: uuid } })
    return res
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') newUserData: User): Promise<User> {
    const user: User = await this.repository.create(newUserData)
    this.repository.save(user)
    return user
  }
}

// updateUser
