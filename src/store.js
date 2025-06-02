export const initialStore = () => {
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


export const storeReducer = (state, action) => {
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
    
    case "toggle_favorite": {
      const { theme, uid, name, key } = action.payload;
      const favoriteKey = key || `${theme}-${uid}`;
      const exists = state.favorites.find(fav => fav.key === favoriteKey);

      if (exists) {
        return {
          ...state,
          favorites: state.favorites.filter(fav => fav.key !== favoriteKey)
        };
      }

      if (!name || !favoriteKey) return state;

      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            theme,
            uid,
            name,
            key: favoriteKey
          }
        ]
      };
    }


    default:
      return state;
  }
}

export default storeReducer