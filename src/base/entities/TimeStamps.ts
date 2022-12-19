import { InterfaceType, Field } from '@nestjs/graphql';

@InterfaceType()
export default abstract class TimeStamps {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
