import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { title } from 'process';
import { Observable } from 'rxjs';

import { v4 as uuid } from 'uuid';
import { AddTask, changeTask, ClearCompletedTasks, ClearTasks } from './store/task.actions';
import { Task } from './store/task.models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  taskId: string;
  task: string;
  selectedTaskId: string;
  taskForm: FormGroup;
  changedId: string;

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskInput: new FormControl(null, Validators.required)
    });
    this.store.pipe(select('task')
    ).subscribe(
      (tasks) => {
        this.tasks = tasks.task;
      }
    )
  }
  constructor(private store: Store<any>) { }
  addTask() {
    const title = this.taskForm.value.taskInput;
    const isDuplicated = this.tasks.some(elem => elem.title === title);
    if (title && !isDuplicated) {
      this.store.dispatch(AddTask({ task: { id: uuid(), title: title, isDone: false } }))
      this.taskForm.setValue({ taskInput: null });
      // }
    }
  }
  clearList() {
    this.store.dispatch(ClearTasks())
  }

  changeTaskById(id) {
    this.tasks.forEach(elem => {
      if (elem.id === id) {
        this.changedId = id;
        this.taskForm.setValue({ taskInput: elem.title });
      }
    });
    this.taskId = id;
  }
  clearCompletedList() {
    this.store.dispatch(ClearCompletedTasks())
  }
  updateTask() {
    const name = this.taskForm.value.taskInput;
    this.store.dispatch(changeTask({task:{id: this.changedId, title: name, isDone: false}}));
    this.taskForm.reset();
    this.taskId = '';
  }
}
