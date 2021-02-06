import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventEmitter } from '@angular/core';
import { DeleteTask, MakeTaskDone } from 'src/app/store/task.actions';
import { Task } from 'src/app/store/task.models';


@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
    @Input() task: Task;
    @Output() changeTaskById: EventEmitter<string> = new EventEmitter();

    constructor(private store: Store<any>) { }
    ngOnInit() { }

    makeDone() {
        this.store.dispatch(MakeTaskDone({ id: this.task.id }))
    }
    deleteTask() {
        this.store.dispatch(DeleteTask({ id: this.task.id }))
    }
    changeTask() {
        this.changeTaskById.emit(this.task.id)
    }
}
