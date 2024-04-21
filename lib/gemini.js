import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "@env"
import constant from "./constants";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: constant.visionModel });

export default model;

