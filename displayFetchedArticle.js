export function  displayFetchedArticle(article) {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container");
    const titleElement = document.createElement("h2");
    const id = article.id;
    titleElement.innerText = article.title;
    const contentElement = document.createElement("p");
    contentElement.innerText = article.content;
    const editButton = document.createElement("button");
    editButton.innerText = "Edit article";
    const deleteEditedArticleButton = document.createElement("button");
    deleteEditedArticleButton.innerText = "Delete article";
    articleContainer.append(titleElement);
    articleContainer.append(contentElement);
    articleContainer.append(editButton);
    articleContainer.append(deleteEditedArticleButton);
    return articleContainer
}