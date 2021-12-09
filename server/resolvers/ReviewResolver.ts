import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Flight } from '../entities/FlightEntity'
import { Review } from '../entities/ReviewEntity'
import { User } from '../entities/UserEntity'

@Resolver()
export class ReviewResolver {
  repository: Repository<Review> = getRepository(Review)
  flightRepository: Repository<Flight> = getRepository(Flight)
  userRepository: Repository<User> = getRepository(User)

  @Query(() => [Review], { nullable: true })
  async getReviews(): Promise<Review[]> {
    return await this.repository.find({
      relations: ['user', 'flight'],
    })
  }

  @Query(() => [Review], { nullable: true })
  async getReviewsForSimilarFlights(
    @Arg('flight') flightid: string,
  ): Promise<Review[]> {
    const flight = await this.flightRepository.findOne({
      where: { id: flightid },
    })
    return await this.repository.find({
      relations: ['user', 'flight'],
      where: {
        flight: {
          departureLocation: flight.departureLocation,
          arrivalLocation: flight.arrivalLocation,
          stops: flight.stops,
          plane: {
            agency: flight.plane.agency,
          },
        },
      },
    })
  }

  /*
  @Query(() => [Review], { nullable: true })
  async getReviewsByStars(
    @Arg('flight') flightid: string,
    @Arg('stars') stars: number,
  ): Promise<Review[] | undefined | null> {
    const flight = await this.repository.findOne({ where: { id: flightid }})
    const res = await this.repository.find({ where: { stars: stars, flight: flight},relations: [
      'user',
      'flight',
    ], })
    return res
  }
*/

  @Mutation(() => Review, { nullable: true })
  async createReview(
    @Arg('data') newReviewData: Review,
    @Arg('flightId') flightId: string,
    @Arg('userId') userId: string,
  ): Promise<Review> {
    const review: Review = await this.repository.create(newReviewData)
    const flight: Flight = await this.flightRepository.findOne({
      where: {
        id: flightId,
      },
    })
    const user: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })

    review.flight = flight
    review.user = user

    const res = this.repository.save(review)

    return res
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg('data') newReviewData: Review,
    @Arg('id') id: string,
  ): Promise<Review> {
    const review: Review = await this.repository.findOne({
      where: { id: id },
      relations: ['user', 'flight'],
    })

    review.stars = newReviewData.stars
    review.note = newReviewData.note

    const res = this.repository.save(review)
    return res
  }

  @Mutation(() => Review, { nullable: true })
  async deleteReview(@Arg('id') id: string): Promise<Review> {
    const review: Review = await this.repository.findOne({ where: { id: id } })

    this.repository.remove(review)
    return review
  }
}

// getReviewsForSimilarFlights // reviews tonen aan klanten waar de vlucht van dezelfde maatschapij is en de vertrek- tussenstop- en besteminglocaties hetzelfde is / bv dezelfde vlugt van gisteren
// getReviewsByFlight //getFlightById{reviews}???
// getReviewsByUser //getUserById{reviews}???

// updateReview
