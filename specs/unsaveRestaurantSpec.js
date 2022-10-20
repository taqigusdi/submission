import * as testFactories from './helpers/testFactories';
import restaurantFavoriteIdb from "../src/scripts/data/restaurant-favorite-idb";

describe('Unsave a restaurant', () => {
  const addSaveButtonContainer = () => {
    document.body.innerHTML = '<div id="post-detail" class="post-detail"></div>';
  };

  beforeEach(async () => {
    addSaveButtonContainer();
    await restaurantFavoriteIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await restaurantFavoriteIdb.deleteRestaurant(1);
  });

  it('should display unsave widget when the restaurant has been saved', async () => {
    await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="restaurant unsaved"]'))
      .toBeTruthy();
  });

  it('should not display save widget when the restaurant has been saved', async () => {
    await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="restaurant saved"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="restaurant unsaved"]').dispatchEvent(new Event('click'));
    expect(await restaurantFavoriteIdb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unsaved restaurant is not in the list', async () => {
    await testFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    await restaurantFavoriteIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="restaurant unsaved"]').dispatchEvent(new Event('click'));
    expect(await restaurantFavoriteIdb.getAllRestaurant()).toEqual([]);
  });
});