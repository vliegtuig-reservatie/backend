import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm'
import { Flight } from './FlightEntity'
import { User } from './UserEntity'

@ObjectType()
@InputType('SeatInput')
@Entity('Seats')
export class Seat extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field()
  @Column()
  row: number
  @Field()
  @Column()
  column: number
  @Field(()=>User)
  @ManyToOne(() => User, user => user.reviews)
  passager: User
  @Field(()=>[Seat],{ nullable: true })
  @ManyToOne(type => Flight, flight => flight.bookedSeats) 
  flight: Flight[]
}
