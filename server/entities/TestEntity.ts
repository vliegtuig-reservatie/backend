import { ObjectType, Field, ID, Float, InputType } from 'type-graphql'

import {
  Entity,
  BaseEntity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'


// ObjectType decorator, to tell that our class represent a Graphql object type
@ObjectType()
// Makes it possible to use the entire entity as an input instead of using seperate arguments for each property.
// Has to be explicitly named differently than the entity itself
@InputType('TestEntityInput')
// Entity decorator, to tell that our class represent an database entity
@Entity('TestEntities')
export class TestEntity extends BaseEntity {
  // extend the BaseEntity to use methods like find, findOne...
  @Field(() => ID, { nullable: true }) // Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() // Special decorator, to tell that this column represent an unique generated ID (in mongo)
  id: ObjectID
  @Field()
  @Column()
  title: string
  @Field()
  @Column()
  message: string
  @Field({ nullable: true })
  @Column({ nullable: true })
  someOtherEntityId?: string // Optional
  @Field(() => Float, { nullable: true })
  @Column({ nullable: true })
  someRandomNumber?: number // Optional
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date
}