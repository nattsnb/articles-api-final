import {displayFetchedArticle} from "./displayFetchedArticle.js";

export class AppToFetchArticles {
    constructor(serverAddress, appWrapper) {
        this.serverAddress = serverAddress
        this.fetchedArticlesArray = []
        this.fetchArticlesAndDisplay(appWrapper)
    }
    fetchArticlesAndDisplay = async (appWrapper) => {
       const fetchedData = await fetch(this.serverAddress)
        if(fetchedData.status === 200){
            this.fetchedArticlesArray = await fetchedData.json()
            this.fetchedArticlesArray.forEach(function(article){
                const articleInContainer = displayFetchedArticle(article);
                console.log(appWrapper)
                appWrapper.append(articleInContainer)
            })
        } else {
            appWrapper.innerText = "Server error."}
    }
}