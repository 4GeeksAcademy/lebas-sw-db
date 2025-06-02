export function initialStore() {
  let data = {};
  let details = {};
  let favorites = [];

  try {
    const dataStorage = localStorage.getItem("swapi_data");
    const detailsStorage = localStorage.getItem("swapi_details");
    const favStorage = localStorage.getItem("favorites");

    if (dataStorage) data = JSON.parse(dataStorage);
    if (detailsStorage) details = JSON.parse(detailsStorage);
    if (favStorage) favorites = JSON.parse(favStorage);
        } catch (err) {
        }
          return {
            data,
            details,
            favorites,
            loading: false,
            error: null,
          };
        }


export default function storeReducer(state, action) {
  switch (action.type) {
    case "fetch_data":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "received_data":
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.theme]: action.payload.data, 
        },
      };

    case "fetch_error":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "set_detail":
      return {
        ...state,
        details: {
          ...state.details,
          [`${action.payload.theme}-${action.payload.uid}`]: action.payload.detail,
        }
      };  
    
    case "toggle_favorite":
      const key = action.payload.key;
      const exists = state.favorites.some(fav => fav.key === key);
        return {
          ...state,
          favorites: exists
            ? state.favorites.filter(fav => fav.key !== key)
            : [...state.favorites, action.payload],
        };

    default:
      return state;
  }
}