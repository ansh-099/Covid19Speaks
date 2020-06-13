import React,{useState, useEffect} from 'react';
import { StyleSheet,View ,TextInput, Text, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {Header, Input, Divider, Button } from 'react-native-elements'
import { Zocial } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons'; 
import djangoapi from './api/djangoapi';

const AddPostScreen = ({navigation}) => {

  const [state, setState] = useState({loading: false});
  console.log(state)
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });


    if (!result.cancelled) {
    if(result.type != 'image'){
      Alert.alert(
        "Please Upload Images",
        "",
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else{     
      const file = {
        uri: result.uri,  
        name: makeid(10)+result.uri.substring(result.uri.lastIndexOf("/") + 1),           // e.g. 'file:///path/to/file/image123.jpg'
        type: result.type+'/'+result.uri.substring(result.uri.lastIndexOf(".") + 1)   // e.g. 'image/jpg'
      }
      setState({...state,image: file });

    }
    }
  };

  const addFinalItems = async() => {
    setState({...state, loading: true})
    try{
      let form_data = new FormData();
    if(state.image){
    form_data.append("image",state.image,"abcd.jpg");
    }
    form_data.append('description', state.description);
    form_data.append('location', state.location);
    form_data.append('title', state.title);
    console.log(form_data)
    const response = await djangoapi.post('/api/all/oneunit/' ,form_data)
    console.log(response.data)
    
    setState({loading: false})
      navigation.navigate('Latest')
  }catch(err){
      console.log(err)
    }
  }
  return (
    <View style={styles.container}> 
      <Header
      containerStyle={{height:60}}>
            <Zocial name="posterous" 
        style= {{marginLeft: 30, marginBottom:5}}
        size={30} color = {'#ffffff'} />
        
        </Header>
    <ScrollView>
  <View style={{backgroundColor:'#F5F5F5'}}>
    <Text style = {{marginLeft: 20,
    marginTop: 5,
    marginTop: 10,
    marginBottom:10,
    color:'gray',
    fontWeight: "bold",
    fontSize:18}}>Add New Post</Text>

  </View>
    
  <View style={{flexDirection:'row', justifyContent:'flex-start'}}> 
    <FontAwesome5 name="heading" size={30} style={{marginLeft:20,
    marginTop:30}}  color="#29B6F6" />

    <View style={{marginLeft:20,flexGrow:1}}>
      <Text style={{marginLeft:10,
      marginTop:20,
      fontSize:16,
      fontWeight: "bold"}}>Heading:</Text>
      
      <Input
        value={state.title}   
        onChangeText = {text => setState({...state,title:text})}
        autoCompleteType={"off"}
        autoCorrect={false}
        placeholder='Enter Here'/>

    </View>

   </View>

   <Divider color={'gray'}/>

   <View style={{flexDirection:'row', justifyContent:'flex-start'}}> 
   <FontAwesome name="location-arrow" size={32} style={{marginLeft:20,
    marginTop:40}}  color="#29B6F6" />
    <View style={{marginLeft:20,flexGrow:1}}>
      <Text style={{marginLeft:10,
      marginTop:20,
      fontSize:16,
      fontWeight: "bold"}}>Location:</Text>

    
<RNPickerSelect
            onValueChange={(value) => setState({...state, location:value})}
            items={[
                { label: 'Footbaall', value: 'fooatball' },
                { label: 'Basebsall', value: 'basfdeball' },
                { label: 'Hocksey', value: 'hockdey' },
            ]}

            onUpArrow={() => {
              this.inputRefs.firstTextInput.focus();
            }}
            onDownArrow={() => {
              this.inputRefs.favSport1.togglePicker();
            }}
            style={pickerStyle}
            Icon={() => {
              return <MaterialIcons name="arrow-drop-down" size={24} style={{marginTop:15}} color="black" />;
            }}
        />

      
      
    </View>
   </View>

   <Divider style={{marginTop:10}} color={'gray'}/>

   <View style={{flexDirection:'row', justifyContent:'flex-start'}}> 
   <MaterialIcons name="description" size={32} style={{marginLeft:20,
    marginTop:50}}  color="#29B6F6" />
    <View style={{marginLeft:20,flexGrow:1}}>
      <Text style={{marginLeft:10,
      marginTop:20,
      fontSize:16,
      fontWeight: "bold"}}>Description:</Text>
      <Input
        value={state.description}
        onChangeText={text => setState({...state, description: text})}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={true}
        inputStyle={{height:70}}
        multiline={true}   
        autoCompleteType={"off"}
        autoCorrect={false}
        placeholder='Enter Here'/>
    </View>
   </View>

   <Divider color={'gray'}/>

   <View style={{flexDirection:'row', justifyContent:'flex-start'}}> 
   <Entypo name="folder-images" size={30} style={{marginLeft:22,
    marginTop:35}}  color="#29B6F6" />

    <View style={{marginLeft:20,flexGrow:1}}>
      <Text style={{marginLeft:10,
      marginTop:20,
      fontSize:16,
      marginBottom:10,
      fontWeight: "bold"}}>Upload Image:</Text>
       <Button type="outline" title="Pick an Image" onPress={pickImage} />
    </View>

   </View>
   {state.loading ?
    <Button
    buttonStyle={{margin:10, marginTop:15, height: 40}}
    icon={
      <ActivityIndicator color="#ffffff" size='small'/>} /> 
    : <Button  buttonStyle={{margin:10, marginTop:15, height: 40}} title = "Add Post" onPress={() => {
      if(state.title){
       addFinalItems();
      }else{
        Alert.alert(
          "Please Enter Some Heading",
          "",
          [
            
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
    
      }

   }} />
  }
    </ScrollView> 
    </View>
  );
}

const pickerStyle = {
  inputIOS: {
    marginBottom:10,
    marginTop:10,
    fontSize: 16,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {  
    marginBottom:10,
    marginTop:10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 3},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    header: {
      color: '#29B6F6',
      height: 70
    },
    writing: {
        color: '#fff',
        fontSize: 20
    },
    text_adjust:{
        flexGrow: 1
    },
   containter:{
    margin: 10,
    flexDirection: 'row'
   },
   icon:{
    marginRight:10
   },   
   text_des: {
    color:"#651FFF",
    marginLeft: 10,
    marginTop: 20,
    fontSize: 18
   },

    container_des:{
        marginTop: 2,
        borderColor: 'gray', 
        borderWidth: 1
    },loc: {
      position: "absolute",
      left: 15,
      top: 10,
    },
  

  });


AddPostScreen.navigationOptions = {
  tabBarIcon: <Entypo name="add-to-list" size={24} color="black" />

};

export default AddPostScreen;

