import React, { useCallback } from 'react'
import { View } from 'react-native';
import TaskItem from './task_item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack } from 'native-base';

type TaskItemData = { 
  id: string;
  subject: string;
  done: boolean;
}

type TaskListProps = {
  data: Array<TaskItemData>,
  handleChangeSubject: (item: TaskItemData, newSubject: string) => void,
  handleDeleteTask: (item: TaskItemData) => void
  handleUpdateTaskCompletion: (item: TaskItemData, newDone: boolean) => void
}

type TaskItemProps = {
  data: TaskItemData,
  subject: string,
  handleChangeSubject: (item: TaskItemData, newSubject: string) => void,
  handleDeleteTask: (item: TaskItemData) => void
  handleUpdateTaskCompletion: (item: TaskItemData, newDone: boolean) => void
}

const TaskItemContainer = (props: TaskItemProps) => {
  const {
    data,
    subject,
    handleChangeSubject,
    handleDeleteTask,
    handleUpdateTaskCompletion
  } = props
  
  const onChangeSubject = useCallback((newSubject: string) => {
    handleChangeSubject(data, newSubject)
  }, [data, handleChangeSubject])

  const onDeleteItem = useCallback(() => {
    handleDeleteTask(data)
  }, [data, handleDeleteTask])

  const updateTaskCompletion = useCallback((newDone: boolean) => {
    handleUpdateTaskCompletion(data, newDone)
  }, [data, handleUpdateTaskCompletion])
  
  return (
    <Box w="296" p="5" bg="blueGray.100" rounded="8" marginBottom="2"> 
          <HStack space="3" alignItems="center">
            {data.done 
              ? <MaterialIcons name="radio-button-on" size={24} color="black" onPress={() => updateTaskCompletion(false)} /> 
              : <MaterialIcons name="radio-button-off" size={24} color="black" onPress={() => updateTaskCompletion(true)} />
            }
            <TaskItem isDone={data.done} subject={subject} onChangeSubject={onChangeSubject}/>
            <MaterialCommunityIcons onPress={onDeleteItem} name="delete-forever-outline" size={24} color="black" />
          </HStack>
    </Box>
  )
}



export default function Tasklist(props: TaskListProps) {
  const {
    data,
    handleChangeSubject,
    handleDeleteTask,
    handleUpdateTaskCompletion,
  } = props

  return (
    <View>
      {data.map(item => {       
        return <TaskItemContainer 
          data={item} 
          subject={item.subject}
          handleChangeSubject={handleChangeSubject}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTaskCompletion={handleUpdateTaskCompletion}
        />
      })}
    </View>
  )
}