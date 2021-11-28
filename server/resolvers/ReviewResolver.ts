import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Flight } from '../entities/FlightEntity'
import { Review } from '../entities/ReviewEntity'

@Resolver()
export class ReviewResolver {
  repository: Repository<Review> = getRepository(Review)
  Flightrepository: Repository<Flight> = getRepository(Flight)

  @Query(() => [Review], { nullable: true })
  async getReviews(): Promise<Review[]> {
    return await this.repository.find({
      relations: [
        'user',
        'flight',
      ],
    })
  }

  @Query(() => [Review], { nullable: true })
  async getReviewsForSimilarFlights(
    @Arg('flight') flightid: string,
  ): Promise<Review[]> {
    const flight = await this.Flightrepository.findOne({ where: { id: flightid }})
    return await this.repository.find({
      relations: [
        'user',
        'flight',
      ],
      where: {
        flight: {
          departureLocation: flight.departureLocation,
          arrivalLocation: flight.arrivalLocation,
          stops: flight.stops,
          plane: {
            agency: flight.plane.agency
          }
        }
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
  async createReview(@Arg('data') newReviewData: Review): Promise<Review> {
    const review: Review = await this.repository.create(newReviewData)
    this.repository.save(review)
    return review
  }
}

// getReviewsForSimilarFlights // reviews tonen aan klanten waar de vlucht van dezelfde maatschapij is en de vertrek- tussenstop- en besteminglocaties hetzelfde is / bv dezelfde vlugt van gisteren
// getReviewsByFlight //getFlightById{reviews}???
// getReviewsByUser //getUserById{reviews}???

// updateReview
