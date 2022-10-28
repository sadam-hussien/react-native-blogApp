import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";

import React, {useState, useEffect} from "react";

import {sizes, colors, fonts} from "@/constants";

import {BlogItem} from "@/components";

import {TabView} from "react-native-tab-view";

import axios from "axios";

import {PersistGate} from "redux-persist/integration/react";

import {Provider} from "react-redux";

import store, {persistor} from "@/store";

export default function App() {
  const [index, setIndex] = useState(0);

  const [, setCurrentItem] = useState(null);

  const [routes, setRoutes] = useState([]);

  const [content, setContent] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://api.findosaurs.com/api/SitesApis/GetAllCategories")
      .then(res => {
        console.log("first", res);
        setRoutes(res.data.Table);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (routes.length) {
      setLoading(true);
      axios
        .get(
          `http://api.findosaurs.com/api/SitesApis/GetAllItemsFull?Category=${routes[index].CategoryID}&SubCategory&SortBy=Azar&PageNo=1&SearchTerm=`,
        )
        .then(res => {
          console.log(res);
          setContent(res.data.Table);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [index]);

  const renderTabBar = props => {
    const ourRoutes = props.navigationState.routes;
    const inputRange = ourRoutes.map((x, i) => i);

    return (
      <View>
        <FlatList
          data={ourRoutes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.CategoryID}
          contentContainerStyle={styles.tabContainer}
          renderItem={({item, index: idx}) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === idx ? 1 : 0.5,
              ),
            });
            const isActive = idx === index;
            return (
              <View style={styles.tabs}>
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setIndex(idx);
                    setCurrentItem(item);
                  }}
                  style={[styles.tab]}>
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor: isActive
                          ? colors.primary
                          : `rgba(0, 0, 0, .2)`,
                      },
                    ]}></View>
                  <Animated.Text style={[styles.tabText, {opacity}]}>
                    {item.Title_en}
                  </Animated.Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };

  if (loading) {
    return <Text>loading...</Text>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            return <BlogItem data={content} />;
          }}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: sizes.width}}
        />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.light,
    height: 60,
    alignItems: "center",
    paddingVertical: 4,
  },
  tabs: {
    textAlign: "center",
    flexDirection: "row",
    position: "relative",
  },
  line: {
    height: 3,
    borderRadius: 4,
    marginBottom: 2,
  },
  tab: {
    marginHorizontal: sizes.padding,
  },
  tabText: {
    ...fonts.h3,
    textTransform: "capitalize",
    color: colors.gray,
    paddingHorizontal: 5,
  },
});
