import React, { useEffect, useState } from 'react'
import { Button, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import colors from '../misc/colors'
import { RoundBtn } from './RoundBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeAN from 'react-native-alarm-notification';

import moment from 'moment'
import Tts from 'react-native-tts';

const TaskInputModal = ({visible, onClose, onSubmit, Task, isEdit}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] =useState('');

  const alarmNotifData = {
    title: "My Notification Title",
    message: "My Notification Message",
    channel: "my_channel_id",
    small_icon: "ic_launcher",
  
  };

  

  const alarmFunction = async ()=>{
     console.log(date);
   
    //Schedule Future Alarm
    const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: time });
    console.log(alarm); // { id: 1 }

    //Delete Scheduled Alarm
    ReactNativeAN.deleteAlarm(alarm.id);

    //Delete Repeating Alarm
    ReactNativeAN.deleteRepeatingAlarm(alarm.id);

    //Stop Alarm
    ReactNativeAN.stopAlarmSound();

    //Send Local Notification Now
    ReactNativeAN.sendNotification(alarmNotifData);

    //Get All Scheduled Alarms
    const alarms = await ReactNativeAN.getScheduledAlarms();

    //Clear Notification(s) From Notification Center/Tray
    ReactNativeAN.removeFiredNotification(alarm.id);
    ReactNativeAN.removeAllFiredNotifications();
}

  useEffect(()=>{
    if(isEdit){
       setTitle(Task.title)
       setDesc(Task.desc)}
  },[isEdit])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear() ;
    let ftime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds() ;
     setTime(fDate+' '+ftime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


    const handleOnClose=() => {
             Keyboard.dismiss();
    }

    const handleOnChangeText = (text,valueFor) => {
            if(valueFor === 'title') setTitle(text);
            if(valueFor === 'Desc') setDesc(text);
     }

     const handleOnSubmit = async () => {
           if(!title.trim() && !desc.trim()) return onClose()

           if(isEdit){
             onSubmit(title,desc,Date.now());
           }
           else{
            onSubmit(title,desc)
            setTitle('')
            setDesc('')
            alarmFunction();
           }
           
           onClose()
     }

     const closeModal = () => {
       if(!isEdit){
      setTitle('')
      setDesc('')}
      onClose()
     }
    return (
        <Modal visible={visible} animationType='fade'>
         <ScrollView>
            <View style={styles.container}>
            
            <Text style={{fontWeight:'bold',fontSize:24, color:colors.DARK,marginBottom:5,textAlign:'center'}}>Task Board</Text>
              
              <Text style={{fontWeight:'bold',fontSize:24, color:colors.DARK,marginBottom:5}}>Title</Text>
              <TextInput value={title} onChangeText={(text)=> handleOnChangeText(text,'title')} placeholder={"Title"} placeholderTextColor="#616161" style={[styles.input, styles.title]} />
              <Text style={{fontWeight:'bold',fontSize:24, color:colors.DARK,marginBottom:5}}>Description</Text>
              
              <TextInput value={desc}  onChangeText={(text)=> handleOnChangeText(text,'Desc')} multiline placeholder={"Description"} placeholderTextColor="#616161" style={[styles.input, styles.desc]} />
              <Text style={{fontWeight:'bold',fontSize:24, color:colors.DARK,marginBottom:5, marginTop:15}}>Set Date & Time</Text>
              
              <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{time}</Text>
      </View>
              
              <View style={{margin:10}}>
        <Button onPress={showDatepicker} title="Set date" color={colors.PRIMARY} />
        <View style={{height:2,backgroundColor:"#000", margin:10}}></View>
        <Button onPress={showTimepicker} title="Set Time" color={colors.PRIMARY} />
       
      </View>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}             
              <View style={styles.btnContainer}>
              <RoundBtn antIconName={'check'} onPress={handleOnSubmit} />
             { title.trim() || desc.trim() ? (<RoundBtn onPress={closeModal} antIconName={'close'} style={{marginLeft:15}} />) :null }
              </View>
            </View>

            <TouchableWithoutFeedback onPress={handleOnClose}>
                <View style={[styles.ModalBG, StyleSheet.absoluteFillObject]} />
            </TouchableWithoutFeedback>
            </ScrollView>
        </Modal>

    )
}

export default TaskInputModal

const styles = StyleSheet.create({

    container:{
        paddingHorizontal:33,
        paddingTop:20
    },

    input:{
        borderColor:colors.PRIMARY,
        borderRadius:10,
        borderWidth:2,
        fontSize:17,
        color:colors.DARK,
        paddingLeft:10,
        
    },

    title:{
          height:60,
          marginBottom:15,
          fontWeight:'bold',
          backgroundColor:'#eee',
          elevation:5,
          color:colors.PRIMARY,
          

    },

    desc:{
        height:100,
        backgroundColor:'#eee',
        elevation:5
    },

    ModalBG:{
        flex:1,
        zIndex:-1,
        
    },

    submit:{
        marginTop:10,

    },

    btnContainer:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'center',
    },

    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        alignItems:'center',
        marginTop:10,

      },
      pickedDate:{
        fontSize:17,
        color:"#616161"
      }
})
