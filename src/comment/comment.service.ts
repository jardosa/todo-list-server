import { SearchCommentsInput } from './dto/search-comments.input';
import { UserInputError } from 'apollo-server-express';
import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    userId: string,
    createCommentInput: CreateCommentInput,
  ): Promise<CommentDocument> {
    const newComment = await this.commentModel.create({
      ...createCommentInput,
      postId: new Types.ObjectId(createCommentInput.postId),
      userId: new Types.ObjectId(userId),
    });
    return newComment;
  }

  async findAll(searchInput: SearchCommentsInput): Promise<CommentDocument[]> {
    const comments = await this.commentModel
      .find({
        postId: searchInput.postId,
      })
      .limit(searchInput.limit)
      .skip(searchInput.offset);
    return comments;
  }

  async findOne(_id: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(_id);
    return comment;
  }

  async update(
    _id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<CommentDocument> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      _id,
      updateCommentInput,
      { new: true },
    );
    return updatedComment;
  }

  async remove(_id: string): Promise<CommentDocument> {
    const deletedComment = await this.commentModel.findByIdAndDelete(_id);
    if (!deletedComment) throw new UserInputError('Comment not found');
    return deletedComment;
  }
}
