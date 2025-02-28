import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View, TouchableOpacity } from 'react-native'
import { Checkbox } from 'react-native-paper'

import { Button, HandleResponse, Logo, TextField } from '@/components'
import Icons from '@/components/common/Icons'
import { useAppDispatch } from '@/hooks'
import { useLoginMutation } from '@/services'
import { userLogin } from '@/store'
import { logInSchema } from '@/utils'

export default function LoginScreen() {
  //? Assets
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [keepSignedIn, setKeepSignedIn] = useState(false)

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const onSubmit = ({ email, password }) => {
    if (email && password) {
      login({
        body: { email, password },
      })
    }
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token))
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sign In',
          headerBackTitleVisible: false,
        }}
      />
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || 'An error occurred'}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      <View className="h-[100%] bg-white pt-10">
        <View className="w-[100vw] px-8 py-6 space-y-4 h-full flex justify-between">
          <View>
            <Logo className="mx-auto w-40 h-16" />

            <View className="space-y-4 mt-8">
              <TextField
                errors={formErrors.email}
                placeholder="Enter your email"
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
                control={control}
              />

              <TextField
                errors={formErrors.password}
                secureTextEntry
                placeholder="Enter your password"
                name="password"
                control={control}
              />

              <TouchableOpacity className="ml-[9px] -mt-1">
                <Text className="text-red-500 text-sm">Forgot password?</Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                <Checkbox
                  status={keepSignedIn ? 'checked' : 'unchecked'}
                  onPress={() => setKeepSignedIn(!keepSignedIn)}
                  color="#FF0000"
                />
                <Text className="text-gray-600 text-sm">Keep me signed in</Text>
              </View>

              <Button
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="bg-red-500 rounded-full"
              >
                Sign In
              </Button>

              <View className="flex flex-row items-center justify-center my-4 space-x-3">
                <View className="h-[1px] flex-1 bg-gray-200" />
                <Text className="text-gray-400">or</Text>
                <View className="h-[1px] flex-1 bg-gray-200" />
              </View>

              <TouchableOpacity className="flex-row items-center relative p-3 bg-black rounded-full mb-3">
                <View className="absolute left-3">
                  <Icons.AntDesign name="apple1" size={20} color="white" />
                </View>
                <Text className="text-white font-semibold w-full text-center">
                  Continue with Apple
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center relative p-3 bg-gray-100 rounded-full">
                <View className="absolute left-3">
                  <Icons.AntDesign name="google" size={20} color="#4285F4" />
                </View>
                <Text className="text-gray-700 font-semibold w-full text-center">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="space-y-6">
            <View className="flex flex-row justify-center">
              <Text className="text-gray-800 text-sm mr-1">Don't have an account?</Text>
              <Link replace href="/register" className="text-red-500 text-sm font-semibold">
                Sign Up
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
