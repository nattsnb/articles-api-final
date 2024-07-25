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
    this.editTitleInput = null;
    this.editContentInput = null;
    this.errorMessageEdit = null;
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
    this.app.articlesWrapper.append(this.articleContainer);
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
      this.app.refreshArticles();
    } else {
      this.app.articlesWrapper.innerText = "Server error.";
    }
  };

  initializeEditButton = () => {
    this.editButton.addEventListener("click", this.replaceArticleWithEditForm);
  };

  replaceArticleWithEditForm = () => {
    this.editForm = document.createElement("form");
    this.editForm.setAttribute("id", "edit-form");
    this.editTitleInput = document.createElement("input");
    this.editTitleInput.placeholder = "Title";
    this.editTitleInput.value = this.articleData.title;
    this.editContentInput = document.createElement("input");
    this.editContentInput.placeholder = "Content";
    this.editContentInput.value = this.articleData.content;
    const sendEditedArticleButton = document.createElement("button");
    sendEditedArticleButton.innerText = "Save edit";
    this.errorMessageEdit = document.createElement("h4");
    this.editForm.append(this.editTitleInput);
    this.editForm.append(this.editContentInput);
    this.editForm.append(sendEditedArticleButton);
    this.editForm.append(this.errorMessageEdit);
    this.articleContainer.replaceWith(this.editForm);
    this.initializeSavingEditedArticle(this.editForm);
  };

  initializeSavingEditedArticle() {
    this.editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.postEditedArticle();
    });
  }

  postEditedArticle = async () => {
    const dataToSend = {
      id: this.articleData.id,
      title: this.editTitleInput.value,
      content: this.editContentInput.value,
    };
    const editResponse = await fetch(
      `http://localhost:3000/articles/${this.articleData.id}`,
      {
        method: "PUT",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (editResponse.status === 400) {
      this.errorMessageEdit.innerText = "Error, provide data.";
    } else if (editResponse.status === 404) {
      this.errorMessageEdit.innerText = "Server error.";
    } else if (editResponse.status === 409) {
      this.errorMessageEdit.innerText =
          "Error, article with this title already exists.";
    }  else if (editResponse.status === 200) {
      this.app.refreshArticles();
    }
  };
}
