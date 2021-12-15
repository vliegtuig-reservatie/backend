import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Flight } from './FlightEntity'
import { User } from './UserEntity'

@ObjectType()
@InputType('ReviewInput')
@Entity('reviews')
export class Review extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field(() => User, { nullable: true }) // deze user relation werkt niet, komt uit op null als je reviews opvraagt
  @ManyToOne(() => User, user => user.reviews, {
    createForeignKeyConstraints: false,
  })
  user: User

  @Field(() => Flight, { nullable: true }) // deze flight relation werkt niet, komt uit op null als je reviews opvraagt
  @ManyToOne(() => Flight, flight => flight.reviews, {
    createForeignKeyConstraints: false,
  })
  flight: Flight

  @Field({ nullable: true })
  @Column({ nullable: true })
  stars: number
  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
