import { useCities } from "../Context/CitiesContextProvider";
import CityItem from "./CityItem";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  //   console.log(cities);

  //   const countries = cities.reduce((acc, cur) => {
  //     // acc !== cur
  //     // acc !== cur.country;
  //     console.log(acc !== cur.country);
  //   }, []);

  //   const countries = [...new Set(cities.map((item) => item.country))];

  //   const countries = cities.reduce((acc, cur) => {
  //     if(acc.map(el) => el.country).includes(cur.country){
  //     return [...acc , {country:cur.country , emoji:cur.emoji}]}
  //   else return acc;

  // }, []);

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    } else return acc;
  }, []);

  console.log(cities, "city");
  console.log(countries, "country");

  if (!countries?.length)
    return (
      <Message
        message={"Add your First City By Clicking On A City On The Map"}
      />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((item, i) => (
        <CountryItem country={item} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
