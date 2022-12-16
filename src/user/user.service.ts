import { UserInputError } from 'apollo-server-express';
import { User, UserDocument } from './schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { SearchUserInput } from './dto/search-user-input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return `This action returns all users`;
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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
