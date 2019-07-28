import reddit from "./reddit";

const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search-text");

// Event Listeners
searchForm.addEventListener("submit", e => {
  const searchText = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const limit = document.querySelector('select[name="limit"] ').value;

  if (searchText === "") {
    showAlert("Empty Input Field");
  } else {
    // Search Reddit

    reddit.search(searchText, sortBy, limit).then(result => {
      let output = '<div class="card-columns">';
      let image;
      result.forEach(post => {
    // output the results

        // check if the post has a thumbnail
        if(post.thumbnail === "default" || post.thumbnail === "self"){
            image = "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_1600,c_limit/reddit-alien-red-st.jpg" ;
        } else{
            image = post.thumbnail;
        }

        output += `
        <div class="card mb-5">
        <img src="${image}" class="card-img-top img-fluid" alt="...">
        <div class="text-center">
          <h5 class="card-title my-2">${post.title}</h5>
          <a href="${post.url}" target="_blank" class="btn btn-info  m-2">Read More</a>
        </div>
      </div>
        `;
      })
      output += "</div>"
      document.getElementById("results").innerHTML = output;
    });
  }

  // Clean Input
  searchInput.value = "";

  e.preventDefault();
});

function showAlert(message) {
  // creating the alert
  const div = document.createElement("div");
  div.className = "alert alert-danger";
  div.appendChild(document.createTextNode(message));

  // inserting the div before the form
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);

  setTimeout(() => {
    div.remove();
  }, 2500);
}
