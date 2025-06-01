import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import ErrorPage from "./components/Error.jsx";

function App() {
 const selectedPlace = useRef();

 const [userPlaces, setUserPlaces] = useState([]);
 const [isFetching, setIsFetching] = useState(false);
 const [errorFetchingUserPlaces, setErrorFetchingUserPlaces] = useState();

 const [errorUpdatingUserPlaces, setErrorUpdatingUserPlaces] = useState();

 const [modalIsOpen, setModalIsOpen] = useState(false);

 useEffect(() => {
  async function getUserPlaces() {
   setIsFetching(true);
   try {
    const userPlacesFromServer = await fetchUserPlaces();

    setUserPlaces(userPlacesFromServer);
    setIsFetching(false);
   } catch (error) {
    setErrorFetchingUserPlaces({
     message:
      error.message ||
      "Something went wrong while fetching your places, please try again later.",
    });
    setIsFetching(false);
   }
  }

  getUserPlaces();
 }, []);

 function handleStartRemovePlace(place) {
  setModalIsOpen(true);
  selectedPlace.current = place;
 }

 function handleStopRemovePlace() {
  setModalIsOpen(false);
 }

 /*
	Optimistic updating: 
		Front-end client logic gets executed, then a request is sent to the backend 
		wrapped in a `try-catch` block. The `error` block contains state management 
		not only for the error message and its pertinent component, but also reverting 
		the state (in this particular case, the `userPlaces` state). 
		Notice that `userPlaces` was used, not `[...userPlaces]`, because the state
		was not yet updated when the request was sent, in other words, the state 
		updating function has not yet been executed in the batch at that particular 
		point.
 */
 async function handleSelectPlace(selectedPlace) {
  setUserPlaces((prevPickedPlaces) => {
   if (!prevPickedPlaces) {
    prevPickedPlaces = [];
   }
   if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
    return prevPickedPlaces;
   }
   return [selectedPlace, ...prevPickedPlaces];
  });

  try {
   await updateUserPlaces([selectedPlace, ...userPlaces]);
  } catch (error) {
   setUserPlaces(userPlaces);
   setErrorUpdatingUserPlaces({
    message: error.message || "Failed to update places.",
   });
  }
 }

 const handleRemovePlace = useCallback(
  async function handleRemovePlace() {
   setUserPlaces((prevPickedPlaces) =>
    prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
   );

   try {
    await updateUserPlaces(
     userPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
   } catch (error) {
    setUserPlaces(userPlaces);
    setErrorUpdatingUserPlaces({
     message: error.message || "Failed to delete place.",
    });
   }

   setModalIsOpen(false);
  },
  [userPlaces]
 );

 function handleErrorConfirm() {
  setErrorUpdatingPlaces(null);
 }

 return (
  <>
   <Modal open={errorUpdatingUserPlaces} onClose={handleErrorConfirm}>
    {errorUpdatingUserPlaces && (
     <ErrorPage
      title="An error ocurred!"
      message={errorUpdatingUserPlaces.message}
      onConfirm={handleErrorConfirm}
     />
    )}
   </Modal>

   <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
    <DeleteConfirmation
     onCancel={handleStopRemovePlace}
     onConfirm={handleRemovePlace}
    />
   </Modal>

   <header>
    <img src={logoImg} alt="Stylized globe" />
    <h1>PlacePicker</h1>
    <p>
     Create your personal collection of places you would like to visit or you
     have visited.
    </p>
   </header>
   <main>
    {errorFetchingUserPlaces && (
     <ErrorPage
      title="An error occurred!"
      message={errorFetchingUserPlaces.message}
     />
    )}

    {!errorFetchingUserPlaces && (
     <Places
      title="I'd like to visit ..."
      fallbackText="Select the places you would like to visit below."
      isLoading={isFetching}
      loadingText="Fetching user's places..."
      places={userPlaces}
      onSelectPlace={handleStartRemovePlace}
     />
    )}

    <AvailablePlaces onSelectPlace={handleSelectPlace} />
   </main>
  </>
 );
}

export default App;
