import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe,CommonModule } from '@angular/common';
import { ApiResponseModel, ITask, Task } from './model/task';
import { MasterService } from './Service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  taskObj: Task = new Task();
  taskList: ITask[] = [];
  editMode = false;

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllTask();  // Call the method to load tasks
  }

  loadAllTask() {
    this.masterService.getTodos().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
    }, (error: any) => {
      console.error('Failed to load tasks:', error);
    });
  }

  addTodoTask() {
    this.masterService.addTodo(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result === 'success') { // Check if result is 'success'
          console.log('Task Created Successfully');
          this.loadAllTask(); // Reload tasks after adding
          this.taskObj = new Task(); // Clear taskObj for next input
        } else {
          console.error('Failed to create task:', res.message); // Log error message if creation fails
        }
      },
      (error: any) => {
        console.error('Failed to add task:', error); // Log error if API call fails
      }
    );
  }

  updateTask() {
    this.masterService.updateTodo(this.taskObj.id, this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result === 'success') {
          console.log('Task updated successfully');
          this.loadAllTask();
          this.taskObj = new Task(); // Optionally clear taskObj after update
          this.editMode = false; // Exit edit mode after update
        } else {
          console.error('Failed to update task:', res.message);
        }
      },
      (error) => {
        console.error('Failed to update task:', error);
      }
    );
  }

  editTask(task: Task) {
    this.editMode = true;
    this.taskObj = task; // Make a copy of task to edit
  }

  cancelEdit() {
    this.editMode = false;
    this.taskObj = new Task(); // Reset taskObj
  }

  deleteTask(id: number) {
    this.masterService.deleteTodo(id).subscribe(
      (res: ApiResponseModel) => {
        console.log('Task Deleted Successfully');
        this.loadAllTask();
      },
      (error: any) => {
        console.error('Failed to delete task:', error);
      }
    );
  }

  
}
