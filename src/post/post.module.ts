import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Post, PostFactory } from './schema/post.schema';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    UserModule,
    CommentModule,
    MongooseModule.forFeatureAsync([
      {
        name: Post.name,
        useFactory: PostFactory,
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {}
