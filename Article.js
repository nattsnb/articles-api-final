export class Article {
  constructor(articleData) {
    this.articleData = articleData;
    this.articleContainer = null;
    this.editButton = null;
    this.deleteButton = null
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
    this.editButton = document.createElement("button");
    this.editButton.innerText = "Edit article";
    this.deleteButton = document.createElement("button");
    this.deleteButton.innerText = "Delete article";
    this.articleContainer.append(titleElement);
    this.articleContainer.append(contentElement);
    this.articleContainer.append(this.editButton);
    this.articleContainer.append(this.deleteButton);
    return this.articleContainer;
  }
}
