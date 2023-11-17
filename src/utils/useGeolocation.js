import { useState } from "react";

function useGeolocation() {
  const [getPos, setGetPos] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  function getPosition() {
    setIsloading(true);
    if (!navigator.geolocation) {
      return console.log("no Locatio Selected");
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const cords = pos.coords;
        console.log(pos);

        //   console.log(cords, "cords");
        setGetPos({ latitude: cords.latitude, longitude: cords.longitude });
        setIsloading(false);
      },
      (err) => {
        console.log("error");
        setIsloading(false);
      }
    );
  }
  return { getPos, getPosition, isLoading };
}

export { useGeolocation };
