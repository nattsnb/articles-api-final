export class NewArticleInput {
  constructor(app) {
    this.app = app;
    this.newArticleForm = null;
    this.titleInput = null;
    this.contentInput = null;
    this.errorMessage = null;
    this.createNewArticleForm();
    this.initializeNewArticleForm();
  }
  createNewArticleForm() {
    this.newArticleForm = document.createElement("form");
    this.titleInput = document.createElement("input");
    this.contentInput = document.createElement("input");
    const sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    this.errorMessage = document.createElement("p");
    this.newArticleForm.append(this.titleInput);
    this.newArticleForm.append(this.contentInput);
    this.newArticleForm.append(sendButton);
    this.newArticleForm.append(this.errorMessage);
    console.log(this.newArticleForm);
    this.app.appWrapper.append(this.newArticleForm);
  }
  initializeNewArticleForm() {
    this.newArticleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.postNewArticle();
    });
  }
  postNewArticle = async () => {
    const dataToSend = {
      title: this.titleInput.value,
      content: this.contentInput.value,
    };
    const postResponse = await fetch("http://localhost:3000/articles/", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (postResponse.status === 400) {
      this.errorMessage.innerText = "Error, provide data.";
    } else if (postResponse.status === 409) {
      this.errorMessage.innerText =
        "Error, article with this title already exists.";
    } else if (postResponse.status === 404) {
      this.errorMessage.innerText = "Error, server doesn't exist.";
    } else if (postResponse.status === 201) {
      this.app.refresh();
      this.errorMessage = "Article posted.";
    }
  };
}
