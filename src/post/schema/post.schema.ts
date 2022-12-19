import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostStatus } from '../enums/post.enum';
import Node from 'src/base/entities/Node';
import { Comment } from 'src/comment/schema/comment.schema';
import TimeStamps from 'src/base/entities/TimeStamps';

export type PostDocument = HydratedDocument<Post>;

@ObjectType({ isAbstract: true, implements: [Node, TimeStamps] })
@Schema({ timestamps: true })
export class Post extends Node {
  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field(() => PostStatus)
  status: PostStatus;

  @Prop()
  @Field(() => ID)
  userId: string;

  @Field(() => [Comment], { defaultValue: [] })
  comments?: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
