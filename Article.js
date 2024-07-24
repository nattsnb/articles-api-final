export class Article {
  constructor(articleData) {
    this.articleData = articleData;
    this.articleContainer = null;
    this.createNewArticle();
  }
  createNewArticle() {
    this.articleContainer = document.createElement("div");
    this.articleContainer.classList.add("article-container");
    const titleElement = document.createElement("h2");
    const id = this.articleData.id;
    titleElement.innerText = this.articleData.title;
    const contentElement = document.createElement("p");
    contentElement.innerText = this.articleData.content;
    const editButton = document.createElement("button");
    editButton.innerText = "Edit article";
    const deleteEditedArticleButton = document.createElement("button");
    deleteEditedArticleButton.innerText = "Delete article";
    this.articleContainer.append(titleElement);
    this.articleContainer.append(contentElement);
    this.articleContainer.append(editButton);
    this.articleContainer.append(deleteEditedArticleButton);
    return this.articleContainer;
  }
}
