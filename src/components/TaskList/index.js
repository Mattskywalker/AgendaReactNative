import React, { useState } from 'react'
import {View, Text,StyleSheet, Alert} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'

import {styleIndex} from '../../styles/StyleIndex'
import {taskState} from '../../enums/TaskState'

export default function TaskList({data, deletarNota,update,showToastMessage}){

    const [color,setColor] = useState(data.color)
    
    function mudarCor(data){

        if(data.color === '#FFF'){
            data.color = '#00FF00';
        }
        setColor(data.color);
        
    }

    const changeStatus = (data) => {
        
        if(data.taskState === taskState.NOTFINISHED){
            data.taskState = taskState.FINISHED;
            mudarCor(data);
            update(data);
            showToastMessage("Tarefa concluida!")
        }
        
    }

    return(
        
        <Animatable.View 
        style={styleIndex.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity
            changeColor
            onLongPress={() => deletarNota(data)}
            onPress={() => changeStatus(data)}// muda a cor do botão check
            activeOpacity={0.6}
            >
          <Ionicons name="md-checkmark-circle" size={45} color={color}/>
            </TouchableOpacity>
            <TouchableOpacity style={styleIndex.taskText} onLongPress={()=>{alert("Alterar Texto")}}>
                <Text style={styleIndex.task}>{data.task}</Text>
                
            </TouchableOpacity>
        </Animatable.View>
    )
}