import { MaterialIcons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, Modal, Animated, Pressable } from 'react-native'

import { Button } from '@/components'

export default function LocationScreen() {
  const [showModal, setShowModal] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [showModal])

  const handleContinue = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Set location',
          headerBackTitleVisible: false,
        }}
      />
      <View className="h-full bg-white px-8 pt-6">
        <Text className="text-gray-500 mb-4">Enter your location to find deals around you.</Text>

        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-lg p-4 mb-4">
          <MaterialIcons name="location-on" size={24} color="gray" />
          <Text className="ml-2 text-gray-700">Michigan</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-lg p-4 mb-4">
          <MaterialIcons name="my-location" size={24} color="gray" />
          <Text className="ml-2 text-gray-700">Use current location</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-lg p-4">
          <MaterialIcons name="location-on" size={24} color="gray" />
          <Text className="ml-2 text-gray-700">1266 Michigan Ave</Text>
        </TouchableOpacity>

        <View className="absolute bottom-8 left-8 right-8">
          <Button className="bg-red-500 rounded-full" onPress={handleContinue}>
            Continue
          </Button>
        </View>

        {/* Location Permission Modal */}
        <Modal animationType="slide" transparent visible={showModal} onRequestClose={handleClose}>
          <Pressable className="flex-1" onPress={handleClose}>
            <Animated.View className="absolute inset-0 bg-black" style={{ opacity: fadeAnim }} />
            <View className="flex-1 justify-end">
              <Pressable onPress={e => e.stopPropagation()}>
                <View
                  className="bg-white rounded-t-3xl p-8 pt-2"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: -4,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 12,
                  }}
                >
                  <View className="items-center">
                    <View className="w-12 h-1 bg-gray-200 rounded-full mb-6" />
                    <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
                      <MaterialIcons name="location-on" size={32} color="#EF4444" />
                    </View>
                    <Text className="text-2xl font-semibold mb-2">Allow access location</Text>
                    <Text className="text-gray-500 text-center mb-8">
                      Before we start we will need to access your location so we can track your
                      location while you are using the app.
                    </Text>
                  </View>

                  <View className="flex-row space-x-4">
                    <View className="flex-1">
                      <Button
                        className="bg-white rounded-full border border-gray-200 text-red-400"
                        ClassName="text-red-400"
                        onPress={handleClose}
                      >
                        Later
                      </Button>
                    </View>
                    <View className="flex-1">
                      <Button className="bg-red-500 rounded-full" onPress={handleClose}>
                        Allow access
                      </Button>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </>
  )
}
