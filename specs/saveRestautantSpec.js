import restaurantFavoriteIdb from '../src/scripts/data/restaurant-favorite-idb';
import * as testFactories from './helpers/testFactories';

describe('Saving A Restaurant', () => {
    const addSaveButtonContainer = () => {
        document.body.innerHTML = '<div id="post-detail" class="post-detail"></div>';
    };

    beforeEach(() => {
        addSaveButtonContainer();
    });

    it('should show the save button when the restaurant has not been saved before', async () => {
        await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="restaurant saved"]'))
            .toBeTruthy();
    });

    it('should not show the unsave button when the restaurant has not been saved before', async () => {
        await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="restaurant unsaved"]'))
            .toBeFalsy();
    });

    it('should be able to save the restaurant', async () => {
        await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('#saveButton').dispatchEvent(new Event('click'));

        const restaurant = await restaurantFavoriteIdb.getRestaurant(1);
        expect(restaurant).toEqual({ id: 1 });

        restaurantFavoriteIdb.deleteRestaurant(1);
    });

    it('should not add a restaurant again when its already saved', async () => {
        await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

        await restaurantFavoriteIdb.putRestaurant({ id: 1 });

        document.querySelector('#saveButton').dispatchEvent(new Event('click'));

        expect(await restaurantFavoriteIdb.getAllRestaurant()).toEqual([{ id: 1 }]);
        restaurantFavoriteIdb.deleteRestaurant(1);
    });

    it('should not add a restaurant when it has no id', async () => {
        await testFactories.createSaveButtonPresenterWithRestaurant({});

        document.querySelector('#saveButton').dispatchEvent(new Event('click'));
        expect(await restaurantFavoriteIdb.getAllRestaurant()).toEqual([]);
    });
});