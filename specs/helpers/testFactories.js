/* eslint-disable import/prefer-default-export */
import saveButtonInitiator from '../../src/scripts/utils/save-button-initiator';
import restaurantFavoriteIdb from '../../src/scripts/data/restaurant-favorite-idb';

const createSaveButtonPresenterWithRestaurant = async (restaurant) => {
    await saveButtonInitiator.init({
        saveButtonContainer: document.querySelector('#post-detail'),
        favoriteRestaurant: restaurantFavoriteIdb,
        restaurant,
    });
};

export { createSaveButtonPresenterWithRestaurant };
