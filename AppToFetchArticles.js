import {displayFetchedArticle} from "./displayFetchedArticles.js";

export class AppToFetchArticles{
    constructor(serverAddress, appWrapper) {
        this.serverAddress = serverAddress
        this.appWrapper = appWrapper
        this.fetchArticles()
        this.fetchedArticlesArray = []
    }
    async fetchArticles  () {
       const fetchedData = await fetch(this.serverAddress)
        if(fetchedData.status === 200){
            this.fetchedArticlesArray = await fetchedData.json()
            console.log(this.fetchedArticlesArray)
        } else {this.appWrapper.innerText = "Server error."}


    }
}