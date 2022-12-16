import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Node from 'src/base/entities/Node';

export type UserDocument = HydratedDocument<User>;

@ObjectType({ isAbstract: true, implements: Node })
@Schema({ timestamps: true })
export class User {
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
