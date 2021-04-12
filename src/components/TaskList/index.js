import React, { useState } from 'react'
import {View, Text,StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import { render } from 'react-dom'


const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity);



export default function TaskList({data, deletarNota,saveButton}){

    const [color,setColor] = useState(data.cor)
    function mudarCor(data){
        
        saveButton(data);
        setColor(data.cor);
        
        
    }

    return(
        
        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity
            changeColor
            onLongPress={() => deletarNota(data)}
            onPress={() => mudarCor(data)}
            activeOpacity={0.6}
            >
          <Ionicons name="md-checkmark-circle" size={40} color={color}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.task}>{data.task}</Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3399ff',
        borderRadius: 20,
        padding: 10,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3,
        }
        

    },
    task:{
        color: '#FFF',

        fontSize: 20,
        paddingRight: 40,
        paddingLeft: 8,

    }
})