import { StatusBar } from 'expo-status-bar';
import React,{useState, useCallback, useEffect} from 'react';
import { ToastAndroid , Text, View, SafeAreaView,TouchableOpacity,
   FlatList, Modal, Alert, BackHandler} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styleApp} from './src/styles/StyleApp'
import ModalWriteTask from './src/components/Modal/ModalWriteTask'
import ModalTaskInfo from './src/components/Modal/ModalTaskInfo'
const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)




export default function App(){
  const [task,setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [infoVisible, setInfoVisivle] = useState(false);
  
  //carregando tarefas persistidas
  
  async function loadTasks(){
    const taskStorage = await AsyncStorage.getItem('@task');
    
    if(taskStorage){
      setTask(JSON.parse(taskStorage));
    }
  }

  async function saveTasks(){
    await AsyncStorage.setItem('@task',JSON.stringify(task));
  }
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

    return() => BackHandler.removeEventListener("hardwareBackPress", backAction);
  },[])
  
  useEffect(()=>{

    loadTasks();

  },[]);

  useEffect(()=> {

    saveTasks();

  },[task])
  
  //toast
  const showToastMessage = (string) =>{

    ToastAndroid.showWithGravity(string,400,ToastAndroid.BOTTOM);

  }

  const update = useCallback((data) => {

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


  return (//view.......
    
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
      renderItem={({item}) => <TaskList 
      data={item}
      showToastMessage={showToastMessage}
      deletarNota={deletarNota}
      update={update}
      infoVisible={infoVisible} setInfoVisivle={setInfoVisivle}
      />
      }
      />
      <AnimatableButton  useNativeDriver
      animation="bounceInUp" style={styleApp.deleteAllButton} onPress={()=>{deletarTodas()}}>
        <Text fontSize={1000}>Apagar todas</Text>
      </AnimatableButton>

      <ModalWriteTask 
  
      open={open} setOpen={setOpen}
      task={task} setTask={setTask}
      showToastMessage={showToastMessage}
      />

      <ModalTaskInfo setInfoVisivle={setInfoVisivle} infoVisible={infoVisible}/>
      
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

