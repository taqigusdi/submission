import restaurantFavoriteIdb from "../src/scripts/data/restaurant-favorite-idb";
import FavoriteRestaurantSearchView from "../src/scripts/views/pages/saved-restaurants/favorite-restaurant-search-view";
import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/saved-restaurants/favorite-restaurant-show-presenter";

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {

        it('should ask for the favorite restaurant', () => {
            const favoriteRestaurant = spyOnAllFunctions(restaurantFavoriteIdb);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });

            expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-not__found').length).toEqual(1);

                done();
            });

            const favoriteRestaurant = spyOnAllFunctions(restaurantFavoriteIdb);
            favoriteRestaurant.getAllRestaurant.and.returnValues([]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
        });
    });

    describe('When favorite restaurant exist', () => {

        it('should show the restaurants', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.post-item').length).toEqual(2);
                done();
            });

            const favoriteRestaurant = spyOnAllFunctions(restaurantFavoriteIdb);
            favoriteRestaurant.getAllRestaurant.and.returnValues([
                {
                    id: 11,
                    title: 'A',
                    vote_average: 3,
                    overview: 'Sebuah restaurant A',
                },
                {
                    id: 22,
                    title: 'B',
                    vote_average: 4,
                    overview: 'Sebuah restaurant B',
                },
            ]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
        });
    });
});