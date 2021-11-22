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
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.reviews, {
    createForeignKeyConstraints: false,
  })
  user: User

  @Field(() => Flight)
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
