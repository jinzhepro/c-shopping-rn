import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native'

import { Button } from '@/components'

export default function VerifyScreen() {
  const router = useRouter()
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [code4, setCode4] = useState('')

  const input1 = React.useRef()
  const input2 = React.useRef()
  const input3 = React.useRef()
  const input4 = React.useRef()

  const handleKeyPress = (e, currentInput, previousInput, setValue) => {
    // 处理删除键
    if (e.nativeEvent.key === 'Backspace') {
      setValue('')
      previousInput?.current?.focus()
    }
  }

  const handleContinue = () => {
    router.push('/location')
  }

  const isDisabled = !code1 || !code2 || !code3 || !code4

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Verify',
          headerBackTitleVisible: false,
        }}
      />
      <View className="h-full bg-white px-8 pt-10">
        <View className="space-y-2">
          <Text className="text-2xl font-semibold">Enter verification code</Text>
          <Text className="text-gray-500">
            We sent you a 4 digit code to your email{'\n'}
            example@email.com
          </Text>
        </View>

        <View className="mt-8 flex-row justify-between">
          <TextInput
            ref={input1}
            className="w-14 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl"
            keyboardType="number-pad"
            maxLength={1}
            value={code1}
            onChangeText={(text) => {
              setCode1(text)
              text && input2.current.focus()
            }}
            onKeyPress={(e) => handleKeyPress(e, input1, null, setCode1)}
          />
          <TextInput
            ref={input2}
            className="w-14 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl"
            keyboardType="number-pad"
            maxLength={1}
            value={code2}
            onChangeText={(text) => {
              setCode2(text)
              text && input3.current.focus()
            }}
            onKeyPress={(e) => handleKeyPress(e, input2, input1, setCode2)}
          />
          <TextInput
            ref={input3}
            className="w-14 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl"
            keyboardType="number-pad"
            maxLength={1}
            value={code3}
            onChangeText={(text) => {
              setCode3(text)
              text && input4.current.focus()
            }}
            onKeyPress={(e) => handleKeyPress(e, input3, input2, setCode3)}
          />
          <TextInput
            ref={input4}
            className="w-14 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl"
            keyboardType="number-pad"
            maxLength={1}
            value={code4}
            onChangeText={(text) => {
              setCode4(text)
            }}
            onKeyPress={(e) => handleKeyPress(e, input4, input3, setCode4)}
          />
        </View>

        <Text 
          className="mt-4 text-red-500 text-center"
          onPress={() => {
            setCode1('')
            setCode2('')
            setCode3('')
            setCode4('')
            input1.current.focus()
          }}
        >
          Resend
        </Text>

        <View className="mt-8">
          <Button 
            className={`rounded-full ${isDisabled ? 'bg-gray-200' : 'bg-red-500'}`}
            disabled={isDisabled}
            onPress={handleContinue}
          >
            Continue
          </Button>
        </View>
      </View>
    </>
  )
} 