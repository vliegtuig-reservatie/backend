import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Review } from './ReviewEntity'
import { Seat } from './SeatEntity'

@ObjectType()
@InputType('UserInput')
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field()
  @Column()
  firstName: string
  @Field()
  @Column()
  lastName: string
  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string
  @Field({ nullable: true })
  @Column({ nullable: true })
  phonenr: string

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.flight)
  reviews: Review[]

  @Field(() => [Seat], { nullable: true })
  @OneToMany(() => Seat, seat => seat.passager)
  bookedSeats: Seat[]
}
