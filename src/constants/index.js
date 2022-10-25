import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const sizes = {
  // global sizes
  base: 8,
  medium: 12,
  margin: 20,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  width,
  height,
};

export const fonts = {
  h1: {fontFamily: "Roboto-Bold", fontSize: sizes.h1},
  h2: {fontFamily: "Roboto-Bold", fontSize: sizes.h2},
  h3: {fontFamily: "Roboto-Medium", fontSize: sizes.h3},
  h4: {fontFamily: "Roboto-Medium", fontSize: sizes.h4},
  h5: {fontFamily: "Roboto-Medium", fontSize: sizes.h5},
  body1: {fontFamily: "Roboto-Regular", fontSize: sizes.body1},
  body2: {fontFamily: "Roboto-Regular", fontSize: sizes.body2},
  body3: {fontFamily: "Roboto-Regular", fontSize: sizes.body3},
  body4: {fontFamily: "Roboto-Regular", fontSize: sizes.body4},
  body5: {fontFamily: "Roboto-Regular", fontSize: sizes.body5},
};

export const colors = {
  secondary: "#17a2b8",
  dark: "#0d0f23",
  subDark: "#6d6d6d",
  light: "#fff",
  subLight: "#f1f1f1",

  gray: "#6b6a72",
  primary: "#ff725e",
};
