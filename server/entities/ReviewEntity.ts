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
  user: User
  @Field()
  @Column()
  flight: Flight
  @Field({ nullable: true })
  @Column()
  stars: number
  @Field({ nullable: true })
  @Column()
  note: string
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
