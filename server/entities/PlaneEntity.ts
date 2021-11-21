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
@InputType('PlaneInput')
@Entity('planes')
export class Plane extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field()
  @Column()
  rowCount: number
  @Field()
  @Column()
  columncount: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  agency: string

  @Field(() => [Flight], { nullable: true })
  @OneToMany(() => Flight, flight => flight.plane)
  flights: Flight[]
}
