import { ObjectType, Field } from '@nestjs/graphql';
import Profile from './Profile';

@ObjectType()
export default class LoginPayload {
  @Field()
  authToken: string;

  @Field()
  profile: Profile;
}
