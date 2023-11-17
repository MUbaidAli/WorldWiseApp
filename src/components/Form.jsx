// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackBtn from "./BackBtn";
import { useLatLngPosition } from "../utils/useLatLng";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Context/CitiesContextProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [posError, setPosError] = useState("");
  const navigate = useNavigate();
  const [isRevLoading, setIsRevLoading] = useState(false);
  const [lat, lng] = useLatLngPosition();
  const { sendCityData, isLoading } = useCities();
  // const navigate = useNavigate();
  // console.log(lat, lng, "from form");
  const ENDPOINT_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client?";
  useEffect(() => {
    if (!lat && !lng) return;
    async function getRevCityData() {
      try {
        setPosError("");
        setIsRevLoading(true);
        const res = await fetch(
          `${ENDPOINT_URL}latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        // console.log(data.city);
        console.log(data.countryName);
        if (!data.countryName) throw new Error("select a valid Location");
        // console.log(data);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setPosError(error.message);
        console.log(error.message);
      } finally {
        setIsRevLoading(false);
      }
    }
    getRevCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!date || !cityName) return;

    const cityData = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      // id: crypto.randomUUID(),
    };

    // console.log(cityData);
    await sendCityData(cityData);
    navigate("/app/cities");
    // {
    //   "cityName": "Lisbon",
    //   "country": "Portugal",
    //   "emoji": "🇵🇹",
    //   "date": "2027-10-31T15:59:59.138Z",
    //   "notes": "My favorite city so far!",
    //   "position": {
    //     "lat": 38.727881642324164,
    //     "lng": -9.140900099907554
    //   },
    //   "id": 73930385
    // },
  }

  if (isRevLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={"Select A Location On Map."} />;
  if (posError) return <Message message={posError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd / MM / yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        {/* <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button> */}

        <BackBtn />
      </div>
    </form>
  );
}

export default Form;
