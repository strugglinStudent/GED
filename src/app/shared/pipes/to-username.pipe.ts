import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'toUsername',
  standalone: true,
})
export class ToUsernamePipe implements PipeTransform {
  transform(userId: string, allUsers: User[] = []): string {
    const user = allUsers.find((u) => u._id === userId);
    return user ? user.userName : userId;
  }
}
