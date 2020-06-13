import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View ,Image, FlatList, Dimensions, RefreshControl, ActivityIndicator} from 'react-native';
import {Header, Divider, Button} from 'react-native-elements';
import djangoapi from './api/djangoapi';
import { Zocial } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const ViewsScreen = () => {
  const [state, setState] = useState({start: 0, data: []});
  const [refreshing, setRefreshing] = useState(false);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);


  
  const add_elements = async() => {   
  const response = await djangoapi.post('/api/all/getrangedunitsviews/',{'start': state.start, 'end': state.start+ 10},{headers: {
    'Content-Type': 'application/json',
 
}});
  if(response.data.length){
    setState({start: state.start+ 10, data: [...state.data, ...response.data]});

  }
  }
  
  const callLike = async(item) => {
    if(!like.includes(item.id)){
      setLike([...like,item.id])
    }
    if(dislike.includes(item.id)){
      const index = dislike.indexOf(item.id);
    if (index > -1) {
      dislike.splice(index, 1);
    }
      setDislike(dislike)
      djangoapi.post('api/all/remove_dislike_it/',{'id': item.id})

    }
    if(like.includes(item.id)){
      var index = like.indexOf(item.id);
      if (index > -1) {
        like.splice(index, 1);
      }
      setLike([...like])
        await djangoapi.post('api/all/remove_like_it/',{'id': item.id})
  
    }
    
    const response = await djangoapi.post('api/all/like_it/',{'id': item.id})
    
  }
  const callDislike = async(item) => {
    if(!dislike.includes(item.id)){
      setDislike([...dislike,item.id])
    }
    if(like.includes(item.id)){
      const index = like.indexOf(item.id);
    if (index > -1) {
      like.splice(index, 1);
    }
      setLike(like)
      await djangoapi.post('api/all/remove_like_it/',{'id': item.id})

    }
    if(dislike.includes(item.id)){
      var index = dislike.indexOf(item.id);
      if (index > -1) {
        dislike.splice(index, 1);
      }
        setDislike([...dislike])
        djangoapi.post('api/all/remove_dislike_it/',{'id': item.id})
  
    }
    
    const response = await djangoapi.post('api/all/dislike_it/',{'id': item.id})
    
  }

  useEffect(() => {
    add_elements();
},[])

 
  return (
       <View style={styles.container}>
      <Header
              containerStyle={{height:60}}
        centerComponent={{ text: 'Most Viewed' , style: styles.writing}}
        />
        <FlatList
        onEndReached={() => {
          add_elements();
        }}
        onEndReachedThreshold={2}
        ListFooterComponent= {() => <ActivityIndicator />}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            add_elements();
            setRefreshing(true)
            setTimeout(()=>{
              setRefreshing(false)
            },1000)
          }} />
        }
        data={state.data}
        renderItem={({item}) => {
          return <View s>
               <Divider color={'gray'}/>
            <View style={{flexDirection:'row'}}>
            <Zocial name="posterous" 
        style= {{marginLeft: 30}}
        size={35} color = {'#29B6F6'} />

          {/* heading */}
          <Text
           style={{marginLeft:10,marginRight:10,
          fontSize:16,flex: 1, flexWrap: 'wrap',
          alignSelf:'center',
          fontWeight: "bold"}}>{item.title}</Text>
          </View>

          {/* Date */}
          <Text style={{flex: 1, flexWrap: 'wrap',
          fontSize:16,alignSelf:'flex-end',
          marginRight:10, color:'gray'
          }}>{item.date}</Text>
          {/* description */}
         <Text style={{marginLeft:10,marginRight:10,
          marginTop:5,marginBottom:5,flex: 1, flexWrap: 'wrap',
          fontSize:16
          }}>{item.description}</Text>
            
            {/* image */}
            {item.image ?<Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />: null}

      <View style={styles.sub_cont}>
        <View style={{alignItems:'center'}}>
          <Text>{item.views}</Text>
          <AntDesign style={{marginTop:10}} name="eye" size={24} color="black" />
        </View>

        <View style={{alignItems:'center'}}>
      {like.includes(item.id) ?<Text>{item.likes+1}</Text>: <Text>{item.likes}</Text>}
          {like.includes(item.id) ? <Button
          onPress= {() => {
            callLike(item);
          } }
          type="clear"
          icon={
            <AntDesign name="like2" size={24} color="#29B6F6" />
          }
          /> :

          <Button
          onPress= {() => {
            callLike(item);
          } }
          type="clear"
          icon={
            <AntDesign name="like2" size={24} color="black" />
          }
          />}

        </View>

        <View style={{alignItems:'center'}}>
          {dislike.includes(item.id) ? <Text>{item.dislikes+1}</Text> : <Text>{item.dislikes}</Text>}
          
          {dislike.includes(item.id) ? <Button
          onPress = {() =>{
            callDislike(item);
          }}
          type="clear"
          icon={
            <AntDesign name="dislike2" size={24} color="#29B6F6" />}
            />
            :
          <Button
          onPress = {() =>{
            callDislike(item);
          }}
          type="clear"
          icon={
            <AntDesign name="dislike2" size={24} color="black" />}
            />
          }
        </View>

      </View>
           
            </View>
        }}
        keyExtractor={item => {
          return item.id.toString()}}
      />
      </View>
  );
}
const styles = StyleSheet.create({
  sub_cont:{
    marginTop:10,
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#29B6F6'
  },
  writing: {
      color: '#fff',
      fontSize: 20
  },
  image: {
    flex:1,
    flexWrap:'wrap',
    alignSelf:'baseline',
    height: 300,
    width: Dimensions.get('window').width,
  }
});

ViewsScreen.navigationOptions = {
  tabBarIcon: <Entypo name="tv" size={28} color="black" />

};

export default ViewsScreen;

