import restaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetail } from '../templates/template-halaman';
import saveButtonInitiator from '../../utils/save-button-initiator';
import restaurantFavoriteIdb from '../../data/restaurant-favorite-idb';

const Detail = {
    async render() {
        return `
<div id="post-detail" class="post-detail">
</div>
<div id="saveButtonContainer"></div>
`;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurants = await restaurantSource.detailRestaurant(url.id);
        const restaurantPost = document.querySelector('#post-detail');
        restaurantPost.innerHTML += createRestaurantDetail(restaurants);

        saveButtonInitiator.init({
            saveButtonContainer: document.querySelector('#saveButtonContainer'),
            favoriteRestaurant: restaurantFavoriteIdb,
            restaurant: {
                id: restaurants.id,
                pictureId: restaurants.pictureId,
                city: restaurants.city,
                name: restaurants.name,
                description: restaurants.description,
                rating: restaurants.rating,
            },
        });
    },
};
export default Detail;
