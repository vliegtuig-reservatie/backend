import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm'
import { Plane } from './PlaneEntity'
import { Airport } from './AirportEntity'
import { Seat } from './SeatEntity'
import { Review } from './ReviewEntity'

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

  @Field(() => Airport, { nullable: true })
  @ManyToOne(() => Airport, airport => airport.departureFlights)
  departureLocation: Airport
  @Field(() => Airport, { nullable: true })
  @ManyToOne(() => Airport, airport => airport.arrivalFlights)
  arrivalLocation: Airport
  @Field(() => [Airport], { nullable: true })
  @ManyToMany(() => Airport)
  @JoinTable()
  stops: Airport[]

  @Field(() => Plane, { nullable: true })
  @ManyToOne(() => Plane, plane => plane.flights)
  plane: Plane
  @Field(() => [Seat], { nullable: true })
  @OneToMany(() => Seat, seat => seat.flight)
  bookedSeats: Seat[]

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.flight)
  reviews: Review[]

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  @Column()
  canceledAt?: Boolean
}
