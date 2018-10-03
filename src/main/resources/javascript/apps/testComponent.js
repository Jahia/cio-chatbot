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
    _templateObject2 = _taggedTemplateLiteral(['query productList($conversationId : String!, $profileId : String) {\n\t\t  products(conversationId : $conversationId, limit:9, offset:0, profileId : $profileId ) {\n\t\t\tsku\n\t\t\tname\n\t\t\tmountedPath\n\t\t\tvanityUrl\n\t\t\tcode\n\t\t\toutOfStock\n\t\t\timages {\n\t\t\t  altText\n\t\t\t  format\n\t\t\t  imageType\n\t\t\t  url\n\t\t\t}\n\t\t\tprice{\n\t\t\t\tformattedValue\n\t\t\t}\n\t\t}\n\t}'], ['query productList($conversationId : String!, $profileId : String) {\n\t\t  products(conversationId : $conversationId, limit:9, offset:0, profileId : $profileId ) {\n\t\t\tsku\n\t\t\tname\n\t\t\tmountedPath\n\t\t\tvanityUrl\n\t\t\tcode\n\t\t\toutOfStock\n\t\t\timages {\n\t\t\t  altText\n\t\t\t  format\n\t\t\t  imageType\n\t\t\t  url\n\t\t\t}\n\t\t\tprice{\n\t\t\t\tformattedValue\n\t\t\t}\n\t\t}\n\t}']);

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

/***/ "./src/main/javascript/app/productbot/App.jsx":
/*!****************************************************!*\
  !*** ./src/main/javascript/app/productbot/App.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isUndefined */ "./node_modules/lodash/isUndefined.js");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Conversation_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Conversation.jsx */ "./src/main/javascript/app/productbot/Conversation.jsx");
/* harmony import */ var _ProductList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductList.jsx */ "./src/main/javascript/app/productbot/ProductList.jsx");


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
            conversationId: null,
            profileId: null,
            // A Message Object consists of a message[, intent, date, isUser]
            messageObjectList: []
        };

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleRestart = _this.handleRestart.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Todo: Call grapqhql entry point for favoriteColor (when window.cxs (CDP profile) is available). This will give context for the style.
            var $this = this;
            var intervalWatson = setInterval(function () {
                if (window.cxs !== undefined) {
                    clearInterval(intervalWatson);
                    $this.startWatson();
                }
            }, 100);
        }
    }, {
        key: 'startWatson',
        value: function startWatson() {
            var _this2 = this;

            if (window.cxs !== undefined && window.cxs.profileId !== undefined) {
                this.props.dxContext.profileId = window.cxs.profileId;

                this.getFavoriteColor(window.cxs.profileId).then(function (responseJson) {
                    _this2.callWatson('hello', responseJson.data.favoriteColor);
                }).catch(function (error) {
                    throw error;
                });
            }
        }
    }, {
        key: 'getFavoriteColor',
        value: function getFavoriteColor(profileId) {
            console.log(profileId);
            return fetch(this.props.dxContext.servletContext + '/modules/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: 'query ($profileId: String!){\n\t\t\t\t\t\t\tfavoriteColor(profileId:$profileId)\t\n\t\t\t\t\t\t}',
                    variables: {
                        profileId: profileId
                    }
                })
            }).then(function (response) {
                console.log(response);
                if (!response.ok) {
                    return reject(response);
                }

                return response.json();
            });
        }
    }, {
        key: 'callWatson',
        value: function callWatson(message, favoriteColor) {
            var _this3 = this;

            console.log("Calling watsion", favoriteColor);
            fetch(this.props.dxContext.servletContext + '/modules/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: 'query ($message: String!,$conversationId : String,$favoriteColor : String){\n                            sendMessage(message:$message, conversationId:$conversationId,favoriteColor:$favoriteColor){\n                                conversationId\n                                entities{\n                                    name\n                                    value\n                                    confidence\n                                }\n                                intents\n                                outputMessages\n                                canSearch\n                            }\n                        }',
                    variables: {
                        message: message,
                        conversationId: this.state.conversationId,
                        favoriteColor: favoriteColor
                    }
                })
            }).then(function (response) {
                if (!response.ok) {
                    return reject(response);
                }

                return response.json();
            }).then(function (responseJson) {

                responseJson.data.sendMessage.date = new Date();
                _this3.handleResponse(responseJson.data.sendMessage);
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
            /*        const outputIntent         = responseJson.intents[0]; */
            var outputDate = responseJson.date.toLocaleTimeString();
            var outputConversationId = responseJson.conversationId;
            this.setState({
                conversationId: outputConversationId
            });
            var msgObj = {
                position: 'left',
                /*             label   : outputIntent, */
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
            if (e.target.value == "") {
                return;
            }
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

            this.setState({
                conversationId: conversationId,
                profileId: !lodash_isUndefined__WEBPACK_IMPORTED_MODULE_0___default()(window.cxs) ? window.cxs.profileId : null,
                messageObjectList: this.state.messageObjectList
            });
        }
    }, {
        key: 'handleRestart',
        value: function handleRestart() {
            this.setState({
                conversationId: null,
                profileId: null,
                // A Message Object consists of a message[, intent, date, isUser]
                messageObjectList: []
            }, function () {
                this.componentDidMount();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                'div',
                { className: 'app-wrapper' },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Conversation_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    onSubmit: this.handleSubmit,
                    onRestart: this.handleRestart,
                    messageObjectList: this.state.messageObjectList
                }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    'div',
                    { className: 'watson_result' },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProductList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], { dxContext: this.props.dxContext,
                        conversationId: this.state.conversationId,
                        profileId: this.state.profileId })
                )
            );
        }
    }]);

    return App;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/main/javascript/app/productbot/Conversation.jsx":
/*!*************************************************************!*\
  !*** ./src/main/javascript/app/productbot/Conversation.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var watson_react_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! watson-react-components */ "./node_modules/watson-react-components/dist/components/index.js");
/* harmony import */ var watson_react_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(watson_react_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Message_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Message.jsx */ "./src/main/javascript/app/productbot/Message.jsx");




function Conversation(props) {

  function makeMessage(msgObj, index) {

    if (typeof msgObj.message === 'string') {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Message_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], { key: index, position: msgObj.position || false, label: msgObj.label || false, date: msgObj.date || false, message: msgObj.message, hasTail: msgObj.hasTail || false });
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
      { className: 'conversation__disclaimer--message' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'fas fa-comments' }),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'button',
        { onClick: props.onRestart },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'fas fa-sync-alt' })
      )
    ),
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
    )
  );
}

/* harmony default export */ __webpack_exports__["default"] = (Conversation);

/***/ }),

/***/ "./src/main/javascript/app/productbot/Message.jsx":
/*!********************************************************!*\
  !*** ./src/main/javascript/app/productbot/Message.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


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

/***/ "./src/main/javascript/app/productbot/ProductList.jsx":
/*!************************************************************!*\
  !*** ./src/main/javascript/app/productbot/ProductList.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "./node_modules/lodash/isNil.js");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/index.js");
/* harmony import */ var _DxContext_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DxContext.jsx */ "./src/main/javascript/app/DxContext.jsx");
/* harmony import */ var _products_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./products.jsx */ "./src/main/javascript/app/productbot/products.jsx");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/index.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/index.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/index.js");


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var client = function client(props) {
    var link = new apollo_link_http__WEBPACK_IMPORTED_MODULE_7__["HttpLink"]({
        uri: props.dxContext.servletContext + '/modules/graphql'
    });

    return new apollo_client__WEBPACK_IMPORTED_MODULE_6__["ApolloClient"]({
        link: link,
        cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_8__["InMemoryCache"]()
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
            var _props = this.props,
                dxContext = _props.dxContext,
                conversationId = _props.conversationId,
                profileId = _props.profileId;

            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                react_apollo__WEBPACK_IMPORTED_MODULE_3__["ApolloProvider"],
                { client: client(this.props) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _DxContext_jsx__WEBPACK_IMPORTED_MODULE_4__["DxContext"].Provider,
                    { value: dxContext },
                    lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(conversationId) || lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(profileId) ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                        'span',
                        { style: { paddingTop: 35, fontSize: 69 } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('i', { className: 'fas fa-box' })
                    ) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_products_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], { dxContext: dxContext,
                        conversationId: conversationId,
                        profileId: profileId })
                )
            );
        }
    }]);

    return ProductList;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ProductList);

/***/ }),

/***/ "./src/main/javascript/app/productbot/main.jsx":
/*!*****************************************************!*\
  !*** ./src/main/javascript/app/productbot/main.jsx ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.jsx */ "./src/main/javascript/app/productbot/App.jsx");




window.productBotComponentReactRender = function (target, id, dxContext) {
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], { id: id, dxContext: dxContext }), document.getElementById(target));
};

/***/ }),

/***/ "./src/main/javascript/app/productbot/products.jsx":
/*!*********************************************************!*\
  !*** ./src/main/javascript/app/productbot/products.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gqlQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gqlQueries */ "./src/main/javascript/app/gqlQueries.js");
/* harmony import */ var react_apollo_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo/index */ "./node_modules/react-apollo/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Products = function (_React$Component) {
    _inherits(Products, _React$Component);

    function Products(props) {
        _classCallCheck(this, Products);

        var _this = _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this, props));

        var grantedConsent = false;
        var displayModal = false;
        if (window.cxs !== undefined && window.cxs.consents !== undefined) {
            var consents = window.cxs.consents;
            var keys = Object.keys(consents);
            if (keys.length > 0) {
                if (consents["apparel-uk/outofstock"] !== undefined) {
                    // Check if consent is granted or not
                    grantedConsent = consents["apparel-uk/outofstock"].status === "GRANTED";
                } else {
                    displayModal = true;
                }
            } else {
                displayModal = true;
            }
        }
        _this.state = {
            hasGrantedConsent: grantedConsent,
            consentText: grantedConsent ? "You have consented to the usage of your email to receive information about product out of stock." : "You have not consented to the usage of your email to receive information about product out of stock.",
            shouldDisplayModal: displayModal
        };
        var $this = _this;
        if (window.manageWemPrivacy !== undefined) {
            var privacyHandler = {
                set: function set(obj, prop, value) {
                    console.log("calling proxy setter", prop, value);
                    var oldVal = obj[prop];
                    if (prop === "modelAlreadyOpen" && value !== oldVal) {
                        if (window.cxs !== undefined && window.cxs.consents !== undefined) {
                            var _consents = window.cxs.consents;
                            var _keys = Object.keys(_consents);
                            if (_keys.length > 0) {
                                if (_consents["apparel-uk/outofstock"] !== undefined) {
                                    // Check if consent is granted or not
                                    var consentText = "You have not consented to the usage of your email to receive information about product out of stock.";
                                    if (_consents["apparel-uk/outofstock"].status === "GRANTED") {
                                        consentText = "You have consented to the usage of your email to receive information about product out of stock.";
                                    }
                                    $this.setState({
                                        hasGrantedConsent: _consents["apparel-uk/outofstock"].status === "GRANTED",
                                        consentText: consentText,
                                        shouldDisplayModal: false
                                    });
                                }
                            }
                        }
                    }
                    obj[prop] = value;
                }
            };
            window.manageWemPrivacy = new Proxy(window.manageWemPrivacy, privacyHandler);
        }
        return _this;
    }

    _createClass(Products, [{
        key: "render",
        value: function render() {

            if (this.props.fetchProducts.error) {
                return this.props.fetchProducts.error.message;
            }

            var prods = this.props.fetchProducts.products ? this.props.fetchProducts.products : [];

            if (this.state.shouldDisplayModal && window.manageWemPrivacyInstances !== undefined) {
                var privacyInstance = window.manageWemPrivacyInstances[Object.keys(window.manageWemPrivacyInstances)[0]];
                privacyInstance.captiveModal = true;
                privacyInstance.openModal(true);
            }

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Grid"],
                { className: "product-container", fluid: true },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
                    { className: "product-row" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
                        { xs: 12, md: 12, lg: 12 },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            "div",
                            {
                                className: this.state.hasGrantedConsent ? "alert alert-success" : "alert alert-warning" },
                            this.state.consentText
                        )
                    )
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
                    { className: "product-row" },
                    prods.map(function (prod) {
                        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"],
                            { xs: 6, md: 4, lg: 4, key: prod.sku },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                "a",
                                { href: "https://demo.commerceio.jahia.com" + prod.vanityUrl, target: "_blank" },
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
                "conversationId": props.conversationId,
                "profileId": props.profileId
            }
        };
    }
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_apollo_index__WEBPACK_IMPORTED_MODULE_2__["withApollo"])(ProductsQuery(Products)));

/***/ }),

/***/ 0:
/*!***********************************************************!*\
  !*** multi ./src/main/javascript/app/productbot/main.jsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/rincevent/projects/modules/cio-chatbot/src/main/javascript/app/productbot/main.jsx */"./src/main/javascript/app/productbot/main.jsx");


/***/ })

/******/ });
//# sourceMappingURL=testComponent.js.map