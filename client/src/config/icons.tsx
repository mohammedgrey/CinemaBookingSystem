import React from 'react';
/* eslint-disable react/display-name */
import {
  Facebook,
  Home,
  Instagram,
  Twitter,
  SearchOutlined,
  ShoppingCartOutlined,
  FavoriteBorder,
  PersonOutline,
  MenuOutlined,
  ExpandMore,
  ExpandLess,
  CheckBox,
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  Language,
  HourglassEmptyOutlined,
  Add,
  Remove,
  Star,
  Close,
  LocalShippingOutlined,
  QueryBuilderOutlined,
  LinearScaleOutlined,
  RadioButtonUnchecked,
  Send,
  Payment,
  LocationOn,
  Edit,
  Delete,
  ArrowForward,
  ArrowBack,
  Visibility,
  VisibilityOff,
  CheckCircleOutline,
  HighlightOff,
  ErrorOutline,
  Login,
  Logout,
  AssignmentInd,
} from '@mui/icons-material';

const icons = {
  home: (props: any) => {
    return <Home {...props} />;
  },
  facebook: (props: any) => {
    return <Facebook {...props} />;
  },
  twitter: (props: any) => {
    return <Twitter {...props} />;
  },
  instagram: (props: any) => {
    return <Instagram {...props} />;
  },
  search: (props: any) => {
    return <SearchOutlined {...props} />;
  },
  cart: (props: any) => {
    return <ShoppingCartOutlined {...props} />;
  },
  favoriteOutline: (props: any) => {
    return <FavoriteBorder {...props} />;
  },
  favorite: (props: any) => {
    return <Favorite {...props} />;
  },
  person: (props: any) => {
    return <PersonOutline {...props} />;
  },
  menu: (props: any) => {
    return <MenuOutlined {...props} />;
  },
  expandMore: (props: any) => {
    return <ExpandMore {...props} />;
  },
  expandLess: (props: any) => {
    return <ExpandLess {...props} />;
  },
  checkBox: (props: any) => {
    return <CheckBox {...props} />;
  },
  arrowBack: (props: any) => {
    return <ArrowBackIos {...props} />;
  },
  arrowForward: (props: any) => {
    return <ArrowForwardIos {...props} />;
  },
  language: (props: any) => {
    return <Language {...props} />;
  },
  loading: (props: any) => {
    return <HourglassEmptyOutlined {...props} />;
  },
  plus: (props: any) => {
    return <Add {...props} />;
  },
  minus: (props: any) => {
    return <Remove {...props} />;
  },
  star: (props: any) => {
    return <Star {...props} />;
  },
  close: (props: any) => {
    return <Close {...props} />;
  },
  shipping: (props: any) => {
    return <LocalShippingOutlined {...props} />;
  },
  clock: (props: any) => {
    return <QueryBuilderOutlined {...props} />;
  },
  filters: (props: any) => {
    return <LinearScaleOutlined {...props} />;
  },
  line: (props: any) => {
    return <Remove {...props} />;
  },
  circle: (props: any) => {
    return <RadioButtonUnchecked {...props} />;
  },
  send: (props: any) => {
    return <Send {...props} />;
  },
  payment: (props: any) => {
    return <Payment {...props} />;
  },
  location: (props: any) => {
    return <LocationOn {...props} />;
  },
  edit: (props: any) => {
    return <Edit {...props} />;
  },
  remove: (props: any) => {
    return <Delete {...props} />;
  },
  arrowBackLong: (props: any) => {
    return <ArrowBack {...props} />;
  },
  arrowForwardlong: (props: any) => {
    return <ArrowForward {...props} />;
  },
  visibilityOn: (props: any) => {
    return <Visibility {...props} />;
  },
  visibilityOff: (props: any) => {
    return <VisibilityOff {...props} />;
  },
  success: (props: any) => {
    return <CheckCircleOutline {...props} />;
  },
  error: (props: any) => {
    return <HighlightOff {...props} />;
  },
  warning: (props: any) => {
    return <ErrorOutline {...props} />;
  },
  login: (props: any) => {
    return <Login {...props} />;
  },
  register: (props: any) => {
    return <AssignmentInd {...props} />;
  },
  logout: (props: any) => {
    return <Logout {...props} />;
  },
};

export default icons;
