import { SearchPostsInput } from './dto/search-posts.input';
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(
    userId: string,
    createPostInput: CreatePostInput,
  ): Promise<PostDocument> {
    const newPost = await this.postModel.create({ ...createPostInput, userId });
    return newPost;
  }

  async findAll(searchInput: SearchPostsInput): Promise<PostDocument[]> {
    const posts = await this.postModel
      .find({
        ...(searchInput.userId && { userId: searchInput.userId }),
      })
      .sort({ _id: 'descending' })
      .limit(searchInput.limit)
      .skip(searchInput.offset);
    return posts;
  }

  async findOne(_id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(_id);
    return post;
  }

  async update(
    _id: string,
    updatePostInput: UpdatePostInput,
  ): Promise<PostDocument> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      _id,
      updatePostInput,
      { new: true },
    );

    return updatedPost;
  }

  async remove(_id: string): Promise<PostDocument> {
    const removedPost = await this.postModel.findByIdAndDelete(_id);
    return removedPost;
  }
}
