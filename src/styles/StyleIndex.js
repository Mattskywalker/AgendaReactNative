import {StyleSheet} from 'react-native'


export const styleIndex = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3399ff',
        borderRadius: 20,
        padding: 10,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3,
        }
        

    },
    task:{
        color: '#FFF',

        fontSize: 20,
        paddingRight: 40,
        paddingLeft: 8,

    }
})