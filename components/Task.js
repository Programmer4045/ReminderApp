import React from 'react'
import { Dimensions, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import colors from '../misc/colors';

const Task = ({item,onPress}) => {

   

    const {title,desc} = item;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.desc} numberOfLines={5}>{desc}</Text>
            <Text style={{textAlign:'right', color:colors.DARK}}>Status: Pending</Text>
        </TouchableOpacity>
    )
}

export default Task
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.PRIMARY,
        width: width/2 -10,
        padding:10,
        borderRadius:7,
        elevation:10,

    },

    title:{
        fontWeight:'bold',
        color:colors.LIGHT,
        fontSize:23
    },

    desc:{
       
        color:colors.LIGHT,
        fontSize:18,

    }
})
