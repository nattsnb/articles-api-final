import {displayFetchedArticle} from "./displayFetchedArticles.js";

export class AppToFetchArticles{
    constructor(serverAddress, appWrapper) {
        this.serverAddress = serverAddress
        this.appWrapper = appWrapper
    }
    fetchArticles() {
        fetch(this.serverAddress)
            .then((response) => response.json())
            .then((data) => {
                data.forEach(function (article) {
                    displayFetchedArticle(article, this.appWrapper);
                });
            });
    }
}