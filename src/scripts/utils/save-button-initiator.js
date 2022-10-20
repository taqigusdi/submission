/* eslint-disable no-underscore-dangle */
import { createRestaurantSaveButtonTemplate, createRestaurantSavedButtonTemplate } from '../views/templates/template-halaman';

const saveButtonInitiator = {
    async init({ saveButtonContainer, favoriteRestaurant, restaurant }) {
        this._saveButtonContainer = saveButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurant = favoriteRestaurant;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._rendersaved();
        } else {
            this._rendersave();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurant.getRestaurant(id);
        return !!restaurant;
    },

    _rendersave() {
        this._saveButtonContainer.innerHTML = createRestaurantSaveButtonTemplate();

        const saveButton = document.querySelector('#saveButton');
        saveButton.addEventListener('click', async () => {
            await this._favoriteRestaurant.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _rendersaved() {
        this._saveButtonContainer.innerHTML = createRestaurantSavedButtonTemplate();

        const saveButton = document.querySelector('#saveButton');
        saveButton.addEventListener('click', async () => {
            await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default saveButtonInitiator;
