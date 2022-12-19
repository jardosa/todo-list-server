import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Node from 'src/base/entities/Node';
import TimeStamps from 'src/base/entities/TimeStamps';

export type UserDocument = HydratedDocument<User>;

@ObjectType({ isAbstract: true, implements: [Node, TimeStamps] })
@Schema({ timestamps: true })
export class User extends Node implements Node {
  @Prop()
  @Field()
  firstName: string;

  @Prop()
  @Field()
  lastName: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
