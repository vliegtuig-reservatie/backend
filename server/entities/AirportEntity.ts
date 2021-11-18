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
} from 'typeorm'
import { Flight } from './FlightEntity'

@ObjectType()
@InputType('AirportInput')
@Entity('Airports')
export class Airport extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID

  @Field()
  @Column()
  name: string
  @Field()
  @Column()
  IATACode: string

  @Field({ nullable: true })
  @Column()
  latitude: number
  @Field({ nullable: true })
  @Column()
  longitude: number
  @Field({ nullable: true })
  @Column()
  timeZone: string

  @Field(()=>[Flight],{ nullable: true })
  @ManyToMany(type => Flight) @JoinTable()
  stoppingFlights: Flight[]

  @Field(()=>[Flight],{ nullable: true })
  @OneToMany(() => Flight, flight => flight.departureLocation)
  departureFlights
  
  @Field(()=>[Flight],{ nullable: true })
  @OneToMany(() => Flight, flight => flight.arrivalLocation)
  arrivalFlights
}
