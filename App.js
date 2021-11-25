import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './screens/intro'
import TaskScreen from './screens/TaskScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetail from './components/TaskDetail';
import TaskProvider from './context/TaskProvider';

const App = () => {
    const [user, setUser] = useState({})
    const [isAppFirstTime, setAppFirstTime] = useState(false)
    const Stack = createNativeStackNavigator();


         const findUser = async() => {
           const result = await AsyncStorage.getItem('user')
           if(result === null) return setAppFirstTime(true)
          
           setUser(JSON.parse(result))
           setAppFirstTime(false)
         }

         useEffect(() => {
           findUser()
          
         }, [])

         const renderTaskScreen = (props) => <TaskScreen {...props} user={user} />
         
         
   
         if(isAppFirstTime) return <Intro onFinish={findUser} />;

  return(
    <NavigationContainer>
      <TaskProvider>
      <Stack.Navigator>
        <Stack.Screen name="TaskScreen" component={renderTaskScreen} options={{
          title:"Today's Tasks"
        }} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} options={{
          title:"Task"
        }} />
      </Stack.Navigator>
      </TaskProvider>
    </NavigationContainer>
  )
   
}

export default App


