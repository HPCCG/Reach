import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = () => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  return (
      <View className="border-2 border-black-200 w-48 h-212 px-4 bg-white-100 rounded-3xl focus:border-secondary items-center flex flex-row space-x-4">
        <TextInput
          className="text-base text-white flex-1 font-pregular"
          value={query}
          placeholder="Search"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() =>{
            if(!query) {
              return Alert.alert('Missing query', "Please input something to search results across database")
            }

            if(pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
          }}
        >
            <Image 
                source = {icons.search}
                className = 'w-23 h-27'
                resizemode = 'contain'
            />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;