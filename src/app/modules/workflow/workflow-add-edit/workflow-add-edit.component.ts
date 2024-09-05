import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../../shared/models/user';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkflowService } from '../../../shared/services/workflow.service';

interface PermissionsPerUserId {
  userId: string;
  permissions: ('approve' | 'validate' | 'reject' | 'archive' | 'delete' | 'edit')[];
}

@Component({
  selector: 'app-workflow-add-edit',
  templateUrl: './workflow-add-edit.component.html',
  styleUrl: './workflow-add-edit.component.scss',
})
export class WorkflowAddEditComponent implements OnInit, OnChanges {
  workflowForm: FormGroup;
  permissions = ['approve', 'validate', 'reject', 'archive', 'delete', 'edit'];
  @Input() allUsers: User[] = [];
  @Output() closes = new EventEmitter<void>();
  @Output() submits = new EventEmitter<void>();
  @Input() workflowId: string;

  constructor(
    private fb: FormBuilder,
    private workflowService: WorkflowService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.workflowForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      users: this.fb.array([]),
    });
    if (this.workflowId !== '') {
      this.loadWorkflow(this.workflowId);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.workflowId && !changes.workflowId.firstChange) {
      this.loadWorkflow(changes.workflowId.currentValue);
    }
  }
  loadWorkflow(id: string): void {
    this.workflowService.getWorkflowById(id).subscribe((workflow) => {
      this.workflowForm.patchValue({
        name: workflow.name,
        description: workflow.description,
      });
      this.setUsers(workflow.users || []);
    });
  }

  setUsers(users: PermissionsPerUserId[] | undefined): void {
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
    return this.workflowForm.get('users') as FormArray;
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
    if (this.workflowForm.valid) {
      if (this.workflowId !== '') {
        this.workflowService.updateWorkflow(this.workflowId, this.workflowForm.value).subscribe(
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
      this.workflowService.addWorkflow(this.workflowForm.value).subscribe(
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
    this.workflowForm.reset(); // Clear the form fields
    this.closes.emit();
  }
}
