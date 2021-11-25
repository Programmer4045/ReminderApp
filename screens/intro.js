import React, { useState } from 'react'
import {  Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoundBtn } from '../components/RoundBtn';
import colors from '../misc/colors'

const intro = ({onFinish}) => {

    const [name, setName] = useState('');
    const handleonChangeText = text => {
        setName(text);
        console.log(name);
    }

    const handleSubmit = async() => {
        const user = {name: name}
       await AsyncStorage.setItem('user', JSON.stringify(user))
       if(onFinish) onFinish()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.input}>Enter Your Name to Continue:</Text>
            <TextInput value={name} onChangeText={handleonChangeText} placeholder={"Enter Name"} style={styles.textinput}/>
            
            {name.trim().length > 3 ? (<RoundBtn antIconName={'arrowright'} onPress={handleSubmit} />) : null}
            
        </View>
    )
}


const width = Dimensions.get('window').width -50

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

   
    
    textinput:{
        borderWidth:2,
         borderColor:colors.PRIMARY,
           width,
           borderRadius:5,
           fontSize:20,
           paddingLeft:15,
           color:colors.PRIMARY,
           marginBottom:15
    },

    input:{
        alignSelf:'flex-start',
        marginBottom:10,
        fontSize:17,
        paddingLeft:25
    }
})

export default intro
