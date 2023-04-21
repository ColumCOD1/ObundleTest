# OBundle BigCommerce Test Project
## Instructions

### Setup
----------
Sign up for a BigCommerce trial store, this will be valid for 15 days and will be needed to complete the test
Install Stencil CLI for local development, you will be using the default Cornerstone Theme that comes standard with new BigCommerce stores

* Refer to the BigCommerce developer documentation for any questions you might have. It will contain all the info needed to complete the tasks below

### Task
----------
Create a product called Special Item which will be assigned to a new category called Special Items. Be sure to add at least 2 images during the product creation

The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on.
Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart. Notify the user that the product has been added.
If the cart has an item in it - show a button next to the Add All To Cart button which says Remove All Items. When clicked it should clear the cart and notify the user.
Both buttons should utilize the Storefront API for completion.

### Bonus
----------
If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone, etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

### Submission
--------------------
Create a GitHub repo for your codebase . In the Readme file remove the current data and add your own which describes a brief overview of your test.
Be sure you include the Preview Code for the Bigcommerce Store, along with its URL, so we can view it. Then reply to this email with the Github repo link.


# Project Overview
--------------------
I created a trial BigCommerce store called: Continental.
* . Next, I created a product called **Special Item** which I asigned to a category I created called **Special Items**. I added 4 images during the product creation. I deleted all other demo products in each default categories that come with the Standard Cornerstone theme. Only the **Special Item** product I created is found in the **Special Items** category. Only the Storefront APIs were used as required.

## Store Access
- Preview Code: m4tfachj1d
- Store Url: https://continental.mybigcommerce.com/

## Set Up
--------------------
I downloaded and installed Stencil CLI for local Development and created an API Account on my Store Dashboard. Though I have no previous experience using BigCommerce I made an intense effort on being able to navigate the dashboard and UI to be able to download the Cornerstone template files to be able to work on the assignment. 

## Part 1
--------------------
Creating a feature that will show the product's second image when it is hovered on.

1. Result
  - Go to **Special Items Category**.
  - Hover over the product to see the effect.

2. Steps
  - Generally, Cornerstone theme template files are located in `templates/pages`. Each of these files have their corresponding JavaScript `.js` files in `assets/js/theme`. These latter contains event handlers and logic for managing page specific element and actions.
  
  - Therefore, since the hover feature was to be implemented on the category page **Special Items**, I located the file `templates/pages/category.html` which led me down to `templates/components/common/responsive-img.html`. I then located the corresponding JavaScript file that is `assets/js/theme/category.js`.
  - For this, I needed to know some Handlebars helpers like `getImageSrcset` to get the product's second image from the CDN and create event handlers to make the switch of the image on hover. Therefore I added the following logics in:

  -- `templates/components/common/responsive-img.html` (Line 40)
  ```
    <img
      data-src="{{getImageSrcset image use_default_sizes=true}}"
      data-hoverimage='{{getImageSrcset images.[1] img size (cdn default) use_default_sizes=true}}'
    />
  ```

  -- `assets/js/theme/category.js`(Line 168-171)
  ```
    $(".card-figure").hover(
      this.onShowProductSecondImage.bind(this),
      this.onRemoveProductSecondImage.bind(this)
    );
  ```

## Part 2
--------------------
Adding a button at the top of the category page labeled **Add All To Cart**. When clicked, the product will be added to the cart then notify the user that the product has been added.

1. Result
  - Go to **Special Items Category**.
  - Click the button **Add All To Cart** at the top of the category.

2. Steps
  - I located the corresponding category file in `templates/pages` and added the logic in:

  -- `templates/pages/category.html` (Line 49)
  ```
    {{#if category.name "===" "Special Items"}}
  ```
  **NOTE**: Each button **Add All To Cart** is to add products from its related category to the cart. However, here in our case there is only one product in the category **Special Items** and no products in other default categories. So, here I checked to make sure that the button only displays if the user is on **Special Items Catagery Page**. This is handy for this case only. Alternatively, should we have products in each of the other categories, the right way to inplement this is to use the Sotrefront's API to check if the current category page has products in this category. If there is at least one product we display or enable the button to add items to the cart. 

  -- `templates/pages/category.html` (Line 50-55)
  ```
    <div class="add-all-to-cart">
      <div class="d-flex">
        <input type="button" class="button button--primary" id="addAllToCart" value="Add All To Cart"/>
      </div>
    </div>
  ```

  --  `templates/pages/category.html` (Line 22-32)`
  ```
    <div class="cart-notification">
      <div class="add-notification">
        <i class="fas fa-check-circle"></i>
        Items were successfully added to the cart!
      </div>
    </div>
    <div class="clear-both"></div>
  ```

  -- `assets/js/theme/category.js` (Line 166)
  ```
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
  ```


## Feature 3
--------------------
If the cart has an item in it - show a button next to the **Add All To Cart** button which says **Remove All Items**. When clicked it should clear the cart and notify the user.


1. Steps:

  - Still in the file `templates/pages`, I included:

  -- `templates/pages/category.html` (Line 50-53)
  ```
    <input type="button" class="button button--danger" id="removeAllItems" value="Remove All Items"/>
  ```

  --- `templates/pages/category.html` (Line 27-30)
  ```
  <div class="remove-notification">
      <i class="fas fa-check-circle"></i>
      Items were successfully removed from the cart!
    </div>
  ```

  -- `assets/js/theme/category.js` (Line 165 & 167)
  ```
  this.onCheckCart();
  $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
  ```
  2. Result
  - Go to **Special Items Category**.
  - Click the button **Remove All Items** after clicking on **Add All To Cart** at the top of the category.


## Feature 4 (The Bonus)
--------------------
If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

1. Result
  - At the top of the page, click on *SIGN IN*. You can *REGISTER* first if you don't have an account.
  - Once registered or signed in, a barner or the user's basic details appears at the top the category page.

  **NOTE**: Since this is bar that shows the user's details, I've put it at the very top of the page so that it appears everywhere you browse. If we don't want this to happen we can tehn inplement it on the Category page in `templates/pages/category.html`.

2. Steps
  - I first located the file `templates/pages/home.html` which led me to the partial file `templates/layout/base.html` then to the file `templates/components/common/header.html`. Having the logging user's details which were made avaiable through the Handlebars Customer Object, I added:

  -- `templates/components/common/header.html` (Line 14-39)
  ```
    {{#if customer}}
      <header class="customer-details w-100">
          <div class="customer-about">
              <p class="customer-name">
                  <i class="fas fa-user"></i>
                  {{customer.name}}
              </p>
              <p class="customer-email">
                  <i class="fas fa-envelope-square"></i>
                  {{customer.email}}
              </p>
              <p class="customer-phone">
                  <i class="fas fa-phone"></i>
                  {{customer.phone}}
              </p>
              <p class="customer-messages">
                  <i class="fas fa-envelope"></i>
                  {{#if customer.num_new_messages}}
                      {{customer.num_new_messages}}
                  {{else}}
                      <span>0</span>
                  {{/if}}
              </p>
          </div>
      </header>
    {{/if}}
  ```
  
## CSS Styles
I created a sass file named **custom.scss** in **assets/scss** then added all the css rules needed for these tasks. This file was then imported in **assets/scss/theme.scss** to make it availabe for the entire wesbsite.


# Challenges Encountered
- Initicially I had issues with using the right template version from either Github Cornerstone repo or directly from BigCommerce. Later on I encountered issues with being able to run my build and uploading it to the BigCommerce trial.

# Documentation References
- https://www.youtube.com/watch?v=Mvl2LpVSL0I Kal Wiggins was an amazing help with navigating certain challenges with the installation of Stencil CLI and to be able to see my local working environment.
# Improvements
If I were given more time I would have attempted to make an entire React.JS version of the store with the requested features of the assignment. This was my first time navigating BigCommerce and it was an excellent oppurtunity for me to gain some experience and insight on what kind of assignments I'd be building in an active e-commerce workplace including gaining some experience with SCSS logic.# ObundleTest
