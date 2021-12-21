import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Airport } from './AirportEntity'
import { Flight } from './FlightEntity'
import { Plane } from './PlaneEntity'
import { User } from './UserEntity'

@ObjectType()
@InputType('SeatQueryInput')
export class SeatQuery {
  @Field()
  row: number
  @Field()
  column: number
  @Field()
  class: string
}

ObjectType()
@InputType('FlightQueryInput')
export class FlightQuery {
  @Field({ nullable: true })
  departureTime: Date
  @Field({ nullable: true })
  returnTime: Date

  @Field({ nullable: true })
  departureLocation: Airport
  @Field({ nullable: true })
  arrivalLocation: Airport
}

@ObjectType()
@InputType('DoubleFlightQueryInput')
export class DoubleFlightQuery {
  @Field(() => Flight)
  departureFlights: Flight[]
  @Field(() => Flight)
  returnFlights: Flight[]
}
