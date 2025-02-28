import { Link, Stack, useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

import { Button, Logo, TextField } from '@/components'

export default function RegisterScreen() {
  const router = useRouter()
  const { control } = useForm({
    defaultValues: {
      email: '',
    }
  })

  const handleSendCode = () => {
    router.push('/verify')
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Register',
          headerBackTitleVisible: false,
        }}
      />
      <View className="h-[100%] bg-white pt-10">
        <View className="w-[100vw] px-8 py-6 space-y-4 h-full flex justify-between">
          <View>
            <Logo className="mx-auto w-40 h-16" />

            <View className="space-y-4 mt-8">
              <TextField
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                control={control}
                name="email"
              />

              <Button 
                className="bg-red-500 rounded-full"
                onPress={handleSendCode}
              >
                Send Code
              </Button>
            </View>
          </View>

          <View className="space-y-6">
            <View className="flex flex-row justify-center">
              <Text className="text-gray-800 text-sm mr-1">Already have an account?</Text>
              <Link replace href="/login" className="text-red-500 text-sm font-semibold">
                Sign In
              </Link>
            </View>

            <View>
              <Text className="text-center text-gray-500 text-xs">
                By continuing, you agree to our{' '}
                <Text className="text-gray-700">Terms of Service</Text> and{' '}
                <Text className="text-gray-700">Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}
