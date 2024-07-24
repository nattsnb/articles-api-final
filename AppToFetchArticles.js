import { Article } from "./Article.js";

export class AppToFetchArticles {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
    this.appWrapper = document.querySelector("#app");
    this.fetchedArticlesArray = [];
    this.fetchDataAndCreateArticles();
  }
  fetchDataAndCreateArticles = async () => {
    const fetchedData = await fetch(this.serverAddress);
    if (fetchedData.status === 200) {
      this.fetchedArticlesArray = await fetchedData.json();
      this.fetchedArticlesArray.forEach(function (articleData) {
        const article = new Article(articleData);
      });
    } else {
      this.appWrapper.innerText = "Server error.";
    }
  };
}
