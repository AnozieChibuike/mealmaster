import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constant, { style } from "../../lib/constants";
import Item from "../../components/item";

export default function Steps({ route }) {
    const { steps } = route.params;
    return (
      <SafeAreaView>
        <FlatList
          data={steps}
          renderItem={({item}) => <Item title={item} />}
          keyExtractor={item => item}
        />
      </SafeAreaView>
  );
}
