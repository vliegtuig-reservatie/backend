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
  JATACode: string
  @Field({ nullable: true })
  @Column()
  latitude: number
  @Field({ nullable: true })
  @Column()
  longitude: number
  @Field({ nullable: true })
  @Column()
  timeZone: string
}
