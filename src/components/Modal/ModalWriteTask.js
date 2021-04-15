import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {Text, View, SafeAreaView,TouchableOpacity, Modal, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

    
import * as Animatable from 'react-native-animatable'
import {styleModalWriteTask} from '../../styles/StyleModalWriteTask'
import {taskState} from '../../enums/TaskState'
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)

export default function ModalWriteTask({open,setOpen,task,setTask,showToastMessage}){

  const [input, setInput] = useState('');


  function salvar(){
    if(input === '')return;
    const data = {
      key: input,
      task: input,
      color: '#FFF',
      taskState: taskState.NOTFINISHED,
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
    showToastMessage("Nova tarefa adicionada com sucesso");
  }

    return(
        <Modal
      animationType="slide"
      useNativeDriver
      transparent={false}
      visible={open}
      >
        <SafeAreaView style={styleModalWriteTask.modal}>
          <StatusBar backgroundColor='#171d31'/>
          <View style={styleModalWriteTask.modalLeader}>
            <TouchableOpacity onPress={() => {setOpen(false),setInput('')}}>
              <Ionicons style={marginleft= 5, marginRight = 5} name="arrow-back" size={40} color='#FFF'/>
            </TouchableOpacity>

            <Text style={styleModalWriteTask.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={styleModalWriteTask.modalBoddy} animation ="fadeInUp" duration={1500}>
            <AnimatableTextInput
            animation="bounceIn"
            duration={2000}
            placeholder="O que precisa fazer hoje ?"
            placeholderTextColor='grey'
            multiline={true}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            style={styleModalWriteTask.input}
            autoCorrect={true}
            />

            <AnimatableButton style={styleModalWriteTask.addButton} onPress={salvar}>
              <Text style={styleModalWriteTask.addButtonText}>Salvar</Text>
            </AnimatableButton>
          </Animatable.View>
        </SafeAreaView>
      </Modal>
    );
}