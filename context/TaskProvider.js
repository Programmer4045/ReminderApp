import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext,useEffect,useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TaskContext = createContext()
const TaskProvider = ({children}) => {

    const [tasks,setTasks] = useState([])

    const findTasks = async () => {
        const result = await AsyncStorage.getItem('tasks')
        
        if(result !== null) setTasks(JSON.parse(result))
     }
 
     useEffect(()=>{
         findTasks()
     },[])
    
    return (
        <TaskContext.Provider value={{tasks,setTasks,findTasks}}>
           {children}
        </TaskContext.Provider>
    )
}
export const useTasks = () => useContext(TaskContext);

export default TaskProvider

