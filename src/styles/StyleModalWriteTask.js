import {StyleSheet} from 'react-native'


export const styleModalWriteTask = StyleSheet.create({
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
        backgroundColor:'#1C1C1C',
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
      },
})