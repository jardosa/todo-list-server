import { registerEnumType } from '@nestjs/graphql';

export enum PostStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
  NotCompleted = 'Not Completed',
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
});
