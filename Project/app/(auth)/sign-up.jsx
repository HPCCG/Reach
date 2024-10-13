import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context' 
import { Link, router } from 'expo-router'

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext(); 
  const [form, setForm] = useState({
    username:'',
    email: '',
    password:''
  })

  const [isSubmitting, setIsSubmitting ] = useState(false)

  const submit = async () => {
    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email,form.password,form.username)

      setUser(result);
      setIsLoggedIn(true); 

      router.replace('/welcome')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }

    createUser();
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-0">

          <Text className="text-2xl text-center text-rose-100 text-semibold mt-10 font-psemibold">Sign up to Reach</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username:e})}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email:e})}
            otherStyles="mt-7"
            keyboardeType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password:e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title = "Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Link href="/sign-in" className="text-lg text-blue-400">Have an account already? Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp