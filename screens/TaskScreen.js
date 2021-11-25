import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { RoundBtn } from '../components/RoundBtn'
import Task from '../components/Task'
import TaskInputModal from '../components/TaskInputModal'
import { useTasks } from '../context/TaskProvider'
import colors from '../misc/colors'

const TaskScreen = ({user,navigation}) => {

    const [greet, setGreet] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const {tasks, setTasks, findTasks} = useTasks()
    

    const handleOnSubmit = async (title,desc) => {
        
        const Task = {id: Date.now(), title, desc, time:Date.now()}
        const updatedTasks = [...tasks,Task]
        setTasks(updatedTasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
        
    }

    const findGreet = () => {
        const hrs = new Date().getHours();
        if(hrs === 0 || hrs < 12) return setGreet('Morning')
        if(hrs === 1 || hrs <17) return setGreet('Afternoon')
        setGreet('Evening')
    }

   

    useEffect(()=>{
        
        findGreet();
    },[])

    const openTask = (Task) => {
        navigation.navigate('TaskDetail', { Task})
    }
    return (
        <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
        <View style={styles.container}>
            <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

            <FlatList data={tasks} columnWrapperStyle={{justifyContent:'space-between',marginBottom:15}} numColumns={2} keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Task item={item} onPress={() => openTask(item)} />} />

            {!tasks.length ?  (<View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer,]}>
                <Text style={styles.emptyHeader}>Add Tasks</Text>
            </View>) : null }
    
        </View>
       
        <RoundBtn antIconName={'plus'} style={styles.addBTN} onPress={()=> setModalVisible(true)} />
           
           <TaskInputModal visible={modalVisible} onClose={()=> setModalVisible(false)}
           onSubmit={handleOnSubmit} />

        </>
        
    );
};

export default TaskScreen

const styles = StyleSheet.create({
   container:{
    paddingHorizontal:20,
    flex:1,
    zIndex:1,
   
    
   
   

   },
   
    header:{
        fontSize:30,
        fontWeight:'bold',
        color:colors.DARK,
        margin:15
        
    },

    emptyHeader:{
        fontSize:30,
        textTransform:'uppercase',
        fontWeight:'bold'
    },

    emptyHeaderContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        zIndex:-1,
       

    },

    addBTN:{
        position:'absolute',
        bottom:55,
        right:40,
        zIndex:1
    }

})
