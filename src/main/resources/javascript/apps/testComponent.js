/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"testComponent": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors-chatbot"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/App.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/javascript/app/test/App.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".app-wrapper {\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n\n.watson_result{\n\tmax-width: 50%;\n}\n.conversation__intro {\n  text-align: center;\n  color: #c7c7c7;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Conversation.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/javascript/app/test/Conversation.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".conversation {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  align-content: stretch;\n  padding: 1rem;\n  width: 100%;\n}\n.conversation__inner {\n  display: flex;\n  align-items: stretch;\n  align-content: stretch;\n  flex-direction: column;\n  justify-content: flex-start;\n  width: 100%;\n  height: auto;\n}\n.conversation__messages {\n  overflow-y: auto;\n  flex: 1;\n}\n.conversation__input-container {\n  width: 100%;\n}\n.conversation__input {\n  width: 100%;\n}\n.conversation__disclaimer--message .base--h6 {\n  padding-top: 6px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Message.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/javascript/app/test/Message.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".message {\n  position: relative;\n  text-align: left;\n}\n.message--from-left {\n  text-align: left;\n}\n.message--from-right {\n  text-align: right;\n}\n.message__content {\n  background-color: #af6ee8;\n  border-radius: 1rem 1rem 1rem 0;\n  color: #fff;\n  margin-top: 0.1rem;\n  padding: 0.6rem;\n  width: fit-content;\n}\n.message--from-left .message__content {\n  background-color: #af6ee8;\n  color: #fff;\n  border-radius: 1rem 1rem 1rem 0;\n}\n.message--from-right .message__content {\n  color: #333;\n  margin-left: auto;\n  margin-right: 0;\n  background-color: #e0e0e0;\n  border-radius: 1rem 1rem 0 1rem;\n}\n.message__date {\n  color: #777677;\n  font-size: 0.75rem;\n  margin-left: 1rem;\n  margin-top: 0.1rem;\n}\n.message--from-left .message__date {\n  margin-left: 1rem;\n}\n.message--from-right .message__date {\n  margin-right: 1rem;\n}\n.message__label {\n  color: #00b4a0;\n}\n.message__tail {\n  margin: 0;\n  height: 1rem;\n  width: 1rem;\n  max-width: 1rem;\n  position: absolute;\n}\n.message--from-left .message__tail {\n  left: 0;\n}\n.message--from-right .message__tail {\n  right: 0;\n}\n.message__tail-background {\n  height: inherit;\n  width: inherit;\n  margin: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.message--from-left .message__tail-background {\n  background-color: #af6ee8;\n}\n.message--from-right .message__tail-background {\n  background-color: #e0e0e0;\n}\n.message__tail-foreground {\n  height: inherit;\n  width: inherit;\n  margin: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #fff;\n}\n.message--from-left .message__tail-foreground {\n  border-top-left-radius: 1rem;\n}\n.message--from-right .message__tail-foreground {\n  border-top-right-radius: 1rem;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Product.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/javascript/app/test/Product.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".product-card{  \n\tbox-shadow: 0 7px 25px #B5B5B5;\n\theight: auto;\n\tmargin-bottom: 20px;\n}\n\n.product-match-high{\n    text-align: center;\n}\n\n.product-img{\n\twidth: 100%;\n}\n\n.product-row{\n\tmin-height: 65px\n}\n\n.product-name, .product-price{\n\tmargin-left: 5px\n}", ""]);

// exports


/***/ }),

/***/ "./src/main/javascript/app/DxContext.jsx":
/*!***********************************************!*\
  !*** ./src/main/javascript/app/DxContext.jsx ***!
  \***********************************************/
/*! exports provided: DxContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DxContext", function() { return DxContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var DxContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();



/***/ }),

/***/ "./src/main/javascript/app/gqlQueries.js":
/*!***********************************************!*\
  !*** ./src/main/javascript/app/gqlQueries.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
var _templateObject = _taggedTemplateLiteral(['query Sites($path: String!){\n        jcr {\n            nodeByPath(path: $path) {\n              displayName  \n              name\n              path\n              children {\n                nodes {\n                  displayName\n                  name\n                }\n              }\n            }\n          }\n    }'], ['query Sites($path: String!){\n        jcr {\n            nodeByPath(path: $path) {\n              displayName  \n              name\n              path\n              children {\n                nodes {\n                  displayName\n                  name\n                }\n              }\n            }\n          }\n    }']),
    _templateObject2 = _taggedTemplateLiteral(['query productList($conversationId : String!, $profileId : String) {\n\t\t  products(conversationId : $conversationId,limit :50, offset:0, profileId : $profileId ) {\n\t\t\tsku\n\t\t\tname\n\t\t\tmountedPath\n\t\t\tvanityUrl\n\t\t\tcode\n\t\t\timages {\n\t\t\t  altText\n\t\t\t  format\n\t\t\t  imageType\n\t\t\t  url\n\t\t\t}\n\t\t\tprice{\n\t\t\t\tformattedValue\n\t\t\t}\n\t\t}\n\t}'], ['query productList($conversationId : String!, $profileId : String) {\n\t\t  products(conversationId : $conversationId,limit :50, offset:0, profileId : $profileId ) {\n\t\t\tsku\n\t\t\tname\n\t\t\tmountedPath\n\t\t\tvanityUrl\n\t\t\tcode\n\t\t\timages {\n\t\t\t  altText\n\t\t\t  format\n\t\t\t  imageType\n\t\t\t  url\n\t\t\t}\n\t\t\tprice{\n\t\t\t\tformattedValue\n\t\t\t}\n\t\t}\n\t}']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var gqlQueries = {
	SITE_QUERY: graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject)

	/* 	,Watson_QUERY: gql`query watson($message: String!,$conversationId : String){
 		sendMessage(message:$message, conversationId:$conversationId){
 			conversationId
 			entities
 			intents
 			outputMessages
 		}
 	}` */

	, PRODUCT_QUERY: graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject2)
};

/* harmony default export */ __webpack_exports__["default"] = (gqlQueries);

/***/ }),

/***/ "./src/main/javascript/app/test/App.css":
/*!**********************************************!*\
  !*** ./src/main/javascript/app/test/App.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./App.css */ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/App.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/main/javascript/app/test/App.js":
/*!*********************************************!*\
  !*** ./src/main/javascript/app/test/App.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Conversation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Conversation.js */ "./src/main/javascript/app/test/Conversation.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.css */ "./src/main/javascript/app/test/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ProductList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductList.jsx */ "./src/main/javascript/app/test/ProductList.jsx");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      conversationId: "",
      // A Message Object consists of a message[, intent, date, isUser]
      messageObjectList: [],
      result: ""
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.callWatson('hello');
    return _this;
  }

  _createClass(App, [{
    key: 'callWatson',
    value: function callWatson(message) {
      var _this2 = this;

      fetch(this.props.dxContext.servletContext + '/modules/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: 'query ($message: String!,$conversationId : String){\n\t\tsendMessage(message:$message, conversationId:$conversationId){\n\t\t\tconversationId\n\t\t\tentities{\n\t\t\t\tname\n\t\t\t\tvalue\n\t\t\t\tconfidence\n\t\t\t}\n\t\t\tintents\n\t\t\toutputMessages\n\t\t\tcanSearch\n\t\t}\n\t}',
          variables: {
            message: message,
            conversationId: this.state.conversationId
          }
        })
      }).then(function (response) {
        if (!response.ok) {
          return reject(response);
        }

        return response.json();
      }).then(function (responseJson) {

        responseJson.data.sendMessage.date = new Date();
        _this2.handleResponse(responseJson.data.sendMessage);
      }).catch(function (error) {
        throw error;
      });
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(responseJson) {
      var outputMessage = responseJson.outputMessages.filter(function (text) {
        return text;
      }).join('\n');
      var outputIntent = responseJson.intents[0];
      var outputDate = responseJson.date.toLocaleTimeString();
      var outputConversationId = responseJson.conversationId;
      this.setState({
        conversationId: outputConversationId
      });
      var msgObj = {
        position: 'left',
        label: outputIntent,
        message: outputMessage,
        date: outputDate,
        hasTail: true
      };
      this.addMessage(msgObj);
      if (responseJson.canSearch) {
        this.formatProducts(outputConversationId);
      }
    }
  }, {
    key: 'addMessage',
    value: function addMessage(msgObj) {
      this.setState({
        messageObjectList: [].concat(_toConsumableArray(this.state.messageObjectList), [msgObj])
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var inputMessage = e.target.value;
      var inputDate = new Date();
      var formattedDate = inputDate.toLocaleTimeString();
      var msgObj = {
        position: 'right',
        message: inputMessage,
        date: formattedDate,
        hasTail: true
      };
      this.addMessage(msgObj);
      e.target.value = '';
      this.callWatson(inputMessage);
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      var element = document.getElementsByClassName('conversation__messages')[0];
      element.scrollTop = element.scrollHeight;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.scrollToBottom();
    }
  }, {
    key: 'formatProducts',
    value: function formatProducts(conversationId) {
      console.log("rendering products");
      this.props.dxContext.conversationId = conversationId;
      console.log(window.cxs);
      if (window.cxs !== undefined) {
        this.props.dxContext.profileId = window.cxs.profileId;
      }

      var formattedResult = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ProductList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], { dxContext: this.props.dxContext });
      this.setState({
        result: formattedResult
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        { className: 'app-wrapper' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Conversation_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onSubmit: this.handleSubmit,
          messageObjectList: this.state.messageObjectList
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          { className: 'watson_result' },
          this.state.result
        )
      );
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/main/javascript/app/test/Conversation.css":
/*!*******************************************************!*\
  !*** ./src/main/javascript/app/test/Conversation.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./Conversation.css */ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Conversation.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/main/javascript/app/test/Conversation.js":
/*!******************************************************!*\
  !*** ./src/main/javascript/app/test/Conversation.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var watson_react_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! watson-react-components */ "./node_modules/watson-react-components/dist/components/index.js");
/* harmony import */ var watson_react_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(watson_react_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Message.js */ "./src/main/javascript/app/test/Message.js");
/* harmony import */ var _Conversation_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Conversation.css */ "./src/main/javascript/app/test/Conversation.css");
/* harmony import */ var _Conversation_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Conversation_css__WEBPACK_IMPORTED_MODULE_3__);





function Conversation(props) {

  function makeMessage(msgObj, index) {

    if (typeof msgObj.message === 'string') {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Message_js__WEBPACK_IMPORTED_MODULE_2__["default"], { key: index, position: msgObj.position || false, label: msgObj.label || false, date: msgObj.date || false, message: msgObj.message, hasTail: msgObj.hasTail || false });
    } else if (react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(msgObj.message)) {
      return msgObj.message;
    } else {
      return false;
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'div',
    { className: 'conversation' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'conversation__messages' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        null,
        props.messageObjectList.map(makeMessage)
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'conversation__input-container' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(watson_react_components__WEBPACK_IMPORTED_MODULE_1__["InputWithButton"], { className: 'conversation__input', onSubmit: props.onSubmit, placeholder: 'Say something to Watson.' })
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'conversation__disclaimer--message' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'h6',
        { className: 'base--h6' },
        'This system is a test'
      )
    )
  );
}

/* harmony default export */ __webpack_exports__["default"] = (Conversation);

/***/ }),

/***/ "./src/main/javascript/app/test/Message.css":
/*!**************************************************!*\
  !*** ./src/main/javascript/app/test/Message.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./Message.css */ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Message.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/main/javascript/app/test/Message.js":
/*!*************************************************!*\
  !*** ./src/main/javascript/app/test/Message.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Message_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Message.css */ "./src/main/javascript/app/test/Message.css");
/* harmony import */ var _Message_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Message_css__WEBPACK_IMPORTED_MODULE_1__);



function Message(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'div',
    { className: props.position === 'right' ? 'message message--from-right' : 'message message--from-left' },
    props.label ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'message__label' },
      props.label
    ) : false,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'message__content' },
      props.message
    ),
    props.hasTail ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'message__tail' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'message__tail-background' }),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'message__tail-foreground' })
    ) : false,
    props.date ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: 'message__date' },
      props.date
    ) : false
  );
}

/* harmony default export */ __webpack_exports__["default"] = (Message);

/***/ }),

/***/ "./src/main/javascript/app/test/Product.css":
/*!**************************************************!*\
  !*** ./src/main/javascript/app/test/Product.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./Product.css */ "./node_modules/css-loader/index.js!./src/main/javascript/app/test/Product.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/main/javascript/app/test/ProductList.jsx":
/*!******************************************************!*\
  !*** ./src/main/javascript/app/test/ProductList.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/index.js");
/* harmony import */ var _DxContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DxContext.jsx */ "./src/main/javascript/app/DxContext.jsx");
/* harmony import */ var _products_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./products.jsx */ "./src/main/javascript/app/test/products.jsx");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/index.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/index.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var client = function client(props) {
    var link = new apollo_link_http__WEBPACK_IMPORTED_MODULE_6__["HttpLink"]({
        uri: props.dxContext.servletContext + '/modules/graphql'
    });

    return new apollo_client__WEBPACK_IMPORTED_MODULE_5__["ApolloClient"]({
        link: link,
        cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__["InMemoryCache"]()
    });
};

var ProductList = function (_React$Component) {
    _inherits(ProductList, _React$Component);

    function ProductList() {
        _classCallCheck(this, ProductList);

        return _possibleConstructorReturn(this, (ProductList.__proto__ || Object.getPrototypeOf(ProductList)).apply(this, arguments));
    }

    _createClass(ProductList, [{
        key: 'render',
        value: function render() {
            var dxContext = this.props.dxContext;

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_apollo__WEBPACK_IMPORTED_MODULE_2__["ApolloProvider"],
                { client: client(this.props) },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    _DxContext_jsx__WEBPACK_IMPORTED_MODULE_3__["DxContext"].Provider,
                    { value: dxContext },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_products_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], { dxContext: dxContext })
                )
            );
        }
    }]);

    return ProductList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ProductList);

/***/ }),

/***/ "./src/main/javascript/app/test/main.jsx":
/*!***********************************************!*\
  !*** ./src/main/javascript/app/test/main.jsx ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.js */ "./src/main/javascript/app/test/App.js");


/* import Test from './app.jsx'; */


window.testComponentReactRender = function (target, id, dxContext) {
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_js__WEBPACK_IMPORTED_MODULE_2__["default"], { id: id, dxContext: dxContext }), document.getElementById(target));
};

/***/ }),

/***/ "./src/main/javascript/app/test/products.jsx":
/*!***************************************************!*\
  !*** ./src/main/javascript/app/test/products.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gqlQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gqlQueries */ "./src/main/javascript/app/gqlQueries.js");
/* harmony import */ var react_apollo_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo/index */ "./node_modules/react-apollo/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _Product_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Product.css */ "./src/main/javascript/app/test/Product.css");
/* harmony import */ var _Product_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Product_css__WEBPACK_IMPORTED_MODULE_4__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Products = function (_React$Component) {
	_inherits(Products, _React$Component);

	function Products(props) {
		_classCallCheck(this, Products);

		return _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this, props));
	}

	_createClass(Products, [{
		key: "render",
		value: function render() {

			if (this.props.fetchProducts.error) {
				return this.props.fetchProducts.error.message;
			}

			var prods = this.props.fetchProducts.products ? this.props.fetchProducts.products : [];

			return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
				react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Grid"],
				{ className: "product-container", fluid: true },
				react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
					react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
					{ className: "product-row" },
					prods.map(function (prod) {
						return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
							{ xs: 6, md: 4, lg: 4 },
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								"div",
								{ className: "product-card" },
								react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
									"div",
									{ className: "product" },
									react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
										react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
										{ className: "product-row product-header" },
										react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
											react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
											{ xs: 12, className: "product-match-high" },
											"High Match"
										)
									),
									react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
										react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
										{ className: "product-row" },
										react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
											react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
											{ xs: 12, className: "product-img-wrapper" },
											react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: "product-img",
												src: "https://demo.commerceio.jahia.com" + prod.images[1].url })
										)
									),
									react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
										react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
										{ className: "product-row" },
										react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
											"div",
											{ className: "product-name-wrapper" },
											react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
												react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
												{ xs: 12, className: "product-name" },
												react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
													"span",
													null,
													prod.name
												)
											),
											react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
												react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
												{ xs: 12, className: "product-price" },
												react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
													"span",
													null,
													prod.price.formattedValue
												)
											)
										)
									)
								)
							)
						);
					})
				)
			);
		}
	}]);

	return Products;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var ProductsQuery = Object(react_apollo_index__WEBPACK_IMPORTED_MODULE_2__["graphql"])(_gqlQueries__WEBPACK_IMPORTED_MODULE_1__["default"].PRODUCT_QUERY, {
	name: 'fetchProducts',
	options: function options(props) {
		return {
			variables: {
				"conversationId": props.dxContext.conversationId,
				"profileId": props.dxContext.profileId
			}
		};
	}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_apollo_index__WEBPACK_IMPORTED_MODULE_2__["withApollo"])(ProductsQuery(Products)));

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/main/javascript/app/test/main.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/rincevent/projects/modules/cio-chatbot/src/main/javascript/app/test/main.jsx */"./src/main/javascript/app/test/main.jsx");


/***/ })

/******/ });
//# sourceMappingURL=testComponent.js.map