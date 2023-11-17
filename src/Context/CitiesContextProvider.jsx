import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const API_ENDPOINT = "http://localhost:8000/cities";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: [],
  isLoading: false,
  error: "",
};

function reducer(curState, action) {
  switch (action.type) {
    case "loading":
      return { ...curState, isLoading: true };
    case "cities/received":
      return { ...curState, cities: action.payload, isLoading: false };
    case "city/received":
      return { ...curState, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...curState,
        cities: [...curState.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...curState,
        cities: curState.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    case "rejected":
      return { ...curState, error: action.payload, isLoading: false };
    default:
      throw new Error("something Went Wrong!");
  }
}

function CitiesContextProvider({ children }) {
  const [{ error, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(cities);
  // const [cities, setCitiesList] = useState([]);
  // const [currentCity, setCurrentCity] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(API_ENDPOINT);
        const data = await res.json();
        console.log(data, "removed Data");
        // setCitiesList(data);
        dispatch({ type: "cities/received", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        // console.log(error.message);
      }
    }
    getData();
  }, []);

  const getCurCity = useCallback(async function getCurCity(id) {
    if (currentCity.id == id) return;
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${API_ENDPOINT}/${id}`);
      const data = await res.json();
      // console.log(data, "current city api data");
      // setCurrentCity(data);
      dispatch({ type: "city/received", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      // console.log(error.message);
    }
  }, []);
  async function sendCityData(newCityData) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(newCityData),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/created", payload: data });
      // setCitiesList((cities) => [...cities, data]);
      // setCurrentCity(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error.message);
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(`${API_ENDPOINT}/${id}`, { method: "DELETE" });

      // console.log(data);

      // setCitiesList((cities) => cities.filter((city) => city.id !== id));
      // check here
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      // console.log(error.message);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        deleteCity,
        sendCityData,
        cities,
        isLoading,
        currentCity,
        getCurCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === "undefined")
    throw new Error("context is used before providing");
  return context;
}

export { CitiesContextProvider, useCities };
