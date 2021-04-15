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