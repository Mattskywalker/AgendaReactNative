import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity, Modal, TextInput, BackHandler, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import dayjs from 'dayjs'    
import * as Animatable from 'react-native-animatable'
import {styleModalWriteTask} from '../../styles/StyleModalWriteTask'
import {taskState} from '../../enums/TaskState'
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)
import {styleModalInfo} from '../../styles/StyleModalInfo'

export default function ModalTaskInfo({infoVisible,setInfoVisivle}){

    const backAction = () => {
        Alert.alert("Espere!", "Tem certeza que quer sair?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
      
      useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',backAction)
    
        return() => BackHandler.removeEventListener("hardwareBackPress",()=> backAction);
      },[])

    
    return(
        <Modal
        animationType={'slide'}
        useNativeDriver
        onRequestClose={() => setInfoVisivle(false)}
        
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