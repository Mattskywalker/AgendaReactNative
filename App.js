import { StatusBar } from 'expo-status-bar';
import React,{useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput)



export default function App() {
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
  

  function salvar(){
    if(input === '')return;
    const data = {
      key: input,
      task: input,
      cor: '#FFF',
    };
    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const update = useCallback((data) => {
    //alert("data.cor: " + data.cor);
    const finded = task.filter(r => r !== '');
    setTask(finded);
    /*
    finded.forEach(element => {
      alert("keys com as data.cor verde: " + data.key);
    });*/
    
  })

  const deletarNota = useCallback((data) => {

    const finded = task.filter(r => r.key !== data.key);
    setTask(finded);
    alert("Tarefa: \n\n" + data.key + "\n\n deletada.")
    


  })


  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor='#171d31' barStyle="ligth-content"/>
      <View styles={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={(item) => String(item.key)}
      renderItem={({item}) => <TaskList data={item} deletarNota={deletarNota} update={update}/>}

      />
      <AnimatableButton  useNativeDriver
      animation="bounceInUp" style={styles.deleteAllButton} onPress={()=>{setTask('')}}>
        <Text fontSize={1000}>Apagar todas</Text>
      </AnimatableButton>

      <Modal 
      animationType="slide"
      useNativeDriver
      transparent={false}
      visible={open}
      >
        <SafeAreaView style={styles.modal}>
          <StatusBar backgroundColor='#171d31'/>
          <View style={styles.modalLeader}>
            <TouchableOpacity onPress={() => {setOpen(false),setInput('')}}>
              <Ionicons style={marginleft= 5, marginRight = 5} name="arrow-back" size={40} color='#FFF'/>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={styles.modalBoddy} animation ="fadeInUp" duration={1500}>
            <AnimatableTextInput
            animation="bounceIn"
            duration={2000}
            placeholder="O que precisa fazer hoje ?"
            placeholderTextColor='grey'
            multiline={true}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            style={styles.input}
            autoCorrect={true}
            />

            <AnimatableButton style={styles.addButton} onPress={salvar}>
              <Text style={styles.addButtonText}>Salvar</Text>
            </AnimatableButton>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatableButton 
      style={styles.fab}
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










const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171D31',
    
  },
  title:{
    marginTop: 45,
    fontSize:30,
    textAlign: 'center',
    paddingBottom:20,
    color:'#FFF'
  },
  fab:{

    position:'absolute',
    width:60,
    height:60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 31,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },

  modal:{
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalLeader:{ 
    marginLeft: 15,
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle:{
    marginLeft:15,
    fontSize: 23,
    color: '#FFF',
    
  },
  modalBoddy:{
    flex: 1,
    marginTop: 15,
    

  },
  input:{
    fontSize: 20,
    marginHorizontal:15,
    marginTop: 30,
    backgroundColor:'#FFF',
    padding: 30,
    height: 200,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 30,
    
  },
  addButton:{
    backgroundColor: '#0094FF',
    alignItems: 'center',
    borderRadius: 20,
    margin: 20,
    padding:20,
    
    textAlign:'center',
  },
  addButtonText:{
    fontSize: 20,
  },

  deleteAllButton:{
    position:'absolute',
    
    width:150,
    height:60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    left: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  }

  


});
