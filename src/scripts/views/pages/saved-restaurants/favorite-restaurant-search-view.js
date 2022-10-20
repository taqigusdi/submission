import { createRestaurantHomeTemplate } from '../../templates/template-halaman';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
    <div class = "label">
    <div class="container">
          <form class="form">
          <input id="query" type="text">
          </form>
          </div>
          <h1 class="latest__label">Favorite Restaurant</h1>
          <div id="posts" class="posts">
          </div>
        </div>
        </div>
      `;
  }


  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(movies) {
    this.showFavoriteMovies(movies);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;

    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) =>
        carry.concat(createRestaurantHomeTemplate(restaurant)),
        '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('posts').innerHTML = html;

    document.getElementById('posts').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-not__found">No Favorite Restaurant</div>'
  }
}


export default FavoriteRestaurantSearchView;