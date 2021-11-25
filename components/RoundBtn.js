import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  AntDesign  from 'react-native-vector-icons/AntDesign'
import colors from '../misc/colors'

const RoundBtn = ({antIconName, size, color , style, onPress}) => {
    return (
    <AntDesign name={antIconName} 
    size={size || 24} 
    color={color || colors.LIGHT} 
    style={[styles.icon, {...style}]}
    onPress={onPress} />
    );};


const styles = StyleSheet.create({
    icon:{
        backgroundColor:colors.PRIMARY,
        borderRadius:50,
        elevation:5,
        padding:15
    }
});

export {RoundBtn};
