import { useSearchParams } from "react-router-dom";

export function useLatLngPosition() {
  const [searchQuery, setSearhQuery] = useSearchParams();
  const lat = searchQuery.get("lat");
  const lng = searchQuery.get("lng");

  return [lat, lng];
}
