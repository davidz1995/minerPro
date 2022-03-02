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
  GET_USER_BY_ID,
  GET_HISTORIES,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  GET_USER_BY_NAME,
  CLEAN_MESSAGE_CREATE,
  CLEAN_MESSAGE_UPDATE,
  CLEAN_MESSAGE_DELETE,
  CLEAN_SEARCHED_USERS,
  GET_ETHERMINE_MINER_POOLSTATS,
  CLEAN_MESSAGE_CREATE_PRODUCTS,
  CLEAN_MESSAGE_UPDATE_PRODUCTS,
  CLEAN_MESSAGE_DELETE_PRODUCTS,
  CLEAN_MESSAGE_CREATE_PAYMENTS,
  CLEAN_MESSAGE_DELETE_PAYMENTS,
  GET_MINERS,
  CREATE_MINER,
  UPDATE_MINER,
  DELETE_MINER,
  CLEAN_MESSAGE_CREATE_MINERS,
  CLEAN_MESSAGE_DELETE_MINERS,
  CLEAN_MESSAGE_UPDATE_MINERS,
} from "./actions/actionTypes";

const initialState = {
  products: [],
  selectedBodyClient: "mineros",
  selectedBodyAdmin: "dashboard",
  ethermineData: {},
  ethermineMinerCurrentStats: {},
  etherminePoolStats: {},
  deleteProductMessage: "",
  updateProductMessage: "",
  createProductMessage: "",
  users: [],
  userById: [],
  histories: [],
  miners: [],
  userByName: [],
  createUserMessage: "",
  updateUserMessage: "",
  deleteUserMessage: "",
  createPaymentMessage: "",
  updatePaymentMessage: "",
  deletePaymentMessage: "",
  createMinerMessage: "",
  updateMinerMessage: "",
  deleteMinerMessage: "",
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
    case GET_ETHERMINE_MINER_POOLSTATS:
      return {
        ...state,
        ethermineMinerCurrentStats: action.payload,
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
    case GET_USER_BY_ID:
      return {
        ...state,
        userById: action.payload,
      };
    case GET_HISTORIES:
      return {
        ...state,
        histories: action.payload,
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
    case CLEAN_MESSAGE_CREATE_PRODUCTS:
      return {
        ...state,
        createProductMessage: action.payload,
      };
    case CLEAN_MESSAGE_UPDATE_PRODUCTS:
      return {
        ...state,
        updateProductMessage: action.payload,
      };
    case CLEAN_MESSAGE_DELETE_PRODUCTS:
      return {
        ...state,
        deleteProductMessage: action.payload,
      };
    case CREATE_PAYMENT:
      return {
        ...state,
        createPaymentMessage: action.payload,
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        deletePaymentMessage: action.payload,
      };
    case CLEAN_MESSAGE_CREATE_PAYMENTS:
      return {
        ...state,
        createPaymentMessage: action.payload,
      };
    case CLEAN_MESSAGE_DELETE_PAYMENTS:
      return {
        ...state,
        deletePaymentMessage: action.payload,
      };
    case GET_MINERS:
      return {
        ...state,
        miners: action.payload,
      };
    case CREATE_MINER:
      return {
        ...state,
        createMinerMessage: action.payload,
      };
    case UPDATE_MINER:
      return {
        ...state,
        updateMinerMessage: action.payload,
      };
    case DELETE_MINER:
      return {
        ...state,
        deleteMinerMessage: action.payload,
      };
    case CLEAN_MESSAGE_CREATE_MINERS:
      return {
        ...state,
        createMinerMessage: action.payload,
      };
    case CLEAN_MESSAGE_UPDATE_MINERS:
      return {
        ...state,
        updateMinerMessage: action.payload,
      };
    case CLEAN_MESSAGE_DELETE_MINERS:
      return {
        ...state,
        deleteMinerMessage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
