import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import React from "react";

import {colors, sizes} from "@/constants";

import {useSelector, useDispatch} from "react-redux";

import {action_add_to_fav, action_remove_from_fav} from "@/store/favReducer";

const BlogItem = ({data}) => {
  if (data) {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.ItemID}
          renderItem={({item, index}) => <Item data={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
  return <View></View>;
};

function Item({data}) {
  const dispatch = useDispatch();
  const favItems = useSelector(state => state.fav);
  const checkIfCurrentItemInFav = favItems.items?.find(
    item => item.ItemID === data.ItemID,
  );
  const addToFav = () => {
    dispatch(action_add_to_fav(data));
  };
  const removeFromFav = () => {
    dispatch(action_remove_from_fav(data));
  };
  return (
    <View style={styles.itemContainer}>
      <Text>{data.Title_en}</Text>
      {checkIfCurrentItemInFav ? (
        <TouchableOpacity onPress={removeFromFav}>
          <Image
            source={require("@/assets/imgs/heart-fill.png")}
            style={styles.faveImg}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={addToFav}>
          <Image
            source={require("@/assets/imgs/heart.png")}
            style={styles.faveImg}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: sizes.padding,
  },
  contentContainer: {
    paddingHorizontal: sizes.padding,
  },
  itemContainer: {
    marginBottom: sizes.padding,
    maxHeight: 200,
    borderRadius: 10,
  },
  itemImg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  favBtn: {},
  faveImg: {
    maxHeight: 50,
    maxWidth: 50,
  },
});

export default BlogItem;
