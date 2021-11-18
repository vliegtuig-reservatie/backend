import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Review } from '../entities/ReviewEntity'

@Resolver()
export class ReviewResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [Review], { nullable: true })
  async getReviews(): Promise<Review[]> {
    return await this.manager.find<Review>(Review)
  }

  @Query(() => [Review], { nullable: true })
  async getReviewsByStars(
    @Arg('stars') stars: number,
  ): Promise<Review[] | undefined | null> {
    const res = await this.manager.find<Review>(Review, { stars: stars })
    return res
  }

  @Mutation(() => Review, { nullable: true })
  async createReview(@Arg('data') newReviewData: Review): Promise<Review> {
    const review: Review = await this.manager.create(Review, newReviewData)
    this.manager.save(review)
    return review
  }
}


// getReviewsForSimilarFlights // reviews tonen aan klanten waar de vlucht van dezelfde maatschapij is en de vertrek- tussenstop- en besteminglocaties hetzelfde is / bv dezelfde vlugt van gisteren
// getReviewsByFlight
// getReviewsByFlightAndStars
// getReviewsByUser

// updateReview
