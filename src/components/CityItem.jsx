import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Context/CitiesContextProvider";

function formateDate(curdate) {
  const dateFormater = new Date(curdate);
  const year = dateFormater.getFullYear();
  const month = dateFormater.toLocaleString("default", { month: "long" });
  const day = dateFormater.getDate();

  return `${month} ${day}, ${year}`;
}

function CityItem({ item }) {
  const { cityName, emoji, date, id, position } = item;

  const navigate = useNavigate();
  const { deleteCity, currentCity } = useCities();
  async function handleDelete(e, id) {
    e.preventDefault();
    console.log(id, "delete id");
    await deleteCity(id);
    // Navigate("/app/cities");
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}> {formateDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDelete(e, id)}
        >
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
