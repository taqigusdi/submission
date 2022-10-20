class FavoriteRestaurantShowPresenter {
    constructor({ view, favoriteRestaurant }) {
        this._view = view;
        this._favoriteRestaurant = favoriteRestaurant;

        this._showFavoriteRestaurants();
    }

    async _showFavoriteRestaurants() {
        const restaurants = await this._favoriteRestaurant.getAllRestaurant();
        this._displayRestaurant(restaurants);
    }

    _displayRestaurant(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }
}

export default FavoriteRestaurantShowPresenter;
