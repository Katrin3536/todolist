import {TodolistTaskType} from '../AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState: TodolistTaskType = {}

beforeEach(()=> {
 startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.Completed, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0, deadline: '', priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed,addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0, deadline: '', priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2','2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.Completed, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0, deadline: '', priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, addedDate:'', todoListId: 'todolistId1', description:'', startDate: '', order: 0,deadline: '', priority: TaskPriorities.Low}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('todolistId2', 'juice')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2','2', TaskStatuses.New )
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId1'][1].status).toBe(2)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2','2', 'chocolate')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('chocolate')
    expect(endState['todolistId1'][1].title).toBe('JS')

})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})