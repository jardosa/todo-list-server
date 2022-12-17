import {
  SearchCommentsInput,
  SearchCommentsInputNoID,
} from './../comment/dto/search-comments.input';
import { SearchPostsInput } from './dto/search-posts.input';
import { CommentService } from './../comment/comment.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  OmitType,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gqlAuth.guard';
import { Post } from './schema/post.schema';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/user/schema/user.schema';
import { Comment } from 'src/comment/schema/comment.schema';

@Resolver(() => Post)
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.create(user._id, createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@Args('searchInput') searchInput: SearchPostsInput) {
    return this.postService.findAll(searchInput);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('_id', { type: () => ID }) _id: string) {
    return this.postService.findOne(_id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput._id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('_id', { type: () => ID }) _id: string) {
    return this.postService.remove(_id);
  }

  @ResolveField('comments', () => [Comment])
  async getPost(
    @Parent() post: Post,
    @Args('searchInput', {
      type: () => SearchCommentsInputNoID,
      nullable: true,
    })
    searchInput: SearchCommentsInput,
  ): Promise<Comment[]> {
    const { _id } = post;
    const comments = await this.commentService.findAll({
      postId: _id,
      ...(searchInput?.limit && { limit: searchInput.limit }),
      ...(searchInput?.offset && { offset: searchInput.offset }),
    });
    return comments;
  }
}
