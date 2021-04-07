import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable'

const AnimatableButton = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {
  const [task,setTask] = useState([
    {key: 1,task: 'Comprar pão'},
    {key: 2,task: 'Farmar no clash'},
    {key: 3,task: 'Ligar pra Lua'},
    {key: 4,task: 'Aprender React'},
  ])

  const [open, setOpen] = useState(false)
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
      renderItem={({item}) => <TaskList data={item}/>}

      />

      <Modal 
      animationType="slide"
      useNativeDriver
      transparent={false}
      visible={open}
      >
        <SafeAreaView style={styles.modal}>
          <StatusBar backgroundColor='#171d31'/>
          <View style={styles.modalLeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={marginleft= 5, marginRight = 5} name="arrow-back" size={40} color='#FFF'/>
            </TouchableOpacity>

            <Text style={styles.modalTitle}></Text>
          </View>

          <View style={styles.modalBoddy} animation="fadeInUp">
            <TextInput
            placeholder="O que precisa fazer hoje ?"
            placeholderTextColor='grey'
            multiline={true}
            
            style={styles.input}
            />

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 38,
    fontSize:30,
    textAlign: 'center',
    paddingBottom:30,
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
    fontSize: 20,
    color: '#FFF',
  },
  modalBoddy:{
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
    color: '#FFF',
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
  }

  


});
