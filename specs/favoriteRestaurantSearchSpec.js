/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/saved-restaurants/favorite-restaurant-search-presenter';
import restaurantFavoriteIdb from '../src/scripts/data/restaurant-favorite-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/saved-restaurants/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
    let presenter;
    let favoriteRestaurant;
    let view;

    const searchRestaurant = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurant = spyOnAllFunctions(restaurantFavoriteIdb);
        presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurant,
            view,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurant('restaurant a');

            expect(presenter.latestQuery)
                .toEqual('restaurant a');
        });

        it('should ask the model to search for saved restaurant', () => {
            searchRestaurant('restaurant a');

            expect(favoriteRestaurant.searchRestaurant)
                .toHaveBeenCalledWith('restaurant a');
        });

        it('should show the restaurant found by Favorite Restaurant', (done) => {
            document.getElementById('posts')
                .addEventListener('restaurants:updated', () => {
                    const restaurantNames = document.querySelectorAll('.post-item__title');
                    expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
                    expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
                    expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');

                    done();
                });

            favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([
                { id: 111, name: 'restaurant abc' },
                { id: 222, name: 'ada juga restaurant abcde' },
                { id: 333, name: 'ini juga boleh restaurant a' },
            ]);

            searchRestaurant('restaurant a');
        });

        it('should show the name of the restaurants found by Favorite Restaurant', (done) => {
            document.getElementById('posts')
                .addEventListener('restaurants:updated', () => {
                    const restaurantNames = document.querySelectorAll('.post-item__title');
                    expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
                    expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
                    expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');

                    done();
                });

            favoriteRestaurant.searchRestaurant.withArgs('restaurant a')
                .and.returnValues([
                    { id: 111, name: 'restaurant abc' },
                    { id: 222, name: 'ada juga restaurant abcde' },
                    { id: 333, name: 'ini juga boleh restaurant a' },
                ]);

            searchRestaurant('restaurant a');
        });

        it('should show - when the restaurant returned does not contain a title', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                const restaurantTitles = document.querySelectorAll('.post-item__title');
                expect(restaurantTitles.item(0).textContent).toEqual('-');

                done();
            });

            favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([
                { id: 444 },
            ]);

            searchRestaurant('restaurant a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurant(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurant('    ');

            expect(favoriteRestaurant.getAllRestaurant)
                .toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurant could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('posts')
                .addEventListener('restaurants:updated', () => {
                    expect(document.querySelectorAll('.restaurant-not__found').length).toEqual(1);
                    done();
                });

            favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([]);

            searchRestaurant('restaurant a');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.post-item__li').length).toEqual(0);
                done();
            });

            favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([]);
            searchRestaurant('restaurant a');
        });
    });
});
