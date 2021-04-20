import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity, Modal, TextInput, BackHandler, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable'

import {Ionicons} from '@expo/vector-icons';

import {styleModalInfo} from '../../styles/StyleModalInfo'

const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)


export default function ModalTaskInfo({infoVisible,setInfoVisivle}){
    
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