import {displayFetchedArticle} from "./displayFetchedArticle.js";

export class AppToFetchArticles {
    constructor(serverAddress, appWrapper) {
        this.serverAddress = serverAddress
        this.appWrapper = appWrapper
        this.fetchedArticlesArray = []
        this.fetchArticles()
    }
    async fetchArticles  (appWrapper) {
       const fetchedData = await fetch(this.serverAddress)
        if(fetchedData.status === 200){
            this.fetchedArticlesArray = await fetchedData.json()
            this.fetchedArticlesArray.forEach(function(article){
                displayFetchedArticle(article, appWrapper);
            })
        } else {this.appWrapper.innerText = "Server error."}
    }
}