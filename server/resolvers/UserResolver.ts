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
  async getUserById(
    @Arg('id') id: string
  ): Promise<User | undefined | null> {
    return await this.repository.findOne(id)
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') newUserData: User): Promise<User> {
    const user: User = await this.repository.create(newUserData)
    this.repository.save(user)
    return user
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('data') newUserData: User,
    @Arg('id') id: string
  ): Promise<User> {
    const user: User = await this.repository.findOne(id)

    user.firstName = newUserData.firstName
    user.lastName = newUserData.lastName
    user.email = newUserData.email
    user.phonenr = newUserData.phonenr

    this.repository.save(user)
    return user
  }
}

// updateUser
