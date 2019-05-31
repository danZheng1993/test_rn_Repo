import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { SongCard, RoundButton } from "../components";

const Style = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  column: {
    marginLeft: 8,
    marginRight: 16,
    marginBottom: 8
  }
});

// TODO: Show empty state if no cards
class CardGrid extends React.Component {
  state = {
    // TODO: Song playing logic
  };

  render() {
    const { songs, user, canLoadMoreSongs, loadMoreSongs } = this.props;
    return (
      <View style={Style.container}>
        <FlatList
          columnWrapperStyle={Style.column}
          data={songs}
          numColumns={2}
          initialNumToRender={4}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SongCard song={item} user={user} />}
          ListFooterComponent={() => {
            if (canLoadMoreSongs)
              return (
                <RoundButton
                  text="LOAD MORE SONGS"
                  onPress={() => loadMoreSongs()}
                />
              );
            return null;
          }}
          // ListEmptyComponent
        />
      </View>
    );
  }
}

export default CardGrid;
