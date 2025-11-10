import axios from "axios";

const BASE_URL = "https://the-book-haven-tau.vercel.app";

export const getAllBooks = async () => {
  return await axios.get(`${BASE_URL}/books`);
};

export const getBookById = async (id) => {
  return await axios.get(`${BASE_URL}/book/${id}`);
};

export const addBook = async (bookData) => {
  return await axios.post(`${BASE_URL}/add-book`, bookData);
};

export const updateBook = async (id, bookData) => {
  return await axios.put(`${BASE_URL}/update-book/${id}`, bookData);
};

export const deleteBook = async (id) => {
  return await axios.delete(`${BASE_URL}/delete-book/${id}`);
};
