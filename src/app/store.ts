import {todolistReducer} from '../features/todolists/todolist-reducer';
import {tasksReducer} from '../features/todolists/tasks-reducer';
import {applyMiddleware,combineReducers , legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
window.store = store