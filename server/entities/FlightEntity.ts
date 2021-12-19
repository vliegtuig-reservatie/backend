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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Plane } from './PlaneEntity'
import { Airport } from './AirportEntity'
import { Seat } from './SeatEntity'
import { Review } from './ReviewEntity'

@ObjectType()
@InputType('FlightInput')
@Entity('flights')
export class Flight extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  departureTime: Date
  @Field({ nullable: true })
  @Column({ nullable: true })
  arrivalTime: Date

  @Field(() => Airport, { nullable: true })
  @ManyToOne(() => Airport, airport => airport.departureFlights, {
    onDelete: 'CASCADE',
  })
  departureLocation: Airport
  @Field(() => Airport, { nullable: true })
  @ManyToOne(() => Airport, airport => airport.arrivalFlights, {
    onDelete: 'CASCADE',
  })
  arrivalLocation: Airport
  @Field(() => [Airport], { nullable: true })
  @ManyToMany(() => Airport)
  @JoinTable()
  stops: Airport[]

  @Field(() => Plane, { nullable: true })
  @ManyToOne(() => Plane, plane => plane.flights, {
    onDelete: 'CASCADE',
  })
  plane: Plane
  @Field(() => [Seat], { nullable: true })
  @OneToMany(() => Seat, seat => seat.flight)
  bookedSeats: Seat[]

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.flight)
  reviews: Review[]

  @Field({ nullable: true })
  @Column({ nullable: true })
  price: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  canceledAt?: Date
}
