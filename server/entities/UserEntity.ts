import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm'

@ObjectType()
@InputType('UserInput')
@Entity('Users')
export class User extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field()
  @Column()
  firstName: string
  @Field()
  @Column()
  lastName: string
  @Field({ nullable: true })
  @Column()
  email: string
  @Field({nullable: true})
  @Column()
  phonenr: string
}
