import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Review } from '../entities/ReviewEntity'

@Resolver()
export class ReviewResolver {
  manager: MongoEntityManager = getMongoManager()

  @Query(() => [Review], { nullable: true })
  async getReviews(): Promise<Review[]> {
    return await this.manager.find<Review>(Review)
  }

  @Query(() => Review, { nullable: true })
  async getReviewById(
    @Arg('id') id: string,
  ): Promise<Review | undefined | null> {
    const res = await this.manager.findOne<Review>(Review, { id: id })
    return res
  }

  @Mutation(() => Review, { nullable: true })
  async createReview(@Arg('data') newReviewData: Review): Promise<Review> {
    const review: Review = await this.manager.create(Review, newReviewData)
    this.manager.save(review)
    return review
  }
}


// getReviewsByStars