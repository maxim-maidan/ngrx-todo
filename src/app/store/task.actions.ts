import { createAction, props } from "@ngrx/store";
import { Task } from "./task.models";

export enum taskActionsType{
     add = '[TASK] Add new task',
     change = '[TASK] Change task',
     clear = '[TASK] Clear tasks list',
     clearCompleted = '[TASK] Clear completed tasks',
     makeDone = '[TASK] Make task done',
     delete = '[TASK] Delete task',
};

export const AddTask = createAction(
    taskActionsType.add,
    props<{task: Task}>()
)

export const changeTask = createAction(
    taskActionsType.change,
    props<{task: Task}>()
)

export const ClearTasks = createAction(
    taskActionsType.clear
)

export const ClearCompletedTasks = createAction(
    taskActionsType.clearCompleted
)

export const MakeTaskDone = createAction(
    taskActionsType.makeDone,
    props<{id: string}>()
)
export const DeleteTask = createAction(
    taskActionsType.delete,
    props<{id: string}>()
)
