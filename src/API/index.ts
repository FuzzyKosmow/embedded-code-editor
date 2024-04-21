import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constant";
const languages = Object.entries(LANGUAGE_VERSIONS) as [string, string][];
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston/",
});

export const ExecuteCode = async (language: string, code: string) => {
  const response = await API.post("/execute", {
    language: language,
    version: languages.find(([lang]) => lang === language)![1],
    files: [
      {
        content: code,
      },
    ],
  });
  return response.data;
};
