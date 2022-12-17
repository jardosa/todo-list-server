import { UserInputError } from 'apollo-server-express';
import { User, UserDocument } from './schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { SearchUserInput } from './dto/search-user-input';
import { SearchUsersInput } from './dto/search-users-input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(searchFields: SearchUsersInput) {
    const users = await this.userModel.find({
      ...(searchFields.firstName && { firstName: searchFields.firstName }),
      ...(searchFields.lastName && { lastName: searchFields.lastName }),
    });

    return users;
  }

  async doesEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) return false;
    return true;
  }

  async findOne(searchFields: SearchUserInput): Promise<UserDocument> {
    if (!Object.keys(searchFields).length) {
      throw new UserInputError('Provide at least 1 search criteria');
    }
    const user = await this.userModel.findOne({
      ...(searchFields._id && { _id: searchFields._id }),
      ...(searchFields.email && { email: searchFields.email }),
      ...(searchFields.firstName && { firstName: searchFields.firstName }),
      ...(searchFields.lastName && { lastName: searchFields.lastName }),
    });
    return user;
  }

  async update(
    _id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateUserInput,
      { new: true },
    );
    return updatedUser;
  }

  async remove(_id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(_id);
    return deletedUser;
  }
}
