import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { SongCard } from "../components";

const Style = StyleSheet.create({
  container: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

// TODO: Show empty state if no cards
class CardGrid extends React.Component {
  state = {
    // TODO: Song playing logic
  };

  render() {
    const { cards, user } = this.props;
    return (
      <View style={Style.container}>
        <FlatList
          data={cards}
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <SongCard song={item} user={user} />}
        />
      </View>
    );
  }
}

export default CardGrid;
