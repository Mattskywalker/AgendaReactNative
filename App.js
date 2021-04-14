import { StatusBar } from 'expo-status-bar';
import React,{useState, useCallback, useEffect} from 'react';
import { ToastAndroid , Text, View, SafeAreaView,TouchableOpacity,
   FlatList, Modal, TextInput, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styleApp} from './src/styles/StyleApp'
import {taskState} from './src/enums/TaskState'
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)



export default function App(){
  const [task,setTask] = useState([])
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')


  //carregando tarefas persistidas 
  
  useEffect(()=>{
    
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');
      
      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  },[]);

  useEffect(()=> {
    
    async function saveTasks(){
      await AsyncStorage.setItem('@task',JSON.stringify(task));
    }

    saveTasks();

  },[task])
  
  //toast
  const showToastMessage = (string) =>{

    ToastAndroid.showWithGravity(string,400,ToastAndroid.BOTTOM);

  }

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

  const update = useCallback((data) => {

    //alert("data.cor: " + data.cor);
    const finded = task.filter(r => r !== '');
    setTask(finded);

  })

  const deletarNota = useCallback((data) => {//apaga tarefa escolhida atravez do onLongPress;

    const aspas = '"';
    const finded = task.filter(r => r.key !== data.key);

    Alert.alert("Deseja apagar esta tarefa?",
    "A seguinte tarefa será deletada: \n\n"+ aspas + data.key + aspas,
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        setTask(finded);
        showToastMessage("Tarefa deletada com sucesso")
      } }// apaga ao dizer OK
    ]
    )
    
  })

  const deletarTodas = () => {
    
    if(task.length === 0){return}
    Alert.alert("Deseja apagar todas as tarefas?",
    "Todas as tarefas registradas serão deletadas, deseja prosseguir?",
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        //alert(task.length)
        setTask([]);
        showToastMessage("Todas as tarefas foram deletadas");
        
      } }// apaga ao dizer OK
    ]
    )
  }


  return (
    
    <SafeAreaView style={styleApp.container}>

      <StatusBar backgroundColor='#171d31' barStyle="ligth-content"/>
      <View styles={styleApp.content}>
        <Text style={styleApp.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={(item) => String(item.key)}
      renderItem={({item}) => <TaskList data={item} showToastMessage={showToastMessage}
       deletarNota={deletarNota} update={update}/>}

      />
      <AnimatableButton  useNativeDriver
      animation="bounceInUp" style={styleApp.deleteAllButton} onPress={()=>{deletarTodas()}}>
        <Text fontSize={1000}>Apagar todas</Text>
      </AnimatableButton>

      <Modal 
      animationType="slide"
      useNativeDriver
      transparent={false}
      visible={open}
      >
        <SafeAreaView style={styleApp.modal}>
          <StatusBar backgroundColor='#171d31'/>
          <View style={styleApp.modalLeader}>
            <TouchableOpacity onPress={() => {setOpen(false),setInput('')}}>
              <Ionicons style={marginleft= 5, marginRight = 5} name="arrow-back" size={40} color='#FFF'/>
            </TouchableOpacity>

            <Text style={styleApp.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={styleApp.modalBoddy} animation ="fadeInUp" duration={1500}>
            <AnimatableTextInput
            animation="bounceIn"
            duration={2000}
            placeholder="O que precisa fazer hoje ?"
            placeholderTextColor='grey'
            multiline={true}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            style={styleApp.input}
            autoCorrect={true}
            />

            <AnimatableButton style={styleApp.addButton} onPress={salvar}>
              <Text style={styleApp.addButtonText}>Salvar</Text>
            </AnimatableButton>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatableButton 
      style={styleApp.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color='#FFF'/>
      </AnimatableButton>
      
      
    </SafeAreaView>
  )
}

