import { Article } from "./Article.js";
import { NewArticleInput } from "./NewArticleInput.js";

export class AppToFetchArticles {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
    this.appWrapper = document.querySelector("#app");
    this.fetchedArticlesArray = [];
    this.createNewArticleInput();
    this.fetchDataAndCreateArticles();
  }
  fetchDataAndCreateArticles = async () => {
    const fetchedData = await fetch(this.serverAddress);
    if (fetchedData.status === 200) {
      this.fetchedArticlesArray = await fetchedData.json();
      for (const articleData of this.fetchedArticlesArray) {
        const article = new Article(articleData, this);
      }
    } else {
      this.appWrapper.innerText = "Server error.";
    }
  };
  refresh() {
    this.appWrapper.innerText = "";
    this.fetchDataAndCreateArticles();
  }
  createNewArticleInput() {
    this.newArticleInput = new NewArticleInput(this);
  }
}
