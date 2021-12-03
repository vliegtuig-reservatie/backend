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
    return await this.repository.find({
      relations: ['reviews', 'bookedSeats', 'bookedSeats.flight'],
    })
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | undefined | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['reviews', 'bookedSeats', 'bookedSeats.flight'],
    })
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') newUserData: User): Promise<User> {
    const user: User = await this.repository.create(newUserData)
    const res = this.repository.save(user)
    return res
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('data') newUserData: User,
    @Arg('id') id: string,
  ): Promise<User> {
    const user: User = await this.repository.findOne({
      where: { id: id },
      relations: ['reviews', 'bookedSeats'],
    })

    user.firstName = newUserData.firstName
    user.lastName = newUserData.lastName
    user.email = newUserData.email
    user.phonenr = newUserData.phonenr

    const res = this.repository.save(user)
    return res
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg('id') id: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: { id: id },
      relations: ['reviews', 'bookedSeats'],
    })

    this.repository.remove(user)
    return user
  }
}
