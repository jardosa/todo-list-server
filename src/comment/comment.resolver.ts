import { SearchCommentsInput } from './dto/search-comments.input';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { GqlAuthGuard } from 'src/auth/guards/gqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/user/schema/user.schema';

@Resolver(() => Comment)
@UseGuards(GqlAuthGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(
    @CurrentUser() user: User,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.create(user._id, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('searchInput', { type: () => SearchCommentsInput })
    searchInput: SearchCommentsInput,
  ) {
    return this.commentService.findAll(searchInput);
  }

  @Query(() => Comment, { name: 'comment', nullable: true })
  findOne(@Args('_id', { type: () => ID }) _id: string) {
    return this.commentService.findOne(_id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput._id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('_id', { type: () => ID }) _id: string) {
    return this.commentService.remove(_id);
  }
}
