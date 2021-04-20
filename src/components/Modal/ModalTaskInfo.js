import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity, Modal, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import dayjs from 'dayjs'    
import * as Animatable from 'react-native-animatable'
import {styleModalWriteTask} from '../../styles/StyleModalWriteTask'
import {taskState} from '../../enums/TaskState'
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)
import {styleModalInfo} from '../../styles/StyleModalInfo'

export default function ModalTaskInfo({infoVisible,setInfoVisivle}){
    return(
        <Modal
        animationType={'slide'}
        useNativeDriver
        
        visible={infoVisible}>
            <SafeAreaView style={styleModalInfo.modal}>
                <View style={styleModalInfo.modalLeader}>
                    <TouchableOpacity onPress={() => {setInfoVisivle(false)}}>
                        <Ionicons style={marginleft= 5, marginRight = 5} name="arrow-back" size={40} color='#FFF'/>
                    </TouchableOpacity>
                    <Text style={styleModalInfo.modalTitle}>Tarefa</Text>
                </View>
            </SafeAreaView>

        </Modal>
    )
}