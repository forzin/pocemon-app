import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon/"; 

export const getPocemons = async () => {
  try {
      const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dropdown items:", error);
    return [];
  }
};

export const getCourentSprite = async (spriteName: string) => {
  try {
      const response = await axios.get(`${API_URL}${spriteName}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dropdown items:", error);
    return [];
  }
};