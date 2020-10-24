import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checklist from "./Checklist";
import * as Font from 'expo-font';
import projects from '../../apis/projects'

Font.loadAsync({
  'Bold': require('../../assets/fonts/GothicA1-Bold.ttf'),
  'Medium': require('../../assets/fonts/GothicA1-Medium.ttf'),
});

export default function SettingScreen({ route, navigation }) {

  const [allergyCheck, setallergyCheck] = useState([]);
  const [etcCheck, setetcCheck] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(()=>{
      fetch('http://runanam.pythonanywhere.com/allergy/')
        .then((response) => response.json())
        .then((json) => setallergyCheck(json))
        .catch((error) => console.error(error))

      fetch('http://runanam.pythonanywhere.com/etc/')
        .then((response) => response.json())
        .then((json) => setetcCheck(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      

  },[])

  
  const onToggle = (id) => e =>{
   setallergyCheck(
    allergyCheck.map(allergy =>
        allergy.id === id ? {...allergy, checked: !allergy.checked} : allergy,
      ),
    );
    
    //가져오는건 잘되는데
    fetch(`http://runanam.pythonanywhere.com/allergy/update/${id}`) 
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error))

    //왜 보내는게 안될까
    fetch(`http://runanam.pythonanywhere.com/allergy/update/${id}`,{
      method:'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checked: allergyCheck[id-1].checked,
        content: allergyCheck[id-1].content,
        id: id,
      }),
    })

    .then((response) => response.json())
  //   .then((responseJson) => {
  //     alert(responseJson)
  //  })
   .catch((error) => {
    console.error(error)
   });   

  };  

  
  const onToggleEtc = (id) => e=>{
  setetcCheck(
    etcCheck.map(etc =>
        etc.id === id ? {...etc, checked: !etc.checked} : etc,
      ),
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>개인설정</Text>
      </View>

                                        
      <View style={styles.allergy}>
        <Text style={styles.subtitle}>알레르기 </Text> 
        <View style={styles.line} />
          {isLoading ? (<Text>loading </Text>):
          ( 
            <View style={styles.row}>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id <8 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id >8 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}

            </View>
           
          </View>
          )
          }
          

      </View>

      <View style={styles.etc}>
        <Text style={styles.subtitle}>추가 옵션</Text>
        <View style={styles.line} />
        {etcCheck.map((etc) => (
          <View style={styles.col} key={etc.id}>
             <Checklist id ={etc.id} checklist = {etc} onToggle={onToggleEtc}/>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",    
  },
  line: {
    height: 2,
    width: 100,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#CCCCCC",
  },

  top: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  title: {
    fontSize: 30,
    fontFamily:'Bold'
  },  

  subtitle: {
    fontSize: 20,
    fontFamily:'Medium'
  },

  col:{
    flexDirection: "column" , 
    width:"50%",
  },  
  row:{
    flexDirection: "row" , 
  }, 

  allergy: {
    flex: 1.5,
  },
  etc: {
    flex: 1,
  },
});
