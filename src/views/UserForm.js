import React, {useReducer, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from "react-native";
import UsersContext from '../contexts/UserContext';

export default function UserForm({route, navigation}){
  const [user, setUser] = useState(route.params ? route.params : {});

  const {state, dispatch} = useReducer(UsersContext);

  return (
    <View style={styles.form}>
      <Text>Nome: </Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({...user, name})}
        value={user.name}
        placeholder="Informe o nome"
      />
      <Text>Email: </Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({...user, email})}
        value={user.email}
        placeholder="Informe o email"
      />
      <Text>Url do avatar: </Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        value={user.avatarUrl}
        placeholder="Informe o url do avatar"
      />

      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user
          });
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 12
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  }
});