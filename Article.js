export class Article {
  constructor(articleData, app) {
    this.articleData = articleData;
    this.app = app;
    this.articleContainer = null;
    this.editButton = null;
    this.deleteButton = null;
    this.createNewArticle();
    this.initializeDeleteButton();
    this.titleElement = null;
    this.contentElement = null;
    this.initializeEditButton();
  }
  createNewArticle() {
    this.articleContainer = document.createElement("div");
    this.articleContainer.classList.add("article-container");
    this.titleElement = document.createElement("h2");
    this.titleElement.innerText = this.articleData.title;
    this.contentElement = document.createElement("p");
    this.contentElement.innerText = this.articleData.content;
    this.editButton = document.createElement("button");
    this.editButton.innerText = "Edit article";
    this.deleteButton = document.createElement("button");
    this.deleteButton.innerText = "Delete article";
    this.articleContainer.append(this.titleElement);
    this.articleContainer.append(this.contentElement);
    this.articleContainer.append(this.editButton);
    this.articleContainer.append(this.deleteButton);
    this.app.appWrapper.append(this.articleContainer);
  }
  initializeDeleteButton() {
    this.deleteButton.addEventListener(
      "click",
      this.askServerToDeleteArticleAndRefresh,
    );
  }
  askServerToDeleteArticleAndRefresh = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3000/articles/${this.articleData.id}`,
      {
        method: "DELETE",
      },
    );
    if (deleteResponse.status === 200) {
      this.app.refresh();
    } else {
      this.app.appWrapper.innerText = "Server error.";
    }
  };

  initializeEditButton = () => {
    this.editButton.addEventListener("click", this.replaceArticleWithEditForm);
  };

  replaceArticleWithEditForm = () => {
    const editForm = document.createElement("form");
    const editTitleInput = document.createElement("input");
    editTitleInput.value = this.articleData.title;
    const editContentInput = document.createElement("input");
    editContentInput.value = this.articleData.content;
    const sendEditedArticleButton = document.createElement("button");
    sendEditedArticleButton.innerText = "Save edit";
    const errorMessageEdit = document.createElement("p");
    editForm.append(editTitleInput);
    editForm.append(editContentInput);
    editForm.append(sendEditedArticleButton);
    editForm.append(errorMessageEdit);
    this.articleContainer.replaceWith(editForm);
  };
}
