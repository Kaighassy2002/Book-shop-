import { commonAPI } from "./commonApi"
import { SERVER_URL } from "./server_url"

export const uploadBooks = async (books) => {
  return await commonAPI("POST", `${SERVER_URL}/allBooks`, books)
}

export const getAllBookAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/allBooks`, {})
}

export const removeBookAPI = async (bookId) => {
  return await commonAPI("DELETE", `${SERVER_URL}/allBooks/${bookId}`, {})
}

export const updateBookAPI = async (bookId, bookData) => {
  return await commonAPI("PUT", `${SERVER_URL}/allBooks/${bookId}`, bookData)
}
