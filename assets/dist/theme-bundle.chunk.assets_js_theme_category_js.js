"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_category_js"],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CART_API = "/api/storefront/carts";
var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = (0,_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$("[data-shop-by-price]").length) return;
    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }
    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };
  _proto.onShowProductSecondImage = function onShowProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-hoverimage");
    card.attr("srcset", image);
  };
  _proto.onRemoveProductSecondImage = function onRemoveProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-src");
    card.attr("srcset", image);
  };
  _proto.createCart = function createCart(url, items) {
    var cartItems = {
      lineItems: items
    };
    var body = JSON.stringify(cartItems);
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    }).then(function (response) {
      return response.json();
    });
  };
  _proto.getCart = function getCart(url) {
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    });
  };
  _proto.deleteCartItems = function deleteCartItems(url, cartId) {
    return fetch(url + "/" + cartId, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response;
    });
  };
  _proto.onAddAllToCart = function onAddAllToCart() {
    var products = [];
    for (var i = 0; i < this.context.categoryProducts.length; i++) {
      products = [].concat(products, [{
        quantity: this.context.categoryProducts[i].qty_in_cart + 1,
        productId: this.context.categoryProducts[i].id
      }]);
    }
    this.createCart(CART_API, products).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "block");
        $(".add-notification").css("display", "block");
        $(".remove-notification").css("display", "none");
        setTimeout(function () {
          $(".add-notification").css("display", "none");
        }, 5000);
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };
  _proto.onRemoveAllItems = function onRemoveAllItems() {
    var _this3 = this;
    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      return _this3.deleteCartItems(CART_API, data[0].id);
    }).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "none");
        $(".add-notification").css("display", "none");
        $(".remove-notification").css("display", "block");
        setTimeout(function () {
          $(".remove-notification").css("display", "none");
        }, 5000);
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };
  _proto.onCheckCart = function onCheckCart() {
    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      if (data.length > 0) {
        $("#removeAllItems").css("display", "block");
      } else {
        $("#removeAllItems").css("display", "none");
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  };
  _proto.onReady = function onReady() {
    var _this4 = this;
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this4.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on("sortBy-submitted", this.onSortBySubmit);
    }
    $("a.reset-btn").on("click", function () {
      return _this4.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.onCheckCart();
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
    $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
    $(".card-figure").hover(this.onShowProductSecondImage.bind(this), this.onRemoveProductSecondImage.bind(this));
    this.ariaNotifyNoProducts();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslationDictionary": () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBRXZGLElBQU1LLFFBQVEsR0FBRyx1QkFBdUI7QUFBQyxJQUVwQkMsUUFBUSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFFBQUEsRUFBQUMsWUFBQTtFQUMzQixTQUFBRCxTQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ25CQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR1IsbUdBQTJCLENBQUNLLE9BQU8sQ0FBQztJQUFDLE9BQUFDLEtBQUE7RUFDbkU7RUFBQyxJQUFBRyxNQUFBLEdBQUFQLFFBQUEsQ0FBQVEsU0FBQTtFQUFBRCxNQUFBLENBRURFLHVCQUF1QixHQUF2QixTQUFBQSx3QkFBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDMURGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1pDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDZixDQUFDLENBQUM7RUFDSixDQUFDO0VBQUFMLE1BQUEsQ0FFRFEsK0JBQStCLEdBQS9CLFNBQUFBLGdDQUFBLEVBQWtDO0lBQUEsSUFBQUMsTUFBQTtJQUNoQyxJQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7SUFFdkMsSUFBSUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUM5Q0YsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNHLEtBQUssRUFBRTtJQUN6QztJQUVBSCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQ2hDTCxN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SixHQUFHLENBQUMsR0FBR0osYUFBYSxDQUFDeEUsQ0FBQyxDQUFDO0lBQzNCLE9BQU9nRixHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhdGVnb3J5LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tIFwiLi9jYXRhbG9nXCI7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gXCIuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzXCI7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tIFwiLi9jb21tb24vZmFjZXRlZC1zZWFyY2hcIjtcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gXCIuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzXCI7XG5cbmNvbnN0IENBUlRfQVBJID0gXCIvYXBpL3N0b3JlZnJvbnQvY2FydHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICBzdXBlcihjb250ZXh0KTtcbiAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICB9XG5cbiAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICBcImFyaWEtbGl2ZVwiOiBhcmlhTGl2ZVN0YXR1c1xuICAgIH0pO1xuICB9XG5cbiAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICBpZiAoISQoXCJbZGF0YS1zaG9wLWJ5LXByaWNlXVwiKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGlmICgkKFwiLm5hdkxpc3QtYWN0aW9uXCIpLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpKSB7XG4gICAgICAkKFwiYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmVcIikuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAkKFwiYS5uYXZMaXN0LWFjdGlvblwiKS5vbihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuICAgICAgICAkKFwic3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZVwiKSxcbiAgICAgICAgXCJzdGF0dXNcIixcbiAgICAgICAgXCJhc3NlcnRpdmVcIlxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBvblNob3dQcm9kdWN0U2Vjb25kSW1hZ2UoZSkge1xuICAgIGNvbnN0IGNhcmQgPSAkKGUuY3VycmVudFRhcmdldCkuZmluZChcIi5jYXJkLWltYWdlXCIpO1xuICAgIGNvbnN0IGltYWdlID0gY2FyZC5hdHRyKFwiZGF0YS1ob3ZlcmltYWdlXCIpO1xuICAgIGNhcmQuYXR0cihcInNyY3NldFwiLCBpbWFnZSk7XG4gIH1cblxuICBvblJlbW92ZVByb2R1Y3RTZWNvbmRJbWFnZShlKSB7XG4gICAgY29uc3QgY2FyZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5maW5kKFwiLmNhcmQtaW1hZ2VcIik7XG4gICAgY29uc3QgaW1hZ2UgPSBjYXJkLmF0dHIoXCJkYXRhLXNyY1wiKTtcbiAgICBjYXJkLmF0dHIoXCJzcmNzZXRcIiwgaW1hZ2UpO1xuICB9XG5cbiAgY3JlYXRlQ2FydCh1cmwsIGl0ZW1zKSB7XG4gICAgY29uc3QgY2FydEl0ZW1zID0ge1xuICAgICAgbGluZUl0ZW1zOiBpdGVtc1xuICAgIH07XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyk7XG5cbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5XG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICB9XG5cbiAgZ2V0Q2FydCh1cmwpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiB9KS50aGVuKFxuICAgICAgcmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZUNhcnRJdGVtcyh1cmwsIGNhcnRJZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt1cmx9LyR7Y2FydElkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSk7XG4gIH1cblxuICBvbkFkZEFsbFRvQ2FydCgpIHtcbiAgICBsZXQgcHJvZHVjdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9kdWN0cyA9IFtcbiAgICAgICAgLi4ucHJvZHVjdHMsXG4gICAgICAgIHtcbiAgICAgICAgICBxdWFudGl0eTogdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNbaV0ucXR5X2luX2NhcnQgKyAxLFxuICAgICAgICAgIHByb2R1Y3RJZDogdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNbaV0uaWRcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVDYXJ0KENBUlRfQVBJLCBwcm9kdWN0cylcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICQoXCIuYWRkLW5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgICAgJChcIi5yZW1vdmUtbm90aWZpY2F0aW9uXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJChcIi5hZGQtbm90aWZpY2F0aW9uXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICB9XG5cbiAgb25SZW1vdmVBbGxJdGVtcygpIHtcbiAgICB0aGlzLmdldENhcnQoXG4gICAgICBgJHtDQVJUX0FQSX0/aW5jbHVkZT1saW5lSXRlbXMuZGlnaXRhbEl0ZW1zLm9wdGlvbnMsbGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9uc2BcbiAgICApXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuZGVsZXRlQ2FydEl0ZW1zKENBUlRfQVBJLCBkYXRhWzBdLmlkKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgJChcIi5hZGQtbm90aWZpY2F0aW9uXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICQoXCIucmVtb3ZlLW5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKFwiLnJlbW92ZS1ub3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cblxuICBvbkNoZWNrQ2FydCgpIHtcbiAgICB0aGlzLmdldENhcnQoXG4gICAgICBgJHtDQVJUX0FQSX0/aW5jbHVkZT1saW5lSXRlbXMuZGlnaXRhbEl0ZW1zLm9wdGlvbnMsbGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9uc2BcbiAgICApXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbihcImNsaWNrXCIsIGUgPT5cbiAgICAgIHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXG4gICAgICAgIFwic3RhdHVzXCIsXG4gICAgICAgIFwicG9saXRlXCJcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XG5cbiAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgIGlmICgkKFwiI2ZhY2V0ZWRTZWFyY2hcIikubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgaG9va3Mub24oXCJzb3J0Qnktc3VibWl0dGVkXCIsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgICQoXCJhLnJlc2V0LWJ0blwiKS5vbihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKFwic3Bhbi5yZXNldC1tZXNzYWdlXCIpLCBcInN0YXR1c1wiLCBcInBvbGl0ZVwiKVxuICAgICk7XG5cbiAgICB0aGlzLm9uQ2hlY2tDYXJ0KCk7XG4gICAgJChcIiNhZGRBbGxUb0NhcnRcIikub24oXCJjbGlja1wiLCB0aGlzLm9uQWRkQWxsVG9DYXJ0LmJpbmQodGhpcykpO1xuICAgICQoXCIjcmVtb3ZlQWxsSXRlbXNcIikub24oXCJjbGlja1wiLCB0aGlzLm9uUmVtb3ZlQWxsSXRlbXMuYmluZCh0aGlzKSk7XG4gICAgJChcIi5jYXJkLWZpZ3VyZVwiKS5ob3ZlcihcbiAgICAgIHRoaXMub25TaG93UHJvZHVjdFNlY29uZEltYWdlLmJpbmQodGhpcyksXG4gICAgICB0aGlzLm9uUmVtb3ZlUHJvZHVjdFNlY29uZEltYWdlLmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICB9XG5cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJChcIltkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl1cIik7XG4gICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJChcIiNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyXCIpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOiBcImNhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZ1wiLFxuICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIlxuICAgICAgfSxcbiAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiXG4gICAgfTtcblxuICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuICAgICAgcmVxdWVzdE9wdGlvbnMsXG4gICAgICBjb250ZW50ID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcblxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTAwXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBvbkludmFsaWRQcmljZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbImhvb2tzIiwiQ2F0YWxvZ1BhZ2UiLCJjb21wYXJlUHJvZHVjdHMiLCJGYWNldGVkU2VhcmNoIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiQ0FSVF9BUEkiLCJDYXRlZ29yeSIsIl9DYXRhbG9nUGFnZSIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25TaG93UHJvZHVjdFNlY29uZEltYWdlIiwiZSIsImNhcmQiLCJjdXJyZW50VGFyZ2V0IiwiZmluZCIsImltYWdlIiwib25SZW1vdmVQcm9kdWN0U2Vjb25kSW1hZ2UiLCJjcmVhdGVDYXJ0IiwidXJsIiwiaXRlbXMiLCJjYXJ0SXRlbXMiLCJsaW5lSXRlbXMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImdldENhcnQiLCJkZWxldGVDYXJ0SXRlbXMiLCJjYXJ0SWQiLCJvbkFkZEFsbFRvQ2FydCIsInByb2R1Y3RzIiwiaSIsImNhdGVnb3J5UHJvZHVjdHMiLCJjb25jYXQiLCJxdWFudGl0eSIsInF0eV9pbl9jYXJ0IiwicHJvZHVjdElkIiwiaWQiLCJkYXRhIiwiY3NzIiwic2V0VGltZW91dCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm9uUmVtb3ZlQWxsSXRlbXMiLCJfdGhpczMiLCJvbkNoZWNrQ2FydCIsIm9uUmVhZHkiLCJfdGhpczQiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIm5leHQiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImhvdmVyIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJkZWZhdWx0IiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImFyZ3VtZW50cyIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=