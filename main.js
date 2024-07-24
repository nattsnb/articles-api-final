import "./style.css";
import { AppToFetchArticles } from "./AppToFetchArticles.js";

const serverAddress = "http://localhost:3000/articles/";

new AppToFetchArticles(serverAddress);
