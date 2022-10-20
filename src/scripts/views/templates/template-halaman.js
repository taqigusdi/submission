/* eslint-disable linebreak-style */
import CONFIG from '../../globals/config';

const createRestaurantHomeTemplate = (restaurants) => `
    <article class="post-item">
    <img class="post-item__thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name || '-'}">
    <div class="post-item__content">
        <h2 class="post-item__city">City: ${restaurants.city || '-'}<h2>
        <h1 class="post-item__title"><a href="/#/detail/${restaurants.id}">${restaurants.name || '-'}</a></h1>
        <p class="post-item__description">${restaurants.description || '-'}</p>
        <h2 class="post-item__rating">Rating: ${restaurants.rating || '-'}</h2>
    </div>
    </article>
    `;

const createRestaurantDetail = (restaurant) => `
<h1 class="post-detail__title">${restaurant.name}</h1>
    <img class="post-detail__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="post-detail__info">
      <h3>Information</h3>

      <h4>Restaurant Address</h4>
      <p>${restaurant.address}, ${restaurant.city} City, Indonesia</p>
      <h4>Restaurant Description</h4>
      <p>${restaurant.description}</p><br>

      <h3>Menus</h3>
      <h4>Foods</h4>
      <p>${restaurant.menus.foods.map((food) => food.name).join(' , ')}</p>
      <h4>Drinks</h4>
      <p>${restaurant.menus.drinks.map((drink) => drink.name).join(' , ')}</p><br>

      <h3>Rating and Reviews</h3>
      <h4>Rating</h4>
      <p>⭐️ ${restaurant.rating}</p>
      <h4 class="customer-reviews">Customer Reviews</h4>
      <table>
      <tr>
      <td><li>${restaurant.customerReviews.map((customer) => customer.name).join(' <li> ')}</li></td>
      <td>${restaurant.customerReviews.map((customer) => customer.review).join(' <br> ')}</td>
      <td>${restaurant.customerReviews.map((customer) => customer.date).join(' <br> ')}</td>
      </tr>
      <table>
    </div>
    `;

const createRestaurantSaveButtonTemplate = () => `
  <button aria-label="restaurant saved" id="saveButton" class="save">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createRestaurantSavedButtonTemplate = () => `
  <button aria-label="restaurant unsaved" id="saveButton" class="save">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantHomeTemplate,
  createRestaurantDetail,
  createRestaurantSaveButtonTemplate,
  createRestaurantSavedButtonTemplate,
};
