import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import {
  getMongoManager,
  getRepository,
  MongoEntityManager,
  Repository,
} from 'typeorm'
import { Review } from '../entities/ReviewEntity'

@Resolver()
export class ReviewResolver {
  repository: Repository<Review> = getRepository(Review)

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
  async getReviewsByStars(
    @Arg('stars') stars: number,
  ): Promise<Review[] | undefined | null> {
    const res = await this.repository.find({ where: { stars: stars },relations: [
      'user',
      'flight',
    ], })
    return res
  }

  @Mutation(() => Review, { nullable: true })
  async createReview(@Arg('data') newReviewData: Review): Promise<Review> {
    const review: Review = await this.repository.create(newReviewData)
    this.repository.save(review)
    return review
  }
}

// getReviewsForSimilarFlights // reviews tonen aan klanten waar de vlucht van dezelfde maatschapij is en de vertrek- tussenstop- en besteminglocaties hetzelfde is / bv dezelfde vlugt van gisteren
// getReviewsByFlight
// getReviewsByFlightAndStars
// getReviewsByUser

// updateReview
