import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm'
import { Review } from './ReviewEntity'
import { Seat } from './SeatEntity'

@ObjectType()
@InputType('UserInput')
@Entity('Users')
export class User extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field({ nullable: true })
  @Column()
  uuid?: string
  @Field()
  @Column()
  firstName: string
  @Field()
  @Column()
  lastName: string
  @Field({ nullable: true })
  @Column()
  email: string
  @Field({ nullable: true })
  @Column()
  phonenr: string

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.flight)
  reviews: Review[]

  @Field(() => [Seat], { nullable: true })
  @OneToMany(() => Seat, seat => seat.passager)
  bookedSeats: Seat[]
}
