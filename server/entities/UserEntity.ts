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
@InputType('UserInput')
@Entity('Users')
export class User extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field({ nullable: true })
  @Column()
  uuid?: string
  @Field()
  @Column()
  firstName: string
  @Field()
  @Column()
  lastName: string
  @Field({ nullable: true })
  @Column()
  lastActive: Date
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
