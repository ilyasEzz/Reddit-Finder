export default {
  search: function(searchText, sortBy, limit) {
    return fetch(
      `https://www.reddit.com/search.json?q=${searchText}&sort=${sortBy}&limit=${limit}`
    )
      .then(response => response.json())
      .then(obj => obj.data.children.map(child => child.data))
      .catch(error => console.log(error));
  }
};
