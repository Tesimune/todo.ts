import React, { useState } from 'react';
import Task from '@/components/task';
import { ThemedView } from '@/components/themed-view';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Text,
  View,
  Keyboard,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    if (!task.trim()) return;

    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index: number) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Add Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.inputField}
          placeholder='Write a task'
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <MaterialIcons name='send' size={22} color='black' />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },

  inputField: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 10,
  },

  addWrapper: {
    height: 55,
    width: 55,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27.5,
    borderWidth: 1,
  },
});
