import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import AddItemForm from './components/AddItemForm';
import {AppBar, Container, Grid, Paper, Toolbar} from '@mui/material';
import {Button, IconButton, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTodolistAC, changeTitleTodolistAC, filterChangeTodolistAC, removeTodolistAC} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TodolistTaskType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TodolistTaskType>(state => state.tasks);
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
        //     setTodolists(todolists.filter(el => el.id !== todolistID));
        //     delete tasks[todolistID];
    };
    const removeTasks = (todolistID: string, Taskid: string) => {
        dispatch(removeTaskAC(todolistID, Taskid))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== Taskid)});
    };

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});todolistID
    };

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        dispatch(filterChangeTodolistAC(todolistID, filter))
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el));
    };

    const changeStatus = (todolistID: string, id: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, id, newIsDone))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)});
    };

    const addNewTodolist = (title: string) => {
        // let newID = v1();
        // let newTodolist: TodolistsType = {id: newID, title, filter: 'All'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newID]: []});
        dispatch(addTodolistAC(title))
    };

    const onChangeTitle = (todolistID: string, Taskid: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID,Taskid, title))
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === Taskid ? {...el, title} : el)});
    };

    const editTitleTodolist = (todolistID: string, title: string) => {
        dispatch(changeTitleTodolistAC(todolistID, title))
        // setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t));
    };

    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar style={{backgroundColor: 'green'}}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
                <Grid container> <Paper style={{padding: '10px'}} elevation={3}><AddItemForm callback={addNewTodolist}/></Paper></Grid>
                <Grid container spacing={3}>{todolists.map(el => {

                    let taskForToDoList;
                    switch (el.filter) {
                        case 'Active':
                            taskForToDoList = tasks[el.id].filter(t => !t.isDone);
                            break;
                        case 'Completed':
                            taskForToDoList = tasks[el.id].filter(t => t.isDone);
                            break;
                        default:
                            taskForToDoList = tasks[el.id];
                    }
                    return <Grid item>
                        <Paper style={{padding: '10px'}} elevation={3}>
                            <ToDoList
                                key={el.id}
                                todolistID={el.id}
                                filter={el.filter}
                                titleEL={el.title}
                                tasks={taskForToDoList}
                                removeTasks={removeTasks}
                                addTask={addTask}
                                changeFilter={changeFilter}
                                changeStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                onChangeTitle={onChangeTitle}
                                editTitleTodolist={editTitleTodolist}
                            />
                        </Paper>
                    </Grid>;
                })}</Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;