import restaurantFavoriteIdb from '../../data/restaurant-favorite-idb';
import FavoriteRestaurantSearchPresenter from './saved-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from './saved-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './saved-restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Save = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: restaurantFavoriteIdb });
        new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: restaurantFavoriteIdb });
    },
};
export default Save;
