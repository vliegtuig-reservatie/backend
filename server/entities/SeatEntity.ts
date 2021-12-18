import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Flight } from './FlightEntity'
import { User } from './UserEntity'

@ObjectType()
@InputType('SeatInput')
@Entity('seats')
export class Seat extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string
  @Field()
  @Column()
  row: number
  @Field()
  @Column()
  column: number
  @Field(() => User)
  @ManyToOne(() => User, user => user.reviews, {
    onDelete: 'CASCADE',
  })
  passager?: User
  @Field(() => Flight, { nullable: true })
  @ManyToOne(type => Flight, flight => flight.bookedSeats, {
    onDelete: 'CASCADE',
  })
  flight: Flight
}
