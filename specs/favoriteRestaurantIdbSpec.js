import { itActsAsFavoriteRestaurantModel } from "./contract/favorite-restaurant-spec";
import restaurantFavoriteIdb from "../src/scripts/data/restaurant-favorite-idb";

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await restaurantFavoriteIdb.getAllRestaurant()).forEach(async (restaurant) => {
            await restaurantFavoriteIdb.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsFavoriteRestaurantModel(restaurantFavoriteIdb);
});