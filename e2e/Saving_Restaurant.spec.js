const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Saving Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/save');
});

Scenario('showing empty liked movies', ({ I }) => {
    I.seeElement('#query');
    I.see('No Favorite Restaurant', '.restaurant-not__found');
});

Scenario('save a restaurant', async ({ I }) => {
    I.see('No Favorite Restaurant', '.restaurant-not__found');

    I.amOnPage('/');

    I.waitForElement('.post-item', 10);

    I.seeElement('.post-item__title');

    const firstRestaurant = locate('.post-item__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.waitForElement('html', 10);
    I.click(firstRestaurant);

    I.waitForElement('#saveButton', 10);
    I.seeElement('#saveButton');
    I.click('#saveButton');

    I.amOnPage('/#/save');
    I.seeElement('.post-item');
    const savedRestaurantTitle = await I.grabTextFrom('.post-item__title');

    assert.strictEqual(firstRestaurantTitle, savedRestaurantTitle);
});

Scenario('unsave a restaurant', async ({ I }) => {
    I.see('No Favorite Restaurant', '.restaurant-not__found');

    I.amOnPage('/');

    I.waitForElement('.post-item', 10);

    I.seeElement('.post-item__title');

    const firstRestaurant = locate('.post-item__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.waitForElement('html', 10);
    I.click(firstRestaurant);

    I.waitForElement('#saveButton', 10);
    I.seeElement('#saveButton');
    I.click('#saveButton');

    I.amOnPage('/#/save');
    I.seeElement('.post-item');
    const savedRestaurantTitle = await I.grabTextFrom('.post-item__title');

    I.click('.post-item__title a');
    I.waitForElement('#saveButton', 10);
    I.seeElement('#saveButton');
    I.click('#saveButton');

    I.amOnPage('/#/save');
    I.see('No Favorite Restaurant', '.restaurant-not__found');

    assert.strictEqual(firstRestaurantTitle, savedRestaurantTitle);
});

Scenario('searching restaurant', async ({ I }) => {
    I.see('No Favorite Restaurant', '.restaurant-not__found');

    I.amOnPage('/');

    I.waitForElement('.post-item', 10);

    I.seeElement('.post-item__title a');

    const titles = [];

    for (let i = 1; i <= 3; i++) {
        I.waitForElement('.post-item__title a', 10);
        I.click(locate('.post-item__title a').at(i));
        I.waitForElement('#saveButton', 10);
        I.seeElement('#saveButton');
        I.click('#saveButton');
        titles.push(await I.grabTextFrom('.post-detail__title'));
        I.amOnPage('/');
    }

    I.amOnPage('/#/save');
    I.seeElement('#query');

    const searchQuery = titles[1].substring(1, 3);
    const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const visibleSavedRestaurant = await I.grabNumberOfVisibleElements('.post-item');
    assert.strictEqual(matchingRestaurant.length, visibleSavedRestaurant);

    matchingRestaurant.forEach(async (title, index) => {
        const visibleTitle = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
        assert.strictEqual(title, visibleTitle);
    });
});