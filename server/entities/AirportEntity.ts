import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Flight } from './FlightEntity'

@ObjectType()
@InputType('AirportInput')
@Entity('airports')
export class Airport extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field()
  @Column()
  name: string
  @Field()
  @Column()
  IATACode: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  latitude: number
  @Field({ nullable: true })
  @Column({ nullable: true })
  longitude: number
  @Field({ nullable: true })
  @Column({ nullable: true })
  timeZone: string

  @Field(() => [Flight], { nullable: true })
  @ManyToMany(type => Flight)
  @JoinTable()
  stoppingFlights: Flight[]

  @Field(() => [Flight], { nullable: true })
  @OneToMany(() => Flight, flight => flight.departureLocation)
  departureFlights

  @Field(() => [Flight], { nullable: true })
  @OneToMany(() => Flight, flight => flight.arrivalLocation)
  arrivalFlights
}
