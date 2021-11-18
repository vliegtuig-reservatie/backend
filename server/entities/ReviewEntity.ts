import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Flight } from './FlightEntity'
import { User } from './UserEntity'

@ObjectType()
@InputType('ReviewInput')
@Entity('Reviews')
export class Review extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID

  @Field(()=>User)
  @ManyToOne(() => User, user => user.reviews)
  user: User

  @Field(()=>Flight)
  @ManyToOne(() => Flight, flight => flight.reviews) 
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
