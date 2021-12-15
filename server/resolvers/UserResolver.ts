import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { User } from '../entities/UserEntity'
import { getAuth } from 'firebase-admin/auth'

@Resolver()
export class UserResolver {
  repository: Repository<User> = getRepository(User)

  @Authorized()
  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.repository.find({
      relations: [
        'reviews',
        'reviews.flight',
        'bookedSeats',
        'bookedSeats.flight',
      ],
    })
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | undefined | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: [
        'reviews',
        'reviews.flight',
        'reviews.flight.arrivalLocation',
        'reviews.flight.departureLocation',
        'reviews.flight.plane',
        'bookedSeats',
        'bookedSeats.flight',
        'bookedSeats.flight.departureLocation',
        'bookedSeats.flight.arrivalLocation',
        'bookedSeats.flight.plane',
      ],
    })
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async getUserBookedFlightById(
    @Arg('userId') userId: string,
    @Arg('flightId') flightId: string,
  ): Promise<User | undefined | null> {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookedSeats', 'bookedSeats')
      .leftJoinAndSelect('bookedSeats.flight', 'flight')
      .leftJoinAndSelect('flight.plane', 'plane')
      .where('bookedSeats.flight.id = :flightId', { flightId })
      .andWhere('user.id = :userId', { userId })
      .getOne()
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') newUserData: User): Promise<User> {
    const user: User = await this.repository.create(newUserData)
    const res = this.repository.save(user)

    const customClaims = {
      admin: false,
    }
    if (newUserData.email && newUserData.email.endsWith('@howest.be')) {
      customClaims.admin = true
    }

    try {
      await getAuth().setCustomUserClaims(newUserData.id, customClaims)
    } catch (err) {
      console.log(err)
    }

    console.log('user created')
    return res
  }

  @Authorized()
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

  @Authorized()
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
