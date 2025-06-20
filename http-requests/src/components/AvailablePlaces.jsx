import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
 const [isFetching, setIsFetching] = useState(false);
 const [availablePlaces, setAvailablePlaces] = useState([]);
 const [error, setError] = useState();

 useEffect(() => {
  async function fetchPlaces() {
   setIsFetching(true);
   try {
    const places = await fetchAvailablePlaces();

    navigator.geolocation.getCurrentPosition((position) => {
     const { latitude, longitude } = position.coords;
     const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
     setAvailablePlaces(sortedPlaces);
     setIsFetching(false);
    });
   } catch (error) {
    setError({
     message:
      error.message ||
      "Something went wrong while fetching places, please try again later.",
    });
    setIsFetching(false);
   }
  }

  fetchPlaces();

  // fetch("http://localhost:3000/places")
  //  .then((response) => {
  //   return response.json();
  //  })
  //  .then((data) => {
  //   setAvailablePlaces(data.places);
  //  });
 }, []);

 if (error) {
  return <ErrorPage title="An error occurred" message={error.message} />;
 }

 return (
  <Places
   title="Available Places"
   places={availablePlaces}
   isLoading={isFetching}
   loadingText="Fetching available places..."
   fallbackText="No places available."
   onSelectPlace={onSelectPlace}
  />
 );
}
