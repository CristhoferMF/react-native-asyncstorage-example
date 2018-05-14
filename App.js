/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TextInput,
  ToastAndroid
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
constructor(props) {
  super(props);
  this.state={
    input:null,
    cars:[]
  }
  //recuperar JSON
  AsyncStorage.getItem('key:cars')
  .then( (data) => {
    if(!data){
      console.warn('Nombres',"No hay datos");
    }else{
      //convertir a array
      var parsed = JSON.parse(data);
      for(var x in parsed){
        //asgina añ estado
        this.state.cars.push(parsed[x]);
      }
      console.warn('Lista Recuperada',this.state.cars);
    }
  })
}
  guardar(){
    try{
      
      //agregar elemento al array
      let carro=this.state.input;
      if(!carro){
        ToastAndroid.showWithGravity(
          'Escribe alguna cosa, Si se envia en blanco el dato ingresado será null',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }else{
        let arrayt=this.state.cars;
        arrayt.push(carro);
        //asginando el array al state
        this.setState({input:null});
        this.setState({cars:arrayt});
        //convertir a JSON
        let jsosn =JSON.stringify(this.state.cars);
        //guardar
        AsyncStorage.setItem('key:cars',jsosn);
        console.warn('Nombre Agregado -> Lista modificada',this.state.cars);
      }
      
    }catch(err){
      console.warn('error',err)
    }
  }
borrar(){
  AsyncStorage.removeItem('key:cars')
  .then(() => {
    this.setState({cars:[]});
    console.warn('Accion','Se Borraron los Nombres')
  })
}
ver(){
  console.warn('Ver Nombres',this.state.cars);
}

  render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'black',width:'97%',fontSize:20,textAlign:'center'}}>
        EJEMPLO BASICO DE ASYNCSTORAGE
      </Text>
      <Text style={{fontSize:16,width:'97%',textAlign:'center',marginTop:40}}>
        Evitar perder datos al reiniciar la aplicación, ademas 
        de premitir seguir insertando datos despues de reiniciar.
      </Text>
      <TextInput 
      style={{width:'90%',marginTop:50}}
      value={this.state.input} 
      onChangeText={(text) => this.setState({input:text})}
      placeholder='Escribe algun nombre'/>
      <View style={styles.buttonView}>
        <Button 
          title="Guardar Nombre" 
          onPress={() => this.guardar()}
          color='green'/>
        <Button 
          title="Ver Nombres" 
          onPress={() => this.ver()}/>
        </View>
        <View style={{marginTop:10,width:'90%'}}>
        <Button 
          title="Borrar Nombres" 
          onPress={() => this.borrar()}
          color='red'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },buttonView:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
