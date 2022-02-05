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
  SET_VIEW_PRODUCTS_ADMIN,
  DELETE_PRODUCT
} from "./actions/actionTypes";

const initialState = {
  products: [],
  selectedBodyClient: "mineros",
  selectedBodyAdmin: "dashboard",
  ethermineData: {},
  etherminePoolStats: {},
  selectedAdminController: 'viewUsersAdmin',
  deleteProductMessage: '',
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
    case GET_ETHERMINE_DATA :
      return {
        ...state,
        ethermineData: action.payload,
      };
    case GET_ETHERMINE_POOLSTATS :
      return {
        ...state,
        etherminePoolStats: action.payload
      };
    case SET_DASHBOARD_ADMIN :
      return {
        ...state,
        selectedBodyAdmin: action.payload
      };
    case SET_ADMIN :
    return {
      ...state,
      selectedBodyAdmin: action.payload
    };
    case SET_BALANCE_ADMIN :
    return {
      ...state,
      selectedBodyAdmin: action.payload
    };
    case SET_HISTORY_ADMIN :
    return {
      ...state,
      selectedBodyAdmin: action.payload
    };
    case SET_VIEW_PRODUCTS_ADMIN :
    return {
      ...state,
      selectedAdminController: action.payload
    }
    case DELETE_PRODUCT :
    return {
      ...state,
      deleteProductMessage: action.payload
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
