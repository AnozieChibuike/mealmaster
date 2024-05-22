import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constant, { style } from "../../lib/constants";
import Item from "../../components/item";
import { useEffect, useState } from "react";

export default function Ingredients({ route }) {
  const { ingredients } = route.params;
  useEffect(()=> console.log(route),[])
  return (
    <SafeAreaView>
      <FlatList
        data={ingredients}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
}
