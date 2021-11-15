import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm'

@ObjectType()
@InputType('PlaneInput')
@Entity('Planes')
export class Plane extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field()
  @Column()
  rowCount: number
  @Field()
  @Column()
  columncount: number
  @Field({ nullable: true })
  @Column()
  agency: string
}
