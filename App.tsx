import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Icon, VStack, Center, Fab } from "native-base";
import Tasklist from './components/task_list';
import { useCallback, useState } from 'react';
import shortid from 'shortid';
import { Task } from './types'
import { AntDesign } from "@expo/vector-icons";


const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native todo list',
    done: false
  }
]



export default function App() {
  const [data, setData] = useState(initialData)

  const handleChangeSubject = useCallback((item: Task, newSubject: string) => {
    
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject,
      }
      return newData
    })
  }, [])

  const handleDeleteTask = useCallback((item: Task) => {
    
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      
      return newData
    })
  }, [])

  const handleUpdateTaskCompletion = useCallback((item: Task, newDone: boolean) => {
    
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: newDone,
      }
      
      return newData
    })
  }, [])

  const handleAddNewTask = () => {
    const id = shortid.generate()
    
    setData([{
      id,
      subject: 'New Task',
      done: false
    },
    ...data])
    
  }
  

  return (
    <NativeBaseProvider>
      <Center flex="1">
          <VStack 
            space="3"
          >
            <Tasklist 
              data={data} 
              handleChangeSubject={handleChangeSubject}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTaskCompletion={handleUpdateTaskCompletion}
            />
          </VStack>
      </Center>

      <Fab 
        renderInPortal={false} 
        shadow={2} 
        size="sm" 
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} 
        onPress={handleAddNewTask}
      />
    </NativeBaseProvider>
  );
}
