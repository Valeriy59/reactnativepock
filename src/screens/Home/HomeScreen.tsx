import React, {useEffect, useState} from 'react';
import {FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {api, Pokemon, PokemonItem} from "../../api/api";
import {NUM_COLUMNS, PADDING, WIDTH} from "../../constant/constant";
import {useAppNavigation} from "../../types";

type Item = {
  name: string
  icon: string
  id: number
  key: number
  url: string
}

export const HomeScreen = () => {
  const {navigate} = useAppNavigation()

  const [allPokemon, setAllPokemon] = useState<Item[]>([])
  const [pokemonImg, setPokemonImg] = useState<Pokemon[]>([])

  useEffect(() => {
    api.getAllPokemon()
      .then((resp) => {
      let results = resp.data.results
      results.forEach((pokemon, index) => {
        api.getPokemonById(pokemon.url).then((resp) => {
          setAllPokemon((prevState) => [...prevState, {
            id: resp.data.id,
            key: index + 1,
            icon: resp.data.sprites.other['official-artwork'].front_default,
            name: resp.data.name,
            url: pokemon.url
          } ])
          resp.data
        })
      })
    })
  }, [])

  const renderItem: ListRenderItem<Item> = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigate('Details', {url: item.url})
        }}
      >
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
          {pokemonImg[0] && <Image
                              style={{width: 50, height: 50}}
                              source={{uri: item.icon}}/>}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allPokemon}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING
  },
  item: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    width: (WIDTH - PADDING * 2) / NUM_COLUMNS - 5,
    marginVertical: 5,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center'
  }
})