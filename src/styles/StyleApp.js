import {StyleSheet} from 'react-native'

export const styleApp = StyleSheet.create({
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
      backgroundColor:'#1C1C1C',
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