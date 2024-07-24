import "./style.css";
import { AppToFetchArticles } from "./AppToFetchArticles.js";

const serverAddress = "http://localhost:3000/articles/";
const appWrapper = document.querySelector("#app");

new AppToFetchArticles(serverAddress, appWrapper);
