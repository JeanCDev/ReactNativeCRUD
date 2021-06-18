import React, {useContext} from 'react';
import {View, FlatList, Alert} from "react-native";
import { ListItem, Button, Icon } from 'react-native-elements';
import UsersContext from '../contexts/UserContext';
import users from '../data/users';

export default function UserList(props) {

  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert("Excluir usuário", "Deseja realmente excluir o usuário", [
      {
        text: "Sim", onPress() {
          dispatch({
            type: "deleteUser",
            payload: user
          });
        }
      },
      {
        text: "Não"
      }
    ]);
  }

  function getActions(user){
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange"/>}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red"/>}
        />
      </>
    )
  }

  function getUserItem({item: user}) {
    return (
      <ListItem
        leftAvatar={{source: {uri: user.avatarUrl}}}
        key={user.id}
        title={user.name}
        subtitle={user.email}
        bottomDivider
        onPress={()=>{
          props.navigation.navigate("UserForm", user);
        }}
        rightElement={getActions(user)}
      />
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  )
}