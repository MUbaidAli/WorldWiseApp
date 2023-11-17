import { useCities } from "../Context/CitiesContextProvider";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your First City By Clicking On A City On The Map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((item, i) => (
        <CityItem item={item} key={i} />
      ))}
    </ul>
  );
}

export default CityList;
