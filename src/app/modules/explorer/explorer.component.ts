import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  user: User;
  constructor(
    private _UserService: UserService,
    private snackBar: SnackBarService,
  ) {}
  ngOnInit(): void {
    this._UserService.user$.subscribe((user) => {
      this.user = user;
      this.snackBar.openSnackBar(`${user.userName}is connect successfully`, 'success');
    });
  }
}
