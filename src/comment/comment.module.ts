import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
