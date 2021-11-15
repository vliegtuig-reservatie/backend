import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Plane } from './PlaneEntity'
import { Airport } from './AirportEntity'
import { Seat } from './SeatEntity'

@ObjectType()
@InputType('FlightInput')
@Entity('Flights')
export class Flight extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field({ nullable: true })
  @Column()
  departureTime: Date
  @Field({ nullable: true })
  @Column()
  arrivalTime: Date
  @Field({ nullable: true })
  @Column()
  departureLocation: Airport
  @Field({ nullable: true })
  @Column()
  arrivalLocation: Airport
  @Field({ nullable: true })
  @Column()
  plane: Plane
  @Field({ nullable: true })
  @Column()
  bookedSeats: Seat[]
  @Field({ nullable: true })
  @Column()
  stops: Airport[]
}
