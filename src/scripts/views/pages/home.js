import restaurantSource from '../../data/restaurant-source';
import { createRestaurantHomeTemplate } from '../templates/template-halaman';

const Home = {
    async render() {
        return `
    <div class = "label">
    <h1 class="latest__label">List Restaurant</h1>
    <div id="posts" class="posts">
    </div>
    </div>
    `;
    },

    async afterRender() {
        const restaurants = await restaurantSource.homeRestaurant();
        const restaurantPost = document.querySelector('#posts');
        restaurants.forEach((restaurant) => {
            restaurantPost.innerHTML += createRestaurantHomeTemplate(restaurant);
        });
    },
};

export default Home;
