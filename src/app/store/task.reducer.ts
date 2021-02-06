import { state } from "@angular/animations";
import { createReducer, Action, on } from "@ngrx/store";
import { AddTask, changeTask, ClearCompletedTasks, ClearTasks, DeleteTask, MakeTaskDone } from "./task.actions";
import { Task } from "./task.models";


export interface TaskState {
    task: Task[];
}

const initialState: TaskState = {
    task: []
};

export const taskReducer = createReducer(
    initialState,
    on(AddTask, (state, { task }) => {
        return { ...state, task: [task, ...state.task] }
    }),
    on(changeTask, (state, { task }) => {
        return { ...state, task: state.task.map(elem =>{
            if(elem.id === task.id){
                return task
            }
            return elem
        })}
    }),
    on(ClearTasks, state => {
        return { ...state, task: [] }
    }),
    on(MakeTaskDone, (state, { id }) => {
        return {
            ...state, task: state.task.map(elem => {
                if (elem.id === id) {
                    return { id: elem.id, title: elem.title, isDone: true }
                }
                return elem;
            })
        }
    }),
    on(ClearCompletedTasks, state => {
        return {
            ...state, task: state.task.filter(elem => !elem.isDone)
        }
    }),
    on(DeleteTask, (state, id) => {
        return {
            ...state, task: state.task.filter(elem => elem.id !== id.id)
        }
    }),
);

export function reducer(state: TaskState | undefined, action: Action) {
    return taskReducer(state, action);
}