import React, {useEffect, useState} from 'react';
import {Image, Text, View} from "react-native";
import {DetailsScreenProps} from "../../types";
import {api, Pokemon} from "../../api/api";

export const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {url} = route.params
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>()
  useEffect(() => {
    api.getPokemonById(url).then((resp) => {
      setCurrentPokemon(resp.data)
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      {currentPokemon && <View>
          <Text>{currentPokemon.name}</Text>
          <Image
              style={{width: 250, height: 250}}
              source={{uri: currentPokemon.sprites.other['official-artwork'].front_default}}
          />
      </View>}
    </View>
  )
}