import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const idbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    },

});

const restaurantFavoriteIdb = {
    async getRestaurant(id) {
        if (!id) {
            return;
        }
        return (await idbPromise).get(OBJECT_STORE_NAME, id);
    },
    async getAllRestaurant() {
        return (await idbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putRestaurant(restaurants) {
        if (!restaurants.hasOwnProperty('id')) {
            return;
        }

        return (await idbPromise).put(OBJECT_STORE_NAME, restaurants);
    },
    async deleteRestaurant(id) {
        return (await idbPromise).delete(OBJECT_STORE_NAME, id);
    },
    async searchRestaurant(query) {
        return (await this.getAllRestaurant()).filter((restaurants) => {
            const loweredCaseRestaurantTitle = (restaurants.name || '-').toLowerCase();
            const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();

            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
            return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
        });
    },
};

export default restaurantFavoriteIdb;
