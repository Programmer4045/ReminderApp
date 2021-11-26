import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../misc/colors'
import { RoundBtn } from './RoundBtn'
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasks } from '../context/TaskProvider';
import TaskInputModal from './TaskInputModal';

const TaskDetail = (props) => {
  
   const [Task,setTask] = useState( props.route.params.Task)
   const {setTasks} = useTasks()
   const [showModal,setShowModal] = useState(false)
   const [isEdit, setIsEdit] = useState(false)
   const [isCompleted,setIsCompleted] = useState(false)

   const formatDate = ms => {
      const date = new Date(ms)
      const day = date.getDay()
      const month = date.getMonth()
      const Year = date.getFullYear()
      const min = date.getMinutes()
      const Hours = date.getHours()

      return `${day}/${month}/${Year}--${Hours}:${min}`
   }

   const handleVoice = (ttsTitle) =>{
       Tts.speak(ttsTitle);
   }

   const deleteTask = async () => {
   const result = await AsyncStorage.getItem('tasks')
   let tasks = []
   if(result !== null) tasks = JSON.parse(result)

   const newTasks = tasks.filter(n => n.id !== Task.id)
   setTasks(newTasks)
   await AsyncStorage.setItem('tasks',JSON.stringify(newTasks))
   props.navigation.goBack()
   }

   const handleDelete = () => {
       Alert.alert(
           'Are You Sure!',
           'This action will permenantly delete your Task!',
           [{text:'Yes',
           onPress:deleteTask},
        {text:'No', onPress : () => console.log('No')}],
        {cancelable:true}
       )
   }

   const handleComplete = () => {
       setIsCompleted(true)
    Alert.alert(
        'Congratulations',
        'You have completed the Task!',
        [{text:'Ok',
        onPress:deleteTask},
     ],
     {cancelable:true}
    )
}

   const handleUpdate = async (title,desc,time) => {
         const result =  await AsyncStorage.getItem('tasks')
         let Tasks = [];
           if(result !== null) Tasks = JSON.parse(result)

          const newTasks =  Tasks.filter(n => {
               if(n.id === Task.id){
                   n.title = title
                   n.desc = desc
                   n.isUpdated = true
                   n.time = time

                   setTask(n)
               }
               return n
           })
           setTasks(newTasks)
           await AsyncStorage.setItem('tasks',JSON.stringify(newTasks))
   }

   const handleOnClose = () => setShowModal(false)

   const openEditModal = () => {
       setIsEdit(true)
       setShowModal(true)
   }
   
    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.time}>{Task.isUpdated ? (`Updated At ${formatDate(Task.time)}`)
            :`Created At ${formatDate(Task.time)}`} </Text>
            <Text style={styles.title} onPress={() => handleVoice(Task.title)}>{Task.title}</Text>
            <Text style={styles.desc} onPress={() => handleVoice(Task.desc)}>{Task.desc}</Text>

           
        </ScrollView>
        <View style={styles.btnContainer}>
            <RoundBtn onPress={handleDelete} antIconName={'delete'} style={{backgroundColor:colors.ERROR,marginBottom:15}} />
            <RoundBtn antIconName={'edit'} onPress={openEditModal}  />
            <RoundBtn antIconName={'check'} onPress={handleComplete} style={{marginTop:15}} />
      
            </View>
            <TaskInputModal isEdit={isEdit} Task={Task} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} /> 
        </>
    )
}

export default TaskDetail

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        paddingHorizontal:20,
        backgroundColor:colors.LIGHT,
        margin:20,
        borderRadius:10,
        elevation:10,
        padding:30,
        alignSelf:'center',
        justifyContent: 'center',
        width:"90%",
       
        
    },
    title:{
        fontWeight:'bold',
        color:colors.PRIMARY,
        fontSize:26
    },
    desc:{
        fontSize:20,
        opacity:0.7,
        textAlign:'justify',
        color:colors.DARK
    },

    time:{
        textAlign:'right',
        opacity:0.6,
        fontSize:15,
        color:colors.DARK
    },

    btnContainer:{
        position:'absolute',
        right:35,
        bottom:40
    }
})
