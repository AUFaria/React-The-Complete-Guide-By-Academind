const urlRoot = "http://localhost:3000";

const Endpoints = {
 places: "/places",
 userPlaces: "/user-places",
};

export async function fetchAvailablePlaces() {
 const response = await fetch(urlRoot + Endpoints.places);
 const data = await response.json();

 if (!response.ok) {
  throw new Error("Failed to fetch places");
 }

 return data.places;
}

export async function fetchUserPlaces() {
 const response = await fetch(urlRoot + Endpoints.userPlaces);
 const data = await response.json();

 if (!response.ok) {
  throw new Error("Failed to fetch user places");
 }

 return data.places;
}

export async function updateUserPlaces(places) {
 const fetchConfig = {
  method: "PUT",
  body: JSON.stringify({ places }),
  headers: {
   "Content-Type": "application/json",
  },
 };

 const response = await fetch(urlRoot + Endpoints.userPlaces, fetchConfig);
 const data = await response.json();

 if (!response.ok) {
  throw new Error("Failed to update user places");
 }

 return data.message;
}
