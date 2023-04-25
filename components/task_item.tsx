import { View, TextInput, NativeSyntheticEvent, TextInputChangeEventData, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'

type TaskItemTypes = {
  subject: string
  onChangeSubject: (newSubject: string) => void
  isDone: boolean
}

export default function TaskItem({subject, onChangeSubject, isDone}: TaskItemTypes) {
  
  const onChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    
    const value = e.nativeEvent.text;
    onChangeSubject && onChangeSubject(value)
    
  }, [onChangeSubject])

  return (
    <View>
      <TextInput style={[isDone ? taskStyles.completedTask : '' as any]} onChange={onChange}>{subject}</TextInput>
    </View>
  )
}

const taskStyles = StyleSheet.create({
  completedTask: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  }
})