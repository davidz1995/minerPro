import {
  GET_ALL_PRODUCTS,
  SET_MINERS,
  SET_BALANCE,
  SET_HISTORY,
  GET_ETHERMINE_DATA,
  GET_ETHERMINE_POOLSTATS,
  SET_DASHBOARD_ADMIN,
  SET_BALANCE_ADMIN,
  SET_HISTORY_ADMIN,
  SET_ADMIN,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_BY_NAME,
  CLEAN_MESSAGE_CREATE,
  CLEAN_MESSAGE_UPDATE,
  CLEAN_MESSAGE_DELETE,
  CLEAN_SEARCHED_USERS,
} from "./actions/actionTypes";

const initialState = {
  products: [],
  selectedBodyClient: "mineros",
  selectedBodyAdmin: "dashboard",
  ethermineData: {},
  etherminePoolStats: {},
  deleteProductMessage: "",
  updateProductMessage: "",
  createProductMessage: "",
  users: [],
  userByName: [],
  createUserMessage: "",
  updateUserMessage: "",
  deleteUserMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_MINERS:
      return {
        ...state,
        selectedBodyClient: action.payload,
      };
    case SET_BALANCE:
      return {
        ...state,
        selectedBodyClient: action.payload,
      };
    case SET_HISTORY:
      return {
        ...state,
        selectedBodyClient: action.payload,
      };
    case GET_ETHERMINE_DATA:
      return {
        ...state,
        ethermineData: action.payload,
      };
    case GET_ETHERMINE_POOLSTATS:
      return {
        ...state,
        etherminePoolStats: action.payload,
      };
    case SET_DASHBOARD_ADMIN:
      return {
        ...state,
        selectedBodyAdmin: action.payload,
      };
    case SET_ADMIN:
      return {
        ...state,
        selectedBodyAdmin: action.payload,
      };
    case SET_BALANCE_ADMIN:
      return {
        ...state,
        selectedBodyAdmin: action.payload,
      };
    case SET_HISTORY_ADMIN:
      return {
        ...state,
        selectedBodyAdmin: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProductMessage: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProductMessage: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        createProductMessage: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        createUserMessage: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        updateUserMessage: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUserMessage: action.payload,
      };
    case GET_USER_BY_NAME:
      return {
        ...state,
        userByName: action.payload,
      };
    case CLEAN_MESSAGE_CREATE:
      return {
        ...state,
        createUserMessage: action.payload,
      };
    case CLEAN_MESSAGE_UPDATE:
      return {
        ...state,
        updateUserMessage: action.payload,
      };
    case CLEAN_MESSAGE_DELETE:
      return {
        ...state,
        deleteUserMessage: action.payload,
      };
    case CLEAN_SEARCHED_USERS:
      return {
        ...state,
        userByName: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
