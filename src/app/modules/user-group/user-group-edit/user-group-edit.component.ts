import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserGroupService } from '../../../shared/services/user-group.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { User } from '../../../shared/models/user';

class Users {
  userId: string;
  permissions: ('approve' | 'validate' | 'reject' | 'archive' | 'delete' | 'edit')[];
}

@Component({
  selector: 'app-user-group-edit',
  templateUrl: './user-group-edit.component.html',
})
export class UserGroupEditComponent implements OnInit, OnChanges {
  userGroupForm: FormGroup;
  permissions = ['approve', 'validate', 'reject', 'archive', 'delete', 'edit'];
  @Input() allUsers: User[] = [];
  @Output() closes = new EventEmitter<void>();
  @Output() submits = new EventEmitter<void>();
  @Input() userGroupId: string;

  constructor(
    private fb: FormBuilder,
    private userGroupService: UserGroupService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.userGroupForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      users: this.fb.array([]),
    });
    if (this.userGroupId !== '') {
      this.loadUserGroup(this.userGroupId);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userGroupId && !changes.userGroupId.firstChange) {
      this.loadUserGroup(changes.userGroupId.currentValue);
    }
  }
  loadUserGroup(id: string): void {
    this.userGroupService.getUserGroupById(id).subscribe((userGroup) => {
      this.userGroupForm.patchValue({
        name: userGroup.name,
        description: userGroup.description,
      });
      this.setUsers(userGroup.users || []);
    });
  }

  setUsers(users: Users[] | undefined): void {
    if (users) {
      users.forEach((user) => {
        const updateUsers = this.fb.group({
          userId: [user.userId, Validators.required],
          permissions: [user.permissions, Validators.required],
        });
        this.users.push(updateUsers);
      });
    }
  }

  get users() {
    return this.userGroupForm.get('users') as FormArray;
  }

  addUser() {
    const user = this.fb.group({
      userId: ['', Validators.required],
      permissions: ['', Validators.required],
    });
    this.users.push(user);
  }

  addPermission(userIndex: number, role: string) {
    const PermissionsArray = this.users.at(userIndex).get('roles') as FormArray;
    if (!PermissionsArray.value.includes(role)) {
      PermissionsArray.push(this.fb.control(role));
    }
  }

  removeUser(index: number) {
    this.users.removeAt(index);
  }

  onSubmit() {
    if (this.userGroupForm.valid) {
      if (this.userGroupId !== '') {
        this.userGroupService.updateUserGroup(this.userGroupId, this.userGroupForm.value).subscribe(
          () => {
            this.submits.emit();
            this.onCancel();
          },
          (err) => {
            this.snackBar.openSnackBar(
              err?.error?.message.includes('E11000')
                ? 'Duplicate name key'
                : 'Error updating user group',
              'error',
            );
          },
        );
      }
      this.userGroupService.addUserGroup(this.userGroupForm.value).subscribe(
        () => {
          this.submits.emit();
          this.onCancel();
        },
        (err) => {
          this.snackBar.openSnackBar(
            err?.error?.message.includes('E11000')
              ? 'Duplicate name key'
              : 'Error updating user group',
            'error',
          );
        },
      );
    }
  }

  onCancel() {
    this.userGroupForm.reset(); // Clear the form fields
    this.closes.emit();
  }
}
