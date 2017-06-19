webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(3);
	var runtime = __webpack_require__(23);
	var registerEvents = __webpack_require__(24);
	var main_module_1 = __webpack_require__(25);
	if (true) {
	    core_1.enableProdMode();
	}
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.MainModule);
	if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
	    var registration = runtime.register();
	    registerEvents(registration, {
	        onInstalled: function () {
	            console.log('[SW] onInstalled');
	        },
	        onUpdateReady: function () {
	            console.log('[SW] onUpdateReady');
	        },
	        onUpdating: function () {
	            console.log('[SW] onUpdating');
	        },
	        onUpdateFailed: function () {
	            console.log('[SW] onUpdateFailed');
	        },
	        onUpdated: function () {
	            console.log('[SW] onUpdated');
	        },
	    });
	}
	else {
	    console.log('serviceWorker not available');
	}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

	var serviceWorkerOption = {"scriptURL":"/sw.js"};
	      "use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable flowtype/require-valid-file-annotation */
	/* global serviceWorkerOption */

	exports.default = {
	  register: function register() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (navigator.serviceWorker) {
	      return navigator.serviceWorker.register(serviceWorkerOption.scriptURL, options);
	    }

	    return false;
	  }
	};
	module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak

	function registerEvents(registration, callbacks) {
	  var sendEvent = function sendEvent(event) {
	    if (typeof callbacks[event] === 'function') {
	      callbacks[event]();
	    }
	  };

	  var handleUpdating = function handleUpdating(registration2) {
	    var serviceworker = registration2.installing || registration2.waiting;
	    var ignoreWaiting = void 0;

	    // No SW or already handled
	    if (!serviceworker || serviceworker.onstatechange) {
	      return;
	    }

	    if (registration2.waiting) {
	      ignoreWaiting = true;
	    }

	    function onUpdateStateChange() {
	      switch (serviceworker.state) {
	        case 'redundant':
	          sendEvent('onUpdateFailed');
	          serviceworker.onstatechange = null;
	          break;

	        case 'installing':
	          sendEvent('onUpdating');
	          break;

	        case 'installed':
	          if (!ignoreWaiting) {
	            sendEvent('onUpdateReady');
	          }
	          break;

	        case 'activated':
	          sendEvent('onUpdated');
	          serviceworker.onstatechange = null;
	          break;

	        default:
	          break;
	      }
	    }

	    function onInstallStateChange() {
	      switch (serviceworker.state) {
	        case 'redundant':
	          // Failed to install, ignore
	          serviceworker.onstatechange = null;
	          break;

	        case 'activated':
	          sendEvent('onInstalled');
	          serviceworker.onstatechange = null;
	          break;

	        default:
	          break;
	      }
	    }

	    var stateChangeHandler = void 0;

	    // Already has a SW
	    if (registration2.active) {
	      onUpdateStateChange();
	      stateChangeHandler = onUpdateStateChange;
	    } else {
	      onInstallStateChange();
	      stateChangeHandler = onInstallStateChange;
	    }

	    serviceworker.onstatechange = stateChangeHandler;
	  };

	  registration.then(function (registration2) {
	    handleUpdating(registration2);
	    registration2.onupdatefound = function () {
	      handleUpdating(registration2);
	    };
	  }).catch(function (err) {
	    sendEvent('onError');
	    return Promise.reject(err);
	  });
	}

	exports.default = registerEvents;
	module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(26);
	var core_1 = __webpack_require__(3);
	var platform_browser_1 = __webpack_require__(21);
	var forms_1 = __webpack_require__(62);
	var http_1 = __webpack_require__(65);
	var backbone_module_1 = __webpack_require__(66);
	var dashboard_module_1 = __webpack_require__(81);
	var main_component_1 = __webpack_require__(105);
	var main_routes_1 = __webpack_require__(109);
	var common_1 = __webpack_require__(22);
	var nav_component_1 = __webpack_require__(110);
	var experiment_module_1 = __webpack_require__(114);
	var shared_module_1 = __webpack_require__(170);
	var MainModule = (function () {
	    function MainModule() {
	    }
	    return MainModule;
	}());
	MainModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            http_1.HttpModule,
	            backbone_module_1.BackboneModule,
	            shared_module_1.SharedModule,
	            dashboard_module_1.DashboardModule,
	            experiment_module_1.ExperimentModule,
	            main_routes_1.MainRoutingModule,
	        ],
	        declarations: [
	            main_component_1.MainComponent,
	            nav_component_1.NavComponent
	        ],
	        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
	        bootstrap: [main_component_1.MainComponent]
	    })
	], MainModule);
	exports.MainModule = MainModule;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Observable class extensions
	__webpack_require__(27);
	__webpack_require__(33);
	// Observable operators
	__webpack_require__(36);
	__webpack_require__(43);
	__webpack_require__(50);
	__webpack_require__(52);
	__webpack_require__(54);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(60);


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license Angular v2.4.10
	 * (c) 2010-2017 Google, Inc. https://angular.io/
	 * License: MIT
	 */
	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(3), __webpack_require__(61), __webpack_require__(6), __webpack_require__(7), __webpack_require__(63)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/operator/toPromise', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/observable/fromPromise'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.forms = global.ng.forms || {}),global.ng.core,global.Rx.Observable.prototype,global.Rx,global.Rx,global.Rx.Observable));
	}(this, function (exports,_angular_core,rxjs_operator_toPromise,rxjs_Subject,rxjs_Observable,rxjs_observable_fromPromise) { 'use strict';

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Base class for control directives.
	     *
	     * Only used internally in the forms module.
	     *
	     * \@stable
	     * @abstract
	     */
	    var AbstractControlDirective = (function () {
	        function AbstractControlDirective() {
	        }
	        Object.defineProperty(AbstractControlDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { throw new Error('unimplemented'); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "value", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.value : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.valid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.invalid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pending", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.pending : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "errors", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.errors : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.pristine : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.dirty : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "touched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.touched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.untouched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.disabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.enabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.statusChanges : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.valueChanges : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.reset = function (value) {
	            if (value === void 0) { value = undefined; }
	            if (this.control)
	                this.control.reset(value);
	        };
	        /**
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.hasError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return this.control ? this.control.hasError(errorCode, path) : false;
	        };
	        /**
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.getError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return this.control ? this.control.getError(errorCode, path) : null;
	        };
	        return AbstractControlDirective;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$1 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * A directive that contains multiple {\@link NgControl}s.
	     *
	     * Only used by the forms module.
	     *
	     * \@stable
	     */
	    var ControlContainer = (function (_super) {
	        __extends$1(ControlContainer, _super);
	        function ControlContainer() {
	            _super.apply(this, arguments);
	        }
	        Object.defineProperty(ControlContainer.prototype, "formDirective", {
	            /**
	             * Get the form to which this container belongs.
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ControlContainer.prototype, "path", {
	            /**
	             * Get the path to this container.
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        return ControlContainer;
	    }(AbstractControlDirective));

	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isPresent(obj) {
	        return obj != null;
	    }
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isBlank(obj) {
	        return obj == null;
	    }
	    /**
	     * @param {?} a
	     * @param {?} b
	     * @return {?}
	     */
	    function looseIdentical(a, b) {
	        return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	    }
	    /**
	     * @param {?} o
	     * @return {?}
	     */
	    function isJsObject(o) {
	        return o !== null && (typeof o === 'function' || typeof o === 'object');
	    }
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isPrimitive(obj) {
	        return !isJsObject(obj);
	    }

	    /**
	     * Wraps Javascript Objects
	     */
	    var StringMapWrapper = (function () {
	        function StringMapWrapper() {
	        }
	        /**
	         * @param {?} m1
	         * @param {?} m2
	         * @return {?}
	         */
	        StringMapWrapper.merge = function (m1, m2) {
	            var /** @type {?} */ m = {};
	            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
	                var k = _a[_i];
	                m[k] = m1[k];
	            }
	            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
	                var k = _c[_b];
	                m[k] = m2[k];
	            }
	            return m;
	        };
	        /**
	         * @param {?} m1
	         * @param {?} m2
	         * @return {?}
	         */
	        StringMapWrapper.equals = function (m1, m2) {
	            var /** @type {?} */ k1 = Object.keys(m1);
	            var /** @type {?} */ k2 = Object.keys(m2);
	            if (k1.length != k2.length) {
	                return false;
	            }
	            for (var /** @type {?} */ i = 0; i < k1.length; i++) {
	                var /** @type {?} */ key = k1[i];
	                if (m1[key] !== m2[key]) {
	                    return false;
	                }
	            }
	            return true;
	        };
	        return StringMapWrapper;
	    }());
	    var ListWrapper = (function () {
	        function ListWrapper() {
	        }
	        /**
	         * @param {?} arr
	         * @param {?} condition
	         * @return {?}
	         */
	        ListWrapper.findLast = function (arr, condition) {
	            for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
	                if (condition(arr[i])) {
	                    return arr[i];
	                }
	            }
	            return null;
	        };
	        /**
	         * @param {?} list
	         * @param {?} items
	         * @return {?}
	         */
	        ListWrapper.removeAll = function (list, items) {
	            for (var /** @type {?} */ i = 0; i < items.length; ++i) {
	                var /** @type {?} */ index = list.indexOf(items[i]);
	                if (index > -1) {
	                    list.splice(index, 1);
	                }
	            }
	        };
	        /**
	         * @param {?} list
	         * @param {?} el
	         * @return {?}
	         */
	        ListWrapper.remove = function (list, el) {
	            var /** @type {?} */ index = list.indexOf(el);
	            if (index > -1) {
	                list.splice(index, 1);
	                return true;
	            }
	            return false;
	        };
	        /**
	         * @param {?} a
	         * @param {?} b
	         * @return {?}
	         */
	        ListWrapper.equals = function (a, b) {
	            if (a.length != b.length)
	                return false;
	            for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	                if (a[i] !== b[i])
	                    return false;
	            }
	            return true;
	        };
	        /**
	         * @param {?} list
	         * @return {?}
	         */
	        ListWrapper.flatten = function (list) {
	            return list.reduce(function (flat, item) {
	                var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
	                return ((flat)).concat(flatItem);
	            }, []);
	        };
	        return ListWrapper;
	    }());

	    var /** @type {?} */ isPromise = _angular_core.__core_private__.isPromise;
	    var /** @type {?} */ isObservable = _angular_core.__core_private__.isObservable;

	    /**
	     * @param {?} value
	     * @return {?}
	     */
	    function isEmptyInputValue(value) {
	        // we don't check for string here so it also works with arrays
	        return value == null || value.length === 0;
	    }
	    /**
	     * Providers for validators to be used for {@link FormControl}s in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * ### Example
	     *
	     * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
	     * @stable
	     */
	    var /** @type {?} */ NG_VALIDATORS = new _angular_core.OpaqueToken('NgValidators');
	    /**
	     * Providers for asynchronous validators to be used for {@link FormControl}s
	     * in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * See {@link NG_VALIDATORS} for more details.
	     *
	     * @stable
	     */
	    var /** @type {?} */ NG_ASYNC_VALIDATORS = new _angular_core.OpaqueToken('NgAsyncValidators');
	    /**
	     * Provides a set of validators used by form controls.
	     *
	     * A validator is a function that processes a {\@link FormControl} or collection of
	     * controls and returns a map of errors. A null map means that validation has passed.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * var loginControl = new FormControl("", Validators.required)
	     * ```
	     *
	     * \@stable
	     */
	    var Validators = (function () {
	        function Validators() {
	        }
	        /**
	         * Validator that requires controls to have a non-empty value.
	         * @param {?} control
	         * @return {?}
	         */
	        Validators.required = function (control) {
	            return isEmptyInputValue(control.value) ? { 'required': true } : null;
	        };
	        /**
	         * Validator that requires control value to be true.
	         * @param {?} control
	         * @return {?}
	         */
	        Validators.requiredTrue = function (control) {
	            return control.value === true ? null : { 'required': true };
	        };
	        /**
	         * Validator that requires controls to have a value of a minimum length.
	         * @param {?} minLength
	         * @return {?}
	         */
	        Validators.minLength = function (minLength) {
	            return function (control) {
	                if (isEmptyInputValue(control.value)) {
	                    return null; // don't validate empty values to allow optional controls
	                }
	                var /** @type {?} */ length = control.value ? control.value.length : 0;
	                return length < minLength ?
	                    { 'minlength': { 'requiredLength': minLength, 'actualLength': length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires controls to have a value of a maximum length.
	         * @param {?} maxLength
	         * @return {?}
	         */
	        Validators.maxLength = function (maxLength) {
	            return function (control) {
	                var /** @type {?} */ length = control.value ? control.value.length : 0;
	                return length > maxLength ?
	                    { 'maxlength': { 'requiredLength': maxLength, 'actualLength': length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires a control to match a regex to its value.
	         * @param {?} pattern
	         * @return {?}
	         */
	        Validators.pattern = function (pattern) {
	            if (!pattern)
	                return Validators.nullValidator;
	            var /** @type {?} */ regex;
	            var /** @type {?} */ regexStr;
	            if (typeof pattern === 'string') {
	                regexStr = "^" + pattern + "$";
	                regex = new RegExp(regexStr);
	            }
	            else {
	                regexStr = pattern.toString();
	                regex = pattern;
	            }
	            return function (control) {
	                if (isEmptyInputValue(control.value)) {
	                    return null; // don't validate empty values to allow optional controls
	                }
	                var /** @type {?} */ value = control.value;
	                return regex.test(value) ? null :
	                    { 'pattern': { 'requiredPattern': regexStr, 'actualValue': value } };
	            };
	        };
	        /**
	         * No-op validator.
	         * @param {?} c
	         * @return {?}
	         */
	        Validators.nullValidator = function (c) { return null; };
	        /**
	         * Compose multiple validators into a single function that returns the union
	         * of the individual error maps.
	         * @param {?} validators
	         * @return {?}
	         */
	        Validators.compose = function (validators) {
	            if (!validators)
	                return null;
	            var /** @type {?} */ presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                return _mergeErrors(_executeValidators(control, presentValidators));
	            };
	        };
	        /**
	         * @param {?} validators
	         * @return {?}
	         */
	        Validators.composeAsync = function (validators) {
	            if (!validators)
	                return null;
	            var /** @type {?} */ presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                var /** @type {?} */ promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
	                return Promise.all(promises).then(_mergeErrors);
	            };
	        };
	        return Validators;
	    }());
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function _convertToPromise(obj) {
	        return isPromise(obj) ? obj : rxjs_operator_toPromise.toPromise.call(obj);
	    }
	    /**
	     * @param {?} control
	     * @param {?} validators
	     * @return {?}
	     */
	    function _executeValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    /**
	     * @param {?} control
	     * @param {?} validators
	     * @return {?}
	     */
	    function _executeAsyncValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    /**
	     * @param {?} arrayOfErrors
	     * @return {?}
	     */
	    function _mergeErrors(arrayOfErrors) {
	        var /** @type {?} */ res = arrayOfErrors.reduce(function (res, errors) {
	            return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
	        }, {});
	        return Object.keys(res).length === 0 ? null : res;
	    }

	    /**
	     * Used to provide a {@link ControlValueAccessor} for form controls.
	     *
	     * See {@link DefaultValueAccessor} for how to implement one.
	     * @stable
	     */
	    var /** @type {?} */ NG_VALUE_ACCESSOR = new _angular_core.OpaqueToken('NgValueAccessor');

	    var /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return CheckboxControlValueAccessor; }),
	        multi: true,
	    };
	    /**
	     * The accessor for writing a value and listening to changes on a checkbox input element.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="checkbox" name="rememberLogin" ngModel>
	     *  ```
	     *
	     *  \@stable
	     */
	    var CheckboxControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function CheckboxControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.writeValue = function (value) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        CheckboxControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
	                        host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
	                        providers: [CHECKBOX_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        CheckboxControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return CheckboxControlValueAccessor;
	    }());

	    var /** @type {?} */ DEFAULT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return DefaultValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The default accessor for writing a value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="text" name="searchQuery" ngModel>
	     *  ```
	     *
	     *  \@stable
	     */
	    var DefaultValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function DefaultValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.writeValue = function (value) {
	            var /** @type {?} */ normalizedValue = value == null ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        DefaultValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
	                        // TODO: vsavkin replace the above selector with the one below it once
	                        // https://github.com/angular/angular/issues/3011 is implemented
	                        // selector: '[ngControl],[ngModel],[ngFormControl]',
	                        host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [DEFAULT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        DefaultValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return DefaultValueAccessor;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function normalizeValidator(validator) {
	        if (((validator)).validate) {
	            return function (c) { return ((validator)).validate(c); };
	        }
	        else {
	            return (validator);
	        }
	    }
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function normalizeAsyncValidator(validator) {
	        if (((validator)).validate) {
	            return function (c) { return ((validator)).validate(c); };
	        }
	        else {
	            return (validator);
	        }
	    }

	    var /** @type {?} */ NUMBER_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return NumberValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a number value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="number" [(ngModel)]="age">
	     *  ```
	     */
	    var NumberValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function NumberValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.writeValue = function (value) {
	            // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
	            var /** @type {?} */ normalizedValue = value == null ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.registerOnChange = function (fn) {
	            this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        NumberValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
	                        host: {
	                            '(change)': 'onChange($event.target.value)',
	                            '(input)': 'onChange($event.target.value)',
	                            '(blur)': 'onTouched()'
	                        },
	                        providers: [NUMBER_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        NumberValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return NumberValueAccessor;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$2 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @return {?}
	     */
	    function unimplemented() {
	        throw new Error('unimplemented');
	    }
	    /**
	     * A base class that all control directive extend.
	     * It binds a {\@link FormControl} object to a DOM element.
	     *
	     * Used internally by Angular forms.
	     *
	     * \@stable
	     * @abstract
	     */
	    var NgControl = (function (_super) {
	        __extends$2(NgControl, _super);
	        function NgControl() {
	            _super.apply(this, arguments);
	            /** @internal */
	            this._parent = null;
	            this.name = null;
	            this.valueAccessor = null;
	            /** @internal */
	            this._rawValidators = [];
	            /** @internal */
	            this._rawAsyncValidators = [];
	        }
	        Object.defineProperty(NgControl.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return (unimplemented()); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgControl.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return (unimplemented()); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @abstract
	         * @param {?} newValue
	         * @return {?}
	         */
	        NgControl.prototype.viewToModelUpdate = function (newValue) { };
	        return NgControl;
	    }(AbstractControlDirective));

	    var /** @type {?} */ RADIO_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return RadioControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * Internal class used by Angular to uncheck radio buttons with the matching name.
	     */
	    var RadioControlRegistry = (function () {
	        function RadioControlRegistry() {
	            this._accessors = [];
	        }
	        /**
	         * @param {?} control
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.add = function (control, accessor) {
	            this._accessors.push([control, accessor]);
	        };
	        /**
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.remove = function (accessor) {
	            for (var /** @type {?} */ i = this._accessors.length - 1; i >= 0; --i) {
	                if (this._accessors[i][1] === accessor) {
	                    this._accessors.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        /**
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.select = function (accessor) {
	            var _this = this;
	            this._accessors.forEach(function (c) {
	                if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
	                    c[1].fireUncheck(accessor.value);
	                }
	            });
	        };
	        /**
	         * @param {?} controlPair
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
	            if (!controlPair[0].control)
	                return false;
	            return controlPair[0]._parent === accessor._control._parent &&
	                controlPair[1].name === accessor.name;
	        };
	        RadioControlRegistry.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        RadioControlRegistry.ctorParameters = function () { return []; };
	        return RadioControlRegistry;
	    }());
	    /**
	     * \@whatItDoes Writes radio control values and listens to radio control changes.
	     *
	     * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
	     * to keep the view synced with the {\@link FormControl} model.
	     *
	     * \@howToUse
	     *
	     * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
	     * value accessor will be active on any radio control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use radio buttons with form directives
	     *
	     * To use radio buttons in a template-driven form, you'll want to ensure that radio buttons
	     * in the same group have the same `name` attribute.  Radio buttons with different `name`
	     * attributes do not affect each other.
	     *
	     * {\@example forms/ts/radioButtons/radio_button_example.ts region='TemplateDriven'}
	     *
	     * When using radio buttons in a reactive form, radio buttons in the same group should have the
	     * same `formControlName`. You can also add a `name` attribute, but it's optional.
	     *
	     * {\@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
	     *
	     *  * **npm package**: `\@angular/forms`
	     *
	     *  \@stable
	     */
	    var RadioControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         * @param {?} _registry
	         * @param {?} _injector
	         */
	        function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this._registry = _registry;
	            this._injector = _injector;
	            this.onChange = function () { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.ngOnInit = function () {
	            this._control = this._injector.get(NgControl);
	            this._checkName();
	            this._registry.add(this._control, this);
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.writeValue = function (value) {
	            this._state = value === this.value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', this._state);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this._fn = fn;
	            this.onChange = function () {
	                fn(_this.value);
	                _this._registry.select(_this);
	            };
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.fireUncheck = function (value) { this.writeValue(value); };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype._checkName = function () {
	            if (this.name && this.formControlName && this.name !== this.formControlName) {
	                this._throwNameError();
	            }
	            if (!this.name && this.formControlName)
	                this.name = this.formControlName;
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype._throwNameError = function () {
	            throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
	        };
	        RadioControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
	                        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
	                        providers: [RADIO_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        RadioControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	            { type: RadioControlRegistry, },
	            { type: _angular_core.Injector, },
	        ]; };
	        RadioControlValueAccessor.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'formControlName': [{ type: _angular_core.Input },],
	            'value': [{ type: _angular_core.Input },],
	        };
	        return RadioControlValueAccessor;
	    }());

	    var /** @type {?} */ RANGE_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return RangeValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a range value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="range" [(ngModel)]="age" >
	     *  ```
	     */
	    var RangeValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function RangeValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.writeValue = function (value) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.registerOnChange = function (fn) {
	            this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        RangeValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
	                        host: {
	                            '(change)': 'onChange($event.target.value)',
	                            '(input)': 'onChange($event.target.value)',
	                            '(blur)': 'onTouched()'
	                        },
	                        providers: [RANGE_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        RangeValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return RangeValueAccessor;
	    }());

	    var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * @param {?} id
	     * @param {?} value
	     * @return {?}
	     */
	    function _buildValueString(id, value) {
	        if (id == null)
	            return "" + value;
	        if (!isPrimitive(value))
	            value = 'Object';
	        return (id + ": " + value).slice(0, 50);
	    }
	    /**
	     * @param {?} valueString
	     * @return {?}
	     */
	    function _extractId(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * \@whatItDoes Writes values and listens to changes on a select element.
	     *
	     * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
	     * to keep the view synced with the {\@link FormControl} model.
	     *
	     * \@howToUse
	     *
	     * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
	     * value accessor will be active on any select control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use select controls with form directives
	     *
	     * To use a select in a template-driven form, simply add an `ngModel` and a `name`
	     * attribute to the main `<select>` tag.
	     *
	     * If your option values are simple strings, you can bind to the normal `value` property
	     * on the option.  If your option values happen to be objects (and you'd like to save the
	     * selection in your form as an object), use `ngValue` instead:
	     *
	     * {\@example forms/ts/selectControl/select_control_example.ts region='Component'}
	     *
	     * In reactive forms, you'll also want to add your form directive (`formControlName` or
	     * `formControl`) on the main `<select>` tag. Like in the former example, you have the
	     * choice of binding to the  `value` or `ngValue` property on the select's options.
	     *
	     * {\@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
	     *
	     * Note: We listen to the 'change' event because 'input' events aren't fired
	     * for selects in Firefox and IE:
	     * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
	     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var SelectControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function SelectControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.writeValue = function (value) {
	            this.value = value;
	            var /** @type {?} */ id = this._getOptionId(value);
	            if (id == null) {
	                this._renderer.setElementProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
	            }
	            var /** @type {?} */ valueString = _buildValueString(id, value);
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (valueString) {
	                _this.value = valueString;
	                fn(_this._getOptionValue(valueString));
	            };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id), value))
	                    return id;
	            }
	            return null;
	        };
	        /**
	         * \@internal
	         * @param {?} valueString
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var /** @type {?} */ id = _extractId(valueString);
	            return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
	        };
	        SelectControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
	                        host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return SelectControlValueAccessor;
	    }());
	    /**
	     * \@whatItDoes Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * \@howToUse
	     *
	     * See docs for {\@link SelectControlValueAccessor} for usage examples.
	     *
	     * \@stable
	     */
	    var NgSelectOption = (function () {
	        /**
	         * @param {?} _element
	         * @param {?} _renderer
	         * @param {?} _select
	         */
	        function NgSelectOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (this._select)
	                this.id = this._select._registerOption();
	        }
	        Object.defineProperty(NgSelectOption.prototype, "ngValue", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._select._optionMap.set(this.id, value);
	                this._setElementValue(_buildValueString(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectOption.prototype, "value", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                this._setElementValue(value);
	                if (this._select)
	                    this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        NgSelectOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        /**
	         * @return {?}
	         */
	        NgSelectOption.prototype.ngOnDestroy = function () {
	            if (this._select) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectOption.ctorParameters = function () { return [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ]; };
	        NgSelectOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectOption;
	    }());

	    var /** @type {?} */ SELECT_MULTIPLE_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectMultipleControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * @param {?} id
	     * @param {?} value
	     * @return {?}
	     */
	    function _buildValueString$1(id, value) {
	        if (id == null)
	            return "" + value;
	        if (typeof value === 'string')
	            value = "'" + value + "'";
	        if (!isPrimitive(value))
	            value = 'Object';
	        return (id + ": " + value).slice(0, 50);
	    }
	    /**
	     * @param {?} valueString
	     * @return {?}
	     */
	    function _extractId$1(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * The accessor for writing a value and listening to changes on a select element.
	     *
	     * \@stable
	     */
	    var SelectMultipleControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.writeValue = function (value) {
	            var _this = this;
	            this.value = value;
	            var /** @type {?} */ optionSelectedStateSetter;
	            if (Array.isArray(value)) {
	                // convert values to ids
	                var /** @type {?} */ ids_1 = value.map(function (v) { return _this._getOptionId(v); });
	                optionSelectedStateSetter = function (opt, o) { opt._setSelected(ids_1.indexOf(o.toString()) > -1); };
	            }
	            else {
	                optionSelectedStateSetter = function (opt, o) { opt._setSelected(false); };
	            }
	            this._optionMap.forEach(optionSelectedStateSetter);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (_) {
	                var /** @type {?} */ selected = [];
	                if (_.hasOwnProperty('selectedOptions')) {
	                    var /** @type {?} */ options = _.selectedOptions;
	                    for (var /** @type {?} */ i = 0; i < options.length; i++) {
	                        var /** @type {?} */ opt = options.item(i);
	                        var /** @type {?} */ val = _this._getOptionValue(opt.value);
	                        selected.push(val);
	                    }
	                }
	                else {
	                    var /** @type {?} */ options = (_.options);
	                    for (var /** @type {?} */ i = 0; i < options.length; i++) {
	                        var /** @type {?} */ opt = options.item(i);
	                        if (opt.selected) {
	                            var /** @type {?} */ val = _this._getOptionValue(opt.value);
	                            selected.push(val);
	                        }
	                    }
	                }
	                _this.value = selected;
	                fn(selected);
	            };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._registerOption = function (value) {
	            var /** @type {?} */ id = (this._idCounter++).toString();
	            this._optionMap.set(id, value);
	            return id;
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id)._value, value))
	                    return id;
	            }
	            return null;
	        };
	        /**
	         * \@internal
	         * @param {?} valueString
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var /** @type {?} */ id = _extractId$1(valueString);
	            return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
	        };
	        SelectMultipleControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
	                        host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectMultipleControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return SelectMultipleControlValueAccessor;
	    }());
	    /**
	     * Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * ### Example
	     *
	     * ```
	     * <select multiple name="city" ngModel>
	     *   <option *ngFor="let c of cities" [value]="c"></option>
	     * </select>
	     * ```
	     */
	    var NgSelectMultipleOption = (function () {
	        /**
	         * @param {?} _element
	         * @param {?} _renderer
	         * @param {?} _select
	         */
	        function NgSelectMultipleOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (this._select) {
	                this.id = this._select._registerOption(this);
	            }
	        }
	        Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._value = value;
	                this._setElementValue(_buildValueString$1(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select) {
	                    this._value = value;
	                    this._setElementValue(_buildValueString$1(this.id, value));
	                    this._select.writeValue(this._select.value);
	                }
	                else {
	                    this._setElementValue(value);
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        /**
	         * \@internal
	         * @param {?} selected
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype._setSelected = function (selected) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'selected', selected);
	        };
	        /**
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype.ngOnDestroy = function () {
	            if (this._select) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectMultipleOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectMultipleOption.ctorParameters = function () { return [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectMultipleControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ]; };
	        NgSelectMultipleOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectMultipleOption;
	    }());

	    /**
	     * @param {?} name
	     * @param {?} parent
	     * @return {?}
	     */
	    function controlPath(name, parent) {
	        return parent.path.concat([name]);
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function setUpControl(control, dir) {
	        if (!control)
	            _throwError(dir, 'Cannot find control with');
	        if (!dir.valueAccessor)
	            _throwError(dir, 'No value accessor for form control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	        dir.valueAccessor.writeValue(control.value);
	        // view -> model
	        dir.valueAccessor.registerOnChange(function (newValue) {
	            dir.viewToModelUpdate(newValue);
	            control.markAsDirty();
	            control.setValue(newValue, { emitModelToViewChange: false });
	        });
	        // touched
	        dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
	        control.registerOnChange(function (newValue, emitModelEvent) {
	            // control -> view
	            dir.valueAccessor.writeValue(newValue);
	            // control -> ngModel
	            if (emitModelEvent)
	                dir.viewToModelUpdate(newValue);
	        });
	        if (dir.valueAccessor.setDisabledState) {
	            control.registerOnDisabledChange(function (isDisabled) { dir.valueAccessor.setDisabledState(isDisabled); });
	        }
	        // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
	        dir._rawValidators.forEach(function (validator) {
	            if (((validator)).registerOnValidatorChange)
	                ((validator)).registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	        dir._rawAsyncValidators.forEach(function (validator) {
	            if (((validator)).registerOnValidatorChange)
	                ((validator)).registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function cleanUpControl(control, dir) {
	        dir.valueAccessor.registerOnChange(function () { return _noControlError(dir); });
	        dir.valueAccessor.registerOnTouched(function () { return _noControlError(dir); });
	        dir._rawValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange) {
	                validator.registerOnValidatorChange(null);
	            }
	        });
	        dir._rawAsyncValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange) {
	                validator.registerOnValidatorChange(null);
	            }
	        });
	        if (control)
	            control._clearChangeFns();
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function setUpFormContainer(control, dir) {
	        if (isBlank(control))
	            _throwError(dir, 'Cannot find control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	    }
	    /**
	     * @param {?} dir
	     * @return {?}
	     */
	    function _noControlError(dir) {
	        return _throwError(dir, 'There is no FormControl instance attached to form control element with');
	    }
	    /**
	     * @param {?} dir
	     * @param {?} message
	     * @return {?}
	     */
	    function _throwError(dir, message) {
	        var /** @type {?} */ messageEnd;
	        if (dir.path.length > 1) {
	            messageEnd = "path: '" + dir.path.join(' -> ') + "'";
	        }
	        else if (dir.path[0]) {
	            messageEnd = "name: '" + dir.path + "'";
	        }
	        else {
	            messageEnd = 'unspecified name attribute';
	        }
	        throw new Error(message + " " + messageEnd);
	    }
	    /**
	     * @param {?} validators
	     * @return {?}
	     */
	    function composeValidators(validators) {
	        return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
	    }
	    /**
	     * @param {?} validators
	     * @return {?}
	     */
	    function composeAsyncValidators(validators) {
	        return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
	            null;
	    }
	    /**
	     * @param {?} changes
	     * @param {?} viewModel
	     * @return {?}
	     */
	    function isPropertyUpdated(changes, viewModel) {
	        if (!changes.hasOwnProperty('model'))
	            return false;
	        var /** @type {?} */ change = changes['model'];
	        if (change.isFirstChange())
	            return true;
	        return !looseIdentical(viewModel, change.currentValue);
	    }
	    var /** @type {?} */ BUILTIN_ACCESSORS = [
	        CheckboxControlValueAccessor,
	        RangeValueAccessor,
	        NumberValueAccessor,
	        SelectControlValueAccessor,
	        SelectMultipleControlValueAccessor,
	        RadioControlValueAccessor,
	    ];
	    /**
	     * @param {?} valueAccessor
	     * @return {?}
	     */
	    function isBuiltInAccessor(valueAccessor) {
	        return BUILTIN_ACCESSORS.some(function (a) { return valueAccessor.constructor === a; });
	    }
	    /**
	     * @param {?} dir
	     * @param {?} valueAccessors
	     * @return {?}
	     */
	    function selectValueAccessor(dir, valueAccessors) {
	        if (!valueAccessors)
	            return null;
	        var /** @type {?} */ defaultAccessor;
	        var /** @type {?} */ builtinAccessor;
	        var /** @type {?} */ customAccessor;
	        valueAccessors.forEach(function (v) {
	            if (v.constructor === DefaultValueAccessor) {
	                defaultAccessor = v;
	            }
	            else if (isBuiltInAccessor(v)) {
	                if (builtinAccessor)
	                    _throwError(dir, 'More than one built-in value accessor matches form control with');
	                builtinAccessor = v;
	            }
	            else {
	                if (customAccessor)
	                    _throwError(dir, 'More than one custom value accessor matches form control with');
	                customAccessor = v;
	            }
	        });
	        if (customAccessor)
	            return customAccessor;
	        if (builtinAccessor)
	            return builtinAccessor;
	        if (defaultAccessor)
	            return defaultAccessor;
	        _throwError(dir, 'No valid value accessor for form control with');
	        return null;
	    }

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * This is a base class for code shared between {\@link NgModelGroup} and {\@link FormGroupName}.
	     *
	     * \@stable
	     */
	    var AbstractFormGroupDirective = (function (_super) {
	        __extends(AbstractFormGroupDirective, _super);
	        function AbstractFormGroupDirective() {
	            _super.apply(this, arguments);
	        }
	        /**
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormGroup(this);
	        };
	        /**
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormGroup(this);
	            }
	        };
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
	            /**
	             * Get the {\@link FormGroup} backing this binding.
	             * @return {?}
	             */
	            get: function () { return this.formDirective.getFormGroup(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
	            /**
	             * Get the path to this control group.
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
	            /**
	             * Get the {\@link Form} to which this group belongs.
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype._checkParentType = function () { };
	        return AbstractFormGroupDirective;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$3 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var AbstractControlStatus = (function () {
	        /**
	         * @param {?} cd
	         */
	        function AbstractControlStatus(cd) {
	            this._cd = cd;
	        }
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.untouched : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.touched : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.pristine : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.dirty : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.valid : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.invalid : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.pending : false; },
	            enumerable: true,
	            configurable: true
	        });
	        return AbstractControlStatus;
	    }());
	    var /** @type {?} */ ngControlStatusHost = {
	        '[class.ng-untouched]': 'ngClassUntouched',
	        '[class.ng-touched]': 'ngClassTouched',
	        '[class.ng-pristine]': 'ngClassPristine',
	        '[class.ng-dirty]': 'ngClassDirty',
	        '[class.ng-valid]': 'ngClassValid',
	        '[class.ng-invalid]': 'ngClassInvalid',
	        '[class.ng-pending]': 'ngClassPending',
	    };
	    /**
	     * Directive automatically applied to Angular form controls that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * \@stable
	     */
	    var NgControlStatus = (function (_super) {
	        __extends$3(NgControlStatus, _super);
	        /**
	         * @param {?} cd
	         */
	        function NgControlStatus(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatus.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
	        ];
	        /** @nocollapse */
	        NgControlStatus.ctorParameters = function () { return [
	            { type: NgControl, decorators: [{ type: _angular_core.Self },] },
	        ]; };
	        return NgControlStatus;
	    }(AbstractControlStatus));
	    /**
	     * Directive automatically applied to Angular form groups that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * \@stable
	     */
	    var NgControlStatusGroup = (function (_super) {
	        __extends$3(NgControlStatusGroup, _super);
	        /**
	         * @param {?} cd
	         */
	        function NgControlStatusGroup(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatusGroup.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
	                        host: ngControlStatusHost
	                    },] },
	        ];
	        /** @nocollapse */
	        NgControlStatusGroup.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Self },] },
	        ]; };
	        return NgControlStatusGroup;
	    }(AbstractControlStatus));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$5 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Use by directives and components to emit custom Events.
	     *
	     * ### Examples
	     *
	     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	     * title gets clicked:
	     *
	     * ```
	     * \@Component({
	     *   selector: 'zippy',
	     *   template: `
	     *   <div class="zippy">
	     *     <div (click)="toggle()">Toggle</div>
	     *     <div [hidden]="!visible">
	     *       <ng-content></ng-content>
	     *     </div>
	     *  </div>`})
	     * export class Zippy {
	     *   visible: boolean = true;
	     *   \@Output() open: EventEmitter<any> = new EventEmitter();
	     *   \@Output() close: EventEmitter<any> = new EventEmitter();
	     *
	     *   toggle() {
	     *     this.visible = !this.visible;
	     *     if (this.visible) {
	     *       this.open.emit(null);
	     *     } else {
	     *       this.close.emit(null);
	     *     }
	     *   }
	     * }
	     * ```
	     *
	     * The events payload can be accessed by the parameter `$event` on the components output event
	     * handler:
	     *
	     * ```
	     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	     * ```
	     *
	     * Uses Rx.Observable but provides an adapter to make it work as specified here:
	     * https://github.com/jhusain/observable-spec
	     *
	     * Once a reference implementation of the spec is available, switch to it.
	     * \@stable
	     */
	    var EventEmitter = (function (_super) {
	        __extends$5(EventEmitter, _super);
	        /**
	         * Creates an instance of [EventEmitter], which depending on [isAsync],
	         * delivers events synchronously or asynchronously.
	         * @param {?=} isAsync
	         */
	        function EventEmitter(isAsync) {
	            if (isAsync === void 0) { isAsync = false; }
	            _super.call(this);
	            this.__isAsync = isAsync;
	        }
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	        /**
	         * @param {?=} generatorOrNext
	         * @param {?=} error
	         * @param {?=} complete
	         * @return {?}
	         */
	        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	            var /** @type {?} */ schedulerFn;
	            var /** @type {?} */ errorFn = function (err) { return null; };
	            var /** @type {?} */ completeFn = function () { return null; };
	            if (generatorOrNext && typeof generatorOrNext === 'object') {
	                schedulerFn = this.__isAsync ? function (value) {
	                    setTimeout(function () { return generatorOrNext.next(value); });
	                } : function (value) { generatorOrNext.next(value); };
	                if (generatorOrNext.error) {
	                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                        function (err) { generatorOrNext.error(err); };
	                }
	                if (generatorOrNext.complete) {
	                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                        function () { generatorOrNext.complete(); };
	                }
	            }
	            else {
	                schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
	                    function (value) { generatorOrNext(value); };
	                if (error) {
	                    errorFn =
	                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	                }
	                if (complete) {
	                    completeFn =
	                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	                }
	            }
	            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	        };
	        return EventEmitter;
	    }(rxjs_Subject.Subject));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$6 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
	     */
	    var /** @type {?} */ VALID = 'VALID';
	    /**
	     * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
	     */
	    var /** @type {?} */ INVALID = 'INVALID';
	    /**
	     * Indicates that a FormControl is pending, i.e. that async validation is occurring and
	     * errors are not yet available for the input value.
	     */
	    var /** @type {?} */ PENDING = 'PENDING';
	    /**
	     * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
	     * calculations of validity or value.
	     */
	    var /** @type {?} */ DISABLED = 'DISABLED';
	    /**
	     * @param {?} control
	     * @param {?} path
	     * @param {?} delimiter
	     * @return {?}
	     */
	    function _find(control, path, delimiter) {
	        if (path == null)
	            return null;
	        if (!(path instanceof Array)) {
	            path = ((path)).split(delimiter);
	        }
	        if (path instanceof Array && (path.length === 0))
	            return null;
	        return ((path)).reduce(function (v, name) {
	            if (v instanceof FormGroup) {
	                return v.controls[name] || null;
	            }
	            if (v instanceof FormArray) {
	                return v.at(/** @type {?} */ (name)) || null;
	            }
	            return null;
	        }, control);
	    }
	    /**
	     * @param {?} r
	     * @return {?}
	     */
	    function toObservable(r) {
	        return isPromise(r) ? rxjs_observable_fromPromise.fromPromise(r) : r;
	    }
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function coerceToValidator(validator) {
	        return Array.isArray(validator) ? composeValidators(validator) : validator;
	    }
	    /**
	     * @param {?} asyncValidator
	     * @return {?}
	     */
	    function coerceToAsyncValidator(asyncValidator) {
	        return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator;
	    }
	    /**
	     * \@whatItDoes This is the base class for {\@link FormControl}, {\@link FormGroup}, and
	     * {\@link FormArray}.
	     *
	     * It provides some of the shared behavior that all controls and groups of controls have, like
	     * running validators, calculating status, and resetting state. It also defines the properties
	     * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
	     * instantiated directly.
	     *
	     * \@stable
	     * @abstract
	     */
	    var AbstractControl = (function () {
	        /**
	         * @param {?} validator
	         * @param {?} asyncValidator
	         */
	        function AbstractControl(validator, asyncValidator) {
	            this.validator = validator;
	            this.asyncValidator = asyncValidator;
	            /** @internal */
	            this._onCollectionChange = function () { };
	            this._pristine = true;
	            this._touched = false;
	            /** @internal */
	            this._onDisabledChange = [];
	        }
	        Object.defineProperty(AbstractControl.prototype, "value", {
	            /**
	             * The value of the control.
	             * @return {?}
	             */
	            get: function () { return this._value; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "parent", {
	            /**
	             * The parent control.
	             * @return {?}
	             */
	            get: function () { return this._parent; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "status", {
	            /**
	             * The validation status of the control. There are four possible
	             * validation statuses:
	             *
	             * * **VALID**:  control has passed all validation checks
	             * * **INVALID**: control has failed at least one validation check
	             * * **PENDING**: control is in the midst of conducting a validation check
	             * * **DISABLED**: control is exempt from validation checks
	             *
	             * These statuses are mutually exclusive, so a control cannot be
	             * both valid AND invalid or invalid AND disabled.
	             * @return {?}
	             */
	            get: function () { return this._status; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valid", {
	            /**
	             * A control is `valid` when its `status === VALID`.
	             *
	             * In order to have this status, the control must have passed all its
	             * validation checks.
	             * @return {?}
	             */
	            get: function () { return this._status === VALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "invalid", {
	            /**
	             * A control is `invalid` when its `status === INVALID`.
	             *
	             * In order to have this status, the control must have failed
	             * at least one of its validation checks.
	             * @return {?}
	             */
	            get: function () { return this._status === INVALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pending", {
	            /**
	             * A control is `pending` when its `status === PENDING`.
	             *
	             * In order to have this status, the control must be in the
	             * middle of conducting a validation check.
	             * @return {?}
	             */
	            get: function () { return this._status == PENDING; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "disabled", {
	            /**
	             * A control is `disabled` when its `status === DISABLED`.
	             *
	             * Disabled controls are exempt from validation checks and
	             * are not included in the aggregate value of their ancestor
	             * controls.
	             * @return {?}
	             */
	            get: function () { return this._status === DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "enabled", {
	            /**
	             * A control is `enabled` as long as its `status !== DISABLED`.
	             *
	             * In other words, it has a status of `VALID`, `INVALID`, or
	             * `PENDING`.
	             * @return {?}
	             */
	            get: function () { return this._status !== DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "errors", {
	            /**
	             * Returns any errors generated by failing validation. If there
	             * are no errors, it will return null.
	             * @return {?}
	             */
	            get: function () { return this._errors; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pristine", {
	            /**
	             * A control is `pristine` if the user has not yet changed
	             * the value in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             * @return {?}
	             */
	            get: function () { return this._pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "dirty", {
	            /**
	             * A control is `dirty` if the user has changed the value
	             * in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             * @return {?}
	             */
	            get: function () { return !this.pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "touched", {
	            /**
	             * A control is marked `touched` once the user has triggered
	             * a `blur` event on it.
	             * @return {?}
	             */
	            get: function () { return this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "untouched", {
	            /**
	             * A control is `untouched` if the user has not yet triggered
	             * a `blur` event on it.
	             * @return {?}
	             */
	            get: function () { return !this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valueChanges", {
	            /**
	             * Emits an event every time the value of the control changes, in
	             * the UI or programmatically.
	             * @return {?}
	             */
	            get: function () { return this._valueChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "statusChanges", {
	            /**
	             * Emits an event every time the validation status of the control
	             * is re-calculated.
	             * @return {?}
	             */
	            get: function () { return this._statusChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Sets the synchronous validators that are active on this control.  Calling
	         * this will overwrite any existing sync validators.
	         * @param {?} newValidator
	         * @return {?}
	         */
	        AbstractControl.prototype.setValidators = function (newValidator) {
	            this.validator = coerceToValidator(newValidator);
	        };
	        /**
	         * Sets the async validators that are active on this control. Calling this
	         * will overwrite any existing async validators.
	         * @param {?} newValidator
	         * @return {?}
	         */
	        AbstractControl.prototype.setAsyncValidators = function (newValidator) {
	            this.asyncValidator = coerceToAsyncValidator(newValidator);
	        };
	        /**
	         * Empties out the sync validator list.
	         * @return {?}
	         */
	        AbstractControl.prototype.clearValidators = function () { this.validator = null; };
	        /**
	         * Empties out the async validator list.
	         * @return {?}
	         */
	        AbstractControl.prototype.clearAsyncValidators = function () { this.asyncValidator = null; };
	        /**
	         * Marks the control as `touched`.
	         *
	         * This will also mark all direct ancestors as `touched` to maintain
	         * the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = true;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `untouched`.
	         *
	         * If the control has any children, it will also mark all children as `untouched`
	         * to maintain the model, and re-calculate the `touched` status of all parent
	         * controls.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsUntouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = false;
	            this._forEachChild(function (control) { control.markAsUntouched({ onlySelf: true }); });
	            if (this._parent && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `dirty`.
	         *
	         * This will also mark all direct ancestors as `dirty` to maintain
	         * the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsDirty = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = false;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsDirty({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pristine`.
	         *
	         * If the control has any children, it will also mark all children as `pristine`
	         * to maintain the model, and re-calculate the `pristine` status of all parent
	         * controls.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsPristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = true;
	            this._forEachChild(function (control) { control.markAsPristine({ onlySelf: true }); });
	            if (this._parent && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pending`.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsPending = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._status = PENDING;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsPending({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Disables the control. This means the control will be exempt from validation checks and
	         * excluded from the aggregate value of any parent. Its status is `DISABLED`.
	         *
	         * If the control has children, all children will be disabled to maintain the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.disable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._status = DISABLED;
	            this._errors = null;
	            this._forEachChild(function (control) { control.disable({ onlySelf: true }); });
	            this._updateValue();
	            if (emitEvent !== false) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(true); });
	        };
	        /**
	         * Enables the control. This means the control will be included in validation checks and
	         * the aggregate value of its parent. Its status is re-calculated based on its value and
	         * its validators.
	         *
	         * If the control has children, all children will be enabled.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.enable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._status = VALID;
	            this._forEachChild(function (control) { control.enable({ onlySelf: true }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(false); });
	        };
	        /**
	         * @param {?} onlySelf
	         * @return {?}
	         */
	        AbstractControl.prototype._updateAncestors = function (onlySelf) {
	            if (this._parent && !onlySelf) {
	                this._parent.updateValueAndValidity();
	                this._parent._updatePristine();
	                this._parent._updateTouched();
	            }
	        };
	        /**
	         * @param {?} parent
	         * @return {?}
	         */
	        AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
	        /**
	         * Sets the value of the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.setValue = function (value, options) { };
	        /**
	         * Patches the value of the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.patchValue = function (value, options) { };
	        /**
	         * Resets the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?=} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.reset = function (value, options) { };
	        /**
	         * Re-calculates the value and validation status of the control.
	         *
	         * By default, it will also update the value and validity of its ancestors.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.updateValueAndValidity = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._setInitialStatus();
	            this._updateValue();
	            if (this.enabled) {
	                this._errors = this._runValidator();
	                this._status = this._calculateStatus();
	                if (this._status === VALID || this._status === PENDING) {
	                    this._runAsyncValidator(emitEvent);
	                }
	            }
	            if (emitEvent !== false) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            if (this._parent && !onlySelf) {
	                this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updateTreeValidity = function (_a) {
	            var emitEvent = (_a === void 0 ? { emitEvent: true } : _a).emitEvent;
	            this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity({ emitEvent: emitEvent }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._setInitialStatus = function () { this._status = this._allControlsDisabled() ? DISABLED : VALID; };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._runValidator = function () {
	            return this.validator ? this.validator(this) : null;
	        };
	        /**
	         * @param {?} emitEvent
	         * @return {?}
	         */
	        AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
	            var _this = this;
	            if (this.asyncValidator) {
	                this._status = PENDING;
	                this._cancelExistingSubscription();
	                var /** @type {?} */ obs = toObservable(this.asyncValidator(this));
	                if (!(isObservable(obs))) {
	                    throw new Error("expected the following validator to return Promise or Observable: " + this.asyncValidator + ". If you are using FormBuilder; did you forget to brace your validators in an array?");
	                }
	                this._asyncValidationSubscription =
	                    obs.subscribe({ next: function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); } });
	            }
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._cancelExistingSubscription = function () {
	            if (this._asyncValidationSubscription) {
	                this._asyncValidationSubscription.unsubscribe();
	            }
	        };
	        /**
	         * Sets errors on a form control.
	         *
	         * This is used when validations are run manually by the user, rather than automatically.
	         *
	         * Calling `setErrors` will also update the validity of the parent control.
	         *
	         * ### Example
	         *
	         * ```
	         * const login = new FormControl("someLogin");
	         * login.setErrors({
	         *   "notUnique": true
	         * });
	         *
	         * expect(login.valid).toEqual(false);
	         * expect(login.errors).toEqual({"notUnique": true});
	         *
	         * login.setValue("someOtherLogin");
	         *
	         * expect(login.valid).toEqual(true);
	         * ```
	         * @param {?} errors
	         * @param {?=} __1
	         * @return {?}
	         */
	        AbstractControl.prototype.setErrors = function (errors, _a) {
	            var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
	            this._errors = errors;
	            this._updateControlsErrors(emitEvent !== false);
	        };
	        /**
	         * Retrieves a child control given the control's name or path.
	         *
	         * Paths can be passed in as an array or a string delimited by a dot.
	         *
	         * To get a control nested within a `person` sub-group:
	         *
	         * * `this.form.get('person.name');`
	         *
	         * -OR-
	         *
	         * * `this.form.get(['person', 'name']);`
	         * @param {?} path
	         * @return {?}
	         */
	        AbstractControl.prototype.get = function (path) { return _find(this, path, '.'); };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns null or undefined.
	         *
	         * If no path is given, it checks for the error on the present control.
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControl.prototype.getError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            var /** @type {?} */ control = path ? this.get(path) : this;
	            return control && control._errors ? control._errors[errorCode] : null;
	        };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns false.
	         *
	         * If no path is given, it checks for the error on the present control.
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControl.prototype.hasError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return !!this.getError(errorCode, path);
	        };
	        Object.defineProperty(AbstractControl.prototype, "root", {
	            /**
	             * Retrieves the top-level ancestor of this control.
	             * @return {?}
	             */
	            get: function () {
	                var /** @type {?} */ x = this;
	                while (x._parent) {
	                    x = x._parent;
	                }
	                return x;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} emitEvent
	         * @return {?}
	         */
	        AbstractControl.prototype._updateControlsErrors = function (emitEvent) {
	            this._status = this._calculateStatus();
	            if (emitEvent) {
	                this._statusChanges.emit(this._status);
	            }
	            if (this._parent) {
	                this._parent._updateControlsErrors(emitEvent);
	            }
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._initObservables = function () {
	            this._valueChanges = new EventEmitter();
	            this._statusChanges = new EventEmitter();
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._calculateStatus = function () {
	            if (this._allControlsDisabled())
	                return DISABLED;
	            if (this._errors)
	                return INVALID;
	            if (this._anyControlsHaveStatus(PENDING))
	                return PENDING;
	            if (this._anyControlsHaveStatus(INVALID))
	                return INVALID;
	            return VALID;
	        };
	        /**
	         * \@internal
	         * @abstract
	         * @return {?}
	         */
	        AbstractControl.prototype._updateValue = function () { };
	        /**
	         * \@internal
	         * @abstract
	         * @param {?} cb
	         * @return {?}
	         */
	        AbstractControl.prototype._forEachChild = function (cb) { };
	        /**
	         * \@internal
	         * @abstract
	         * @param {?} condition
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControls = function (condition) { };
	        /**
	         * \@internal
	         * @abstract
	         * @return {?}
	         */
	        AbstractControl.prototype._allControlsDisabled = function () { };
	        /**
	         * \@internal
	         * @param {?} status
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsHaveStatus = function (status) {
	            return this._anyControls(function (control) { return control.status === status; });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsDirty = function () {
	            return this._anyControls(function (control) { return control.dirty; });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsTouched = function () {
	            return this._anyControls(function (control) { return control.touched; });
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updatePristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = !this._anyControlsDirty();
	            if (this._parent && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updateTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = this._anyControlsTouched();
	            if (this._parent && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} formState
	         * @return {?}
	         */
	        AbstractControl.prototype._isBoxedValue = function (formState) {
	            return typeof formState === 'object' && formState !== null &&
	                Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
	        };
	        /**
	         * \@internal
	         * @param {?} fn
	         * @return {?}
	         */
	        AbstractControl.prototype._registerOnCollectionChange = function (fn) { this._onCollectionChange = fn; };
	        return AbstractControl;
	    }());
	    /**
	     * \@whatItDoes Tracks the value and validation status of an individual form control.
	     *
	     * It is one of the three fundamental building blocks of Angular forms, along with
	     * {\@link FormGroup} and {\@link FormArray}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormControl}, you can pass in an initial value as the
	     * first argument. Example:
	     *
	     * ```ts
	     * const ctrl = new FormControl('some value');
	     * console.log(ctrl.value);     // 'some value'
	     * ```
	     *
	     * You can also initialize the control with a form state object on instantiation,
	     * which includes both the value and whether or not the control is disabled.
	     * You can't use the value key without the disabled key; both are required
	     * to use this way of initialization.
	     *
	     * ```ts
	     * const ctrl = new FormControl({value: 'n/a', disabled: true});
	     * console.log(ctrl.value);     // 'n/a'
	     * console.log(ctrl.status);   // 'DISABLED'
	     * ```
	     *
	     * To include a sync validator (or an array of sync validators) with the control,
	     * pass it in as the second argument. Async validators are also supported, but
	     * have to be passed in separately as the third arg.
	     *
	     * ```ts
	     * const ctrl = new FormControl('', Validators.required);
	     * console.log(ctrl.value);     // ''
	     * console.log(ctrl.status);   // 'INVALID'
	     * ```
	     *
	     * See its superclass, {\@link AbstractControl}, for more properties and methods.
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormControl = (function (_super) {
	        __extends$6(FormControl, _super);
	        /**
	         * @param {?=} formState
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormControl(formState, validator, asyncValidator) {
	            if (formState === void 0) { formState = null; }
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, coerceToValidator(validator), coerceToAsyncValidator(asyncValidator));
	            /** @internal */
	            this._onChange = [];
	            this._applyFormState(formState);
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	            this._initObservables();
	        }
	        /**
	         * Set the value of the form control to `value`.
	         *
	         * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
	         * and not its parent component. This defaults to false.
	         *
	         * If `emitEvent` is `true`, this
	         * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
	         * to true (as it falls through to `updateValueAndValidity`).
	         *
	         * If `emitModelToViewChange` is `true`, the view will be notified about the new value
	         * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
	         * specified.
	         *
	         * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
	         * model.  This is the default behavior if `emitViewToModelChange` is not specified.
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormControl.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange, emitViewToModelChange = _b.emitViewToModelChange;
	            this._value = value;
	            if (this._onChange.length && emitModelToViewChange !== false) {
	                this._onChange.forEach(function (changeFn) { return changeFn(_this._value, emitViewToModelChange !== false); });
	            }
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Patches the value of a control.
	         *
	         * This function is functionally the same as {\@link FormControl.setValue} at this level.
	         * It exists for symmetry with {\@link FormGroup.patchValue} on `FormGroups` and `FormArrays`,
	         * where it does behave differently.
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        FormControl.prototype.patchValue = function (value, options) {
	            if (options === void 0) { options = {}; }
	            this.setValue(value, options);
	        };
	        /**
	         * Resets the form control. This means by default:
	         *
	         * * it is marked as `pristine`
	         * * it is marked as `untouched`
	         * * value is set to null
	         *
	         * You can also reset to a specific form state by passing through a standalone
	         * value or a form state object that contains both a value and a disabled state
	         * (these are the only two properties that cannot be calculated).
	         *
	         * Ex:
	         *
	         * ```ts
	         * this.control.reset('Nancy');
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * ```
	         *
	         * OR
	         *
	         * ```
	         * this.control.reset({value: 'Nancy', disabled: true});
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * console.log(this.control.status);  // 'DISABLED'
	         * ```
	         * @param {?=} formState
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormControl.prototype.reset = function (formState, _a) {
	            if (formState === void 0) { formState = null; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._applyFormState(formState);
	            this.markAsPristine({ onlySelf: onlySelf });
	            this.markAsUntouched({ onlySelf: onlySelf });
	            this.setValue(this._value, { onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._updateValue = function () { };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormControl.prototype._anyControls = function (condition) { return false; };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._allControlsDisabled = function () { return this.disabled; };
	        /**
	         * Register a listener for change events.
	         * @param {?} fn
	         * @return {?}
	         */
	        FormControl.prototype.registerOnChange = function (fn) { this._onChange.push(fn); };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._clearChangeFns = function () {
	            this._onChange = [];
	            this._onDisabledChange = [];
	            this._onCollectionChange = function () { };
	        };
	        /**
	         * Register a listener for disabled events.
	         * @param {?} fn
	         * @return {?}
	         */
	        FormControl.prototype.registerOnDisabledChange = function (fn) {
	            this._onDisabledChange.push(fn);
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormControl.prototype._forEachChild = function (cb) { };
	        /**
	         * @param {?} formState
	         * @return {?}
	         */
	        FormControl.prototype._applyFormState = function (formState) {
	            if (this._isBoxedValue(formState)) {
	                this._value = formState.value;
	                formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
	                    this.enable({ onlySelf: true, emitEvent: false });
	            }
	            else {
	                this._value = formState;
	            }
	        };
	        return FormControl;
	    }(AbstractControl));
	    /**
	     * \@whatItDoes Tracks the value and validity state of a group of {\@link FormControl}
	     * instances.
	     *
	     * A `FormGroup` aggregates the values of each child {\@link FormControl} into one object,
	     * with each control name as the key.  It calculates its status by reducing the statuses
	     * of its children. For example, if one of the controls in a group is invalid, the entire
	     * group becomes invalid.
	     *
	     * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {\@link FormControl} and {\@link FormArray}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormGroup}, pass in a collection of child controls as the first
	     * argument. The key for each child will be the name under which it is registered.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   first: new FormControl('Nancy', Validators.minLength(2)),
	     *   last: new FormControl('Drew'),
	     * });
	     *
	     * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
	     * console.log(form.status);  // 'VALID'
	     * ```
	     *
	     * You can also include group-level validators as the second arg, or group-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   password: new FormControl('', Validators.minLength(2)),
	     *   passwordConfirm: new FormControl('', Validators.minLength(2)),
	     * }, passwordMatchValidator);
	     *
	     *
	     * function passwordMatchValidator(g: FormGroup) {
	     *    return g.get('password').value === g.get('passwordConfirm').value
	     *       ? null : {'mismatch': true};
	     * }
	     * ```
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormGroup = (function (_super) {
	        __extends$6(FormGroup, _super);
	        /**
	         * @param {?} controls
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormGroup(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Registers a control with the group's list of controls.
	         *
	         * This method does not update value or validity of the control, so for
	         * most cases you'll want to use {\@link FormGroup.addControl} instead.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.registerControl = function (name, control) {
	            if (this.controls[name])
	                return this.controls[name];
	            this.controls[name] = control;
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	            return control;
	        };
	        /**
	         * Add a control to this group.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.addControl = function (name, control) {
	            this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove a control from this group.
	         * @param {?} name
	         * @return {?}
	         */
	        FormGroup.prototype.removeControl = function (name) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.setControl = function (name, control) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            if (control)
	                this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Check whether there is an enabled control with the given name in the group.
	         *
	         * It will return false for disabled controls. If you'd like to check for
	         * existence in the group only, use {\@link AbstractControl.get} instead.
	         * @param {?} controlName
	         * @return {?}
	         */
	        FormGroup.prototype.contains = function (controlName) {
	            return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
	        };
	        /**
	         *  Sets the value of the {\@link FormGroup}. It accepts an object that matches
	         *  the structure of the group, with control names as keys.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.setValue({first: 'Nancy', last: 'Drew'});
	         *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
	         *
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._checkAllValuesPresent(value);
	            Object.keys(value).forEach(function (name) {
	                _this._throwIfControlMissing(name);
	                _this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         *  Patches the value of the {\@link FormGroup}. It accepts an object with control
	         *  names as keys, and will do its best to match the values to the correct controls
	         *  in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the group without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.patchValue({first: 'Nancy'});
	         *  console.log(form.value);   // {first: 'Nancy', last: null}
	         *
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            Object.keys(value).forEach(function (name) {
	                if (_this.controls[name]) {
	                    _this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: emitEvent });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Resets the {\@link FormGroup}. This means by default:
	         *
	         * * The group and all descendants are marked `pristine`
	         * * The group and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in a map of states
	         * that matches the structure of your form, with control names as keys. The state
	         * can be a standalone value or a form state object with both a value and a disabled
	         * status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.form.reset({first: 'name', last: 'last name'});
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.form.reset({
	         *   first: {value: 'name', disabled: true},
	         *   last: 'last'
	         * });
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * console.log(this.form.get('first').status);  // 'DISABLED'
	         * ```
	         * @param {?=} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = {}; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._forEachChild(function (control, name) {
	                control.reset(value[name], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the {\@link FormGroup}, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the group.
	         * @return {?}
	         */
	        FormGroup.prototype.getRawValue = function () {
	            return this._reduceChildren({}, function (acc, control, name) {
	                acc[name] = control instanceof FormControl ? control.value : ((control)).getRawValue();
	                return acc;
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} name
	         * @return {?}
	         */
	        FormGroup.prototype._throwIfControlMissing = function (name) {
	            if (!Object.keys(this.controls).length) {
	                throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.controls[name]) {
	                throw new Error("Cannot find form control with name: " + name + ".");
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormGroup.prototype._forEachChild = function (cb) {
	            var _this = this;
	            Object.keys(this.controls).forEach(function (k) { return cb(_this.controls[k], k); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) {
	                control.setParent(_this);
	                control._registerOnCollectionChange(_this._onCollectionChange);
	            });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormGroup.prototype._anyControls = function (condition) {
	            var _this = this;
	            var /** @type {?} */ res = false;
	            this._forEachChild(function (control, name) {
	                res = res || (_this.contains(name) && condition(control));
	            });
	            return res;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._reduceValue = function () {
	            var _this = this;
	            return this._reduceChildren({}, function (acc, control, name) {
	                if (control.enabled || _this.disabled) {
	                    acc[name] = control.value;
	                }
	                return acc;
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} initValue
	         * @param {?} fn
	         * @return {?}
	         */
	        FormGroup.prototype._reduceChildren = function (initValue, fn) {
	            var /** @type {?} */ res = initValue;
	            this._forEachChild(function (control, name) { res = fn(res, control, name); });
	            return res;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
	                var controlName = _a[_i];
	                if (this.controls[controlName].enabled) {
	                    return false;
	                }
	            }
	            return Object.keys(this.controls).length > 0 || this.disabled;
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        FormGroup.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, name) {
	                if (value[name] === undefined) {
	                    throw new Error("Must supply a value for form control with name: '" + name + "'.");
	                }
	            });
	        };
	        return FormGroup;
	    }(AbstractControl));
	    /**
	     * \@whatItDoes Tracks the value and validity state of an array of {\@link FormControl},
	     * {\@link FormGroup} or {\@link FormArray} instances.
	     *
	     * A `FormArray` aggregates the values of each child {\@link FormControl} into an array.
	     * It calculates its status by reducing the statuses of its children. For example, if one of
	     * the controls in a `FormArray` is invalid, the entire array becomes invalid.
	     *
	     * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {\@link FormControl} and {\@link FormGroup}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormArray}, pass in an array of child controls as the first
	     * argument.
	     *
	     * ### Example
	     *
	     * ```
	     * const arr = new FormArray([
	     *   new FormControl('Nancy', Validators.minLength(2)),
	     *   new FormControl('Drew'),
	     * ]);
	     *
	     * console.log(arr.value);   // ['Nancy', 'Drew']
	     * console.log(arr.status);  // 'VALID'
	     * ```
	     *
	     * You can also include array-level validators as the second arg, or array-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Adding or removing controls
	     *
	     * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
	     * in `FormArray` itself. These methods ensure the controls are properly tracked in the
	     * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
	     * the `FormArray` directly, as that will result in strange and unexpected behavior such
	     * as broken change detection.
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormArray = (function (_super) {
	        __extends$6(FormArray, _super);
	        /**
	         * @param {?} controls
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormArray(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Get the {\@link AbstractControl} at the given `index` in the array.
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype.at = function (index) { return this.controls[index]; };
	        /**
	         * Insert a new {\@link AbstractControl} at the end of the array.
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.push = function (control) {
	            this.controls.push(control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Insert a new {\@link AbstractControl} at the given `index` in the array.
	         * @param {?} index
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.insert = function (index, control) {
	            this.controls.splice(index, 0, control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove the control at the given `index` in the array.
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype.removeAt = function (index) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            this.controls.splice(index, 1);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         * @param {?} index
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.setControl = function (index, control) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            this.controls.splice(index, 1);
	            if (control) {
	                this.controls.splice(index, 0, control);
	                this._registerControl(control);
	            }
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        Object.defineProperty(FormArray.prototype, "length", {
	            /**
	             * Length of the control array.
	             * @return {?}
	             */
	            get: function () { return this.controls.length; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         *  Sets the value of the {\@link FormArray}. It accepts an array that matches
	         *  the structure of the control.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.setValue(['Nancy', 'Drew']);
	         *  console.log(arr.value);   // ['Nancy', 'Drew']
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._checkAllValuesPresent(value);
	            value.forEach(function (newValue, index) {
	                _this._throwIfControlMissing(index);
	                _this.at(index).setValue(newValue, { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         *  Patches the value of the {\@link FormArray}. It accepts an array that matches the
	         *  structure of the control, and will do its best to match the values to the correct
	         *  controls in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the array without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.patchValue(['Nancy']);
	         *  console.log(arr.value);   // ['Nancy', null]
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            value.forEach(function (newValue, index) {
	                if (_this.at(index)) {
	                    _this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: emitEvent });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Resets the {\@link FormArray}. This means by default:
	         *
	         * * The array and all descendants are marked `pristine`
	         * * The array and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in an array of states
	         * that matches the structure of the control. The state can be a standalone value
	         * or a form state object with both a value and a disabled status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.arr.reset(['name', 'last name']);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.arr.reset([
	         *   {value: 'name', disabled: true},
	         *   'last'
	         * ]);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * console.log(this.arr.get(0).status);  // 'DISABLED'
	         * ```
	         * @param {?=} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = []; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._forEachChild(function (control, index) {
	                control.reset(value[index], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the array, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the array.
	         * @return {?}
	         */
	        FormArray.prototype.getRawValue = function () {
	            return this.controls.map(function (control) {
	                return control instanceof FormControl ? control.value : ((control)).getRawValue();
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype._throwIfControlMissing = function (index) {
	            if (!this.controls.length) {
	                throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.at(index)) {
	                throw new Error("Cannot find form control at index " + index);
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormArray.prototype._forEachChild = function (cb) {
	            this.controls.forEach(function (control, index) { cb(control, index); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._updateValue = function () {
	            var _this = this;
	            this._value = this.controls.filter(function (control) { return control.enabled || _this.disabled; })
	                .map(function (control) { return control.value; });
	        };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormArray.prototype._anyControls = function (condition) {
	            return this.controls.some(function (control) { return control.enabled && condition(control); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) { return _this._registerControl(control); });
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        FormArray.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, i) {
	                if (value[i] === undefined) {
	                    throw new Error("Must supply a value for form control at index: " + i + ".");
	                }
	            });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
	                var control = _a[_i];
	                if (control.enabled)
	                    return false;
	            }
	            return this.controls.length > 0 || this.disabled;
	        };
	        /**
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype._registerControl = function (control) {
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	        };
	        return FormArray;
	    }(AbstractControl));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$4 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formDirectiveProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgForm; })
	    };
	    var /** @type {?} */ resolvedPromise = Promise.resolve(null);
	    /**
	     * \@whatItDoes Creates a top-level {\@link FormGroup} instance and binds it to a form
	     * to track aggregate form value and validation status.
	     *
	     * \@howToUse
	     *
	     * As soon as you import the `FormsModule`, this directive becomes active by default on
	     * all `<form>` tags.  You don't need to add a special selector.
	     *
	     * You can export the directive into a local template variable using `ngForm` as the key
	     * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
	     * {\@link FormGroup} instance are duplicated on the directive itself, so a reference to it
	     * will give you access to the aggregate value and validity status of the form, as well as
	     * user interaction properties like `dirty` and `touched`.
	     *
	     * To register child controls with the form, you'll want to use {\@link NgModel} with a
	     * `name` attribute.  You can also use {\@link NgModelGroup} if you'd like to create
	     * sub-groups within the form.
	     *
	     * You can listen to the directive's `ngSubmit` event to be notified when the user has
	     * triggered a form submission. The `ngSubmit` event will be emitted with the original form
	     * submission event.
	     *
	     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     *  \@stable
	     */
	    var NgForm = (function (_super) {
	        __extends$4(NgForm, _super);
	        /**
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function NgForm(validators, asyncValidators) {
	            _super.call(this);
	            this._submitted = false;
	            this.ngSubmit = new EventEmitter();
	            this.form =
	                new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
	        }
	        Object.defineProperty(NgForm.prototype, "submitted", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "controls", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form.controls; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.addControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                dir._control = (container.registerControl(dir.name, dir.control));
	                setUpControl(dir.control, dir);
	                dir.control.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.getControl = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.removeControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                if (container) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.addFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                var /** @type {?} */ group = new FormGroup({});
	                setUpFormContainer(group, dir);
	                container.registerControl(dir.name, group);
	                group.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.removeFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                if (container) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.getFormGroup = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @param {?} value
	         * @return {?}
	         */
	        NgForm.prototype.updateModel = function (dir, value) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ ctrl = (_this.form.get(dir.path));
	                ctrl.setValue(value);
	            });
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NgForm.prototype.setValue = function (value) { this.control.setValue(value); };
	        /**
	         * @param {?} $event
	         * @return {?}
	         */
	        NgForm.prototype.onSubmit = function ($event) {
	            this._submitted = true;
	            this.ngSubmit.emit($event);
	            return false;
	        };
	        /**
	         * @return {?}
	         */
	        NgForm.prototype.onReset = function () { this.resetForm(); };
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        NgForm.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /**
	         * \@internal
	         * @param {?} path
	         * @return {?}
	         */
	        NgForm.prototype._findContainer = function (path) {
	            path.pop();
	            return path.length ? (this.form.get(path)) : this.form;
	        };
	        NgForm.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
	                        providers: [formDirectiveProvider],
	                        host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
	                        outputs: ['ngSubmit'],
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgForm.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        return NgForm;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var /** @type {?} */ Examples = {
	        formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
	        formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
	        formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; let i=index\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
	        ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
	        ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
	    };

	    var TemplateDrivenErrors = (function () {
	        function TemplateDrivenErrors() {
	        }
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.modelParentException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + Examples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + Examples.ngModelWithFormGroup);
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.formGroupNameException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.missingNameException = function () {
	            throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.modelGroupParentException = function () {
	            throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        return TemplateDrivenErrors;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$8 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ modelGroupProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgModelGroup; })
	    };
	    /**
	     * \@whatItDoes Creates and binds a {\@link FormGroup} instance to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive can only be used as a child of {\@link NgForm} (or in other words,
	     * within `<form>` tags).
	     *
	     * Use this directive if you'd like to create a sub-group within a form. This can
	     * come in handy if you want to validate a sub-group of your form separately from
	     * the rest of your form, or if some values in your domain model make more sense to
	     * consume together in a nested object.
	     *
	     * Pass in the name you'd like this sub-group to have and it will become the key
	     * for the sub-group in the form's full value. You can also export the directive into
	     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
	     *
	     * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     * \@stable
	     */
	    var NgModelGroup = (function (_super) {
	        __extends$8(NgModelGroup, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function NgModelGroup(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * \@internal
	         * @return {?}
	         */
	        NgModelGroup.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelGroupParentException();
	            }
	        };
	        NgModelGroup.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
	        ];
	        /** @nocollapse */
	        NgModelGroup.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        NgModelGroup.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['ngModelGroup',] },],
	        };
	        return NgModelGroup;
	    }(AbstractFormGroupDirective));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$7 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formControlBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return NgModel; })
	    };
	    /**
	     * `ngModel` forces an additional change detection run when its inputs change:
	     * E.g.:
	     * ```
	     * <div>{{myModel.valid}}</div>
	     * <input [(ngModel)]="myValue" #myModel="ngModel">
	     * ```
	     * I.e. `ngModel` can export itself on the element and then be used in the template.
	     * Normally, this would result in expressions before the `input` that use the exported directive
	     * to have and old value as they have been
	     * dirty checked before. As this is a very common case for `ngModel`, we added this second change
	     * detection run.
	     *
	     * Notes:
	     * - this is just one extra run no matter how many `ngModel` have been changed.
	     * - this is a general problem when using `exportAs` for directives!
	     */
	    var /** @type {?} */ resolvedPromise$1 = Promise.resolve(null);
	    /**
	     * \@whatItDoes Creates a {\@link FormControl} instance from a domain model and binds it
	     * to a form control element.
	     *
	     * The {\@link FormControl} instance will track the value, user interaction, and
	     * validation status of the control and keep the view synced with the model. If used
	     * within a parent form, the directive will also register itself with the form as a child
	     * control.
	     *
	     * \@howToUse
	     *
	     * This directive can be used by itself or as part of a larger form. All you need is the
	     * `ngModel` selector to activate it.
	     *
	     * It accepts a domain model as an optional {\@link \@Input}. If you have a one-way binding
	     * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
	     * class will set the value in the view. If you have a two-way binding with `[()]` syntax
	     * (also known as 'banana-box syntax'), the value in the UI will always be synced back to
	     * the domain model in your class as well.
	     *
	     * If you wish to inspect the properties of the associated {\@link FormControl} (like
	     * validity state), you can also export the directive into a local template variable using
	     * `ngModel` as the key (ex: `#myVar="ngModel"`). You can then access the control using the
	     * directive's `control` property, but most properties you'll need (like `valid` and `dirty`)
	     * will fall through to the control anyway, so you can access them directly. You can see a
	     * full list of properties directly available in {\@link AbstractControlDirective}.
	     *
	     * The following is an example of a simple standalone control using `ngModel`:
	     *
	     * {\@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
	     *
	     * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
	     * so that the control can be registered with the parent form under that name.
	     *
	     * It's worth noting that in the context of a parent form, you often can skip one-way or
	     * two-way binding because the parent form will sync the value for you. You can access
	     * its properties by exporting it into a local template variable using `ngForm` (ex:
	     * `#f="ngForm"`). Then you can pass it where it needs to go on submit.
	     *
	     * If you do need to populate initial values into your form, using a one-way binding for
	     * `ngModel` tends to be sufficient as long as you use the exported form's value rather
	     * than the domain model's value on submit.
	     *
	     * Take a look at an example of using `ngModel` within a form:
	     *
	     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * To see `ngModel` examples with different form control types, see:
	     *
	     * * Radio buttons: {\@link RadioControlValueAccessor}
	     * * Selects: {\@link SelectControlValueAccessor}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: `FormsModule`
	     *
	     *  \@stable
	     */
	    var NgModel = (function (_super) {
	        __extends$7(NgModel, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function NgModel(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            /** @internal */
	            this._control = new FormControl();
	            /** @internal */
	            this._registered = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        NgModel.prototype.ngOnChanges = function (changes) {
	            this._checkForErrors();
	            if (!this._registered)
	                this._setUpControl();
	            if ('isDisabled' in changes) {
	                this._updateDisabled(changes);
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this._updateValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
	        Object.defineProperty(NgModel.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return this._parent ? controlPath(this.name, this._parent) : [this.name];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        NgModel.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._setUpControl = function () {
	            this._isStandalone() ? this._setUpStandalone() :
	                this.formDirective.addControl(this);
	            this._registered = true;
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._isStandalone = function () {
	            return !this._parent || (this.options && this.options.standalone);
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._setUpStandalone = function () {
	            setUpControl(this._control, this);
	            this._control.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkForErrors = function () {
	            if (!this._isStandalone()) {
	                this._checkParentType();
	            }
	            this._checkName();
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                TemplateDrivenErrors.formGroupNameException();
	            }
	            else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelParentException();
	            }
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkName = function () {
	            if (this.options && this.options.name)
	                this.name = this.options.name;
	            if (!this._isStandalone() && !this.name) {
	                TemplateDrivenErrors.missingNameException();
	            }
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NgModel.prototype._updateValue = function (value) {
	            var _this = this;
	            resolvedPromise$1.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
	        };
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        NgModel.prototype._updateDisabled = function (changes) {
	            var _this = this;
	            var /** @type {?} */ disabledValue = changes['isDisabled'].currentValue;
	            var /** @type {?} */ isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
	            resolvedPromise$1.then(function () {
	                if (isDisabled && !_this.control.disabled) {
	                    _this.control.disable();
	                }
	                else if (!isDisabled && _this.control.disabled) {
	                    _this.control.enable();
	                }
	            });
	        };
	        NgModel.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[ngModel]:not([formControlName]):not([formControl])',
	                        providers: [formControlBinding],
	                        exportAs: 'ngModel'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgModel.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        NgModel.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'options': [{ type: _angular_core.Input, args: ['ngModelOptions',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	        };
	        return NgModel;
	    }(NgControl));

	    var ReactiveErrors = (function () {
	        function ReactiveErrors() {
	        }
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.controlParentException = function () {
	            throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formControlName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.ngModelGroupException = function () {
	            throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + Examples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + Examples.ngModelGroup);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.missingFormException = function () {
	            throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + Examples.formControlName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.groupParentException = function () {
	            throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formGroupName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.arrayParentException = function () {
	            throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + Examples.formArrayName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.disabledAttrWarning = function () {
	            console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
	        };
	        return ReactiveErrors;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$9 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formControlBinding$1 = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlDirective; })
	    };
	    /**
	     * \@whatItDoes Syncs a standalone {\@link FormControl} instance to a form control element.
	     *
	     * In other words, this directive ensures that any values written to the {\@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {\@link FormControl} instance (view -> model).
	     *
	     * \@howToUse
	     *
	     * Use this directive if you'd like to create and manage a {\@link FormControl} instance directly.
	     * Simply create a {\@link FormControl}, save it to your component class, and pass it into the
	     * {\@link FormControlDirective}.
	     *
	     * This directive is designed to be used as a standalone control.  Unlike {\@link FormControlName},
	     * it does not require that your {\@link FormControl} instance be part of any parent
	     * {\@link FormGroup}, and it won't be registered to any {\@link FormGroupDirective} that
	     * exists above it.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormControl} instance. See a full list of available properties in
	     * {\@link AbstractControl}.
	     *
	     * **Set the value**: You can pass in an initial value when instantiating the {\@link FormControl},
	     * or you can set it programmatically later using {\@link AbstractControl.setValue} or
	     * {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     *  \@stable
	     */
	    var FormControlDirective = (function (_super) {
	        __extends$9(FormControlDirective, _super);
	        /**
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function FormControlDirective(validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this.update = new EventEmitter();
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
	            /**
	             * @param {?} isDisabled
	             * @return {?}
	             */
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlDirective.prototype.ngOnChanges = function (changes) {
	            if (this._isControlChanged(changes)) {
	                setUpControl(this.form, this);
	                if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                    this.valueAccessor.setDisabledState(true);
	                }
	                this.form.updateValueAndValidity({ emitEvent: false });
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.form.setValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        Object.defineProperty(FormControlDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlDirective.prototype._isControlChanged = function (changes) {
	            return changes.hasOwnProperty('form');
	        };
	        FormControlDirective.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControl]', providers: [formControlBinding$1], exportAs: 'ngForm' },] },
	        ];
	        /** @nocollapse */
	        FormControlDirective.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        FormControlDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formControl',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlDirective;
	    }(NgControl));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$11 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formDirectiveProvider$1 = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupDirective; })
	    };
	    /**
	     * \@whatItDoes Binds an existing {\@link FormGroup} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive accepts an existing {\@link FormGroup} instance. It will then use this
	     * {\@link FormGroup} instance to match any child {\@link FormControl}, {\@link FormGroup},
	     * and {\@link FormArray} instances to child {\@link FormControlName}, {\@link FormGroupName},
	     * and {\@link FormArrayName} directives.
	     *
	     * **Set value**: You can set the form's initial value when instantiating the
	     * {\@link FormGroup}, or you can set it programmatically later using the {\@link FormGroup}'s
	     * {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue} methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the form, you can subscribe
	     * to the {\@link FormGroup}'s {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * its {\@link AbstractControl.statusChanges} event to be notified when the validation status is
	     * re-calculated.
	     *
	     * Furthermore, you can listen to the directive's `ngSubmit` event to be notified when the user has
	     * triggered a form submission. The `ngSubmit` event will be emitted with the original form
	     * submission event.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     *  \@stable
	     */
	    var FormGroupDirective = (function (_super) {
	        __extends$11(FormGroupDirective, _super);
	        /**
	         * @param {?} _validators
	         * @param {?} _asyncValidators
	         */
	        function FormGroupDirective(_validators, _asyncValidators) {
	            _super.call(this);
	            this._validators = _validators;
	            this._asyncValidators = _asyncValidators;
	            this._submitted = false;
	            this.directives = [];
	            this.form = null;
	            this.ngSubmit = new EventEmitter();
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormGroupDirective.prototype.ngOnChanges = function (changes) {
	            this._checkFormPresent();
	            if (changes.hasOwnProperty('form')) {
	                this._updateValidators();
	                this._updateDomValue();
	                this._updateRegistrations();
	            }
	        };
	        Object.defineProperty(FormGroupDirective.prototype, "submitted", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addControl = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpControl(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	            this.directives.push(dir);
	            return ctrl;
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getControl = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeControl = function (dir) { ListWrapper.remove(this.directives, dir); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addFormGroup = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeFormGroup = function (dir) { };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getFormGroup = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addFormArray = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeFormArray = function (dir) { };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getFormArray = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @param {?} value
	         * @return {?}
	         */
	        FormGroupDirective.prototype.updateModel = function (dir, value) {
	            var /** @type {?} */ ctrl = (this.form.get(dir.path));
	            ctrl.setValue(value);
	        };
	        /**
	         * @param {?} $event
	         * @return {?}
	         */
	        FormGroupDirective.prototype.onSubmit = function ($event) {
	            this._submitted = true;
	            this.ngSubmit.emit($event);
	            return false;
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype.onReset = function () { this.resetForm(); };
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        FormGroupDirective.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateDomValue = function () {
	            var _this = this;
	            this.directives.forEach(function (dir) {
	                var /** @type {?} */ newCtrl = _this.form.get(dir.path);
	                if (dir._control !== newCtrl) {
	                    cleanUpControl(dir._control, dir);
	                    if (newCtrl)
	                        setUpControl(newCtrl, dir);
	                    dir._control = newCtrl;
	                }
	            });
	            this.form._updateTreeValidity({ emitEvent: false });
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateRegistrations = function () {
	            var _this = this;
	            this.form._registerOnCollectionChange(function () { return _this._updateDomValue(); });
	            if (this._oldForm)
	                this._oldForm._registerOnCollectionChange(function () { });
	            this._oldForm = this.form;
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateValidators = function () {
	            var /** @type {?} */ sync = composeValidators(this._validators);
	            this.form.validator = Validators.compose([this.form.validator, sync]);
	            var /** @type {?} */ async = composeAsyncValidators(this._asyncValidators);
	            this.form.asyncValidator = Validators.composeAsync([this.form.asyncValidator, async]);
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._checkFormPresent = function () {
	            if (!this.form) {
	                ReactiveErrors.missingFormException();
	            }
	        };
	        FormGroupDirective.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroup]',
	                        providers: [formDirectiveProvider$1],
	                        host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        FormGroupDirective.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormGroupDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formGroup',] },],
	            'ngSubmit': [{ type: _angular_core.Output },],
	        };
	        return FormGroupDirective;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$12 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formGroupNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupName; })
	    };
	    /**
	     * \@whatItDoes Syncs a nested {\@link FormGroup} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive can only be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {\@link FormGroup} you want to link, and
	     * will look for a {\@link FormGroup} registered with that name in the parent
	     * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
	     *
	     * Nested form groups can come in handy when you want to validate a sub-group of a
	     * form separately from the rest or when you'd like to group the values of certain
	     * controls into their own nested object.
	     *
	     * **Access the group**: You can access the associated {\@link FormGroup} using the
	     * {\@link AbstractControl.get} method. Ex: `this.form.get('name')`.
	     *
	     * You can also access individual controls within the group using dot syntax.
	     * Ex: `this.form.get('name.first')`
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormGroup}. See a full list of available properties in {\@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {\@link FormGroup}, or you can set it programmatically later using
	     * {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the group, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * \@stable
	     */
	    var FormGroupName = (function (_super) {
	        __extends$12(FormGroupName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function FormGroupName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroupName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.groupParentException();
	            }
	        };
	        FormGroupName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormGroupName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormGroupName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formGroupName',] },],
	        };
	        return FormGroupName;
	    }(AbstractFormGroupDirective));
	    var /** @type {?} */ formArrayNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormArrayName; })
	    };
	    /**
	     * \@whatItDoes Syncs a nested {\@link FormArray} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {\@link FormArray} you want to link, and
	     * will look for a {\@link FormArray} registered with that name in the parent
	     * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
	     *
	     * Nested form arrays can come in handy when you have a group of form controls but
	     * you're not sure how many there will be. Form arrays allow you to create new
	     * form controls dynamically.
	     *
	     * **Access the array**: You can access the associated {\@link FormArray} using the
	     * {\@link AbstractControl.get} method on the parent {\@link FormGroup}.
	     * Ex: `this.form.get('cities')`.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormArray}. See a full list of available properties in {\@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {\@link FormArray}, or you can set the value programmatically later using the
	     * {\@link FormArray}'s {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}
	     * methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the array, you can
	     * subscribe to the {\@link FormArray}'s {\@link AbstractControl.valueChanges} event.  You can also
	     * listen to its {\@link AbstractControl.statusChanges} event to be notified when the validation
	     * status is re-calculated.
	     *
	     * **Add new controls**: You can add new controls to the {\@link FormArray} dynamically by
	     * calling its {\@link FormArray.push} method.
	     *  Ex: `this.form.get('cities').push(new FormControl());`
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * \@stable
	     */
	    var FormArrayName = (function (_super) {
	        __extends$12(FormArrayName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function FormArrayName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormArray(this);
	        };
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormArray(this);
	            }
	        };
	        Object.defineProperty(FormArrayName.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.formDirective.getFormArray(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return this._parent ? (this._parent.formDirective) : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.arrayParentException();
	            }
	        };
	        FormArrayName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormArrayName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormArrayName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formArrayName',] },],
	        };
	        return FormArrayName;
	    }(ControlContainer));
	    /**
	     * @param {?} parent
	     * @return {?}
	     */
	    function _hasInvalidParent(parent) {
	        return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
	            !(parent instanceof FormArrayName);
	    }

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$10 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ controlNameBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlName; })
	    };
	    /**
	     * \@whatItDoes Syncs a {\@link FormControl} in an existing {\@link FormGroup} to a form control
	     * element by name.
	     *
	     * In other words, this directive ensures that any values written to the {\@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {\@link FormControl} instance (view -> model).
	     *
	     * \@howToUse
	     *
	     * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the {\@link FormControl} instance you want to
	     * link, and will look for a {\@link FormControl} registered with that name in the
	     * closest {\@link FormGroup} or {\@link FormArray} above it.
	     *
	     * **Access the control**: You can access the {\@link FormControl} associated with
	     * this directive by using the {\@link AbstractControl.get} method.
	     * Ex: `this.form.get('first');`
	     *
	     * **Get value**: the `value` property is always synced and available on the {\@link FormControl}.
	     * See a full list of available properties in {\@link AbstractControl}.
	     *
	     *  **Set value**: You can set an initial value for the control when instantiating the
	     *  {\@link FormControl}, or you can set it programmatically later using
	     *  {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * To see `formControlName` examples with different form control types, see:
	     *
	     * * Radio buttons: {\@link RadioControlValueAccessor}
	     * * Selects: {\@link SelectControlValueAccessor}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     *  \@stable
	     */
	    var FormControlName = (function (_super) {
	        __extends$10(FormControlName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function FormControlName(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this._added = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlName.prototype, "isDisabled", {
	            /**
	             * @param {?} isDisabled
	             * @return {?}
	             */
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlName.prototype.ngOnChanges = function (changes) {
	            if (!this._added)
	                this._setUpControl();
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.viewModel = this.model;
	                this.formDirective.updateModel(this, this.model);
	            }
	        };
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeControl(this);
	            }
	        };
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        FormControlName.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        Object.defineProperty(FormControlName.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype._checkParentType = function () {
	            if (!(this._parent instanceof FormGroupName) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                ReactiveErrors.ngModelGroupException();
	            }
	            else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
	                !(this._parent instanceof FormArrayName)) {
	                ReactiveErrors.controlParentException();
	            }
	        };
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype._setUpControl = function () {
	            this._checkParentType();
	            this._control = this.formDirective.addControl(this);
	            if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                this.valueAccessor.setDisabledState(true);
	            }
	            this._added = true;
	        };
	        FormControlName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
	        ];
	        /** @nocollapse */
	        FormControlName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        FormControlName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formControlName',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlName;
	    }(NgControl));

	    var __extends$13 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ REQUIRED_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return RequiredValidator; }),
	        multi: true
	    };
	    var /** @type {?} */ CHECKBOX_REQUIRED_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return CheckboxRequiredValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `required` validator to any controls marked with the
	     * `required` attribute, via the {\@link NG_VALIDATORS} binding.
	     *
	     * ### Example
	     *
	     * ```
	     * <input name="fullName" ngModel required>
	     * ```
	     *
	     * \@stable
	     */
	    var RequiredValidator = (function () {
	        function RequiredValidator() {
	        }
	        Object.defineProperty(RequiredValidator.prototype, "required", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._required; },
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                this._required = value != null && value !== false && "" + value !== 'false';
	                if (this._onChange)
	                    this._onChange();
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        RequiredValidator.prototype.validate = function (c) {
	            return this.required ? Validators.required(c) : null;
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RequiredValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        RequiredValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
	                        providers: [REQUIRED_VALIDATOR],
	                        host: { '[attr.required]': 'required ? "" : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        RequiredValidator.ctorParameters = function () { return []; };
	        RequiredValidator.propDecorators = {
	            'required': [{ type: _angular_core.Input },],
	        };
	        return RequiredValidator;
	    }());
	    /**
	     * A Directive that adds the `required` validator to checkbox controls marked with the
	     * `required` attribute, via the {\@link NG_VALIDATORS} binding.
	     *
	     * ### Example
	     *
	     * ```
	     * <input type="checkbox" name="active" ngModel required>
	     * ```
	     *
	     * \@experimental
	     */
	    var CheckboxRequiredValidator = (function (_super) {
	        __extends$13(CheckboxRequiredValidator, _super);
	        function CheckboxRequiredValidator() {
	            _super.apply(this, arguments);
	        }
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        CheckboxRequiredValidator.prototype.validate = function (c) {
	            return this.required ? Validators.requiredTrue(c) : null;
	        };
	        CheckboxRequiredValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
	                        providers: [CHECKBOX_REQUIRED_VALIDATOR],
	                        host: { '[attr.required]': 'required ? "" : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        CheckboxRequiredValidator.ctorParameters = function () { return []; };
	        return CheckboxRequiredValidator;
	    }(RequiredValidator));
	    /**
	     * Provider which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='min'}
	     */
	    var /** @type {?} */ MIN_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MinLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {\@link MinLengthValidator} for any `formControlName`,
	     * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
	     *
	     * \@stable
	     */
	    var MinLengthValidator = (function () {
	        function MinLengthValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        MinLengthValidator.prototype.ngOnChanges = function (changes) {
	            if ('minlength' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        MinLengthValidator.prototype.validate = function (c) {
	            return this.minlength == null ? null : this._validator(c);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        MinLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        MinLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.minLength(parseInt(this.minlength, 10));
	        };
	        MinLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
	                        providers: [MIN_LENGTH_VALIDATOR],
	                        host: { '[attr.minlength]': 'minlength ? minlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MinLengthValidator.ctorParameters = function () { return []; };
	        MinLengthValidator.propDecorators = {
	            'minlength': [{ type: _angular_core.Input },],
	        };
	        return MinLengthValidator;
	    }());
	    /**
	     * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='max'}
	     */
	    var /** @type {?} */ MAX_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MaxLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {\@link MaxLengthValidator} for any `formControlName,
	     * `formControl`,
	     * or control with `ngModel` that also has a `maxlength` attribute.
	     *
	     * \@stable
	     */
	    var MaxLengthValidator = (function () {
	        function MaxLengthValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.ngOnChanges = function (changes) {
	            if ('maxlength' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.validate = function (c) {
	            return this.maxlength != null ? this._validator(c) : null;
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        MaxLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
	        };
	        MaxLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
	                        providers: [MAX_LENGTH_VALIDATOR],
	                        host: { '[attr.maxlength]': 'maxlength ? maxlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MaxLengthValidator.ctorParameters = function () { return []; };
	        MaxLengthValidator.propDecorators = {
	            'maxlength': [{ type: _angular_core.Input },],
	        };
	        return MaxLengthValidator;
	    }());
	    var /** @type {?} */ PATTERN_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return PatternValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `pattern` validator to any controls marked with the
	     * `pattern` attribute, via the {\@link NG_VALIDATORS} binding. Uses attribute value
	     * as the regex to validate Control value against.  Follows pattern attribute
	     * semantics; i.e. regex must match entire Control value.
	     *
	     * ### Example
	     *
	     * ```
	     * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
	     * ```
	     * \@stable
	     */
	    var PatternValidator = (function () {
	        function PatternValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        PatternValidator.prototype.ngOnChanges = function (changes) {
	            if ('pattern' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        PatternValidator.prototype.validate = function (c) { return this._validator(c); };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        PatternValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        PatternValidator.prototype._createValidator = function () { this._validator = Validators.pattern(this.pattern); };
	        PatternValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
	                        providers: [PATTERN_VALIDATOR],
	                        host: { '[attr.pattern]': 'pattern ? pattern : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        PatternValidator.ctorParameters = function () { return []; };
	        PatternValidator.propDecorators = {
	            'pattern': [{ type: _angular_core.Input },],
	        };
	        return PatternValidator;
	    }());

	    /**
	     * \@whatItDoes Creates an {\@link AbstractControl} from a user-specified configuration.
	     *
	     * It is essentially syntactic sugar that shortens the `new FormGroup()`,
	     * `new FormControl()`, and `new FormArray()` boilerplate that can build up in larger
	     * forms.
	     *
	     * \@howToUse
	     *
	     * To use, inject `FormBuilder` into your component class. You can then call its methods
	     * directly.
	     *
	     * {\@example forms/ts/formBuilder/form_builder_example.ts region='Component'}
	     *
	     *  * **npm package**: `\@angular/forms`
	     *
	     *  * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     * \@stable
	     */
	    var FormBuilder = (function () {
	        function FormBuilder() {
	        }
	        /**
	         * Construct a new {\@link FormGroup} with the given map of configuration.
	         * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
	         *
	         * See the {\@link FormGroup} constructor for more details.
	         * @param {?} controlsConfig
	         * @param {?=} extra
	         * @return {?}
	         */
	        FormBuilder.prototype.group = function (controlsConfig, extra) {
	            if (extra === void 0) { extra = null; }
	            var /** @type {?} */ controls = this._reduceControls(controlsConfig);
	            var /** @type {?} */ validator = isPresent(extra) ? extra['validator'] : null;
	            var /** @type {?} */ asyncValidator = isPresent(extra) ? extra['asyncValidator'] : null;
	            return new FormGroup(controls, validator, asyncValidator);
	        };
	        /**
	         * Construct a new {\@link FormControl} with the given `formState`,`validator`, and
	         * `asyncValidator`.
	         *
	         * `formState` can either be a standalone value for the form control or an object
	         * that contains both a value and a disabled status.
	         *
	         * @param {?} formState
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         * @return {?}
	         */
	        FormBuilder.prototype.control = function (formState, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            return new FormControl(formState, validator, asyncValidator);
	        };
	        /**
	         * Construct a {\@link FormArray} from the given `controlsConfig` array of
	         * configuration, with the given optional `validator` and `asyncValidator`.
	         * @param {?} controlsConfig
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         * @return {?}
	         */
	        FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
	            var _this = this;
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            var /** @type {?} */ controls = controlsConfig.map(function (c) { return _this._createControl(c); });
	            return new FormArray(controls, validator, asyncValidator);
	        };
	        /**
	         * \@internal
	         * @param {?} controlsConfig
	         * @return {?}
	         */
	        FormBuilder.prototype._reduceControls = function (controlsConfig) {
	            var _this = this;
	            var /** @type {?} */ controls = {};
	            Object.keys(controlsConfig).forEach(function (controlName) {
	                controls[controlName] = _this._createControl(controlsConfig[controlName]);
	            });
	            return controls;
	        };
	        /**
	         * \@internal
	         * @param {?} controlConfig
	         * @return {?}
	         */
	        FormBuilder.prototype._createControl = function (controlConfig) {
	            if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
	                controlConfig instanceof FormArray) {
	                return controlConfig;
	            }
	            else if (Array.isArray(controlConfig)) {
	                var /** @type {?} */ value = controlConfig[0];
	                var /** @type {?} */ validator = controlConfig.length > 1 ? controlConfig[1] : null;
	                var /** @type {?} */ asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
	                return this.control(value, validator, asyncValidator);
	            }
	            else {
	                return this.control(controlConfig);
	            }
	        };
	        FormBuilder.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        FormBuilder.ctorParameters = function () { return []; };
	        return FormBuilder;
	    }());

	    /**
	     * @stable
	     */
	    var /** @type {?} */ VERSION = new _angular_core.Version('2.4.10');

	    var /** @type {?} */ SHARED_FORM_DIRECTIVES = [
	        NgSelectOption,
	        NgSelectMultipleOption,
	        DefaultValueAccessor,
	        NumberValueAccessor,
	        RangeValueAccessor,
	        CheckboxControlValueAccessor,
	        SelectControlValueAccessor,
	        SelectMultipleControlValueAccessor,
	        RadioControlValueAccessor,
	        NgControlStatus,
	        NgControlStatusGroup,
	        RequiredValidator,
	        MinLengthValidator,
	        MaxLengthValidator,
	        PatternValidator,
	        CheckboxRequiredValidator,
	    ];
	    var /** @type {?} */ TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
	    var /** @type {?} */ REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
	    /**
	     * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
	     */
	    var InternalFormsSharedModule = (function () {
	        function InternalFormsSharedModule() {
	        }
	        InternalFormsSharedModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: SHARED_FORM_DIRECTIVES,
	                        exports: SHARED_FORM_DIRECTIVES,
	                    },] },
	        ];
	        /** @nocollapse */
	        InternalFormsSharedModule.ctorParameters = function () { return []; };
	        return InternalFormsSharedModule;
	    }());

	    /**
	     * The ng module for forms.
	     * \@stable
	     */
	    var FormsModule = (function () {
	        function FormsModule() {
	        }
	        FormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: TEMPLATE_DRIVEN_DIRECTIVES,
	                        providers: [RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        FormsModule.ctorParameters = function () { return []; };
	        return FormsModule;
	    }());
	    /**
	     * The ng module for reactive forms.
	     * \@stable
	     */
	    var ReactiveFormsModule = (function () {
	        function ReactiveFormsModule() {
	        }
	        ReactiveFormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: [REACTIVE_DRIVEN_DIRECTIVES],
	                        providers: [FormBuilder, RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        ReactiveFormsModule.ctorParameters = function () { return []; };
	        return ReactiveFormsModule;
	    }());

	    exports.AbstractControlDirective = AbstractControlDirective;
	    exports.AbstractFormGroupDirective = AbstractFormGroupDirective;
	    exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
	    exports.ControlContainer = ControlContainer;
	    exports.NG_VALUE_ACCESSOR = NG_VALUE_ACCESSOR;
	    exports.DefaultValueAccessor = DefaultValueAccessor;
	    exports.NgControl = NgControl;
	    exports.NgControlStatus = NgControlStatus;
	    exports.NgControlStatusGroup = NgControlStatusGroup;
	    exports.NgForm = NgForm;
	    exports.NgModel = NgModel;
	    exports.NgModelGroup = NgModelGroup;
	    exports.RadioControlValueAccessor = RadioControlValueAccessor;
	    exports.FormControlDirective = FormControlDirective;
	    exports.FormControlName = FormControlName;
	    exports.FormGroupDirective = FormGroupDirective;
	    exports.FormArrayName = FormArrayName;
	    exports.FormGroupName = FormGroupName;
	    exports.NgSelectOption = NgSelectOption;
	    exports.SelectControlValueAccessor = SelectControlValueAccessor;
	    exports.SelectMultipleControlValueAccessor = SelectMultipleControlValueAccessor;
	    exports.CheckboxRequiredValidator = CheckboxRequiredValidator;
	    exports.MaxLengthValidator = MaxLengthValidator;
	    exports.MinLengthValidator = MinLengthValidator;
	    exports.PatternValidator = PatternValidator;
	    exports.RequiredValidator = RequiredValidator;
	    exports.FormBuilder = FormBuilder;
	    exports.AbstractControl = AbstractControl;
	    exports.FormArray = FormArray;
	    exports.FormControl = FormControl;
	    exports.FormGroup = FormGroup;
	    exports.NG_ASYNC_VALIDATORS = NG_ASYNC_VALIDATORS;
	    exports.NG_VALIDATORS = NG_VALIDATORS;
	    exports.Validators = Validators;
	    exports.VERSION = VERSION;
	    exports.FormsModule = FormsModule;
	    exports.ReactiveFormsModule = ReactiveFormsModule;

	}));

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var http_1 = __webpack_require__(65);
	var platform_browser_1 = __webpack_require__(21);
	var forms_1 = __webpack_require__(62);
	var underscore_1 = __webpack_require__(67);
	__webpack_require__(68);
	var base_model_1 = __webpack_require__(70);
	var base_collection_1 = __webpack_require__(78);
	var BackboneModule = (function () {
	    function BackboneModule(http) {
	        this.http = http;
	        Backbone.ajax = function (options) {
	            var searchParams = options.search || new http_1.URLSearchParams();
	            var requestOption = new http_1.RequestOptions({
	                method: options.type,
	                body: options.data,
	                headers: new http_1.Headers(options.headers),
	                search: searchParams,
	                url: options.url
	            });
	            requestOption.headers.append('content-type', 'application/json');
	            return http.request(options.url, requestOption)
	                .toPromise()
	                .then(function (resp) {
	                if (options.success && typeof options.success === 'function') {
	                    options.success(resp.json(), resp.statusText, this);
	                }
	                return resp;
	            }, function (resp) {
	                if (options.error && typeof options.error === 'function') {
	                    options.error(this, resp.statusText, resp.toString());
	                }
	                return new Promise(function (resolve, reject) {
	                    reject(resp);
	                });
	            });
	        };
	        var superSync = Backbone.sync;
	        Backbone.sync = function (method, model, options) {
	            // we have to set the flag to wait true otherwise all cases were you want to delete mutliple entries will break
	            // https://github.com/jashkenas/backbone/issues/3534
	            // This flag means that the server has to confirm the creation/deletion before the model will be added/removed to the
	            // collection
	            options = options || {};
	            if (underscore_1.isUndefined(options.wait)) {
	                options.wait = true;
	            }
	            // Instead of the response object we are returning the backbone model in the promise
	            return superSync.call(Backbone, method, model, options).then(function () {
	                return model;
	            });
	        };
	    }
	    return BackboneModule;
	}());
	BackboneModule = __decorate([
	    core_1.NgModule({
	        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
	        exports: [],
	        providers: [
	            base_collection_1.BaseCollection,
	            base_model_1.BaseModel
	        ],
	        declarations: [],
	    }),
	    __metadata("design:paramtypes", [http_1.Http])
	], BackboneModule);
	exports.BackboneModule = BackboneModule;


/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var get_url_util_1 = __webpack_require__(71);
	var request_util_1 = __webpack_require__(73);
	var underscore_1 = __webpack_require__(67);
	var prepare_search_params_1 = __webpack_require__(74);
	var selectable_model_1 = __webpack_require__(75);
	var BaseModel = (function (_super) {
	    __extends(BaseModel, _super);
	    function BaseModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.queryParams = {};
	        _this.endpoint = null;
	        _this.urlRoot = function () {
	            return get_url_util_1.getUrl(_this);
	        };
	        return _this;
	    }
	    BaseModel.prototype.hostName = function () {
	        return '';
	    };
	    ;
	    BaseModel.prototype.basePath = function () {
	        return '';
	    };
	    ;
	    BaseModel.prototype.request = function (url, method, options) {
	        return request_util_1.request(url, method, options, this);
	    };
	    BaseModel.prototype.sync = function (method, model, options) {
	        if (options === void 0) { options = {}; }
	        var queryParams = this.queryParams;
	        if (options.queryParams) {
	            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
	        }
	        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
	        return _super.prototype.sync.call(this, method, model, options);
	    };
	    return BaseModel;
	}(selectable_model_1.SelectableModel));
	exports.BaseModel = BaseModel;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var concat_url_parts_util_1 = __webpack_require__(72);
	function getUrl(instance) {
	    var hostName, basePath, endpoint;
	    if (instance instanceof backbone_1.Model || instance instanceof backbone_1.Collection) {
	        hostName = underscore_1.result(instance, 'hostName') || '';
	        basePath = underscore_1.result(instance, 'basePath') || '';
	        endpoint = underscore_1.result(instance, 'endpoint');
	    }
	    else {
	        throw new Error('An instance of a collection or a model has to be passed as argument to the function');
	    }
	    if (!endpoint || endpoint.length === 0) {
	        throw new Error('An endpoint has to be specified');
	    }
	    return concat_url_parts_util_1.concatUrlParts(hostName, basePath, endpoint);
	}
	exports.getUrl = getUrl;
	;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var underscore_1 = __webpack_require__(67);
	function concatUrlParts() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var urlParts = underscore_1.toArray(arguments), cleanedUrlParts = [];
	    // remove empty strings
	    urlParts = underscore_1.compact(urlParts);
	    underscore_1.each(urlParts, function (url, index) {
	        if (index === 0) {
	            // remove only trailing slash
	            url = url.replace(/\/$/g, '');
	        }
	        else {
	            // Removing leading and trailing slash
	            url = url.replace(/^\/|\/$/g, '');
	        }
	        cleanedUrlParts.push(url);
	    });
	    return cleanedUrlParts.join('/');
	}
	exports.concatUrlParts = concatUrlParts;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var concat_url_parts_util_1 = __webpack_require__(72);
	function request(url, method, options, instance) {
	    options = options || {};
	    var requestOptions = {
	        url: url,
	        type: method
	    }, hostName;
	    if (url && !url.match(/\/\//)) {
	        if (instance instanceof backbone_1.Model || instance instanceof backbone_1.Collection) {
	            hostName = underscore_1.result(instance, 'hostName');
	        }
	        else {
	            hostName = '';
	        }
	        requestOptions.url = concat_url_parts_util_1.concatUrlParts(hostName, url);
	    }
	    return backbone_1.ajax(underscore_1.extend(requestOptions, options));
	}
	exports.request = request;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var http_1 = __webpack_require__(65);
	var underscore_1 = __webpack_require__(67);
	function setSearchParams(searchParams, queryParams) {
	    if (queryParams === void 0) { queryParams = {}; }
	    underscore_1.pairs(queryParams).forEach(function (pair) {
	        var key = pair[0], value = pair[1];
	        searchParams.set(key, value);
	    });
	    return searchParams;
	}
	function prepareSearchParams(searchParams, queryParams) {
	    if (!searchParams) {
	        return setSearchParams(new http_1.URLSearchParams(), queryParams);
	    }
	    else if (searchParams instanceof http_1.URLSearchParams) {
	        return setSearchParams(searchParams, queryParams);
	    }
	    else if (!(searchParams instanceof http_1.URLSearchParams) && underscore_1.isObject(searchParams)) {
	        queryParams = underscore_1.extend({}, queryParams, searchParams);
	        return setSearchParams(new http_1.URLSearchParams(), queryParams);
	    }
	    else {
	        throw new Error('Search property of options has to be an object');
	    }
	}
	exports.prepareSearchParams = prepareSearchParams;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var nested_model_1 = __webpack_require__(76);
	var selectable_1 = __webpack_require__(77);
	var underscore_1 = __webpack_require__(67);
	var SelectableModel = (function (_super) {
	    __extends(SelectableModel, _super);
	    function SelectableModel(attributes, options) {
	        if (options === void 0) { options = {}; }
	        var _this = _super.call(this, attributes, options) || this;
	        _this.selectableModelConstructor(options);
	        return _this;
	    }
	    SelectableModel.prototype.selectableOptions = function () {
	        return {
	            selected: false,
	            isDisabled: null
	        };
	    };
	    SelectableModel.prototype.selectableModelConstructor = function (options) {
	        if (options === void 0) { options = {}; }
	        if (underscore_1.isUndefined(options.selectable) || options.selectable) {
	            this.selectable = new selectable_1.Selectable(this, this.selectableOptions.call(this, options));
	        }
	    };
	    return SelectableModel;
	}(nested_model_1.NestedModel));
	exports.SelectableModel = SelectableModel;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var NestedModel = (function (_super) {
	    __extends(NestedModel, _super);
	    function NestedModel(attributes, options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        options._prepareNesting = true;
	        _this = _super.call(this, attributes, options) || this;
	        return _this;
	    }
	    NestedModel.prototype.nested = function () {
	        return {};
	    };
	    ;
	    NestedModel.prototype._prepare = function () {
	        var nestedAttributes = this.nested(), instanceObject = {};
	        for (var key in nestedAttributes) {
	            if (typeof nestedAttributes[key] === 'function') {
	                var instance = new nestedAttributes[key]();
	                instance.parent = this;
	                instanceObject[key] = instance;
	            }
	            else {
	                throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
	            }
	        }
	        return instanceObject;
	    };
	    ;
	    NestedModel.prototype._setNestedModel = function (key, value) {
	        if (underscore_1.isObject(value)) {
	            this.get(key).set(value);
	        }
	        else {
	            var id = this.get(key).idAttribute;
	            this.get(key).set(id, value);
	        }
	    };
	    ;
	    NestedModel.prototype._setNestedCollection = function (key, value) {
	        if (underscore_1.isObject(value) && !underscore_1.isArray(value)) {
	            this.get(key).add(value);
	        }
	        else if (underscore_1.isArray(value)) {
	            value.forEach(function (val) {
	                this._setNestedCollection(key, val);
	            }.bind(this));
	        }
	        else {
	            var id = this.get(key).model.prototype.idAttribute, obj = {};
	            obj[id] = value;
	            this.get(key).add(obj);
	        }
	    };
	    ;
	    NestedModel.prototype._setNestedAttributes = function (obj) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                var nestedAttrs = this.nested(), value = obj[key], nestedValue = nestedAttrs[key];
	                if (nestedValue && !(value instanceof nestedValue) && this.get(key)) {
	                    if (this.get(key) instanceof backbone_1.Model) {
	                        this._setNestedModel(key, value);
	                    }
	                    else if (this.get(key) instanceof backbone_1.Collection) {
	                        this._setNestedCollection(key, value);
	                    }
	                    delete obj[key];
	                }
	            }
	        }
	        return obj;
	    };
	    ;
	    NestedModel.prototype._nestedModelToJson = function (model) {
	        var result;
	        if (model instanceof NestedModel) {
	            result = model._prepareDataForServer();
	        }
	        else {
	            result = model.toJSON();
	        }
	        return result;
	    };
	    ;
	    NestedModel.prototype._prepareDataForServer = function () {
	        var attrs = underscore_1.extend({}, this.attributes), nestedAttrs = this.nested();
	        var _loop_1 = function (key) {
	            if (nestedAttrs.hasOwnProperty(key)) {
	                var nestedAttr = this_1.get(key);
	                if (nestedAttr instanceof backbone_1.Model) {
	                    attrs[key] = this_1._nestedModelToJson(nestedAttr);
	                }
	                else if (nestedAttr instanceof backbone_1.Collection) {
	                    var result_1 = [];
	                    nestedAttr.each(function (model) {
	                        result_1.push(this._nestedModelToJson(model));
	                    }.bind(this_1));
	                    attrs[key] = result_1;
	                }
	            }
	        };
	        var this_1 = this;
	        for (var key in nestedAttrs) {
	            _loop_1(key);
	        }
	        return this.compose(attrs);
	    };
	    ;
	    NestedModel.prototype.set = function (attributes, options) {
	        if (options === void 0) { options = {}; }
	        var obj = {};
	        if (options && options._prepareNesting) {
	            underscore_1.extend(this.attributes, this._prepare());
	        }
	        if (underscore_1.isString(attributes)) {
	            obj[attributes] = options;
	        }
	        else if (underscore_1.isObject(attributes)) {
	            obj = attributes;
	        }
	        if (!underscore_1.isObject(options)) {
	            options = null;
	        }
	        obj = this._setNestedAttributes(obj);
	        return _super.prototype.set.call(this, obj, options);
	    };
	    ;
	    NestedModel.prototype.compose = function (attrs) {
	        return attrs;
	    };
	    ;
	    NestedModel.prototype.toJSON = function (options) {
	        // When options are set toJSON is called from the sync method so it is called before the object is send to the server
	        // We use this to transform our data before we are sending it to the server
	        // It is the counterpart of parse for the server
	        if (options) {
	            return this._prepareDataForServer();
	        }
	        else {
	            return _super.prototype.toJSON.apply(this, arguments);
	        }
	    };
	    ;
	    NestedModel.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this.attributes) {
	            if (this.get(key) instanceof backbone_1.Model) {
	                this.get(key).clear();
	            }
	            else if (this.get(key) instanceof backbone_1.Collection) {
	                this.get(key).reset();
	            }
	            else {
	                attrs[key] = void 0;
	            }
	        }
	        return _super.prototype.set.call(this, attrs, underscore_1.extend({}, options, { unset: true }));
	    };
	    ;
	    return NestedModel;
	}(backbone_1.Model));
	exports.NestedModel = NestedModel;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var base_model_1 = __webpack_require__(70);
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var Selectable = (function () {
	    function Selectable(modelInstance, options) {
	        if (options === void 0) { options = {}; }
	        this._selected = false;
	        this.isInCollection = false;
	        this.unSelect = function (options) {
	            if (options === void 0) { options = {}; }
	            options = options || {};
	            if (this.isSelected()) {
	                this._selected = false;
	                if (!options.silent) {
	                    this.trigger('change change:unselect', this._model, this);
	                }
	            }
	        };
	        this._model = modelInstance;
	        this._options = options;
	        this._selected = options.selected || false;
	        this.hasDisabledFn = (typeof options.isDisabled === 'function') || false;
	        if (!(this._model instanceof base_model_1.BaseModel)) {
	            throw new Error('First parameter has to be the instance of a model');
	        }
	    }
	    Selectable.prototype.isDisabled = function () {
	        if (this.hasDisabledFn) {
	            return this._options.isDisabled.apply(this._model, arguments);
	        }
	        return false;
	    };
	    ;
	    Selectable.prototype.isSelected = function () {
	        return this._selected;
	    };
	    ;
	    Selectable.prototype.select = function (options) {
	        if (options === void 0) { options = {}; }
	        options = options || {};
	        if ((!this.isDisabled() || options.force) && !this.isSelected()) {
	            this._selected = true;
	            if (!options.silent) {
	                this.trigger('change change:select', this._model, this);
	            }
	        }
	    };
	    ;
	    Selectable.prototype.toggleSelect = function () {
	        if (this.isSelected()) {
	            this.unSelect();
	        }
	        else {
	            this.select();
	        }
	    };
	    ;
	    return Selectable;
	}());
	exports.Selectable = Selectable;
	underscore_1.extend(Selectable.prototype, backbone_1.Events);


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var base_model_1 = __webpack_require__(70);
	var get_url_util_1 = __webpack_require__(71);
	var underscore_1 = __webpack_require__(67);
	var prepare_search_params_1 = __webpack_require__(74);
	var selectable_collection_1 = __webpack_require__(79);
	var BaseCollection = (function (_super) {
	    __extends(BaseCollection, _super);
	    function BaseCollection() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.model = base_model_1.BaseModel;
	        _this.queryParams = {};
	        _this.endpoint = null;
	        _this.sortOrder = null;
	        _this.url = function () {
	            return get_url_util_1.getUrl(_this);
	        };
	        return _this;
	    }
	    BaseCollection.prototype.hostName = function () {
	        return '';
	    };
	    ;
	    BaseCollection.prototype.basePath = function () {
	        return '';
	    };
	    ;
	    BaseCollection.prototype.sync = function (method, model, options) {
	        if (options === void 0) { options = {}; }
	        var queryParams = this.queryParams;
	        if (options.queryParams) {
	            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
	        }
	        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
	        return _super.prototype.sync.call(this, method, model, options);
	    };
	    BaseCollection.prototype.isAscSorted = function (attr) {
	        if (!attr || this.comparator === attr) {
	            return this.sortOrder === 'ASC';
	        }
	        else {
	            return false;
	        }
	    };
	    BaseCollection.prototype.isDescSorted = function (attr) {
	        if (!attr || this.comparator === attr) {
	            return this.sortOrder === 'DESC';
	        }
	        else {
	            return false;
	        }
	    };
	    BaseCollection.prototype.sortAscending = function () {
	        this.sort();
	        this.sortOrder = 'ASC';
	    };
	    BaseCollection.prototype.sortDescending = function () {
	        if (this.sortOrder !== 'ASC') {
	            this.sortAscending();
	        }
	        this.models = this.models.reverse();
	        this.trigger('sort', this);
	        this.sortOrder = 'DESC';
	    };
	    BaseCollection.prototype.toggleSort = function (attr) {
	        if (this.comparator != attr) {
	            this.comparator = attr;
	            this.sortAscending();
	        }
	        else {
	            if (this.isAscSorted()) {
	                this.sortDescending();
	            }
	            else {
	                this.sortAscending();
	            }
	        }
	    };
	    return BaseCollection;
	}(selectable_collection_1.SelectableCollection));
	exports.BaseCollection = BaseCollection;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var selectable_1 = __webpack_require__(80);
	var SelectableCollection = (function (_super) {
	    __extends(SelectableCollection, _super);
	    function SelectableCollection(models, options) {
	        var _this = _super.call(this) || this;
	        _this.selectableCollectionConstructor(options);
	        return _this;
	    }
	    SelectableCollection.prototype.selectableOptions = function () {
	        return {
	            isSingleSelection: false,
	            addPreSelectedToCollection: false,
	            unSelectOnRemove: false,
	            preSelected: new SelectableCollection(null, { selectable: false })
	        };
	    };
	    SelectableCollection.prototype.selectableCollectionConstructor = function (options) {
	        if (options === void 0) { options = {}; }
	        if (underscore_1.isUndefined(options.selectable) || options.selectable) {
	            this.selectable = new selectable_1.Selectable(this, this.selectableOptions.call(this, options));
	        }
	    };
	    return SelectableCollection;
	}(backbone_1.Collection));
	exports.SelectableCollection = SelectableCollection;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var backbone_1 = __webpack_require__(68);
	var underscore_1 = __webpack_require__(67);
	var selectable_collection_1 = __webpack_require__(79);
	var selectable_model_1 = __webpack_require__(75);
	var Selectable = (function () {
	    function Selectable(collectionInstance, options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        this._modelHasDisabledFn = true;
	        this.reset = function () {
	            this.unSelectAll();
	            this._preselect.call(this);
	        };
	        this.useSelectionFor = function (modelOrCollection) {
	            if (modelOrCollection instanceof selectable_model_1.SelectableModel) {
	                return this.setModelFromSelection(modelOrCollection);
	            }
	            else if (modelOrCollection instanceof selectable_collection_1.SelectableCollection) {
	                return this.setCollectionFromSelection(modelOrCollection);
	            }
	        };
	        this._collection = collectionInstance;
	        this._options = options;
	        this._isSingleSelection = options.isSingleSelection || false;
	        this._addPreSelectedToCollection = options.addPreSelectedToCollection || false;
	        this._unSelectOnRemove = options.unSelectOnRemove || false;
	        this._preSelected = options.preSelected;
	        this._hasPreSelectedItems = !!options.preSelected;
	        this._selected = new selectable_collection_1.SelectableCollection(null, { selectable: false });
	        if (!(this._collection instanceof selectable_collection_1.SelectableCollection)) {
	            throw new Error('The first parameter has to be from type Backbone.Collection');
	        }
	        this._collection.each(function (model) {
	            _this._modelHasDisabledFn = model.selectable.hasDisabledFn;
	            _this._setModelSelectableOptions.call(_this, model);
	            _this._updateSelectedModel.call(_this, model);
	        });
	        this._collection.on('add', function (model) {
	            _this._modelHasDisabledFn = model.selectable.hasDisabledFn;
	            _this._setModelSelectableOptions.call(_this, model);
	            _this._updateSelectedModel.call(_this, model);
	        }, this);
	        this._collection.on('remove', function (model) {
	            if (_this._unSelectOnRemove) {
	                _this.unSelect(model);
	            }
	            else {
	                _this._setModelSelectableOptions.call(_this, model);
	            }
	        }, this);
	        this._collection.on('reset', function () {
	            if (_this._unSelectOnRemove) {
	                _this.unSelectAll();
	            }
	            else {
	                _this.getSelected().each(function (model) {
	                    _this._setModelSelectableOptions.call(_this, model);
	                }, _this);
	            }
	        }, this);
	        if (this._hasPreSelectedItems) {
	            this._preselect.call(this);
	        }
	    }
	    Selectable.prototype._preselect = function () {
	        if (this._preSelected instanceof selectable_model_1.SelectableModel) {
	            this._isSingleSelection = true;
	            this.preSelectModel(this._preSelected);
	        }
	        else if (this._preSelected instanceof selectable_collection_1.SelectableCollection) {
	            this._isSingleSelection = false;
	            this.preSelectCollection(this._preSelected);
	        }
	        else {
	            throw new Error('The option preSelected has to be either a Backbone Model or Collection');
	        }
	    };
	    ;
	    Selectable.prototype._selectWhenModelIsSelected = function (model) {
	        if (!this._selected.get(model)) {
	            this.select(model);
	        }
	    };
	    ;
	    Selectable.prototype._unSelectWhenModelIsUnSelected = function (model) {
	        if (this._selected.get(model)) {
	            this.unSelect(model);
	        }
	    };
	    ;
	    Selectable.prototype._unSelectWhenModelIsUnset = function (model, opts) {
	        if (opts === void 0) { opts = {}; }
	        if (opts.unset || !model.id || model.id.length < 1) {
	            this.unSelect(model);
	        }
	    };
	    ;
	    Selectable.prototype._bindModelOnSelectListener = function (model) {
	        model.selectable.off('change:select', this._selectWhenModelIsSelected, this);
	        model.selectable.on('change:select', this._selectWhenModelIsSelected, this);
	    };
	    ;
	    Selectable.prototype._bindModelOnUnSelectListener = function (model) {
	        model.selectable.off('change:unselect', this._unSelectWhenModelIsUnSelected, this);
	        model.selectable.on('change:unselect', this._unSelectWhenModelIsUnSelected, this);
	    };
	    ;
	    Selectable.prototype._setModelSelectableOptions = function (model, options) {
	        if (options === void 0) { options = {}; }
	        if (model && model.selectable) {
	            var selectedModel = this._selected.get(model);
	            if (selectedModel) {
	                if (this._collection.get(model)) {
	                    model.selectable.isInCollection = true;
	                    selectedModel.selectable.isInCollection = true;
	                }
	                else {
	                    model.selectable.isInCollection = false;
	                    selectedModel.selectable.isInCollection = false;
	                }
	                model.selectable.select(options);
	                selectedModel.selectable.select(options);
	            }
	            else {
	                model.selectable.unSelect(options);
	            }
	            this._bindModelOnSelectListener.call(this, model);
	            this._bindModelOnUnSelectListener.call(this, model);
	        }
	    };
	    ;
	    Selectable.prototype._updatePreSelectedModel = function (preSelectedModel, model) {
	        if (this._hasPreSelectedItems) {
	            if (this._preSelected instanceof selectable_model_1.SelectableModel) {
	                this._preSelected = model;
	            }
	            else if (this._preSelected instanceof selectable_collection_1.SelectableCollection) {
	                this._preSelected.remove(preSelectedModel, { silent: true });
	                this._preSelected.add(model, { silent: true });
	            }
	        }
	    };
	    ;
	    Selectable.prototype._updateSelectedModel = function (model) {
	        var selectedModel = this.getSelected().get(model);
	        if (selectedModel) {
	            this.unSelect(selectedModel, { silent: true });
	            this.select(model, { silent: true });
	            this._updatePreSelectedModel.call(this, selectedModel, model);
	            this._setModelSelectableOptions.call(this, selectedModel, { silent: true });
	        }
	    };
	    ;
	    Selectable.prototype.getSelected = function () {
	        return this._selected;
	    };
	    ;
	    Selectable.prototype.getDisabled = function () {
	        var disabled = new selectable_collection_1.SelectableCollection(null, { selectable: false });
	        if (this._modelHasDisabledFn) {
	            this._collection.each(function (model) {
	                if (model.selectable && model.selectable.isDisabled()) {
	                    disabled.add(model);
	                }
	            });
	        }
	        return disabled;
	    };
	    ;
	    Selectable.prototype.select = function (model, options) {
	        if (options === void 0) { options = {}; }
	        if (model instanceof selectable_model_1.SelectableModel) {
	            if (!(model instanceof this._collection.model)) {
	                model = new this._collection.model(model.toJSON());
	            }
	            if (!model.selectable || (model.selectable.isDisabled() && !options.force)) {
	                return;
	            }
	            if (this._isSingleSelection) {
	                this.unSelectAll();
	            }
	            if (this._collection.get(model)) {
	                model = this._collection.get(model);
	            }
	            model.on('change', this._unSelectWhenModelIsUnset, this);
	            this._selected.add(model, options);
	            this._setModelSelectableOptions.call(this, model, options);
	            if (!options.silent) {
	                this.trigger('change change:add', model, this);
	            }
	        }
	        else {
	            throw new Error('The first argument has to be a Backbone Model');
	        }
	    };
	    ;
	    Selectable.prototype.selectAll = function () {
	        this._collection.each(function (model) {
	            this.select(model);
	        }, this);
	    };
	    ;
	    Selectable.prototype.unSelect = function (model, options) {
	        if (options === void 0) { options = {}; }
	        options = options || {};
	        model.off('change', this._unSelectWhenModelIsUnset, this);
	        this._selected.remove(model, options);
	        this._setModelSelectableOptions.call(this, model, options);
	        if (!options.silent) {
	            this.trigger('change change:remove', model, this);
	        }
	    };
	    ;
	    Selectable.prototype.unSelectAll = function () {
	        var _this = this;
	        this.getSelected().each(function (model) {
	            if ((model instanceof selectable_model_1.SelectableModel)) {
	                _this.unSelect(model);
	            }
	        }, this);
	    };
	    ;
	    Selectable.prototype.toggleSelectAll = function () {
	        if (this.allSelected()) {
	            this.unSelectAll();
	        }
	        else {
	            this.selectAll();
	        }
	    };
	    ;
	    Selectable.prototype.allSelected = function () {
	        var disabledModelsAmount = this.getDisabled().length;
	        return this.getSelected().length === this._collection.length - disabledModelsAmount;
	    };
	    ;
	    Selectable.prototype.allDisabled = function () {
	        return this.getDisabled().length === this._collection.length;
	    };
	    ;
	    Selectable.prototype.isSingleSelection = function () {
	        return this._isSingleSelection;
	    };
	    ;
	    Selectable.prototype.preSelectModel = function (model) {
	        if (model.id) {
	            this._hasPreSelectedItems = true;
	            if (!this._collection.get(model) && this._addPreSelectedToCollection) {
	                this._collection.add(model);
	            }
	            else if (this._collection.get(model)) {
	                model = this._collection.get(model);
	            }
	            this.select(model, { force: true, silent: true });
	        }
	    };
	    ;
	    Selectable.prototype.preSelectCollection = function (collection) {
	        var _this = this;
	        collection.each(function (model) {
	            _this.preSelectModel(model);
	        }, this);
	        collection.on('add', function (model) {
	            _this.preSelectModel(model);
	        }, this);
	        collection.on('remove', function (model) {
	            _this.unSelect(model);
	        }, this);
	    };
	    ;
	    Selectable.prototype.setCollectionFromSelection = function (collection) {
	        var selected = this.getSelected();
	        if (collection instanceof selectable_collection_1.SelectableCollection) {
	            collection.reset(selected.toJSON());
	        }
	        else {
	            throw new Error('[Selectable] The passed collection is not an instance of mwUI.Backbone.Collection');
	        }
	        return collection;
	    };
	    ;
	    Selectable.prototype.setModelFromSelection = function (model) {
	        var selected = this.getSelected();
	        if (model instanceof selectable_model_1.SelectableModel) {
	            if (selected.length === 0) {
	                model.clear();
	            }
	            else {
	                model.set(selected.first().toJSON());
	            }
	        }
	        else {
	            throw new Error('[Selectable] The passed model is not an instance of Backbone.Model');
	        }
	        return model;
	    };
	    ;
	    return Selectable;
	}());
	exports.Selectable = Selectable;
	underscore_1.extend(Selectable.prototype, backbone_1.Events);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var index_component_1 = __webpack_require__(82);
	var dashboard_routes_1 = __webpack_require__(87);
	var platform_browser_1 = __webpack_require__(21);
	var forms_1 = __webpack_require__(62);
	var backbone_module_1 = __webpack_require__(66);
	var DashboardModule = (function () {
	    function DashboardModule() {
	    }
	    return DashboardModule;
	}());
	DashboardModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            dashboard_routes_1.DashboardRoutingModule,
	            backbone_module_1.BackboneModule
	        ],
	        declarations: [
	            index_component_1.DashboardIndexComponent
	        ]
	    })
	], DashboardModule);
	exports.DashboardModule = DashboardModule;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var DashboardIndexComponent = (function () {
	    function DashboardIndexComponent() {
	    }
	    return DashboardIndexComponent;
	}());
	DashboardIndexComponent = __decorate([
	    core_1.Component({
	        selector: 'my-dashboard',
	        styles: [__webpack_require__(83)],
	        template: __webpack_require__(86)
	    }),
	    __metadata("design:paramtypes", [])
	], DashboardIndexComponent);
	exports.DashboardIndexComponent = DashboardIndexComponent;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(84);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .experiments {\n  list-style: none;\n  padding: 0; }\n  :host .experiments .experiment {\n    display: flex;\n    padding: 15px;\n    transition: background 0.5s ease; }\n    :host .experiments .experiment .meta {\n      flex-grow: 1; }\n      :host .experiments .experiment .meta h3 {\n        margin: 0; }\n    :host .experiments .experiment:hover {\n      background: #fcfcfc; }\n", ""]);

	// exports


/***/ }),
/* 85 */,
/* 86 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <h1><i class=\"fa fa-flask\"></i> Visualisation Experiments</h1>\n  </header>\n  <ul class=\"experiments\">\n    <li>\n      <div class=\"experiment\">\n        <div class=\"meta\">\n          <h3 class=\"title\">Circles</h3>\n          <div class=\"sub-title\">Guess the sizes of the circle</div>\n        </div>\n        <a routerLink=\"/experiments/results/circle\" class=\"btn btn-link\">\n          All results\n        </a>\n        <a routerLink=\"/experiments/circle\" class=\"btn btn-default btn-primary\">\n          Start\n        </a>\n      </div>\n      <div class=\"experiment\">\n        <div class=\"meta\">\n          <h3 class=\"title\">Perception</h3>\n          <div class=\"sub-title\">Find the object</div>\n        </div>\n        <a routerLink=\"/experiments/results/perception\" class=\"btn btn-link\">\n          All results\n        </a>\n        <a routerLink=\"/experiments/perception\" class=\"btn btn-default btn-primary\">\n          Start\n        </a>\n      </div>\n      <div class=\"experiment\">\n        <div class=\"meta\">\n          <h3 class=\"title\">Car Data</h3>\n          <div class=\"sub-title\">Multi Dimension Data Visualisation</div>\n        </div>\n        <a routerLink=\"/experiments/multi-data-dimension\" class=\"btn btn-default btn-primary\">\n          Start\n        </a>\n      </div>\n    </li>\n  </ul>\n</section>\n";

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(88);
	var index_component_1 = __webpack_require__(82);
	var routes = [
	    { path: 'dashboard', component: index_component_1.DashboardIndexComponent }
	];
	var DashboardRoutingModule = (function () {
	    function DashboardRoutingModule() {
	    }
	    return DashboardRoutingModule;
	}());
	DashboardRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    })
	], DashboardRoutingModule);
	exports.DashboardRoutingModule = DashboardRoutingModule;


/***/ }),
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var MainComponent = (function () {
	    function MainComponent() {
	    }
	    MainComponent.prototype.ngOnInit = function () {
	    };
	    return MainComponent;
	}());
	MainComponent = __decorate([
	    core_1.Component({
	        selector: 'visualisation-prj',
	        styles: [__webpack_require__(106)],
	        template: __webpack_require__(108),
	        encapsulation: core_1.ViewEncapsulation.None
	    }),
	    __metadata("design:paramtypes", [])
	], MainComponent);
	exports.MainComponent = MainComponent;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(107);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,600);", ""]);

	// module
	exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Noto Sans\", Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #333333;\n  background-color: #fff; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\na {\n  color: #1F8A70;\n  text-decoration: none; }\n  a:hover, a:focus {\n    color: #114c3d;\n    text-decoration: underline; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\nfigure {\n  margin: 0; }\n\nimg {\n  vertical-align: middle; }\n\n.img-responsive {\n  display: block;\n  max-width: 100%;\n  height: auto; }\n\n.img-rounded {\n  border-radius: 6px; }\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto; }\n\n.img-circle {\n  border-radius: 50%; }\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container:before, .container:after {\n    content: \" \";\n    display: table; }\n  .container:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .container {\n      width: 750px; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 970px; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1170px; } }\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container-fluid:before, .container-fluid:after {\n    content: \" \";\n    display: table; }\n  .container-fluid:after {\n    clear: both; }\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .row:before, .row:after {\n    content: \" \";\n    display: table; }\n  .row:after {\n    clear: both; }\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left; }\n\n.col-xs-1 {\n  width: 8.33333%; }\n\n.col-xs-2 {\n  width: 16.66667%; }\n\n.col-xs-3 {\n  width: 25%; }\n\n.col-xs-4 {\n  width: 33.33333%; }\n\n.col-xs-5 {\n  width: 41.66667%; }\n\n.col-xs-6 {\n  width: 50%; }\n\n.col-xs-7 {\n  width: 58.33333%; }\n\n.col-xs-8 {\n  width: 66.66667%; }\n\n.col-xs-9 {\n  width: 75%; }\n\n.col-xs-10 {\n  width: 83.33333%; }\n\n.col-xs-11 {\n  width: 91.66667%; }\n\n.col-xs-12 {\n  width: 100%; }\n\n.col-xs-pull-0 {\n  right: auto; }\n\n.col-xs-pull-1 {\n  right: 8.33333%; }\n\n.col-xs-pull-2 {\n  right: 16.66667%; }\n\n.col-xs-pull-3 {\n  right: 25%; }\n\n.col-xs-pull-4 {\n  right: 33.33333%; }\n\n.col-xs-pull-5 {\n  right: 41.66667%; }\n\n.col-xs-pull-6 {\n  right: 50%; }\n\n.col-xs-pull-7 {\n  right: 58.33333%; }\n\n.col-xs-pull-8 {\n  right: 66.66667%; }\n\n.col-xs-pull-9 {\n  right: 75%; }\n\n.col-xs-pull-10 {\n  right: 83.33333%; }\n\n.col-xs-pull-11 {\n  right: 91.66667%; }\n\n.col-xs-pull-12 {\n  right: 100%; }\n\n.col-xs-push-0 {\n  left: auto; }\n\n.col-xs-push-1 {\n  left: 8.33333%; }\n\n.col-xs-push-2 {\n  left: 16.66667%; }\n\n.col-xs-push-3 {\n  left: 25%; }\n\n.col-xs-push-4 {\n  left: 33.33333%; }\n\n.col-xs-push-5 {\n  left: 41.66667%; }\n\n.col-xs-push-6 {\n  left: 50%; }\n\n.col-xs-push-7 {\n  left: 58.33333%; }\n\n.col-xs-push-8 {\n  left: 66.66667%; }\n\n.col-xs-push-9 {\n  left: 75%; }\n\n.col-xs-push-10 {\n  left: 83.33333%; }\n\n.col-xs-push-11 {\n  left: 91.66667%; }\n\n.col-xs-push-12 {\n  left: 100%; }\n\n.col-xs-offset-0 {\n  margin-left: 0%; }\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-xs-offset-3 {\n  margin-left: 25%; }\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-xs-offset-6 {\n  margin-left: 50%; }\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-xs-offset-9 {\n  margin-left: 75%; }\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-xs-offset-12 {\n  margin-left: 100%; }\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; }\n  .col-sm-1 {\n    width: 8.33333%; }\n  .col-sm-2 {\n    width: 16.66667%; }\n  .col-sm-3 {\n    width: 25%; }\n  .col-sm-4 {\n    width: 33.33333%; }\n  .col-sm-5 {\n    width: 41.66667%; }\n  .col-sm-6 {\n    width: 50%; }\n  .col-sm-7 {\n    width: 58.33333%; }\n  .col-sm-8 {\n    width: 66.66667%; }\n  .col-sm-9 {\n    width: 75%; }\n  .col-sm-10 {\n    width: 83.33333%; }\n  .col-sm-11 {\n    width: 91.66667%; }\n  .col-sm-12 {\n    width: 100%; }\n  .col-sm-pull-0 {\n    right: auto; }\n  .col-sm-pull-1 {\n    right: 8.33333%; }\n  .col-sm-pull-2 {\n    right: 16.66667%; }\n  .col-sm-pull-3 {\n    right: 25%; }\n  .col-sm-pull-4 {\n    right: 33.33333%; }\n  .col-sm-pull-5 {\n    right: 41.66667%; }\n  .col-sm-pull-6 {\n    right: 50%; }\n  .col-sm-pull-7 {\n    right: 58.33333%; }\n  .col-sm-pull-8 {\n    right: 66.66667%; }\n  .col-sm-pull-9 {\n    right: 75%; }\n  .col-sm-pull-10 {\n    right: 83.33333%; }\n  .col-sm-pull-11 {\n    right: 91.66667%; }\n  .col-sm-pull-12 {\n    right: 100%; }\n  .col-sm-push-0 {\n    left: auto; }\n  .col-sm-push-1 {\n    left: 8.33333%; }\n  .col-sm-push-2 {\n    left: 16.66667%; }\n  .col-sm-push-3 {\n    left: 25%; }\n  .col-sm-push-4 {\n    left: 33.33333%; }\n  .col-sm-push-5 {\n    left: 41.66667%; }\n  .col-sm-push-6 {\n    left: 50%; }\n  .col-sm-push-7 {\n    left: 58.33333%; }\n  .col-sm-push-8 {\n    left: 66.66667%; }\n  .col-sm-push-9 {\n    left: 75%; }\n  .col-sm-push-10 {\n    left: 83.33333%; }\n  .col-sm-push-11 {\n    left: 91.66667%; }\n  .col-sm-push-12 {\n    left: 100%; }\n  .col-sm-offset-0 {\n    margin-left: 0%; }\n  .col-sm-offset-1 {\n    margin-left: 8.33333%; }\n  .col-sm-offset-2 {\n    margin-left: 16.66667%; }\n  .col-sm-offset-3 {\n    margin-left: 25%; }\n  .col-sm-offset-4 {\n    margin-left: 33.33333%; }\n  .col-sm-offset-5 {\n    margin-left: 41.66667%; }\n  .col-sm-offset-6 {\n    margin-left: 50%; }\n  .col-sm-offset-7 {\n    margin-left: 58.33333%; }\n  .col-sm-offset-8 {\n    margin-left: 66.66667%; }\n  .col-sm-offset-9 {\n    margin-left: 75%; }\n  .col-sm-offset-10 {\n    margin-left: 83.33333%; }\n  .col-sm-offset-11 {\n    margin-left: 91.66667%; }\n  .col-sm-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left; }\n  .col-md-1 {\n    width: 8.33333%; }\n  .col-md-2 {\n    width: 16.66667%; }\n  .col-md-3 {\n    width: 25%; }\n  .col-md-4 {\n    width: 33.33333%; }\n  .col-md-5 {\n    width: 41.66667%; }\n  .col-md-6 {\n    width: 50%; }\n  .col-md-7 {\n    width: 58.33333%; }\n  .col-md-8 {\n    width: 66.66667%; }\n  .col-md-9 {\n    width: 75%; }\n  .col-md-10 {\n    width: 83.33333%; }\n  .col-md-11 {\n    width: 91.66667%; }\n  .col-md-12 {\n    width: 100%; }\n  .col-md-pull-0 {\n    right: auto; }\n  .col-md-pull-1 {\n    right: 8.33333%; }\n  .col-md-pull-2 {\n    right: 16.66667%; }\n  .col-md-pull-3 {\n    right: 25%; }\n  .col-md-pull-4 {\n    right: 33.33333%; }\n  .col-md-pull-5 {\n    right: 41.66667%; }\n  .col-md-pull-6 {\n    right: 50%; }\n  .col-md-pull-7 {\n    right: 58.33333%; }\n  .col-md-pull-8 {\n    right: 66.66667%; }\n  .col-md-pull-9 {\n    right: 75%; }\n  .col-md-pull-10 {\n    right: 83.33333%; }\n  .col-md-pull-11 {\n    right: 91.66667%; }\n  .col-md-pull-12 {\n    right: 100%; }\n  .col-md-push-0 {\n    left: auto; }\n  .col-md-push-1 {\n    left: 8.33333%; }\n  .col-md-push-2 {\n    left: 16.66667%; }\n  .col-md-push-3 {\n    left: 25%; }\n  .col-md-push-4 {\n    left: 33.33333%; }\n  .col-md-push-5 {\n    left: 41.66667%; }\n  .col-md-push-6 {\n    left: 50%; }\n  .col-md-push-7 {\n    left: 58.33333%; }\n  .col-md-push-8 {\n    left: 66.66667%; }\n  .col-md-push-9 {\n    left: 75%; }\n  .col-md-push-10 {\n    left: 83.33333%; }\n  .col-md-push-11 {\n    left: 91.66667%; }\n  .col-md-push-12 {\n    left: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0%; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left; }\n  .col-lg-1 {\n    width: 8.33333%; }\n  .col-lg-2 {\n    width: 16.66667%; }\n  .col-lg-3 {\n    width: 25%; }\n  .col-lg-4 {\n    width: 33.33333%; }\n  .col-lg-5 {\n    width: 41.66667%; }\n  .col-lg-6 {\n    width: 50%; }\n  .col-lg-7 {\n    width: 58.33333%; }\n  .col-lg-8 {\n    width: 66.66667%; }\n  .col-lg-9 {\n    width: 75%; }\n  .col-lg-10 {\n    width: 83.33333%; }\n  .col-lg-11 {\n    width: 91.66667%; }\n  .col-lg-12 {\n    width: 100%; }\n  .col-lg-pull-0 {\n    right: auto; }\n  .col-lg-pull-1 {\n    right: 8.33333%; }\n  .col-lg-pull-2 {\n    right: 16.66667%; }\n  .col-lg-pull-3 {\n    right: 25%; }\n  .col-lg-pull-4 {\n    right: 33.33333%; }\n  .col-lg-pull-5 {\n    right: 41.66667%; }\n  .col-lg-pull-6 {\n    right: 50%; }\n  .col-lg-pull-7 {\n    right: 58.33333%; }\n  .col-lg-pull-8 {\n    right: 66.66667%; }\n  .col-lg-pull-9 {\n    right: 75%; }\n  .col-lg-pull-10 {\n    right: 83.33333%; }\n  .col-lg-pull-11 {\n    right: 91.66667%; }\n  .col-lg-pull-12 {\n    right: 100%; }\n  .col-lg-push-0 {\n    left: auto; }\n  .col-lg-push-1 {\n    left: 8.33333%; }\n  .col-lg-push-2 {\n    left: 16.66667%; }\n  .col-lg-push-3 {\n    left: 25%; }\n  .col-lg-push-4 {\n    left: 33.33333%; }\n  .col-lg-push-5 {\n    left: 41.66667%; }\n  .col-lg-push-6 {\n    left: 50%; }\n  .col-lg-push-7 {\n    left: 58.33333%; }\n  .col-lg-push-8 {\n    left: 66.66667%; }\n  .col-lg-push-9 {\n    left: 75%; }\n  .col-lg-push-10 {\n    left: 83.33333%; }\n  .col-lg-push-11 {\n    left: 91.66667%; }\n  .col-lg-push-12 {\n    left: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0%; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-offset-12 {\n    margin-left: 100%; } }\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5; }\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold; }\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal; }\n\ninput[type=\"file\"] {\n  display: block; }\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%; }\n\nselect[multiple],\nselect[size] {\n  height: auto; }\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control:focus {\n    border-color: #3cd3ae;\n    outline: 0;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(60, 211, 174, 0.6);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(60, 211, 174, 0.6); }\n  .form-control::-moz-placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #999; }\n  .form-control::-webkit-input-placeholder {\n    color: #999; }\n  .form-control::-ms-expand {\n    border: 0;\n    background-color: transparent; }\n  .form-control[disabled], .form-control[readonly],\n  fieldset[disabled] .form-control {\n    background-color: #eeeeee;\n    opacity: 1; }\n  .form-control[disabled],\n  fieldset[disabled] .form-control {\n    cursor: not-allowed; }\n\ntextarea.form-control {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px; }\n  input[type=\"date\"].input-sm, .input-group-sm > input[type=\"date\"].form-control,\n  .input-group-sm > input[type=\"date\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-sm input[type=\"date\"],\n  input[type=\"time\"].input-sm,\n  .input-group-sm > input[type=\"time\"].form-control,\n  .input-group-sm > input[type=\"time\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-sm\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-sm\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-sm,\n  .input-group-sm > input[type=\"month\"].form-control,\n  .input-group-sm > input[type=\"month\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-sm\n  input[type=\"month\"] {\n    line-height: 30px; }\n  input[type=\"date\"].input-lg, .input-group-lg > input[type=\"date\"].form-control,\n  .input-group-lg > input[type=\"date\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-lg input[type=\"date\"],\n  input[type=\"time\"].input-lg,\n  .input-group-lg > input[type=\"time\"].form-control,\n  .input-group-lg > input[type=\"time\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-lg\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-lg\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-lg,\n  .input-group-lg > input[type=\"month\"].form-control,\n  .input-group-lg > input[type=\"month\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-lg\n  input[type=\"month\"] {\n    line-height: 46px; } }\n\n.form-group {\n  margin-bottom: 15px; }\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  .radio label,\n  .checkbox label {\n    min-height: 20px;\n    padding-left: 20px;\n    margin-bottom: 0;\n    font-weight: normal;\n    cursor: pointer; }\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9; }\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px; }\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer; }\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px; }\n\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed; }\n\n.radio-inline.disabled,\nfieldset[disabled] .radio-inline,\n.checkbox-inline.disabled,\nfieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed; }\n\n.radio.disabled label,\nfieldset[disabled] .radio label,\n.checkbox.disabled label,\nfieldset[disabled]\n.checkbox label {\n  cursor: not-allowed; }\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px; }\n  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn {\n    padding-left: 0;\n    padding-right: 0; }\n\n.input-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\nselect.input-sm, .input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn {\n  height: 30px;\n  line-height: 30px; }\n\ntextarea.input-sm, .input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\nselect[multiple].input-sm,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px; }\n\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto; }\n\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.input-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\nselect.input-lg, .input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn {\n  height: 46px;\n  line-height: 46px; }\n\ntextarea.input-lg, .input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\nselect[multiple].input-lg,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px; }\n\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto; }\n\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.has-feedback {\n  position: relative; }\n  .has-feedback .form-control {\n    padding-right: 42.5px; }\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none; }\n\n.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px; }\n\n.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px; }\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d; }\n\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-success .form-control:focus {\n    border-color: #2b542c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168; }\n\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8; }\n\n.has-success .form-control-feedback {\n  color: #3c763d; }\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b; }\n\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-warning .form-control:focus {\n    border-color: #66512c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }\n\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3; }\n\n.has-warning .form-control-feedback {\n  color: #8a6d3b; }\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442; }\n\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-error .form-control:focus {\n    border-color: #843534;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }\n\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede; }\n\n.has-error .form-control-feedback {\n  color: #a94442; }\n\n.has-feedback label ~ .form-control-feedback {\n  top: 25px; }\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0; }\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373; }\n\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n    .form-inline .radio label,\n    .form-inline .checkbox label {\n      padding-left: 0; }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px; }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px; }\n\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .form-horizontal .form-group:before, .form-horizontal .form-group:after {\n    content: \" \";\n    display: table; }\n  .form-horizontal .form-group:after {\n    clear: both; }\n\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px; } }\n\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px; }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px; } }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px; } }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:hover, .btn:focus, .btn.focus {\n    color: #333;\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    outline: 0;\n    background-image: none;\n    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn.disabled, .btn[disabled],\n  fieldset[disabled] .btn {\n    cursor: not-allowed;\n    opacity: 0.65;\n    filter: alpha(opacity=65);\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-default:focus, .btn-default.focus {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #8c8c8c; }\n  .btn-default:hover {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus,\n    .open > .btn-default.dropdown-toggle:hover,\n    .open > .btn-default.dropdown-toggle:focus,\n    .open > .btn-default.dropdown-toggle.focus {\n      color: #333;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    background-image: none; }\n  .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus,\n  fieldset[disabled] .btn-default:hover,\n  fieldset[disabled] .btn-default:focus,\n  fieldset[disabled] .btn-default.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-default .badge {\n    color: #fff;\n    background-color: #333; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #1F8A70;\n  border-color: #1a755f; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #16604e;\n    border-color: #030d0b; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #16604e;\n    border-color: #0f4337; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #16604e;\n    border-color: #0f4337; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #0f4337;\n      border-color: #030d0b; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    background-image: none; }\n  .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus,\n  fieldset[disabled] .btn-primary:hover,\n  fieldset[disabled] .btn-primary:focus,\n  fieldset[disabled] .btn-primary.focus {\n    background-color: #1F8A70;\n    border-color: #1a755f; }\n  .btn-primary .badge {\n    color: #1F8A70;\n    background-color: #fff; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #255625; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #255625; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    background-image: none; }\n  .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus,\n  fieldset[disabled] .btn-success:hover,\n  fieldset[disabled] .btn-success:focus,\n  fieldset[disabled] .btn-success.focus {\n    background-color: #5cb85c;\n    border-color: #4cae4c; }\n  .btn-success .badge {\n    color: #5cb85c;\n    background-color: #fff; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #1b6d85; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1b6d85; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    background-image: none; }\n  .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus,\n  fieldset[disabled] .btn-info:hover,\n  fieldset[disabled] .btn-info:focus,\n  fieldset[disabled] .btn-info.focus {\n    background-color: #5bc0de;\n    border-color: #46b8da; }\n  .btn-info .badge {\n    color: #5bc0de;\n    background-color: #fff; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #985f0d; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #985f0d; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    background-image: none; }\n  .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus,\n  fieldset[disabled] .btn-warning:hover,\n  fieldset[disabled] .btn-warning:focus,\n  fieldset[disabled] .btn-warning.focus {\n    background-color: #f0ad4e;\n    border-color: #eea236; }\n  .btn-warning .badge {\n    color: #f0ad4e;\n    background-color: #fff; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #d9534f;\n    background-color: #fff; }\n\n.btn-link {\n  color: #1F8A70;\n  font-weight: normal;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled],\n  fieldset[disabled] .btn-link {\n    background-color: transparent;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover, .btn-link:focus {\n    color: #114c3d;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link[disabled]:hover, .btn-link[disabled]:focus,\n  fieldset[disabled] .btn-link:hover,\n  fieldset[disabled] .btn-link:focus {\n    color: #777777;\n    text-decoration: none; }\n\n.btn-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.btn-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-xs {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate; }\n  .input-group[class*=\"col-\"] {\n    float: none;\n    padding-left: 0;\n    padding-right: 0; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  .input-group-addon.input-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 5px 10px;\n    font-size: 12px;\n    border-radius: 3px; }\n  .input-group-addon.input-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 10px 16px;\n    font-size: 18px;\n    border-radius: 6px; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:first-child {\n  border-right: 0; }\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group-addon:last-child {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {\n      z-index: 2; }\n  .input-group-btn:first-child > .btn,\n  .input-group-btn:first-child > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:last-child > .btn,\n  .input-group-btn:last-child > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none; }\n  .nav:before, .nav:after {\n    content: \" \";\n    display: table; }\n  .nav:after {\n    clear: both; }\n  .nav > li {\n    position: relative;\n    display: block; }\n    .nav > li > a {\n      position: relative;\n      display: block;\n      padding: 10px 15px; }\n      .nav > li > a:hover, .nav > li > a:focus {\n        text-decoration: none;\n        background-color: #eeeeee; }\n    .nav > li.disabled > a {\n      color: #777777; }\n      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\n        color: #777777;\n        text-decoration: none;\n        background-color: transparent;\n        cursor: not-allowed; }\n  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n    background-color: #eeeeee;\n    border-color: #1F8A70; }\n  .nav .nav-divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .nav > li > a > img {\n    max-width: none; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs > li {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs > li > a {\n      margin-right: 2px;\n      line-height: 1.42857;\n      border: 1px solid transparent;\n      border-radius: 4px 4px 0 0; }\n      .nav-tabs > li > a:hover {\n        border-color: #eeeeee #eeeeee #ddd; }\n    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n      color: #555555;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-bottom-color: transparent;\n      cursor: default; }\n\n.nav-pills > li {\n  float: left; }\n  .nav-pills > li > a {\n    border-radius: 4px; }\n  .nav-pills > li + li {\n    margin-left: 2px; }\n  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\n    color: #fff;\n    background-color: #1F8A70; }\n\n.nav-stacked > li {\n  float: none; }\n  .nav-stacked > li + li {\n    margin-top: 2px;\n    margin-left: 0; }\n\n.nav-justified, .nav-tabs.nav-justified {\n  width: 100%; }\n  .nav-justified > li, .nav-tabs.nav-justified > li {\n    float: none; }\n    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n      text-align: center;\n      margin-bottom: 5px; }\n  .nav-justified > .dropdown .dropdown-menu {\n    top: auto;\n    left: auto; }\n  @media (min-width: 768px) {\n    .nav-justified > li, .nav-tabs.nav-justified > li {\n      display: table-cell;\n      width: 1%; }\n      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n        margin-bottom: 0; } }\n\n.nav-tabs-justified, .nav-tabs.nav-justified {\n  border-bottom: 0; }\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n    margin-right: 0;\n    border-radius: 4px; }\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n    border: 1px solid #ddd; }\n  @media (min-width: 768px) {\n    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n      border-bottom: 1px solid #ddd;\n      border-radius: 4px 4px 0 0; }\n    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n    .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n    .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n      border-bottom-color: #fff; } }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em; }\n  .label:empty {\n    display: none; }\n  .btn .label {\n    position: relative;\n    top: -1px; }\n\na.label:hover, a.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-default {\n  background-color: #777777; }\n  .label-default[href]:hover, .label-default[href]:focus {\n    background-color: #5e5e5e; }\n\n.label-primary {\n  background-color: #1F8A70; }\n  .label-primary[href]:hover, .label-primary[href]:focus {\n    background-color: #16604e; }\n\n.label-success {\n  background-color: #5cb85c; }\n  .label-success[href]:hover, .label-success[href]:focus {\n    background-color: #449d44; }\n\n.label-info {\n  background-color: #5bc0de; }\n  .label-info[href]:hover, .label-info[href]:focus {\n    background-color: #31b0d5; }\n\n.label-warning {\n  background-color: #f0ad4e; }\n  .label-warning[href]:hover, .label-warning[href]:focus {\n    background-color: #ec971f; }\n\n.label-danger {\n  background-color: #d9534f; }\n  .label-danger[href]:hover, .label-danger[href]:focus {\n    background-color: #c9302c; }\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px; }\n  .badge:empty {\n    display: none; }\n  .btn .badge {\n    position: relative;\n    top: -1px; }\n  .btn-xs .badge,\n  .btn-group-xs > .btn .badge {\n    top: 0;\n    padding: 1px 5px; }\n  .list-group-item.active > .badge,\n  .nav-pills > .active > a > .badge {\n    color: #1F8A70;\n    background-color: #fff; }\n  .list-group-item > .badge {\n    float: right; }\n  .list-group-item > .badge + .badge {\n    margin-right: 5px; }\n  .nav-pills > li > a > .badge {\n    margin-left: 3px; }\n\na.badge:hover, a.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.pull-right {\n  float: right !important; }\n\n.pull-left {\n  float: left !important; }\n\n.hide {\n  display: none !important; }\n\n.show {\n  display: block !important; }\n\n.invisible {\n  visibility: hidden; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.hidden {\n  display: none !important; }\n\n.affix {\n  position: fixed; }\n\n@-ms-viewport {\n  width: device-width; }\n\n.visible-xs {\n  display: none !important; }\n\n.visible-sm {\n  display: none !important; }\n\n.visible-md {\n  display: none !important; }\n\n.visible-lg {\n  display: none !important; }\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important; }\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important; }\n  table.visible-xs {\n    display: table !important; }\n  tr.visible-xs {\n    display: table-row !important; }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important; }\n  table.visible-sm {\n    display: table !important; }\n  tr.visible-sm {\n    display: table-row !important; }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important; }\n  table.visible-md {\n    display: table !important; }\n  tr.visible-md {\n    display: table-row !important; }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important; }\n  table.visible-lg {\n    display: table !important; }\n  tr.visible-lg {\n    display: table-row !important; }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important; } }\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important; } }\n\n.visible-print {\n  display: none !important; }\n\n@media print {\n  .visible-print {\n    display: block !important; }\n  table.visible-print {\n    display: table !important; }\n  tr.visible-print {\n    display: table-row !important; }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important; } }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n/* Global styles */\nh2 {\n  font-size: 28px;\n  margin-top: 10px; }\n\n* {\n  font-family: \"Noto Sans\", Helvetica, sans-serif;\n  font-weight: 300; }\n\nhtml, body {\n  height: 100vh;\n  width: 100%; }\n\nbody {\n  background: #efefef;\n  overflow: hidden; }\n\na {\n  cursor: pointer; }\n\na.disabled, div.disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #999 !important; }\n\nbutton:focus {\n  outline: 0 !important; }\n\n.btn {\n  margin: 5px; }\n  .btn:focus {\n    outline: 0; }\n\n.btn-round {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%; }\n\n.btn-brand {\n  background: #1F8A70;\n  border-color: #fff;\n  color: white; }\n  .btn-brand:hover {\n    background: #1a755f;\n    color: white; }\n\n.btn-danger {\n  color: #d9534f;\n  background-color: #fff;\n  border-color: #d43f3a;\n  transition: all 0.3s ease; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #d9534f;\n      background-color: #d4d4d4;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #fff;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #fff;\n    background-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n    .btn-danger:hover:focus, .btn-danger:hover.focus {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #761c19; }\n    .btn-danger:hover:hover {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #ac2925; }\n    .btn-danger:hover:active, .btn-danger:hover.active,\n    .open > .btn-danger:hover.dropdown-toggle {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #ac2925; }\n      .btn-danger:hover:active:hover, .btn-danger:hover:active:focus, .btn-danger:hover:active.focus, .btn-danger:hover.active:hover, .btn-danger:hover.active:focus, .btn-danger:hover.active.focus,\n      .open > .btn-danger:hover.dropdown-toggle:hover,\n      .open > .btn-danger:hover.dropdown-toggle:focus,\n      .open > .btn-danger:hover.dropdown-toggle.focus {\n        color: #fff;\n        background-color: #ac2925;\n        border-color: #761c19; }\n    .btn-danger:hover:active, .btn-danger:hover.active,\n    .open > .btn-danger:hover.dropdown-toggle {\n      background-image: none; }\n    .btn-danger:hover.disabled:hover, .btn-danger:hover.disabled:focus, .btn-danger:hover.disabled.focus, .btn-danger:hover[disabled]:hover, .btn-danger:hover[disabled]:focus, .btn-danger:hover[disabled].focus,\n    fieldset[disabled] .btn-danger:hover:hover,\n    fieldset[disabled] .btn-danger:hover:focus,\n    fieldset[disabled] .btn-danger:hover.focus {\n      background-color: #d9534f;\n      border-color: #d43f3a; }\n    .btn-danger:hover .badge {\n      color: #d9534f;\n      background-color: #fff; }\n\n.divider {\n  position: relative; }\n  .divider .title {\n    display: flex; }\n    .divider .title:before, .divider .title:after {\n      content: \"\";\n      position: relative;\n      border-top: 1px solid #ccc;\n      flex-grow: 1;\n      margin: 9px 3px; }\n    .divider .title:before {\n      max-width: 10px; }\n\n.main {\n  width: 100vw;\n  height: 100vh;\n  overflow: auto;\n  max-width: 1500px;\n  background: #efefef;\n  margin: auto;\n  box-shadow: 0 0 8px 0 #c8c8c8; }\n  .main .flex-container {\n    display: flex; }\n  .main .routes {\n    overflow: auto;\n    width: 700px;\n    margin: auto;\n    background: white;\n    box-shadow: 0 0 5px 0 #aaa;\n    margin-top: 50px;\n    padding: 20px;\n    margin-bottom: 50px; }\n    .main .routes header {\n      display: flex;\n      margin-bottom: 10px; }\n      .main .routes header .btn {\n        margin-right: 10px; }\n      .main .routes header h1 {\n        margin: 0; }\n\n.label + .label {\n  margin-left: 5px; }\n\n.label.label-light {\n  background: transparent;\n  border: 1px solid; }\n  .label.label-light.label-default {\n    color: #777777; }\n  .label.label-light.label-primary {\n    color: #1F8A70; }\n  .label.label-light.label-success {\n    color: #5cb85c; }\n  .label.label-light.label-danger {\n    color: #d9534f; }\n  .label.label-light.label-info {\n    color: #5bc0de; }\n  .label.label-light.label-warning {\n    color: #f0ad4e; }\n\n.scrollable {\n  overflow: auto;\n  display: block; }\n  .scrollable::-webkit-scrollbar {\n    display: none; }\n", ""]);

	// exports


/***/ }),
/* 108 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"main\">\n\n  <main class=\"flex-container\">\n\n    <div class=\"routes\">\n      <router-outlet class=\"flex-item\"></router-outlet>\n    </div>\n\n  </main>\n\n</section>\n";

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(88);
	var routes = [
	    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
	];
	var MainRoutingModule = (function () {
	    function MainRoutingModule() {
	    }
	    return MainRoutingModule;
	}());
	MainRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    })
	], MainRoutingModule);
	exports.MainRoutingModule = MainRoutingModule;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var NavComponent = (function () {
	    function NavComponent() {
	    }
	    NavComponent.prototype.ngOnInit = function () {
	    };
	    ;
	    return NavComponent;
	}());
	NavComponent = __decorate([
	    core_1.Component({
	        selector: 'nav-sidebar',
	        styles: [__webpack_require__(111)],
	        template: __webpack_require__(113)
	    }),
	    __metadata("design:paramtypes", [])
	], NavComponent);
	exports.NavComponent = NavComponent;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(112);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .column {\n  background: #efefef;\n  height: calc(100vh); }\n\n.sidebar {\n  width: 95px;\n  overflow: hidden;\n  transition: all 0.4s ease; }\n  .sidebar .menu {\n    min-width: 250px;\n    padding-left: 15px;\n    transition: transform 0.4s ease; }\n  .sidebar .cloud-player {\n    background: #fcfcfc;\n    padding: 0;\n    text-align: center;\n    margin: 15px 15px 15px 15px;\n    border-radius: 4px;\n    height: 60px; }\n    .sidebar .cloud-player img {\n      width: 58px; }\n  .sidebar .menu a,\n  .sidebar .menu .nav-item,\n  .sidebar /deep/ authenticated-user-playlists a,\n  .sidebar /deep/ authenticated-user-playlists .nav-item {\n    margin: 20px 15px;\n    display: flex;\n    align-items: center;\n    text-align: center;\n    width: 100%;\n    text-decoration: none;\n    cursor: pointer; }\n    .sidebar .menu a img,\n    .sidebar .menu .nav-item img,\n    .sidebar /deep/ authenticated-user-playlists a img,\n    .sidebar /deep/ authenticated-user-playlists .nav-item img {\n      margin: 0 13px 0 0;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%; }\n    .sidebar .menu a i,\n    .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      border: 1px solid;\n      border-radius: 50%;\n      width: 30px;\n      height: 30px;\n      margin-right: 13px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 12px; }\n      .sidebar .menu a i.fa-search,\n      .sidebar .menu .nav-item i.fa-search,\n      .sidebar /deep/ authenticated-user-playlists a i.fa-search,\n      .sidebar /deep/ authenticated-user-playlists .nav-item i.fa-search {\n        font-size: 14px; }\n    .sidebar .menu a .text,\n    .sidebar .menu .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text {\n      display: block; }\n  .sidebar .menu a, .sidebar .menu .nav-item,\n  .sidebar /deep/ authenticated-user-playlists a,\n  .sidebar /deep/ authenticated-user-playlists .nav-item {\n    text-decoration: none; }\n    .sidebar .menu a .text,\n    .sidebar .menu a i, .sidebar .menu .nav-item .text,\n    .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      transition: color 0.6s ease; }\n    .sidebar .menu a i, .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      color: #222222;\n      transition: color 0.6s ease; }\n    .sidebar .menu a .text, .sidebar .menu .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text {\n      color: #cbcbcb; }\n    .sidebar .menu a.disabled .text,\n    .sidebar .menu a.disabled i, .sidebar .menu .nav-item.disabled .text,\n    .sidebar .menu .nav-item.disabled i,\n    .sidebar /deep/ authenticated-user-playlists a.disabled .text,\n    .sidebar /deep/ authenticated-user-playlists a.disabled i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.disabled .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.disabled i {\n      color: #cbcbcb; }\n    .sidebar .menu a:hover .text,\n    .sidebar .menu a:hover i, .sidebar .menu .nav-item:hover .text,\n    .sidebar .menu .nav-item:hover i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .text,\n    .sidebar /deep/ authenticated-user-playlists a:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover i {\n      color: #1F8A70; }\n    .sidebar .menu a:hover i, .sidebar .menu .nav-item:hover i,\n    .sidebar /deep/ authenticated-user-playlists a:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover i {\n      border-color: #222222;\n      color: #1F8A70; }\n    .sidebar .menu a:hover .private-badge i, .sidebar .menu .nav-item:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .private-badge i {\n      color: #222222; }\n    .sidebar .menu a:hover .private-badge i, .sidebar .menu .nav-item:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .private-badge i {\n      border-color: #222222 !important;\n      color: #222222 !important; }\n    .sidebar .menu a.is-active .text,\n    .sidebar .menu a.is-active i, .sidebar .menu a.is-active:hover .text,\n    .sidebar .menu a.is-active:hover i, .sidebar .menu .nav-item.is-active .text,\n    .sidebar .menu .nav-item.is-active i, .sidebar .menu .nav-item.is-active:hover .text,\n    .sidebar .menu .nav-item.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .text,\n    .sidebar /deep/ authenticated-user-playlists a.is-active i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .text,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover i {\n      font-weight: bold; }\n    .sidebar .menu a.is-active i,\n    .sidebar .menu a.is-active .cover, .sidebar .menu a.is-active:hover i,\n    .sidebar .menu a.is-active:hover .cover, .sidebar .menu .nav-item.is-active i,\n    .sidebar .menu .nav-item.is-active .cover, .sidebar .menu .nav-item.is-active:hover i,\n    .sidebar .menu .nav-item.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .cover {\n      color: #1F8A70 !important;\n      border-color: #1F8A70 !important; }\n    .sidebar .menu a.is-active .cover, .sidebar .menu a.is-active:hover .cover, .sidebar .menu .nav-item.is-active .cover, .sidebar .menu .nav-item.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .cover {\n      border: 1px solid; }\n    .sidebar .menu a.is-active .private-badge i, .sidebar .menu a.is-active:hover .private-badge i, .sidebar .menu .nav-item.is-active .private-badge i, .sidebar .menu .nav-item.is-active:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .private-badge i {\n      border-color: #222222 !important;\n      color: #222222 !important; }\n  .sidebar:hover {\n    width: 250px; }\n    .sidebar:hover .menu a .text, .sidebar:hover .menu .nav-item .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item .text {\n      color: #222222; }\n    .sidebar:hover .menu a.disabled .text,\n    .sidebar:hover .menu a.disabled i, .sidebar:hover .menu .nav-item.disabled .text,\n    .sidebar:hover .menu .nav-item.disabled i,\n    .sidebar:hover /deep/ authenticated-user-playlists a.disabled .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a.disabled i,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.disabled .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.disabled i {\n      color: #cbcbcb; }\n    .sidebar:hover .menu a:hover .text,\n    .sidebar:hover .menu a:hover i, .sidebar:hover .menu .nav-item:hover .text,\n    .sidebar:hover .menu .nav-item:hover i,\n    .sidebar:hover /deep/ authenticated-user-playlists a:hover .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a:hover i,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item:hover .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item:hover i {\n      color: #1F8A70; }\n    .sidebar:hover .menu a.is-active .text, .sidebar:hover .menu .nav-item.is-active .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a.is-active .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.is-active .text {\n      color: #222222 !important; }\n  @media (min-width: 1200px) {\n    .sidebar {\n      width: 250px; }\n      .sidebar .menu a .text,\n      .sidebar .menu a i, .sidebar .menu .nav-item .text,\n      .sidebar .menu .nav-item i,\n      .sidebar /deep/ authenticated-user-playlists a .text,\n      .sidebar /deep/ authenticated-user-playlists a i,\n      .sidebar /deep/ authenticated-user-playlists .nav-item .text,\n      .sidebar /deep/ authenticated-user-playlists .nav-item i {\n        color: #222222; }\n      .sidebar .menu a.disabled .text,\n      .sidebar .menu a.disabled i, .sidebar .menu .nav-item.disabled .text,\n      .sidebar .menu .nav-item.disabled i,\n      .sidebar /deep/ authenticated-user-playlists a.disabled .text,\n      .sidebar /deep/ authenticated-user-playlists a.disabled i,\n      .sidebar /deep/ authenticated-user-playlists .nav-item.disabled .text,\n      .sidebar /deep/ authenticated-user-playlists .nav-item.disabled i {\n        color: #cbcbcb; } }\n  @media (min-width: 1380px) {\n    .sidebar {\n      width: 300px; }\n      .sidebar:hover {\n        width: 300px; } }\n\n@media (max-width: 991px) {\n  :host {\n    width: 100vw;\n    position: fixed;\n    bottom: 0;\n    height: 40px;\n    z-index: 1;\n    box-shadow: 0 0 8px 0 #c8c8c8;\n    z-index: 999; }\n    :host .sidebar,\n    :host /deep/ authenticated-user-playlists {\n      min-width: 100%;\n      padding: 0; }\n      :host .sidebar .menu,\n      :host /deep/ authenticated-user-playlists .menu {\n        min-width: 100%;\n        padding-left: 0; }\n      :host .sidebar .divider,\n      :host .sidebar .cloud-player,\n      :host /deep/ authenticated-user-playlists .divider,\n      :host /deep/ authenticated-user-playlists .cloud-player {\n        display: none; }\n      :host .sidebar .user,\n      :host /deep/ authenticated-user-playlists .user {\n        order: 4; }\n      :host .sidebar nav,\n      :host /deep/ authenticated-user-playlists nav {\n        display: flex;\n        font-size: 13px;\n        margin: 0; }\n        :host .sidebar nav a,\n        :host .sidebar nav .nav-item,\n        :host /deep/ authenticated-user-playlists nav a,\n        :host /deep/ authenticated-user-playlists nav .nav-item {\n          display: block;\n          margin: 0;\n          border-left: 1px solid #dad9d9;\n          padding: 7px; }\n          :host .sidebar nav a.is-active,\n          :host .sidebar nav .nav-item.is-active,\n          :host /deep/ authenticated-user-playlists nav a.is-active,\n          :host /deep/ authenticated-user-playlists nav .nav-item.is-active {\n            background: #dad9d9; }\n            :host .sidebar nav a.is-active i,\n            :host .sidebar nav .nav-item.is-active i,\n            :host /deep/ authenticated-user-playlists nav a.is-active i,\n            :host /deep/ authenticated-user-playlists nav .nav-item.is-active i {\n              color: #1F8A70; }\n          :host .sidebar nav a.disabled,\n          :host .sidebar nav .nav-item.disabled,\n          :host /deep/ authenticated-user-playlists nav a.disabled,\n          :host /deep/ authenticated-user-playlists nav .nav-item.disabled {\n            display: none; }\n          :host .sidebar nav a i,\n          :host .sidebar nav .nav-item i,\n          :host /deep/ authenticated-user-playlists nav a i,\n          :host /deep/ authenticated-user-playlists nav .nav-item i {\n            margin: 0 auto;\n            font-size: 20px;\n            padding: 0;\n            border: none;\n            background: transparent; }\n            :host .sidebar nav a i.fa-search,\n            :host .sidebar nav .nav-item i.fa-search,\n            :host /deep/ authenticated-user-playlists nav a i.fa-search,\n            :host /deep/ authenticated-user-playlists nav .nav-item i.fa-search {\n              font-size: 18px; }\n          :host .sidebar nav a img,\n          :host .sidebar nav .nav-item img,\n          :host /deep/ authenticated-user-playlists nav a img,\n          :host /deep/ authenticated-user-playlists nav .nav-item img {\n            width: 27px;\n            height: 27px; }\n          :host .sidebar nav a .text,\n          :host .sidebar nav .nav-item .text,\n          :host /deep/ authenticated-user-playlists nav a .text,\n          :host /deep/ authenticated-user-playlists nav .nav-item .text {\n            display: none; }\n          :host .sidebar nav a.sc-connect,\n          :host .sidebar nav .nav-item.sc-connect,\n          :host /deep/ authenticated-user-playlists nav a.sc-connect,\n          :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect {\n            display: flex; }\n            :host .sidebar nav a.sc-connect i,\n            :host .sidebar nav .nav-item.sc-connect i,\n            :host /deep/ authenticated-user-playlists nav a.sc-connect i,\n            :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect i {\n              margin-right: 5px; }\n            :host .sidebar nav a.sc-connect .text,\n            :host .sidebar nav .nav-item.sc-connect .text,\n            :host /deep/ authenticated-user-playlists nav a.sc-connect .text,\n            :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect .text {\n              display: block;\n              margin-right: auto;\n              color: #222222;\n              font-size: 10px; } }\n", ""]);

	// exports


/***/ }),
/* 113 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n\n  <div class=\"sidebar\">\n    <div class=\"cloud-player\">\n\n    </div>\n\n    <div class=\"menu\">\n      <nav>\n        <a routerLink=\"/dashboard\"\n           [routerLinkActive]=\"['is-active']\">\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Search</div>\n        </a>\n      </nav>\n    </div>\n\n  </div>\n\n</section>\n";

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var platform_browser_1 = __webpack_require__(21);
	var forms_1 = __webpack_require__(62);
	var backbone_module_1 = __webpack_require__(66);
	var experiment_routes_1 = __webpack_require__(115);
	var circle_experiment_component_1 = __webpack_require__(116);
	var random_size_directive_1 = __webpack_require__(169);
	var shared_module_1 = __webpack_require__(170);
	var circle_experiment_result_component_1 = __webpack_require__(126);
	var circle_experiment_results_component_1 = __webpack_require__(130);
	var perception_experiment_component_1 = __webpack_require__(136);
	var hide_after_time_component_1 = __webpack_require__(143);
	var target_finder_areas_component_1 = __webpack_require__(147);
	var perception_experiment_results_component_1 = __webpack_require__(155);
	var multi_data_dimension_experiment_component_1 = __webpack_require__(160);
	var data_per_manufacturer_component_1 = __webpack_require__(199);
	var ExperimentModule = (function () {
	    function ExperimentModule() {
	    }
	    return ExperimentModule;
	}());
	ExperimentModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            shared_module_1.SharedModule,
	            experiment_routes_1.CircleExperimentRoutingModule,
	            backbone_module_1.BackboneModule
	        ],
	        declarations: [
	            circle_experiment_component_1.CircleExperimentComponent,
	            perception_experiment_component_1.PerceptionExperimentComponent,
	            target_finder_areas_component_1.TargetFinderAreasComponent,
	            hide_after_time_component_1.HideAfterTimeComponent,
	            circle_experiment_result_component_1.CircleExperimentResultComponent,
	            circle_experiment_results_component_1.CircleExperimentResultsComponent,
	            perception_experiment_results_component_1.PerceptionExperimentResultsComponent,
	            data_per_manufacturer_component_1.DataPerManufacturerComponent,
	            multi_data_dimension_experiment_component_1.MultiDataDimensionExperimentComponent,
	            random_size_directive_1.RandomSizeDirective
	        ]
	    })
	], ExperimentModule);
	exports.ExperimentModule = ExperimentModule;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(88);
	var circle_experiment_component_1 = __webpack_require__(116);
	var circle_experiment_result_component_1 = __webpack_require__(126);
	var circle_experiment_results_component_1 = __webpack_require__(130);
	var perception_experiment_component_1 = __webpack_require__(136);
	var perception_experiment_results_component_1 = __webpack_require__(155);
	var multi_data_dimension_experiment_component_1 = __webpack_require__(160);
	var routes = [
	    { path: 'experiments/circle', component: circle_experiment_component_1.CircleExperimentComponent },
	    { path: 'experiments/perception', component: perception_experiment_component_1.PerceptionExperimentComponent },
	    { path: 'experiments/results/circle', component: circle_experiment_results_component_1.CircleExperimentResultsComponent },
	    { path: 'experiments/results/circle/:id', component: circle_experiment_result_component_1.CircleExperimentResultComponent },
	    { path: 'experiments/results/circle/:id/all', component: circle_experiment_results_component_1.CircleExperimentResultsComponent },
	    { path: 'experiments/results/perception', component: perception_experiment_results_component_1.PerceptionExperimentResultsComponent },
	    { path: 'experiments/multi-data-dimension', component: multi_data_dimension_experiment_component_1.MultiDataDimensionExperimentComponent }
	];
	var CircleExperimentRoutingModule = (function () {
	    function CircleExperimentRoutingModule() {
	    }
	    return CircleExperimentRoutingModule;
	}());
	CircleExperimentRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    })
	], CircleExperimentRoutingModule);
	exports.CircleExperimentRoutingModule = CircleExperimentRoutingModule;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var wizard_component_1 = __webpack_require__(117);
	var circle_experiment_model_1 = __webpack_require__(121);
	var router_1 = __webpack_require__(88);
	var CircleExperimentComponent = (function () {
	    function CircleExperimentComponent(circleExperimentModel, router, route) {
	        this.circleExperimentModel = circleExperimentModel;
	        this.router = router;
	        this.route = route;
	        this.isSaving = false;
	        this.transformRangeVal = function (val) {
	            return val + '%';
	        };
	    }
	    CircleExperimentComponent.prototype.getDeviation = function (el, val) {
	        var scale = el.nativeElement.offsetWidth - 100;
	        return Math.abs(scale - val);
	    };
	    CircleExperimentComponent.prototype.updateExperimentVal = function (attrName, el, val) {
	        this.circleExperimentModel.set(attrName, this.getDeviation(el, val));
	    };
	    CircleExperimentComponent.prototype.changedValCircle1 = function (val) {
	        this.circleExperimentModel.set('circle1', val);
	        this.updateExperimentVal('circle1Dev', this.circle1, val);
	    };
	    CircleExperimentComponent.prototype.changedValCircle2 = function (val) {
	        this.circleExperimentModel.set('circle2', val);
	        this.updateExperimentVal('circle2Dev', this.circle2, val);
	    };
	    CircleExperimentComponent.prototype.changedValCircle3 = function (val) {
	        this.circleExperimentModel.set('circle3', val);
	        this.updateExperimentVal('circle3Dev', this.circle3, val);
	    };
	    CircleExperimentComponent.prototype.changedValSquare = function (val) {
	        this.circleExperimentModel.set('square', val);
	        this.updateExperimentVal('squareDev', this.square, val);
	    };
	    CircleExperimentComponent.prototype.save = function () {
	        var _this = this;
	        this.isSaving = true;
	        this.circleExperimentModel.save().then(function () {
	            _this.isSaving = false;
	            _this.router.navigate(['experiments/results/circle', _this.circleExperimentModel.get('id')]);
	        }, function () {
	            _this.isSaving = true;
	        });
	    };
	    return CircleExperimentComponent;
	}());
	__decorate([
	    core_1.ViewChild('orgCircle'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentComponent.prototype, "orgCircle", void 0);
	__decorate([
	    core_1.ViewChild('wizard'),
	    __metadata("design:type", wizard_component_1.WizardComponent)
	], CircleExperimentComponent.prototype, "wizard", void 0);
	__decorate([
	    core_1.ViewChild('circle1'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentComponent.prototype, "circle1", void 0);
	__decorate([
	    core_1.ViewChild('circle2'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentComponent.prototype, "circle2", void 0);
	__decorate([
	    core_1.ViewChild('circle3'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentComponent.prototype, "circle3", void 0);
	__decorate([
	    core_1.ViewChild('square'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentComponent.prototype, "square", void 0);
	CircleExperimentComponent = __decorate([
	    core_1.Component({
	        selector: 'circle-experiment',
	        styles: [__webpack_require__(123)],
	        template: __webpack_require__(125),
	        providers: [circle_experiment_model_1.CircleExperimentModel]
	    }),
	    __metadata("design:paramtypes", [circle_experiment_model_1.CircleExperimentModel, router_1.Router, router_1.ActivatedRoute])
	], CircleExperimentComponent);
	exports.CircleExperimentComponent = CircleExperimentComponent;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var WizardComponent = (function () {
	    function WizardComponent() {
	        this.slides = [];
	        this.displayIndex = 0;
	        this.opened = new core_1.EventEmitter();
	    }
	    WizardComponent.prototype.ngOnInit = function () {
	    };
	    WizardComponent.prototype.addEntry = function (slide) {
	        if (this.slides.length === 0) {
	            slide.open();
	        }
	        this.slides.push(slide);
	    };
	    WizardComponent.prototype.hasPrevious = function () {
	        return this.displayIndex > 0;
	    };
	    WizardComponent.prototype.hasNext = function () {
	        return this.displayIndex < this.slides.length - 1;
	    };
	    WizardComponent.prototype.previous = function () {
	        if (this.hasPrevious()) {
	            var currentSlide = this.slides[this.displayIndex];
	            this.displayIndex--;
	            var nextSlide = this.slides[this.displayIndex];
	            currentSlide.close();
	            nextSlide.open();
	        }
	    };
	    WizardComponent.prototype.next = function () {
	        if (this.hasNext()) {
	            var currentSlide = this.slides[this.displayIndex];
	            this.displayIndex++;
	            var nextSlide = this.slides[this.displayIndex];
	            currentSlide.close();
	            nextSlide.open();
	        }
	    };
	    return WizardComponent;
	}());
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Object)
	], WizardComponent.prototype, "opened", void 0);
	WizardComponent = __decorate([
	    core_1.Component({
	        moduleId: module.id.toString(),
	        selector: 'wizard',
	        styles: [__webpack_require__(118)],
	        template: __webpack_require__(120)
	    }),
	    __metadata("design:paramtypes", [])
	], WizardComponent);
	exports.WizardComponent = WizardComponent;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(119);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ".slide-manager .indicator {\n  position: fixed;\n  left: 50%;\n  width: 5px;\n  height: 100px;\n  background: grey; }\n  .slide-manager .indicator.next {\n    bottom: 0; }\n  .slide-manager .indicator.previous {\n    top: 0; }\n  .slide-manager .indicator .progress {\n    background: red;\n    width: 100%;\n    position: absolute;\n    left: 0;\n    bottom: 0; }\n", ""]);

	// exports


/***/ }),
/* 120 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"slide-manager\">\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_model_1 = __webpack_require__(122);
	var underscore_1 = __webpack_require__(67);
	var CircleExperimentModel = (function (_super) {
	    __extends(CircleExperimentModel, _super);
	    function CircleExperimentModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.endpoint = '/circle-results';
	        return _this;
	    }
	    CircleExperimentModel.prototype.defaults = function () {
	        return {
	            circle1: 0,
	            circle2: 0,
	            circle3: 0,
	            square: 0
	        };
	    };
	    CircleExperimentModel.prototype.validate = function () {
	        if (!underscore_1.isNumber(this.get('circle1Dev')) || !underscore_1.isNumber(this.get('circle2Dev')) || !underscore_1.isNumber(this.get('circle3Dev')) || !underscore_1.isNumber(this.get('squareDev'))) {
	            return 'Please guess a circle size for all circles';
	        }
	    };
	    CircleExperimentModel.prototype.getUserSetSize = function (circleName) {
	        return this.get(circleName) + 100;
	    };
	    CircleExperimentModel.prototype.getOrgSize = function (circleName) {
	        return this.getUserSetSize(circleName) - this.get(circleName + 'Dev');
	    };
	    CircleExperimentModel.prototype.userWasRight = function (circleName) {
	        return this.getOrgSize(circleName) === this.getUserSetSize(circleName);
	    };
	    return CircleExperimentModel;
	}(visualisation_model_1.VisualisationModel));
	CircleExperimentModel = __decorate([
	    core_1.Injectable()
	], CircleExperimentModel);
	exports.CircleExperimentModel = CircleExperimentModel;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var base_model_1 = __webpack_require__(70);
	var core_1 = __webpack_require__(3);
	var VisualisationModel = (function (_super) {
	    __extends(VisualisationModel, _super);
	    function VisualisationModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    VisualisationModel.prototype.hostName = function () {
	        if (true) {
	            return 'http://ec2-52-59-231-57.eu-central-1.compute.amazonaws.com:3000';
	        }
	        else {
	            return 'http://localhost:3000';
	        }
	    };
	    ;
	    VisualisationModel.prototype.basePath = function () {
	        return 'api';
	    };
	    ;
	    return VisualisationModel;
	}(base_model_1.BaseModel));
	VisualisationModel = __decorate([
	    core_1.Injectable()
	], VisualisationModel);
	exports.VisualisationModel = VisualisationModel;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(124);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .circle {\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white; }\n  :host .circle span {\n    background: inherit;\n    padding: 3px; }\n  :host .circle.blue {\n    background: #004358; }\n  :host .circle.green {\n    background: #BEDB39; }\n  :host .circle.yellow {\n    background: #FFE11A; }\n  :host .circle.orange {\n    background: #FD7400; }\n  :host .circle.green {\n    background: #1F8A70; }\n  :host .circle .fa {\n    font-size: 40px; }\n\n:host .circle-container {\n  display: flex;\n  align-items: center; }\n  :host .circle-container.grid-bg {\n    background: linear-gradient(0, #FFFFFF 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.298039) 1px, transparent 1px), #777777;\n    background-size: 10px 50px; }\n  :host .circle-container.circle-in-circle .circle-holder {\n    flex-basis: 100%; }\n  :host .circle-container.square .circle {\n    border-radius: 0; }\n  :host .circle-container .circle-holder {\n    flex-basis: 50%;\n    align-items: center;\n    display: flex;\n    justify-content: center;\n    min-height: 300px; }\n  :host .circle-container .left-circle {\n    width: 100px;\n    height: 100px; }\n  :host .circle-container .right-circle {\n    width: 120px;\n    height: 120px; }\n", ""]);

	// exports


/***/ }),
/* 125 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Circle Experiment</h1>\n  </header>\n\n  <section>\n    <form #devForm=\"ngForm\">\n      <wizard #wizard>\n        <wizard-entry>\n          <div class=\"circle-container\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\" #orgCircle>\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   #circle1\n                   randomSize\n                   [orgSize]=\"100\">\n                <span>{{circleExperimentModel.get('circle1')+100}}%</span>\n              </div>\n            </div>\n          </div>\n          <hr>\n          <h3>Guess how much bigger the orange circle is (right circle)</h3>\n          <range-slider\n            [min]=\"0\"\n            [max]=\"100\"\n            [value]=\"circleExperimentModel.get('circle1')\"\n            [step]=\"10\"\n            [transformDisplayValue]=\"transformRangeVal\"\n            (valueChanged)=\"changedValCircle1($event)\"></range-slider>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container grid-bg\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\" #orgCircle>\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   #circle2\n                   randomSize\n                   [orgSize]=\"100\">\n                <span>{{circleExperimentModel.get('circle2')+100}}%</span>\n              </div>\n            </div>\n          </div>\n          <hr>\n          <h3>Guess how much bigger the orange circle is (right circle)</h3>\n          <range-slider\n            [min]=\"0\"\n            [max]=\"100\"\n            [value]=\"circleExperimentModel.get('circle2')\"\n            [step]=\"10\"\n            [transformDisplayValue]=\"transformRangeVal\"\n            (valueChanged)=\"changedValCircle2($event)\"></range-slider>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container circle-in-circle\">\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   #circle3\n                   randomSize\n                   [orgSize]=\"100\">\n                <div class=\"circle left-circle blue\"\n                     #orgCircle>\n                </div>\n              </div>\n            </div>\n          </div>\n          <hr>\n          <h3>Guess how much bigger the orange circle is (outer circle)</h3>\n          <range-slider\n            [min]=\"0\"\n            [max]=\"100\"\n            [value]=\"circleExperimentModel.get('circle3')\"\n            [step]=\"10\"\n            [transformDisplayValue]=\"transformRangeVal\"\n            (valueChanged)=\"changedValCircle3($event)\"></range-slider>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container square\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\">\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   #square\n                   randomSize\n                   [orgSize]=\"100\">\n                <span>{{circleExperimentModel.get('square')+100}}%</span>\n              </div>\n            </div>\n          </div>\n          <hr>\n          <h3>Guess how much bigger the orange circle is (right circle)</h3>\n          <range-slider\n            [min]=\"0\"\n            [max]=\"100\"\n            [value]=\"circleExperimentModel.get('square')\"\n            [step]=\"10\"\n            [transformDisplayValue]=\"transformRangeVal\"\n            (valueChanged)=\"changedValSquare($event)\"></range-slider>\n        </wizard-entry>\n\n      </wizard>\n      <hr>\n      <span *ngIf=\"circleExperimentModel.validate()\"\n            class=\"error pull-left\">\n        {{circleExperimentModel.validate()}}\n      </span>\n      <button *ngIf=\"wizard.hasNext()\"\n              class=\"btn btn-primary pull-right\"\n              (click)=\"wizard.next()\">\n        Continue\n      </button>\n      <button *ngIf=\"!wizard.hasNext()\"\n              class=\"btn btn-primary pull-right\"\n              (click)=\"save()\"\n              [disabled]=\"circleExperimentModel.validate() || isSaving\">\n        Save\n      </button>\n      <button *ngIf=\"wizard.hasPrevious()\"\n              class=\"btn btn-default pull-right\"\n              (click)=\"wizard.previous()\">\n        Back\n      </button>\n    </form>\n  </section>\n\n</section>\n";

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var wizard_component_1 = __webpack_require__(117);
	var circle_experiment_model_1 = __webpack_require__(121);
	var router_1 = __webpack_require__(88);
	var CircleExperimentResultComponent = (function () {
	    function CircleExperimentResultComponent(route, circleExperimentModel) {
	        this.route = route;
	        this.circleExperimentModel = circleExperimentModel;
	    }
	    CircleExperimentResultComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.route.params.forEach(function (params) {
	            var id = +params['id'];
	            _this.circleExperimentModel.set('id', id);
	            _this.circleExperimentModel.fetch();
	        });
	    };
	    return CircleExperimentResultComponent;
	}());
	__decorate([
	    core_1.ViewChild('orgCircle'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultComponent.prototype, "orgCircle", void 0);
	__decorate([
	    core_1.ViewChild('wizard'),
	    __metadata("design:type", wizard_component_1.WizardComponent)
	], CircleExperimentResultComponent.prototype, "wizard", void 0);
	__decorate([
	    core_1.ViewChild('circle1'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultComponent.prototype, "circle1", void 0);
	__decorate([
	    core_1.ViewChild('circle2'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultComponent.prototype, "circle2", void 0);
	__decorate([
	    core_1.ViewChild('circle3'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultComponent.prototype, "circle3", void 0);
	CircleExperimentResultComponent = __decorate([
	    core_1.Component({
	        selector: 'circle-experiment-result',
	        styles: [__webpack_require__(127)],
	        template: __webpack_require__(129),
	        providers: [circle_experiment_model_1.CircleExperimentModel]
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute, circle_experiment_model_1.CircleExperimentModel])
	], CircleExperimentResultComponent);
	exports.CircleExperimentResultComponent = CircleExperimentResultComponent;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(128);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .circle {\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white; }\n  :host .circle span {\n    background: inherit;\n    padding: 3px; }\n  :host .circle.blue {\n    background: #004358; }\n  :host .circle.green {\n    background: #BEDB39; }\n  :host .circle.yellow {\n    background: #FFE11A; }\n  :host .circle.orange {\n    background: #FD7400; }\n  :host .circle.green {\n    background: #1F8A70; }\n  :host .circle .fa {\n    font-size: 40px; }\n\n:host .circle-container {\n  display: flex;\n  align-items: center; }\n  :host .circle-container.grid-bg {\n    background: linear-gradient(0, #FFFFFF 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.298039) 1px, transparent 1px), #777777;\n    background-size: 10px 50px; }\n  :host .circle-container.circle-in-circle .circle-holder {\n    flex-basis: 100%; }\n  :host .circle-container.square .circle {\n    border-radius: 0; }\n  :host .circle-container .circle-holder {\n    flex-basis: 50%;\n    align-items: center;\n    display: flex;\n    justify-content: center;\n    min-height: 300px; }\n  :host .circle-container .left-circle {\n    width: 100px;\n    height: 100px; }\n  :host .circle-container .right-circle {\n    width: 120px;\n    height: 120px; }\n\n:host .legend {\n  display: flex;\n  margin-top: 20px; }\n  :host .legend .item {\n    display: flex;\n    align-items: center;\n    margin-left: 10px; }\n    :host .legend .item .circle {\n      height: 10px;\n      width: 10px;\n      margin-right: 3px; }\n", ""]);

	// exports


/***/ }),
/* 129 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Circle Experiment–Your result</h1>\n  </header>\n\n  <section>\n    <form #devForm=\"ngForm\">\n      <wizard #wizard>\n        <wizard-entry>\n          <div class=\"circle-container\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\" #orgCircle>\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   [class.green]=\"circleExperimentModel.userWasRight('circle1')\"\n                   [style.width]=\"circleExperimentModel.getUserSetSize('circle1')+'px'\"\n                   [style.height]=\"circleExperimentModel.getUserSetSize('circle1')+'px'\">\n                <div *ngIf=\"!circleExperimentModel.userWasRight('circle1')\"\n                     class=\"circle yellow\"\n                     [style.width]=\"circleExperimentModel.getOrgSize('circle1')+'px'\"\n                     [style.height]=\"circleExperimentModel.getOrgSize('circle1')+'px'\">\n                  <span class=\"fa fa-times\"></span>\n                </div>\n                <span *ngIf=\"circleExperimentModel.userWasRight('circle1')\"\n                      class=\"fa fa-check\"></span>\n              </div>\n            </div>\n          </div>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container grid-bg\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\" #orgCircle>\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   [class.green]=\"circleExperimentModel.userWasRight('circle2')\"\n                   [style.width]=\"circleExperimentModel.getUserSetSize('circle2')+'px'\"\n                   [style.height]=\"circleExperimentModel.getUserSetSize('circle2')+'px'\">\n                <div *ngIf=\"!circleExperimentModel.userWasRight('circle2')\"\n                     class=\"circle yellow\"\n                     [style.width]=\"circleExperimentModel.getOrgSize('circle2')+'px'\"\n                     [style.height]=\"circleExperimentModel.getOrgSize('circle2')+'px'\">\n                  <span class=\"fa fa-times\"></span>\n                </div>\n                <span *ngIf=\"circleExperimentModel.userWasRight('circle2')\"\n                      class=\"fa fa-check\"></span>\n              </div>\n            </div>\n          </div>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container circle-in-circle\">\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   [class.green]=\"circleExperimentModel.userWasRight('circle3')\"\n                   [style.width]=\"circleExperimentModel.getUserSetSize('circle3')+'px'\"\n                   [style.height]=\"circleExperimentModel.getUserSetSize('circle3')+'px'\">\n                <div class=\"circle yellow\"\n                     [class.green]=\"circleExperimentModel.userWasRight('circle3')\"\n                     [style.width]=\"circleExperimentModel.getOrgSize('circle3')+'px'\"\n                     [style.height]=\"circleExperimentModel.getOrgSize('circle3')+'px'\">\n                  <div class=\"circle blue\"\n                       style=\"width: 100px; height: 100px\">\n                    <span *ngIf=\"circleExperimentModel.userWasRight('circle3')\"\n                          class=\"fa fa-check\"></span>\n                    <span *ngIf=\"!circleExperimentModel.userWasRight('circle3')\"\n                          class=\"fa fa-times\"></span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </wizard-entry>\n\n        <wizard-entry>\n          <div class=\"circle-container square\">\n            <div class=\"circle-holder\">\n              <div class=\"circle left-circle blue\" #orgCircle>\n                <span>100%</span>\n              </div>\n            </div>\n            <div class=\"circle-holder\">\n              <div class=\"circle right-circle orange\"\n                   [class.green]=\"circleExperimentModel.userWasRight('square')\"\n                   [style.width]=\"circleExperimentModel.getUserSetSize('square')+'px'\"\n                   [style.height]=\"circleExperimentModel.getUserSetSize('square')+'px'\">\n                <div *ngIf=\"!circleExperimentModel.userWasRight('square')\"\n                     class=\"circle yellow\"\n                     [style.width]=\"circleExperimentModel.getOrgSize('square')+'px'\"\n                     [style.height]=\"circleExperimentModel.getOrgSize('square')+'px'\">\n                  <span class=\"fa fa-times\"></span>\n                </div>\n                <span *ngIf=\"circleExperimentModel.userWasRight('square')\"\n                      class=\"fa fa-check\"></span>\n              </div>\n            </div>\n          </div>\n        </wizard-entry>\n\n      </wizard>\n      <div class=\"legend\">\n        <div class=\"item orange-circle\">\n          <div class=\"circle yellow\"></div>\n          Your guess\n        </div>\n\n        <div class=\"item orange-circle\">\n          <div class=\"circle orange\"></div>\n          Deviation\n        </div>\n\n        <div class=\"item orange-circle\">\n          <div class=\"circle green\"></div>\n          You guess was right\n        </div>\n\n      </div>\n      <hr>\n\n      <button *ngIf=\"wizard.hasNext()\"\n              class=\"btn btn-primary pull-right\"\n              (click)=\"wizard.next()\">\n        Continue\n      </button>\n      <a *ngIf=\"!wizard.hasNext()\"\n         [routerLink]=\"['/experiments/results/circle',circleExperimentModel.get('id'),'all']\" class=\"btn btn-primary pull-right\">\n        All results\n      </a>\n      <button *ngIf=\"wizard.hasPrevious()\"\n              class=\"btn btn-default pull-right\"\n              (click)=\"wizard.previous()\">\n        Back\n      </button>\n    </form>\n  </section>\n\n</section>\n";

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var wizard_component_1 = __webpack_require__(117);
	var circle_experiment_model_1 = __webpack_require__(121);
	var router_1 = __webpack_require__(88);
	var circle_experiments_collection_1 = __webpack_require__(131);
	var CircleExperimentResultsComponent = (function () {
	    function CircleExperimentResultsComponent(route, circleExperimentModel, circleExperimentsCollection) {
	        this.route = route;
	        this.circleExperimentModel = circleExperimentModel;
	        this.circleExperimentsCollection = circleExperimentsCollection;
	    }
	    CircleExperimentResultsComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.route.params.forEach(function (params) {
	            var id = +params['id'];
	            if (id) {
	                _this.circleExperimentModel.set('id', id);
	                _this.circleExperimentModel.fetch();
	            }
	        });
	        this.circleExperimentsCollection.fetch();
	    };
	    return CircleExperimentResultsComponent;
	}());
	__decorate([
	    core_1.ViewChild('orgCircle'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultsComponent.prototype, "orgCircle", void 0);
	__decorate([
	    core_1.ViewChild('wizard'),
	    __metadata("design:type", wizard_component_1.WizardComponent)
	], CircleExperimentResultsComponent.prototype, "wizard", void 0);
	__decorate([
	    core_1.ViewChild('circle1'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultsComponent.prototype, "circle1", void 0);
	__decorate([
	    core_1.ViewChild('circle2'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultsComponent.prototype, "circle2", void 0);
	__decorate([
	    core_1.ViewChild('circle3'),
	    __metadata("design:type", core_1.ElementRef)
	], CircleExperimentResultsComponent.prototype, "circle3", void 0);
	CircleExperimentResultsComponent = __decorate([
	    core_1.Component({
	        selector: 'circle-experiment-results',
	        styles: [__webpack_require__(133)],
	        template: __webpack_require__(135),
	        providers: [circle_experiment_model_1.CircleExperimentModel, circle_experiments_collection_1.CircleExperimentsCollection]
	    }),
	    __metadata("design:paramtypes", [router_1.ActivatedRoute, circle_experiment_model_1.CircleExperimentModel, circle_experiments_collection_1.CircleExperimentsCollection])
	], CircleExperimentResultsComponent);
	exports.CircleExperimentResultsComponent = CircleExperimentResultsComponent;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_collection_1 = __webpack_require__(132);
	var circle_experiment_model_1 = __webpack_require__(121);
	var CircleExperimentsCollection = (function (_super) {
	    __extends(CircleExperimentsCollection, _super);
	    function CircleExperimentsCollection() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.endpoint = '/circle-results';
	        _this.model = circle_experiment_model_1.CircleExperimentModel;
	        return _this;
	    }
	    return CircleExperimentsCollection;
	}(visualisation_collection_1.VisualisationCollection));
	CircleExperimentsCollection = __decorate([
	    core_1.Injectable()
	], CircleExperimentsCollection);
	exports.CircleExperimentsCollection = CircleExperimentsCollection;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var base_collection_1 = __webpack_require__(78);
	var VisualisationCollection = (function (_super) {
	    __extends(VisualisationCollection, _super);
	    function VisualisationCollection() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    VisualisationCollection.prototype.hostName = function () {
	        if (true) {
	            return 'http://ec2-52-59-231-57.eu-central-1.compute.amazonaws.com:3000';
	        }
	        else {
	            return 'http://localhost:3000';
	        }
	    };
	    ;
	    VisualisationCollection.prototype.basePath = function () {
	        return 'api';
	    };
	    ;
	    return VisualisationCollection;
	}(base_collection_1.BaseCollection));
	VisualisationCollection = __decorate([
	    core_1.Injectable()
	], VisualisationCollection);
	exports.VisualisationCollection = VisualisationCollection;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(134);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .circle {\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white; }\n  :host .circle span {\n    background: inherit;\n    padding: 3px; }\n  :host .circle.blue {\n    background: #004358; }\n  :host .circle.green {\n    background: #BEDB39; }\n  :host .circle.yellow {\n    background: #FFE11A; }\n  :host .circle.orange {\n    background: #FD7400; }\n  :host .circle.green {\n    background: #1F8A70; }\n  :host .circle .fa {\n    font-size: 40px; }\n\n:host .circle-container {\n  display: flex;\n  align-items: center; }\n  :host .circle-container.grid-bg {\n    background: linear-gradient(0, #FFFFFF 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.298039) 1px, transparent 1px), #777777;\n    background-size: 10px 50px; }\n  :host .circle-container.circle-in-circle .circle-holder {\n    flex-basis: 100%; }\n  :host .circle-container.square .circle {\n    border-radius: 0; }\n  :host .circle-container .circle-holder {\n    flex-basis: 50%;\n    align-items: center;\n    display: flex;\n    justify-content: center;\n    min-height: 300px; }\n  :host .circle-container .left-circle {\n    width: 100px;\n    height: 100px; }\n  :host .circle-container .right-circle {\n    width: 120px;\n    height: 120px; }\n", ""]);

	// exports


/***/ }),
/* 135 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Circle Experiment–All results</h1>\n  </header>\n\n  <section>\n\n    <h2>Circle</h2>\n    <deviation-chart\n      [values]=\"circleExperimentsCollection.pluck('circle1Dev')\"\n      [highlight]=\"circleExperimentModel.get('circle1Dev')\"\n      xLabel=\"Deviation\"\n      yLabel=\"Participants\"></deviation-chart>\n    <hr>\n    <h2>Circle with grid</h2>\n    <deviation-chart\n      [values]=\"circleExperimentsCollection.pluck('circle2Dev')\"\n      [highlight]=\"circleExperimentModel.get('circle2Dev')\"\n      xLabel=\"Deviation\"\n      yLabel=\"Participants\"></deviation-chart>\n    <hr>\n    <h2>Circle in circle</h2>\n    <deviation-chart\n      [values]=\"circleExperimentsCollection.pluck('circle3Dev')\"\n      [highlight]=\"circleExperimentModel.get('circle3Dev')\"\n      xLabel=\"Deviation\"\n      yLabel=\"Participants\"></deviation-chart>\n    <hr>\n    <h2>Square</h2>\n    <deviation-chart\n      [values]=\"circleExperimentsCollection.pluck('squareDev')\"\n      [highlight]=\"circleExperimentModel.get('squareDev')\"\n      xLabel=\"Deviation\"\n      yLabel=\"Participants\"></deviation-chart>\n\n  </section>\n\n</section>\n";

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var random_element_placing_component_1 = __webpack_require__(137);
	var hide_after_time_component_1 = __webpack_require__(143);
	var target_finder_areas_component_1 = __webpack_require__(147);
	var perception_experiment_model_1 = __webpack_require__(151);
	var PerceptionExperimentComponent = (function () {
	    function PerceptionExperimentComponent(perceptionExperimentModel) {
	        this.perceptionExperimentModel = perceptionExperimentModel;
	        this.testTime = 1000;
	        this.lastTestTime = this.testTime;
	        this.resultChooserIsVisible = false;
	        this.testIsRunning = false;
	        this.targetAmount = 200;
	        this.targetSize = 40;
	        this.selectedTargetAmount = 10;
	        this.selectedMode = random_element_placing_component_1.Modes.COLOR;
	        this.mode = random_element_placing_component_1.Modes.COLOR;
	        this.modes = [
	            { label: 'Color', value: random_element_placing_component_1.Modes.COLOR },
	            { label: 'Enclosure', value: random_element_placing_component_1.Modes.ENCLOSURE },
	            { label: 'Animation', value: random_element_placing_component_1.Modes.BLINK },
	            { label: 'Direction', value: random_element_placing_component_1.Modes.DIRECTION },
	            { label: 'Shape', value: random_element_placing_component_1.Modes.SHAPE },
	            { label: 'Size', value: random_element_placing_component_1.Modes.SIZE },
	            { label: 'Composed', value: random_element_placing_component_1.Modes.COMPOSED }
	        ];
	    }
	    PerceptionExperimentComponent.prototype.getRandomInt = function (min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    };
	    PerceptionExperimentComponent.prototype.test = function () {
	        this.targetNum = this.getRandomInt(1, 4);
	        this.targetFinder.initExperiment();
	        this.hideAfterTime.start();
	    };
	    PerceptionExperimentComponent.prototype.abort = function () {
	        this.perceptionExperimentModel.clear();
	        this.perceptionExperimentModel.set({
	            mode: parseInt(this.selectedMode.toString(), 10),
	            amount: parseInt(this.selectedTargetAmount.toString(), 10),
	            time: this.lastTestTime
	        });
	        this.perceptionExperimentModel.save();
	        this.testIsRunning = false;
	        this.resultChooserIsVisible = false;
	        this.testTime = 1000;
	    };
	    PerceptionExperimentComponent.prototype.hideAfterTimeStatusChange = function (ev) {
	        if (ev === hide_after_time_component_1.Status.CORRECT_RESULT_WAS_CHOSEN) {
	            this.lastTestTime = this.testTime;
	            if (this.testTime > 20) {
	                this.testTime = this.testTime - this.testTime / 4;
	            }
	            this.test();
	            this.resultChooserIsVisible = false;
	        }
	        if (ev === hide_after_time_component_1.Status.WRONG_RESULT_WAS_CHOSEN) {
	            this.abort();
	        }
	        if (ev === hide_after_time_component_1.Status.COUNTDOWN) {
	            this.testIsRunning = true;
	            this.resultChooserIsVisible = false;
	        }
	        if (ev === hide_after_time_component_1.Status.TEST_IS_FINISHED) {
	            this.testIsRunning = false;
	            this.resultChooserIsVisible = true;
	        }
	    };
	    PerceptionExperimentComponent.prototype.setTargetMode = function () {
	    };
	    PerceptionExperimentComponent.prototype.setTargetAmount = function (val) {
	        var number = parseInt(val, 10);
	        this.targetAmount = number;
	        if (number === 100) {
	            this.targetSize = 15;
	        }
	        if (number === 40) {
	            this.targetSize = 20;
	        }
	        if (number === 20) {
	            this.targetSize = 30;
	        }
	        if (number === 10) {
	            this.targetSize = 40;
	        }
	    };
	    PerceptionExperimentComponent.prototype.setMode = function (val) {
	        this.mode = parseInt(val, 10);
	    };
	    PerceptionExperimentComponent.prototype.ngOnInit = function () {
	        this.targetNum = this.getRandomInt(1, 4);
	    };
	    return PerceptionExperimentComponent;
	}());
	__decorate([
	    core_1.ViewChild('hideAfterTime'),
	    __metadata("design:type", hide_after_time_component_1.HideAfterTimeComponent)
	], PerceptionExperimentComponent.prototype, "hideAfterTime", void 0);
	__decorate([
	    core_1.ViewChild('targetFinder'),
	    __metadata("design:type", target_finder_areas_component_1.TargetFinderAreasComponent)
	], PerceptionExperimentComponent.prototype, "targetFinder", void 0);
	PerceptionExperimentComponent = __decorate([
	    core_1.Component({
	        selector: 'perception-experiment',
	        styles: [__webpack_require__(152)],
	        template: __webpack_require__(154),
	        providers: [perception_experiment_model_1.PerceptionExperimentModel]
	    }),
	    __metadata("design:paramtypes", [perception_experiment_model_1.PerceptionExperimentModel])
	], PerceptionExperimentComponent);
	exports.PerceptionExperimentComponent = PerceptionExperimentComponent;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var random_element_boxes_collection_1 = __webpack_require__(138);
	var underscore_1 = __webpack_require__(67);
	var Modes;
	(function (Modes) {
	    Modes[Modes["COLOR"] = 0] = "COLOR";
	    Modes[Modes["SHAPE"] = 1] = "SHAPE";
	    Modes[Modes["DIRECTION"] = 2] = "DIRECTION";
	    Modes[Modes["BLINK"] = 3] = "BLINK";
	    Modes[Modes["SIZE"] = 4] = "SIZE";
	    Modes[Modes["ENCLOSURE"] = 5] = "ENCLOSURE";
	    Modes[Modes["COMPOSED"] = 6] = "COMPOSED";
	})(Modes = exports.Modes || (exports.Modes = {}));
	var RandomElementPlacingComponent = (function () {
	    function RandomElementPlacingComponent(randomElementBoxesCollection, el) {
	        this.randomElementBoxesCollection = randomElementBoxesCollection;
	        this.el = el;
	        this.boxSize = 10;
	        this.amount = 200;
	        this.mode = Modes.COLOR;
	        this.options = {
	            fontSize: null,
	            poiFontSize: null,
	            className: null,
	            icon: null,
	            poiIcon: null,
	            color: null,
	            poiColor: null
	        };
	        this.debouncedBoxesGenerator = underscore_1.debounce(this.generateRandomBoxes, 100);
	    }
	    RandomElementPlacingComponent.prototype.unsetPoi = function () {
	        var existingPoi = this.randomElementBoxesCollection.findWhere({ poi: true });
	        if (existingPoi) {
	            existingPoi.set({ poi: false });
	        }
	    };
	    RandomElementPlacingComponent.prototype.getClass = function () {
	        return this.options.className;
	    };
	    RandomElementPlacingComponent.prototype.getIconForBox = function (box) {
	        if (box.get('poi')) {
	            return this.options.poiIcon;
	        }
	        else if ((this.mode === Modes.COMPOSED)) {
	            return box.get('type') === 1 ? 'fa-taxi' : 'fa-flask';
	        }
	        else {
	            return this.options.icon;
	        }
	    };
	    RandomElementPlacingComponent.prototype.getColorForBox = function (box) {
	        if (box.get('poi')) {
	            return this.options.poiColor;
	        }
	        else if (this.mode === Modes.COMPOSED) {
	            return box.get('type') === 1 ? 'blue' : 'red';
	        }
	        else {
	            return this.options.color;
	        }
	    };
	    RandomElementPlacingComponent.prototype.getFontSizeForBox = function (box) {
	        if (box.get('poi')) {
	            return this.options.poiFontSize;
	        }
	        else {
	            return this.options.fontSize;
	        }
	    };
	    RandomElementPlacingComponent.prototype.generateRandomBoxes = function () {
	        var canvasWidth = this.el.nativeElement.offsetWidth;
	        var canvasHeight = this.el.nativeElement.offsetHeight;
	        this.randomElementBoxesCollection.reset();
	        this.randomElementBoxesCollection.generateRandomBoxes(this.amount, this.boxSize, canvasWidth, canvasHeight);
	        this.setRandomPoi();
	        this.setOptions();
	        console.log('Generated ' + this.randomElementBoxesCollection.length + '/' + this.amount + ' boxes');
	    };
	    RandomElementPlacingComponent.prototype.setRandomPoi = function () {
	        if (this.hasPoi) {
	            this.unsetPoi();
	            this.randomElementBoxesCollection.getRandomBox().set({ poi: true });
	        }
	    };
	    RandomElementPlacingComponent.prototype.setOptions = function () {
	        var box = this.randomElementBoxesCollection.first();
	        if (!box) {
	            return;
	        }
	        switch (this.mode) {
	            default:
	            case Modes.COLOR:
	                this.options.fontSize = box.get('width') - 3;
	                this.options.poiFontSize = box.get('width') - 3;
	                this.options.className = 'color-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-taxi';
	                this.options.color = 'black';
	                this.options.poiColor = 'red';
	                break;
	            case Modes.BLINK:
	                this.options.fontSize = box.get('width') - 3;
	                this.options.poiFontSize = box.get('width') - 3;
	                this.options.className = 'blink-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-taxi';
	                this.options.color = 'black';
	                this.options.poiColor = 'black';
	                break;
	            case Modes.DIRECTION:
	                this.options.fontSize = box.get('width') - 3;
	                this.options.poiFontSize = box.get('width') - 3;
	                this.options.className = 'direction-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-taxi';
	                this.options.color = 'black';
	                this.options.poiColor = 'black';
	                break;
	            case Modes.SHAPE:
	                this.options.fontSize = box.get('width') - 3;
	                this.options.poiFontSize = box.get('width') - 3;
	                this.options.className = 'shape-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-flask';
	                this.options.color = 'black';
	                this.options.poiColor = 'black';
	                break;
	            case Modes.SIZE:
	                this.options.fontSize = box.get('width') / 3;
	                this.options.poiFontSize = box.get('width') - 3;
	                this.options.className = 'size-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-taxi';
	                this.options.color = 'black';
	                this.options.poiColor = 'black';
	                break;
	            case Modes.ENCLOSURE:
	                this.options.fontSize = box.get('width') / 2;
	                this.options.poiFontSize = box.get('width') / 2;
	                this.options.className = 'enclosure-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.icon = 'fa-taxi';
	                this.options.color = 'black';
	                this.options.poiColor = 'black';
	                break;
	            case Modes.COMPOSED:
	                this.options.fontSize = box.get('width') / 2;
	                this.options.poiFontSize = box.get('width') / 2;
	                this.options.className = 'composed-mode';
	                this.options.poiIcon = 'fa-taxi';
	                this.options.poiColor = 'red';
	                this.randomElementBoxesCollection.setUpComposedMode();
	                break;
	        }
	    };
	    RandomElementPlacingComponent.prototype.ngOnInit = function () {
	        this.debouncedBoxesGenerator();
	    };
	    RandomElementPlacingComponent.prototype.ngOnChanges = function (changes) {
	        if (changes.hasPoi && changes.hasPoi.currentValue) {
	            if (this.randomElementBoxesCollection.length === 0) {
	                this.debouncedBoxesGenerator();
	            }
	            else {
	                this.setRandomPoi();
	            }
	        }
	        else if (changes.hasPoi && !changes.hasPoi.currentValue) {
	            this.unsetPoi();
	        }
	        else if (changes.amount || changes.boxSize) {
	            this.debouncedBoxesGenerator();
	        }
	        else if (changes.mode) {
	            console.log(changes.mode, Modes[this.mode]);
	            this.setOptions();
	        }
	    };
	    return RandomElementPlacingComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], RandomElementPlacingComponent.prototype, "name", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RandomElementPlacingComponent.prototype, "boxSize", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RandomElementPlacingComponent.prototype, "amount", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean)
	], RandomElementPlacingComponent.prototype, "hasPoi", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RandomElementPlacingComponent.prototype, "mode", void 0);
	RandomElementPlacingComponent = __decorate([
	    core_1.Component({
	        selector: 'random-element-placing',
	        styles: [__webpack_require__(140)],
	        template: __webpack_require__(142),
	        providers: [random_element_boxes_collection_1.RandomElementBoxesCollection]
	    }),
	    __metadata("design:paramtypes", [random_element_boxes_collection_1.RandomElementBoxesCollection, core_1.ElementRef])
	], RandomElementPlacingComponent);
	exports.RandomElementPlacingComponent = RandomElementPlacingComponent;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_collection_1 = __webpack_require__(132);
	var random_element_box_model_1 = __webpack_require__(139);
	var RandomElementBoxesCollection = (function (_super) {
	    __extends(RandomElementBoxesCollection, _super);
	    function RandomElementBoxesCollection() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.model = random_element_box_model_1.RandomElementBoxModel;
	        return _this;
	    }
	    RandomElementBoxesCollection.prototype.getRandomInt = function (min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    };
	    RandomElementBoxesCollection.prototype.linesAreIntersecting = function (line1Start, line1Width, line2Start, line2Width) {
	        return line1Start + line1Width >= line2Start && line2Start + line2Width >= line1Start;
	    };
	    RandomElementBoxesCollection.prototype.boxIsIntersecting = function (box1, box2) {
	        var xAxisIsOverlapping = this.linesAreIntersecting(box1.get('x'), box1.get('width'), box2.get('x'), box2.get('width'));
	        var yAxisIsOverlapping = this.linesAreIntersecting(box1.get('y'), box1.get('height'), box2.get('y'), box2.get('height'));
	        return xAxisIsOverlapping && yAxisIsOverlapping;
	    };
	    RandomElementBoxesCollection.prototype.isOverlappingExistingBox = function (box) {
	        var _this = this;
	        var overlapping = false;
	        this.each(function (existingBox) {
	            if (!overlapping) {
	                overlapping = _this.boxIsIntersecting(box, existingBox);
	            }
	        });
	        return overlapping;
	    };
	    RandomElementBoxesCollection.prototype.getRandomBox = function () {
	        return this.at(this.getRandomInt(0, this.length - 1));
	    };
	    RandomElementBoxesCollection.prototype.generateRandomBox = function (boxSize, canvasWidth, canvasHeight, maxTries, currentTry) {
	        if (maxTries === void 0) { maxTries = 5; }
	        if (currentTry === void 0) { currentTry = 0; }
	        if (currentTry > maxTries) {
	            return;
	        }
	        var x = this.getRandomInt(0, canvasWidth - boxSize);
	        var y = this.getRandomInt(0, canvasHeight - boxSize);
	        var box = new random_element_box_model_1.RandomElementBoxModel({
	            x: x,
	            y: y,
	            width: boxSize,
	            height: boxSize
	        });
	        if (this.isOverlappingExistingBox(box)) {
	            return this.generateRandomBox(boxSize, canvasWidth, canvasHeight, maxTries, currentTry + 1);
	        }
	        else {
	            return box;
	        }
	    };
	    RandomElementBoxesCollection.prototype.setUpComposedMode = function () {
	        var _this = this;
	        this.each(function (box) {
	            if (!box.get('poi')) {
	                box.set('type', _this.getRandomInt(1, 2));
	            }
	        });
	    };
	    RandomElementBoxesCollection.prototype.generateRandomBoxes = function (amount, boxSize, canvasWidth, canvasHeight) {
	        for (var i = 0; i < amount; i++) {
	            var box = this.generateRandomBox(boxSize, canvasWidth, canvasHeight);
	            if (box) {
	                this.add(box);
	            }
	            else {
	                //console.info('Could not generate a box');
	            }
	        }
	    };
	    return RandomElementBoxesCollection;
	}(visualisation_collection_1.VisualisationCollection));
	RandomElementBoxesCollection = __decorate([
	    core_1.Injectable()
	], RandomElementBoxesCollection);
	exports.RandomElementBoxesCollection = RandomElementBoxesCollection;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_model_1 = __webpack_require__(122);
	var RandomElementBoxModel = (function (_super) {
	    __extends(RandomElementBoxModel, _super);
	    function RandomElementBoxModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    RandomElementBoxModel.prototype.defaults = function () {
	        return {
	            poi: false,
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        };
	    };
	    return RandomElementBoxModel;
	}(visualisation_model_1.VisualisationModel));
	RandomElementBoxModel = __decorate([
	    core_1.Injectable()
	], RandomElementBoxModel);
	exports.RandomElementBoxModel = RandomElementBoxModel;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(141);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .box-holder {\n  position: relative; }\n  :host .box-holder .box {\n    position: absolute;\n    color: black;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n  :host .box-holder.color-mode .box.poi {\n    color: red; }\n  :host .box-holder.blink-mode .box.poi {\n    animation: blink 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }\n  :host .box-holder.direction-mode .box.poi {\n    transform: rotate(45deg); }\n  :host .box-holder.enclosure-mode .box.poi {\n    border-radius: 50%;\n    border: 2px solid; }\n\n@keyframes blink {\n  30% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  70% {\n    opacity: 0; } }\n", ""]);

	// exports


/***/ }),
/* 142 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"random-element-placing\">\n  <div class=\"box-holder {{getClass()}}\">\n    <div *ngFor=\"let box of randomElementBoxesCollection.models\"\n         class=\"box\"\n         [class.poi]=\"box.get('poi')\"\n         [style.left]=\"box.get('x')+'px'\"\n         [style.top]=\"box.get('y')+'px'\"\n         [style.width]=\"box.get('width')+'px'\"\n         [style.height]=\"box.get('height')+'px'\"\n         [style.color]=\"getColorForBox(box)\">\n      <div class=\"fa {{getIconForBox(box)}}\" [style.fontSize]=\"getFontSizeForBox(box)+'px'\"></div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var Status;
	(function (Status) {
	    Status[Status["COUNTDOWN"] = 0] = "COUNTDOWN";
	    Status[Status["TEST_IS_RUNNING"] = 1] = "TEST_IS_RUNNING";
	    Status[Status["TEST_IS_FINISHED"] = 2] = "TEST_IS_FINISHED";
	    Status[Status["CORRECT_RESULT_WAS_CHOSEN"] = 3] = "CORRECT_RESULT_WAS_CHOSEN";
	    Status[Status["WRONG_RESULT_WAS_CHOSEN"] = 4] = "WRONG_RESULT_WAS_CHOSEN";
	})(Status = exports.Status || (exports.Status = {}));
	var HideAfterTimeComponent = (function () {
	    function HideAfterTimeComponent() {
	        this.countdownIsVisible = true;
	        this.countdown = 3;
	        this.statusChange = new core_1.EventEmitter();
	        this.testTime = 200;
	    }
	    HideAfterTimeComponent.prototype.getTestTime = function () {
	        return Math.round(this.testTime);
	    };
	    HideAfterTimeComponent.prototype.start = function () {
	        var _this = this;
	        this.countdownIsVisible = true;
	        this.resultChooserIsVisible = false;
	        var _countdown = this.countdown;
	        this.statusChange.emit(Status.COUNTDOWN);
	        var startCountDown = window.setInterval(function () {
	            if (_this.countdown <= 0) {
	                var start_1 = performance.now();
	                _this.countdownIsVisible = false;
	                _this.testIsRunning = true;
	                _this.statusChange.emit(Status.TEST_IS_RUNNING);
	                window.setTimeout(function () {
	                    console.log(performance.now() - start_1);
	                    _this.testIsRunning = false;
	                    _this.resultChooserIsVisible = true;
	                    _this.statusChange.emit(Status.TEST_IS_FINISHED);
	                }, _this.testTime);
	                window.clearInterval(startCountDown);
	                _this.countdown = _countdown;
	            }
	            else {
	                _this.countdown--;
	            }
	        }, 200);
	    };
	    HideAfterTimeComponent.prototype.notify = function (type, el) {
	        var _this = this;
	        window.setTimeout(function () {
	            el.classList.remove('correct');
	            el.classList.remove('wrong');
	            _this.statusChange.emit(type);
	            _this.countdownIsVisible = true;
	            _this.resultChooserIsVisible = false;
	        }, 500);
	    };
	    HideAfterTimeComponent.prototype.choseResult = function (result, ev) {
	        var el = ev.target;
	        if (result === this.correctResultNum) {
	            el.classList.add('correct');
	            this.notify(Status.CORRECT_RESULT_WAS_CHOSEN, el);
	        }
	        else {
	            el.classList.add('wrong');
	            this.notify(Status.WRONG_RESULT_WAS_CHOSEN, el);
	        }
	    };
	    HideAfterTimeComponent.prototype.ngOnChanges = function (changes) {
	        this.countdownIsVisible = true;
	        this.resultChooserIsVisible = false;
	    };
	    return HideAfterTimeComponent;
	}());
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Object)
	], HideAfterTimeComponent.prototype, "statusChange", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], HideAfterTimeComponent.prototype, "correctResultNum", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], HideAfterTimeComponent.prototype, "testTime", void 0);
	HideAfterTimeComponent = __decorate([
	    core_1.Component({
	        selector: 'hide-after-time',
	        styles: [__webpack_require__(144)],
	        template: __webpack_require__(146)
	    })
	], HideAfterTimeComponent);
	exports.HideAfterTimeComponent = HideAfterTimeComponent;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(145);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host {\n  position: relative;\n  display: block; }\n  :host .content {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    flex-wrap: wrap;\n    opacity: 0; }\n    :host .content.visible {\n      opacity: 1; }\n  :host .countdown {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%; }\n    :host .countdown .test-time {\n      position: absolute;\n      width: 100%;\n      text-align: center;\n      top: 35%; }\n    :host .countdown .box-holder {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 100%; }\n      :host .countdown .box-holder .box {\n        width: 30px;\n        height: 30px;\n        background: #eeeeee;\n        margin-right: 5px;\n        transition: background 0.2s ease; }\n        :host .countdown .box-holder .box.active {\n          background: transparent; }\n  :host .result-selector {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%; }\n    :host .result-selector .option-holder {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 100%;\n      height: 100%;\n      flex-wrap: wrap; }\n      :host .result-selector .option-holder .option {\n        width: calc(50% - 10px);\n        height: calc(50% - 10px);\n        margin: 5px;\n        background: #eeeeee;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 30px;\n        cursor: pointer;\n        transition: all 0.5s ease; }\n        :host .result-selector .option-holder .option:hover {\n          background: #f0ad4e;\n          color: white; }\n        :host .result-selector .option-holder .option.correct {\n          background: #5cb85c !important;\n          color: white; }\n        :host .result-selector .option-holder .option.wrong {\n          background: #d9534f !important;\n          color: white; }\n", ""]);

	// exports


/***/ }),
/* 146 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"content countdown\" [class.visible]=\"countdownIsVisible\">\n  <div class=\"test-time\">The object will be shown for {{getTestTime()}}ms</div>\n  <div class=\"box-holder\">\n    <div class=\"box\" [class.active]=\"countdown < 1\"></div>\n    <div class=\"box\" [class.active]=\"countdown < 2\"></div>\n    <div class=\"box\" [class.active]=\"countdown < 3\"></div>\n  </div>\n</div>\n\n<div class=\"content\" [class.visible]=\"testIsRunning\">\n  <ng-content></ng-content>\n</div>\n\n<div class=\"content result-selector\" [class.visible]=\"resultChooserIsVisible\">\n  <div class=\"option-holder\">\n    <div class=\"option\" (click)=\"choseResult(1, $event)\">\n      1\n    </div>\n    <div class=\"option\" (click)=\"choseResult(2, $event)\">\n      2\n    </div>\n    <div class=\"option\" (click)=\"choseResult(3, $event)\">\n      3\n    </div>\n    <div class=\"option\" (click)=\"choseResult(4, $event)\">\n      4\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var random_element_placing_component_1 = __webpack_require__(137);
	var TargetFinderAreasComponent = (function () {
	    function TargetFinderAreasComponent() {
	    }
	    TargetFinderAreasComponent.prototype.initExperiment = function () {
	        this.segment1.generateRandomBoxes();
	        this.segment2.generateRandomBoxes();
	        this.segment3.generateRandomBoxes();
	        this.segment4.generateRandomBoxes();
	    };
	    TargetFinderAreasComponent.prototype.ngOnInit = function () {
	        this.initExperiment();
	    };
	    return TargetFinderAreasComponent;
	}());
	__decorate([
	    core_1.ViewChild('segment1'),
	    __metadata("design:type", random_element_placing_component_1.RandomElementPlacingComponent)
	], TargetFinderAreasComponent.prototype, "segment1", void 0);
	__decorate([
	    core_1.ViewChild('segment2'),
	    __metadata("design:type", random_element_placing_component_1.RandomElementPlacingComponent)
	], TargetFinderAreasComponent.prototype, "segment2", void 0);
	__decorate([
	    core_1.ViewChild('segment3'),
	    __metadata("design:type", random_element_placing_component_1.RandomElementPlacingComponent)
	], TargetFinderAreasComponent.prototype, "segment3", void 0);
	__decorate([
	    core_1.ViewChild('segment4'),
	    __metadata("design:type", random_element_placing_component_1.RandomElementPlacingComponent)
	], TargetFinderAreasComponent.prototype, "segment4", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], TargetFinderAreasComponent.prototype, "targetArea", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], TargetFinderAreasComponent.prototype, "amount", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], TargetFinderAreasComponent.prototype, "size", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], TargetFinderAreasComponent.prototype, "mode", void 0);
	TargetFinderAreasComponent = __decorate([
	    core_1.Component({
	        selector: 'target-finder-areas',
	        styles: [__webpack_require__(148)],
	        template: __webpack_require__(150)
	    }),
	    __metadata("design:paramtypes", [])
	], TargetFinderAreasComponent);
	exports.TargetFinderAreasComponent = TargetFinderAreasComponent;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(149);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .target-finder-areas {\n  display: flex;\n  flex-wrap: wrap; }\n  :host .target-finder-areas .segment {\n    margin: 5px;\n    flex-basis: calc(50% - 10px);\n    height: 200px;\n    display: flex; }\n  :host .target-finder-areas random-element-placing {\n    width: 100%;\n    height: 100%; }\n", ""]);

	// exports


/***/ }),
/* 150 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"target-finder-areas\">\n  <div class=\"segment top left\">\n    <random-element-placing [hasPoi]=\"targetArea === 1\" [amount]=\"amount\" [boxSize]=\"size\" [mode]=\"mode\" #segment1></random-element-placing>\n  </div>\n  <div class=\"segment top right\">\n    <random-element-placing [hasPoi]=\"targetArea === 2\" [amount]=\"amount\" [boxSize]=\"size\" [mode]=\"mode\" #segment2></random-element-placing>\n  </div>\n  <div class=\"segment bottom left\">\n    <random-element-placing [hasPoi]=\"targetArea === 3\" [amount]=\"amount\" [boxSize]=\"size\" [mode]=\"mode\" #segment3></random-element-placing>\n  </div>\n  <div class=\"segment bottom right\">\n    <random-element-placing [hasPoi]=\"targetArea === 4\" [amount]=\"amount\" [boxSize]=\"size\" [mode]=\"mode\" #segment4></random-element-placing>\n  </div>\n</div>\n";

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_model_1 = __webpack_require__(122);
	var PerceptionExperimentModel = (function (_super) {
	    __extends(PerceptionExperimentModel, _super);
	    function PerceptionExperimentModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.endpoint = '/perception-results';
	        return _this;
	    }
	    PerceptionExperimentModel.prototype.defaults = function () {
	        return {
	            mode: 0,
	            amount: 0,
	            time: 0
	        };
	    };
	    return PerceptionExperimentModel;
	}(visualisation_model_1.VisualisationModel));
	PerceptionExperimentModel = __decorate([
	    core_1.Injectable()
	], PerceptionExperimentModel);
	exports.PerceptionExperimentModel = PerceptionExperimentModel;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(153);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host target-finder-areas {\n  width: inherit;\n  height: inherit; }\n\n:host .options-holder {\n  display: flex; }\n", ""]);

	// exports


/***/ }),
/* 154 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Perception Experiment</h1>\n  </header>\n\n  <section>\n    <hide-after-time #hideAfterTime\n                     [correctResultNum]=\"targetNum\"\n                     [testTime]=\"testTime\"\n                     (statusChange)=\"hideAfterTimeStatusChange($event)\">\n      <target-finder-areas #targetFinder [targetArea]=\"targetNum\" [size]=\"targetSize\" [amount]=\"targetAmount\" [mode]=\"mode\"></target-finder-areas>\n    </hide-after-time>\n  </section>\n\n  <button *ngIf=\"!resultChooserIsVisible\" class=\"btn btn-primary\" (click)=\"test()\" [disabled]=\"testIsRunning\">Start</button>\n  <a *ngIf=\"!resultChooserIsVisible && !testIsRunning\" routerLink=\"/experiments/results/perception\" class=\"btn btn-default\" (click)=\"test()\">See results</a>\n  <button *ngIf=\"resultChooserIsVisible\" class=\"btn btn-primary\" (click)=\"test()\">Retry</button>\n  <button *ngIf=\"resultChooserIsVisible\" class=\"btn btn-danger\" (click)=\"abort()\">I couldn't find it</button>\n\n  <div *ngIf=\"!this.testIsRunning && !resultChooserIsVisible\" class=\"options-holder pull-right\">\n    <div>\n      <label>Mode</label>\n      <select [(ngModel)]=\"selectedMode\" (ngModelChange)=\"setMode($event)\">\n        <option *ngFor=\"let mode of modes\" [value]=\"mode.value\">{{mode.label}}</option>\n      </select>\n    </div>\n    <div>\n      <label>Amount</label>\n      <select [(ngModel)]=\"selectedTargetAmount\" (ngModelChange)=\"setTargetAmount($event)\">\n        <option [value]=\"10\">10</option>\n        <option [value]=\"20\">20</option>\n        <option [value]=\"40\">40</option>\n        <option [value]=\"100\">100</option>\n      </select>\n    </div>\n  </div>\n\n\n</section>\n";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var perception_experiments_collection_1 = __webpack_require__(156);
	var random_element_placing_component_1 = __webpack_require__(137);
	var underscore_1 = __webpack_require__(67);
	var PerceptionExperimentResultsComponent = (function () {
	    function PerceptionExperimentResultsComponent(perceptionExperimentsCollection) {
	        this.perceptionExperimentsCollection = perceptionExperimentsCollection;
	    }
	    PerceptionExperimentResultsComponent.prototype.setUpResultFor = function (result) {
	        var results = [];
	        var resultJSON = underscore_1.map(result, function (item) {
	            return item.toJSON();
	        });
	        [10, 20, 40, 100].forEach(function (amount) {
	            var totalResultForAmount;
	            var resultsForAmount = underscore_1.where(resultJSON, { amount: amount });
	            if (resultsForAmount.length === 0) {
	                return;
	            }
	            else if (resultsForAmount.length > 1) {
	                totalResultForAmount = underscore_1.reduce(resultsForAmount, function (memo, num) {
	                    return memo.time + num.time;
	                }) / resultsForAmount.length;
	            }
	            else {
	                totalResultForAmount = resultsForAmount[0].time;
	            }
	            results.push({ amount: amount, time: totalResultForAmount });
	        });
	        return results;
	    };
	    PerceptionExperimentResultsComponent.prototype.setUpResults = function () {
	        if (this.perceptionExperimentsCollection.length > 0) {
	            this.colorResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.COLOR }));
	            this.enclosureResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.ENCLOSURE }));
	            this.animationResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.BLINK }));
	            this.directionResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.DIRECTION }));
	            this.shapeResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.SHAPE }));
	            this.sizeResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.SIZE }));
	            this.composedResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({ mode: random_element_placing_component_1.Modes.COMPOSED }));
	        }
	    };
	    PerceptionExperimentResultsComponent.prototype.ngOnInit = function () {
	        this.perceptionExperimentsCollection.on('update', this.setUpResults, this);
	        this.perceptionExperimentsCollection.fetch();
	    };
	    return PerceptionExperimentResultsComponent;
	}());
	PerceptionExperimentResultsComponent = __decorate([
	    core_1.Component({
	        selector: 'perception-experiment-results',
	        styles: [__webpack_require__(157)],
	        template: __webpack_require__(159),
	        providers: [perception_experiments_collection_1.PerceptionExperimentsCollection]
	    }),
	    __metadata("design:paramtypes", [perception_experiments_collection_1.PerceptionExperimentsCollection])
	], PerceptionExperimentResultsComponent);
	exports.PerceptionExperimentResultsComponent = PerceptionExperimentResultsComponent;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_collection_1 = __webpack_require__(132);
	var perception_experiment_model_1 = __webpack_require__(151);
	var PerceptionExperimentsCollection = (function (_super) {
	    __extends(PerceptionExperimentsCollection, _super);
	    function PerceptionExperimentsCollection() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.endpoint = '/perception-results';
	        _this.model = perception_experiment_model_1.PerceptionExperimentModel;
	        return _this;
	    }
	    return PerceptionExperimentsCollection;
	}(visualisation_collection_1.VisualisationCollection));
	PerceptionExperimentsCollection = __decorate([
	    core_1.Injectable()
	], PerceptionExperimentsCollection);
	exports.PerceptionExperimentsCollection = PerceptionExperimentsCollection;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(158);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 158 */
134,
/* 159 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Perception Experiment–All results</h1>\n  </header>\n\n  <section>\n\n    <div *ngIf=\"colorResults && colorResults.length>0\">\n      <h2>Color</h2>\n      <perception-chart\n        [values]=\"colorResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"enclosureResults && enclosureResults.length>0\">\n      <h2>Enclosure</h2>\n      <perception-chart\n        [values]=\"enclosureResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"animationResults && animationResults.length>0\">\n      <h2>Animation</h2>\n      <perception-chart\n        [values]=\"animationResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"directionResults && directionResults.length>0\">\n      <h2>Direction</h2>\n      <perception-chart\n        [values]=\"directionResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"shapeResults && shapeResults.length>0\">\n      <h2>Shape</h2>\n      <perception-chart\n        [values]=\"shapeResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"sizeResults && sizeResults.length>0\">\n      <h2>Size</h2>\n      <perception-chart\n        [values]=\"sizeResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n    <div *ngIf=\"composedResults && composedResults.length>0\">\n      <h2>Composed</h2>\n      <perception-chart\n        [values]=\"composedResults\"\n        xLabel=\"Distractor Amount\"\n        yLabel=\"Avg. Time needed\"></perception-chart>\n      <hr>\n    </div>\n\n  </section>\n\n</section>\n";

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var multi_data_experiment_items_collection_1 = __webpack_require__(161);
	var radar_chart_collection_1 = __webpack_require__(163);
	var radar_chart_model_1 = __webpack_require__(164);
	var dataItems = __webpack_require__(165);
	var MultiDataDimensionExperimentComponent = (function () {
	    function MultiDataDimensionExperimentComponent(multiDataExperimentItems, radarChartCollection) {
	        this.multiDataExperimentItems = multiDataExperimentItems;
	        this.radarChartCollection = radarChartCollection;
	        this.radarChartLabels = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration'];
	    }
	    MultiDataDimensionExperimentComponent.prototype.setRadarChartCollection = function (collection, yearFilter) {
	        var _this = this;
	        this.radarChartCollection.reset();
	        var items;
	        if (yearFilter) {
	            items = collection.where({
	                modelYear: yearFilter,
	            });
	        }
	        else {
	            items = collection.toArray();
	        }
	        items.forEach(function (item) {
	            var radarChartModel = new radar_chart_model_1.RadarChartModel({
	                color: item.getColor(),
	                data: [
	                    item.getPercentage('mpg'),
	                    item.getPercentage('cylinders'),
	                    item.getPercentage('displacement'),
	                    item.getPercentage('horsepower'),
	                    item.getPercentage('weight'),
	                    item.getPercentage('acceleration')
	                ]
	            });
	            _this.radarChartCollection.add(radarChartModel);
	        });
	    };
	    MultiDataDimensionExperimentComponent.prototype.filterByYear = function (val) {
	        this.yearFilter = val;
	        this.multiDataExperimentItems.selectable.unSelectAll();
	        this.setRadarChartCollection(this.multiDataExperimentItems, val);
	    };
	    MultiDataDimensionExperimentComponent.prototype.getColorForOrigin = function (origin) {
	        var originRes = this.multiDataExperimentItems.findWhere({ origin: origin });
	        if (originRes) {
	            return originRes.getColor();
	        }
	    };
	    MultiDataDimensionExperimentComponent.prototype.toggleFilterByYear = function () {
	        if (this.yearFilter) {
	            this.yearFilter = null;
	        }
	        else {
	            this.yearFilter = this.minYear;
	        }
	    };
	    MultiDataDimensionExperimentComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        dataItems.forEach(function (item) {
	            _this.multiDataExperimentItems.add(new _this.multiDataExperimentItems.model(item, { parse: true }));
	        });
	        this.manufacturers = this.multiDataExperimentItems.getManufacturers();
	        this.minYear = this.multiDataExperimentItems.getMin('modelYear');
	        this.maxYear = this.multiDataExperimentItems.getMax('modelYear');
	        //this.yearFilter = this.minYear;
	        this.setRadarChartCollection(this.multiDataExperimentItems, this.yearFilter);
	        this.multiDataExperimentItems.selectable.on('change:add change:remove', function () {
	            if (_this.multiDataExperimentItems.selectable.getSelected().length > 0) {
	                var selected = new multi_data_experiment_items_collection_1.MultiDataExperimentItems();
	                selected.maxCache = _this.multiDataExperimentItems.maxCache;
	                selected.reset(_this.multiDataExperimentItems.selectable.getSelected().toJSON());
	                _this.setRadarChartCollection(selected, _this.yearFilter);
	            }
	            else {
	                _this.setRadarChartCollection(_this.multiDataExperimentItems, _this.yearFilter);
	            }
	        });
	    };
	    return MultiDataDimensionExperimentComponent;
	}());
	MultiDataDimensionExperimentComponent = __decorate([
	    core_1.Component({
	        selector: 'multi-data-dimension-experiment',
	        styles: [__webpack_require__(166)],
	        template: __webpack_require__(168),
	        providers: [multi_data_experiment_items_collection_1.MultiDataExperimentItems, radar_chart_collection_1.RadarChartCollection]
	    }),
	    __metadata("design:paramtypes", [multi_data_experiment_items_collection_1.MultiDataExperimentItems, radar_chart_collection_1.RadarChartCollection])
	], MultiDataDimensionExperimentComponent);
	exports.MultiDataDimensionExperimentComponent = MultiDataDimensionExperimentComponent;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_collection_1 = __webpack_require__(132);
	var multi_data_experiment_item_model_1 = __webpack_require__(162);
	var MultiDataExperimentItems = (function (_super) {
	    __extends(MultiDataExperimentItems, _super);
	    function MultiDataExperimentItems() {
	        var _this = _super.call(this) || this;
	        _this.maxCache = {};
	        _this.minCache = {};
	        _this.model = multi_data_experiment_item_model_1.MultiDataExperimentItemModel;
	        return _this;
	    }
	    MultiDataExperimentItems.prototype.getMin = function (attr) {
	        if (!this.minCache[attr]) {
	            this.minCache[attr] = this.min(function (model) {
	                return model.get(attr);
	            }).get(attr);
	        }
	        return this.minCache[attr];
	    };
	    MultiDataExperimentItems.prototype.getMax = function (attr) {
	        if (!this.maxCache[attr]) {
	            this.maxCache[attr] = this.max(function (model) {
	                return model.get(attr);
	            }).get(attr);
	        }
	        return this.maxCache[attr];
	    };
	    MultiDataExperimentItems.prototype.getManufacturers = function () {
	        var manufacturers = new visualisation_collection_1.VisualisationCollection();
	        this.each(function (item) {
	            manufacturers.add({ id: item.get('manufacturer') });
	        });
	        return manufacturers;
	    };
	    return MultiDataExperimentItems;
	}(visualisation_collection_1.VisualisationCollection));
	MultiDataExperimentItems = __decorate([
	    core_1.Injectable(),
	    __metadata("design:paramtypes", [])
	], MultiDataExperimentItems);
	exports.MultiDataExperimentItems = MultiDataExperimentItems;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_model_1 = __webpack_require__(122);
	var MultiDataExperimentItemModel = (function (_super) {
	    __extends(MultiDataExperimentItemModel, _super);
	    function MultiDataExperimentItemModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    MultiDataExperimentItemModel.prototype.parse = function (attrs) {
	        for (var key in attrs) {
	            if (attrs.hasOwnProperty(key) && attrs[key] === 'NA') {
	                attrs[key] = -1;
	            }
	        }
	        attrs.acceleration = parseFloat(attrs.acceleration);
	        attrs.cylinders = parseInt(attrs.acceleration, 10);
	        attrs.horsepower = parseInt(attrs.horsepower, 10);
	        attrs.modelYear = parseInt(attrs.modelYear, 10);
	        attrs.mpg = parseInt(attrs.mpg, 10);
	        attrs.weight = parseInt(attrs.weight, 10);
	        return attrs;
	    };
	    MultiDataExperimentItemModel.prototype.getPercentage = function (attr) {
	        var collection = this.collection;
	        var max = 0;
	        if (collection) {
	            max = collection.getMax(attr);
	        }
	        return (this.get(attr) / max) * 100;
	    };
	    MultiDataExperimentItemModel.prototype.getColor = function () {
	        if (this.get('origin') === 'European') {
	            return 'rgba(0,0,255,0.5)';
	        }
	        else if (this.get('origin') === 'American') {
	            return 'rgba(0,255,255,0.5)';
	        }
	        else if (this.get('origin') === 'Japanese') {
	            return 'rgba(255,0,255,0.5)';
	        }
	        else {
	            return 'black';
	        }
	    };
	    return MultiDataExperimentItemModel;
	}(visualisation_model_1.VisualisationModel));
	MultiDataExperimentItemModel = __decorate([
	    core_1.Injectable()
	], MultiDataExperimentItemModel);
	exports.MultiDataExperimentItemModel = MultiDataExperimentItemModel;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_collection_1 = __webpack_require__(132);
	var radar_chart_model_1 = __webpack_require__(164);
	var RadarChartCollection = (function (_super) {
	    __extends(RadarChartCollection, _super);
	    function RadarChartCollection() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.model = radar_chart_model_1.RadarChartModel;
	        return _this;
	    }
	    RadarChartCollection.prototype.getAverage = function () {
	        var axesAmount = 0, averagePerAxis = [];
	        if (this.length > 0) {
	            axesAmount = this.first().get('data').length;
	        }
	        this.each(function (item) {
	            for (var i = 0; i < axesAmount; i++) {
	                if (averagePerAxis[i]) {
	                    averagePerAxis[i] += item.get('data')[i];
	                }
	                else {
	                    averagePerAxis[i] = item.get('data')[i];
	                }
	            }
	        });
	        for (var i = 0; i < axesAmount; i++) {
	            averagePerAxis[i] = averagePerAxis[i] / this.length;
	        }
	        return averagePerAxis;
	    };
	    return RadarChartCollection;
	}(visualisation_collection_1.VisualisationCollection));
	RadarChartCollection = __decorate([
	    core_1.Injectable()
	], RadarChartCollection);
	exports.RadarChartCollection = RadarChartCollection;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var visualisation_model_1 = __webpack_require__(122);
	var RadarChartModel = (function (_super) {
	    __extends(RadarChartModel, _super);
	    function RadarChartModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.idAttribute = 'label';
	        return _this;
	    }
	    RadarChartModel.prototype.defaults = function () {
	        return {
	            color: '',
	            data: []
	        };
	    };
	    return RadarChartModel;
	}(visualisation_model_1.VisualisationModel));
	RadarChartModel = __decorate([
	    core_1.Injectable()
	], RadarChartModel);
	exports.RadarChartModel = RadarChartModel;


/***/ }),
/* 165 */
/***/ (function(module, exports) {

	module.exports = [
		{
			"car": "chevelle malibu",
			"manufacturer": "chevrolet",
			"mpg": "18",
			"cylinders": 8,
			"displacement": 307,
			"horsepower": "130",
			"weight": 3504,
			"acceleration": 12,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "skylark 320",
			"manufacturer": "buick",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "165",
			"weight": 3693,
			"acceleration": 11.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "satellite",
			"manufacturer": "plymouth",
			"mpg": "18",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 3436,
			"acceleration": 11,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "rebel sst",
			"manufacturer": "amc",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "150",
			"weight": 3433,
			"acceleration": 12,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "torino",
			"manufacturer": "ford",
			"mpg": "17",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "140",
			"weight": 3449,
			"acceleration": 10.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "galaxie 500",
			"manufacturer": "ford",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 429,
			"horsepower": "198",
			"weight": 4341,
			"acceleration": 10,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "impala",
			"manufacturer": "chevrolet",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 454,
			"horsepower": "220",
			"weight": 4354,
			"acceleration": 9,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "fury iii",
			"manufacturer": "plymouth",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 440,
			"horsepower": "215",
			"weight": 4312,
			"acceleration": 8.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "catalina",
			"manufacturer": "pontiac",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 455,
			"horsepower": "225",
			"weight": 4425,
			"acceleration": 10,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "ambassador dpl",
			"manufacturer": "amc",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 390,
			"horsepower": "190",
			"weight": 3850,
			"acceleration": 8.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "ds-21 pallas",
			"manufacturer": "citroen",
			"mpg": "NA",
			"cylinders": 4,
			"displacement": 133,
			"horsepower": "115",
			"weight": 3090,
			"acceleration": 17.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "chevelle concours (sw)",
			"manufacturer": "chevrolet",
			"mpg": "NA",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "165",
			"weight": 4142,
			"acceleration": 11.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "torino (sw)",
			"manufacturer": "ford",
			"mpg": "NA",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "153",
			"weight": 4034,
			"acceleration": 11,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "satellite (sw)",
			"manufacturer": "plymouth",
			"mpg": "NA",
			"cylinders": 8,
			"displacement": 383,
			"horsepower": "175",
			"weight": 4166,
			"acceleration": 10.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "rebel sst (sw)",
			"manufacturer": "amc",
			"mpg": "NA",
			"cylinders": 8,
			"displacement": 360,
			"horsepower": "175",
			"weight": 3850,
			"acceleration": 11,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "challenger se",
			"manufacturer": "dodge",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 383,
			"horsepower": "170",
			"weight": 3563,
			"acceleration": 10,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "'cuda 340",
			"manufacturer": "plymouth",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 340,
			"horsepower": "160",
			"weight": 3609,
			"acceleration": 8,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "mustang boss 302",
			"manufacturer": "ford",
			"mpg": "NA",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "140",
			"weight": 3353,
			"acceleration": 8,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "monte carlo",
			"manufacturer": "chevrolet",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "150",
			"weight": 3761,
			"acceleration": 9.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "estate wagon (sw)",
			"manufacturer": "buick",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 455,
			"horsepower": "225",
			"weight": 3086,
			"acceleration": 10,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "corona mark ii",
			"manufacturer": "toyota",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 113,
			"horsepower": "95",
			"weight": 2372,
			"acceleration": 15,
			"modelYear": 70,
			"origin": "Japanese"
		},
		{
			"car": "duster",
			"manufacturer": "plymouth",
			"mpg": "22",
			"cylinders": 6,
			"displacement": 198,
			"horsepower": "95",
			"weight": 2833,
			"acceleration": 15.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "hornet",
			"manufacturer": "amc",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 199,
			"horsepower": "97",
			"weight": 2774,
			"acceleration": 15.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "maverick",
			"manufacturer": "ford",
			"mpg": "21",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "85",
			"weight": 2587,
			"acceleration": 16,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "pl510",
			"manufacturer": "datsun",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "88",
			"weight": 2130,
			"acceleration": 14.5,
			"modelYear": 70,
			"origin": "Japanese"
		},
		{
			"car": "1131 deluxe sedan",
			"manufacturer": "vw",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "46",
			"weight": 1835,
			"acceleration": 20.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "504",
			"manufacturer": "peugeot",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 110,
			"horsepower": "87",
			"weight": 2672,
			"acceleration": 17.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "100 ls",
			"manufacturer": "audi",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 107,
			"horsepower": "90",
			"weight": 2430,
			"acceleration": 14.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "99e",
			"manufacturer": "saab",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 104,
			"horsepower": "95",
			"weight": 2375,
			"acceleration": 17.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "2002",
			"manufacturer": "bmw",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "113",
			"weight": 2234,
			"acceleration": 12.5,
			"modelYear": 70,
			"origin": "European"
		},
		{
			"car": "gremlin",
			"manufacturer": "amc",
			"mpg": "21",
			"cylinders": 6,
			"displacement": 199,
			"horsepower": "90",
			"weight": 2648,
			"acceleration": 15,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "f250",
			"manufacturer": "ford",
			"mpg": "10",
			"cylinders": 8,
			"displacement": 360,
			"horsepower": "215",
			"weight": 4615,
			"acceleration": 14,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "c20",
			"manufacturer": "chevrolet",
			"mpg": "10",
			"cylinders": 8,
			"displacement": 307,
			"horsepower": "200",
			"weight": 4376,
			"acceleration": 15,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "d200",
			"manufacturer": "dodge",
			"mpg": "11",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "210",
			"weight": 4382,
			"acceleration": 13.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "1200d",
			"manufacturer": "hi",
			"mpg": "9",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "193",
			"weight": 4732,
			"acceleration": 18.5,
			"modelYear": 70,
			"origin": "American"
		},
		{
			"car": "pl510",
			"manufacturer": "datsun",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "88",
			"weight": 2130,
			"acceleration": 14.5,
			"modelYear": 71,
			"origin": "Japanese"
		},
		{
			"car": "vega 2300",
			"manufacturer": "chevrolet",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "90",
			"weight": 2264,
			"acceleration": 15.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "corona",
			"manufacturer": "toyota",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 113,
			"horsepower": "95",
			"weight": 2228,
			"acceleration": 14,
			"modelYear": 71,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "NA",
			"weight": 2046,
			"acceleration": 19,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "super beetle 117",
			"manufacturer": "vw",
			"mpg": "NA",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "48",
			"weight": 1978,
			"acceleration": 20,
			"modelYear": 71,
			"origin": "European"
		},
		{
			"car": "gremlin",
			"manufacturer": "amc",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 2634,
			"acceleration": 13,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "satellite custom",
			"manufacturer": "plymouth",
			"mpg": "16",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "105",
			"weight": 3439,
			"acceleration": 15.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "chevelle malibu",
			"manufacturer": "chevrolet",
			"mpg": "17",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "100",
			"weight": 3329,
			"acceleration": 15.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "torino 500",
			"manufacturer": "ford",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "88",
			"weight": 3302,
			"acceleration": 15.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "matador",
			"manufacturer": "amc",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 3288,
			"acceleration": 15.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "impala",
			"manufacturer": "chevrolet",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "165",
			"weight": 4209,
			"acceleration": 12,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "catalina brougham",
			"manufacturer": "pontiac",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "175",
			"weight": 4464,
			"acceleration": 11.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "galaxie 500",
			"manufacturer": "ford",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "153",
			"weight": 4154,
			"acceleration": 13.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "fury iii",
			"manufacturer": "plymouth",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4096,
			"acceleration": 13,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "monaco (sw)",
			"manufacturer": "dodge",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 383,
			"horsepower": "180",
			"weight": 4955,
			"acceleration": 11.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "country squire (sw)",
			"manufacturer": "ford",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "170",
			"weight": 4746,
			"acceleration": 12,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "safari (sw)",
			"manufacturer": "pontiac",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "175",
			"weight": 5140,
			"acceleration": 12,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "hornet sportabout (sw)",
			"manufacturer": "amc",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 258,
			"horsepower": "110",
			"weight": 2962,
			"acceleration": 13.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "vega (sw)",
			"manufacturer": "chevrolet",
			"mpg": "22",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "72",
			"weight": 2408,
			"acceleration": 19,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "firebird",
			"manufacturer": "pontiac",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "100",
			"weight": 3282,
			"acceleration": 15,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "mustang",
			"manufacturer": "ford",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "88",
			"weight": 3139,
			"acceleration": 14.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "capri 2000",
			"manufacturer": "mercury",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "86",
			"weight": 2220,
			"acceleration": 14,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "opel 1900",
			"manufacturer": "buick",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 116,
			"horsepower": "90",
			"weight": 2123,
			"acceleration": 14,
			"modelYear": 71,
			"origin": "European"
		},
		{
			"car": "304",
			"manufacturer": "peugeot",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "70",
			"weight": 2074,
			"acceleration": 19.5,
			"modelYear": 71,
			"origin": "European"
		},
		{
			"car": "124b",
			"manufacturer": "fiat",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 88,
			"horsepower": "76",
			"weight": 2065,
			"acceleration": 14.5,
			"modelYear": 71,
			"origin": "European"
		},
		{
			"car": "corolla 1200",
			"manufacturer": "toyota",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 71,
			"horsepower": "65",
			"weight": 1773,
			"acceleration": 19,
			"modelYear": 71,
			"origin": "Japanese"
		},
		{
			"car": "1200",
			"manufacturer": "datsun",
			"mpg": "35",
			"cylinders": 4,
			"displacement": 72,
			"horsepower": "69",
			"weight": 1613,
			"acceleration": 18,
			"modelYear": 71,
			"origin": "Japanese"
		},
		{
			"car": "model 111",
			"manufacturer": "vw",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "60",
			"weight": 1834,
			"acceleration": 19,
			"modelYear": 71,
			"origin": "European"
		},
		{
			"car": "cricket",
			"manufacturer": "plymouth",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "70",
			"weight": 1955,
			"acceleration": 20.5,
			"modelYear": 71,
			"origin": "American"
		},
		{
			"car": "corona hardtop",
			"manufacturer": "toyota",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 113,
			"horsepower": "95",
			"weight": 2278,
			"acceleration": 15.5,
			"modelYear": 72,
			"origin": "Japanese"
		},
		{
			"car": "colt hardtop",
			"manufacturer": "dodge",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 97.5,
			"horsepower": "80",
			"weight": 2126,
			"acceleration": 17,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "type 3",
			"manufacturer": "vw",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "54",
			"weight": 2254,
			"acceleration": 23.5,
			"modelYear": 72,
			"origin": "European"
		},
		{
			"car": "vega",
			"manufacturer": "chevrolet",
			"mpg": "20",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "90",
			"weight": 2408,
			"acceleration": 19.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "pinto runabout",
			"manufacturer": "ford",
			"mpg": "21",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "86",
			"weight": 2226,
			"acceleration": 16.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "impala",
			"manufacturer": "chevrolet",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "165",
			"weight": 4274,
			"acceleration": 12,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "catalina",
			"manufacturer": "pontiac",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "175",
			"weight": 4385,
			"acceleration": 12,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "fury iii",
			"manufacturer": "plymouth",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4135,
			"acceleration": 13.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "galaxie 500",
			"manufacturer": "ford",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "153",
			"weight": 4129,
			"acceleration": 13,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "ambassador sst",
			"manufacturer": "amc",
			"mpg": "17",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "150",
			"weight": 3672,
			"acceleration": 11.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "marquis",
			"manufacturer": "mercury",
			"mpg": "11",
			"cylinders": 8,
			"displacement": 429,
			"horsepower": "208",
			"weight": 4633,
			"acceleration": 11,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "lesabre custom",
			"manufacturer": "buick",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "155",
			"weight": 4502,
			"acceleration": 13.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "delta 88 royale",
			"manufacturer": "oldsmobile",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "160",
			"weight": 4456,
			"acceleration": 13.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "newport royal",
			"manufacturer": "chrysler",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "190",
			"weight": 4422,
			"acceleration": 12.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "rx2 coupe",
			"manufacturer": "mazda",
			"mpg": "19",
			"cylinders": 3,
			"displacement": 70,
			"horsepower": "97",
			"weight": 2330,
			"acceleration": 13.5,
			"modelYear": 72,
			"origin": "Japanese"
		},
		{
			"car": "matador (sw)",
			"manufacturer": "amc",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "150",
			"weight": 3892,
			"acceleration": 12.5,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "chevelle concours (sw)",
			"manufacturer": "chevrolet",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 307,
			"horsepower": "130",
			"weight": 4098,
			"acceleration": 14,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "gran torino (sw)",
			"manufacturer": "ford",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "140",
			"weight": 4294,
			"acceleration": 16,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "satellite custom (sw)",
			"manufacturer": "plymouth",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4077,
			"acceleration": 14,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "145e (sw)",
			"manufacturer": "volvo",
			"mpg": "18",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "112",
			"weight": 2933,
			"acceleration": 14.5,
			"modelYear": 72,
			"origin": "European"
		},
		{
			"car": "411 (sw)",
			"manufacturer": "vw",
			"mpg": "22",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "76",
			"weight": 2511,
			"acceleration": 18,
			"modelYear": 72,
			"origin": "European"
		},
		{
			"car": "504 (sw)",
			"manufacturer": "peugeot",
			"mpg": "21",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "87",
			"weight": 2979,
			"acceleration": 19.5,
			"modelYear": 72,
			"origin": "European"
		},
		{
			"car": "12 (sw)",
			"manufacturer": "renault",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 96,
			"horsepower": "69",
			"weight": 2189,
			"acceleration": 18,
			"modelYear": 72,
			"origin": "European"
		},
		{
			"car": "pinto (sw)",
			"manufacturer": "ford",
			"mpg": "22",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "86",
			"weight": 2395,
			"acceleration": 16,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "510 (sw)",
			"manufacturer": "datsun",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "92",
			"weight": 2288,
			"acceleration": 17,
			"modelYear": 72,
			"origin": "Japanese"
		},
		{
			"car": "corona mark ii (sw)",
			"manufacturer": "toyota",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "97",
			"weight": 2506,
			"acceleration": 14.5,
			"modelYear": 72,
			"origin": "Japanese"
		},
		{
			"car": "colt (sw)",
			"manufacturer": "dodge",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "80",
			"weight": 2164,
			"acceleration": 15,
			"modelYear": 72,
			"origin": "American"
		},
		{
			"car": "corolla 1600 (sw)",
			"manufacturer": "toyota",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "88",
			"weight": 2100,
			"acceleration": 16.5,
			"modelYear": 72,
			"origin": "Japanese"
		},
		{
			"car": "century 350",
			"manufacturer": "buick",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "175",
			"weight": 4100,
			"acceleration": 13,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "matador",
			"manufacturer": "amc",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "150",
			"weight": 3672,
			"acceleration": 11.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "malibu",
			"manufacturer": "chevrolet",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "145",
			"weight": 3988,
			"acceleration": 13,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "gran torino",
			"manufacturer": "ford",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "137",
			"weight": 4042,
			"acceleration": 14.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "coronet custom",
			"manufacturer": "dodge",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 3777,
			"acceleration": 12.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "marquis brougham",
			"manufacturer": "mercury",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 429,
			"horsepower": "198",
			"weight": 4952,
			"acceleration": 11.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "caprice classic",
			"manufacturer": "chevrolet",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "150",
			"weight": 4464,
			"acceleration": 12,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "ltd",
			"manufacturer": "ford",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "158",
			"weight": 4363,
			"acceleration": 13,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "fury gran sedan",
			"manufacturer": "plymouth",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4237,
			"acceleration": 14.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "new yorker brougham",
			"manufacturer": "chrysler",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 440,
			"horsepower": "215",
			"weight": 4735,
			"acceleration": 11,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "electra 225 custom",
			"manufacturer": "buick",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 455,
			"horsepower": "225",
			"weight": 4951,
			"acceleration": 11,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "ambassador brougham",
			"manufacturer": "amc",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 360,
			"horsepower": "175",
			"weight": 3821,
			"acceleration": 11,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "valiant",
			"manufacturer": "plymouth",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "105",
			"weight": 3121,
			"acceleration": 16.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "nova custom",
			"manufacturer": "chevrolet",
			"mpg": "16",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "100",
			"weight": 3278,
			"acceleration": 18,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "hornet",
			"manufacturer": "amc",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 2945,
			"acceleration": 16,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "maverick",
			"manufacturer": "ford",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "88",
			"weight": 3021,
			"acceleration": 16.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "duster",
			"manufacturer": "plymouth",
			"mpg": "23",
			"cylinders": 6,
			"displacement": 198,
			"horsepower": "95",
			"weight": 2904,
			"acceleration": 16,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "super beetle",
			"manufacturer": "vw",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "46",
			"weight": 1950,
			"acceleration": 21,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "impala",
			"manufacturer": "chevrolet",
			"mpg": "11",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "150",
			"weight": 4997,
			"acceleration": 14,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "country",
			"manufacturer": "ford",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "167",
			"weight": 4906,
			"acceleration": 12.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "custom suburb",
			"manufacturer": "plymouth",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 360,
			"horsepower": "170",
			"weight": 4654,
			"acceleration": 13,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "vista cruiser",
			"manufacturer": "oldsmobile",
			"mpg": "12",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "180",
			"weight": 4499,
			"acceleration": 12.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "gremlin",
			"manufacturer": "amc",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 2789,
			"acceleration": 15,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "carina",
			"manufacturer": "toyota",
			"mpg": "20",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "88",
			"weight": 2279,
			"acceleration": 19,
			"modelYear": 73,
			"origin": "Japanese"
		},
		{
			"car": "vega",
			"manufacturer": "chevrolet",
			"mpg": "21",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "72",
			"weight": 2401,
			"acceleration": 19.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "610",
			"manufacturer": "datsun",
			"mpg": "22",
			"cylinders": 4,
			"displacement": 108,
			"horsepower": "94",
			"weight": 2379,
			"acceleration": 16.5,
			"modelYear": 73,
			"origin": "Japanese"
		},
		{
			"car": "rx3",
			"manufacturer": "mazda",
			"mpg": "18",
			"cylinders": 3,
			"displacement": 70,
			"horsepower": "90",
			"weight": 2124,
			"acceleration": 13.5,
			"modelYear": 73,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "19",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "85",
			"weight": 2310,
			"acceleration": 18.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "capri v6",
			"manufacturer": "mercury",
			"mpg": "21",
			"cylinders": 6,
			"displacement": 155,
			"horsepower": "107",
			"weight": 2472,
			"acceleration": 14,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "124 sport coupe",
			"manufacturer": "fiat",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "90",
			"weight": 2265,
			"acceleration": 15.5,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "monte carlo s",
			"manufacturer": "chevrolet",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "145",
			"weight": 4082,
			"acceleration": 13,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "grand prix",
			"manufacturer": "pontiac",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "230",
			"weight": 4278,
			"acceleration": 9.5,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "128",
			"manufacturer": "fiat",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 68,
			"horsepower": "49",
			"weight": 1867,
			"acceleration": 19.5,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "opel manta",
			"manufacturer": "buick",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 116,
			"horsepower": "75",
			"weight": 2158,
			"acceleration": 15.5,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "100ls",
			"manufacturer": "audi",
			"mpg": "20",
			"cylinders": 4,
			"displacement": 114,
			"horsepower": "91",
			"weight": 2582,
			"acceleration": 14,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "144ea",
			"manufacturer": "volvo",
			"mpg": "19",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "112",
			"weight": 2868,
			"acceleration": 15.5,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "dart custom",
			"manufacturer": "dodge",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 3399,
			"acceleration": 11,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "99le",
			"manufacturer": "saab",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "110",
			"weight": 2660,
			"acceleration": 14,
			"modelYear": 73,
			"origin": "European"
		},
		{
			"car": "mark ii",
			"manufacturer": "toyota",
			"mpg": "20",
			"cylinders": 6,
			"displacement": 156,
			"horsepower": "122",
			"weight": 2807,
			"acceleration": 13.5,
			"modelYear": 73,
			"origin": "Japanese"
		},
		{
			"car": "omega",
			"manufacturer": "oldsmobile",
			"mpg": "11",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "180",
			"weight": 3664,
			"acceleration": 11,
			"modelYear": 73,
			"origin": "American"
		},
		{
			"car": "duster",
			"manufacturer": "plymouth",
			"mpg": "20",
			"cylinders": 6,
			"displacement": 198,
			"horsepower": "95",
			"weight": 3102,
			"acceleration": 16.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "maverick",
			"manufacturer": "ford",
			"mpg": "21",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "NA",
			"weight": 2875,
			"acceleration": 17,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "hornet",
			"manufacturer": "amc",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 2901,
			"acceleration": 16,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "nova",
			"manufacturer": "chevrolet",
			"mpg": "15",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "100",
			"weight": 3336,
			"acceleration": 17,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "b210",
			"manufacturer": "datsun",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "67",
			"weight": 1950,
			"acceleration": 19,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "80",
			"weight": 2451,
			"acceleration": 16.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "corolla 1200",
			"manufacturer": "toyota",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 71,
			"horsepower": "65",
			"weight": 1836,
			"acceleration": 21,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "vega",
			"manufacturer": "chevrolet",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "75",
			"weight": 2542,
			"acceleration": 17,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "chevelle malibu classic",
			"manufacturer": "chevrolet",
			"mpg": "16",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "100",
			"weight": 3781,
			"acceleration": 17,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "matador",
			"manufacturer": "amc",
			"mpg": "16",
			"cylinders": 6,
			"displacement": 258,
			"horsepower": "110",
			"weight": 3632,
			"acceleration": 18,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "satellite sebring",
			"manufacturer": "plymouth",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "105",
			"weight": 3613,
			"acceleration": 16.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "gran torino",
			"manufacturer": "ford",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "140",
			"weight": 4141,
			"acceleration": 14,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "century luxus (sw)",
			"manufacturer": "buick",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "150",
			"weight": 4699,
			"acceleration": 14.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "coronet custom (sw)",
			"manufacturer": "dodge",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4457,
			"acceleration": 13.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "gran torino (sw)",
			"manufacturer": "ford",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "140",
			"weight": 4638,
			"acceleration": 16,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "matador (sw)",
			"manufacturer": "amc",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "150",
			"weight": 4257,
			"acceleration": 15.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "fox",
			"manufacturer": "audi",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "83",
			"weight": 2219,
			"acceleration": 16.5,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "dasher",
			"manufacturer": "vw",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "67",
			"weight": 1963,
			"acceleration": 15.5,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "opel manta",
			"manufacturer": "buick",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "78",
			"weight": 2300,
			"acceleration": 14.5,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "corona",
			"manufacturer": "toyota",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 76,
			"horsepower": "52",
			"weight": 1649,
			"acceleration": 16.5,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "710",
			"manufacturer": "datsun",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 83,
			"horsepower": "61",
			"weight": 2003,
			"acceleration": 19,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "colt",
			"manufacturer": "dodge",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "75",
			"weight": 2125,
			"acceleration": 14.5,
			"modelYear": 74,
			"origin": "American"
		},
		{
			"car": "128",
			"manufacturer": "fiat",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "75",
			"weight": 2108,
			"acceleration": 15.5,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "124 tc",
			"manufacturer": "fiat",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 116,
			"horsepower": "75",
			"weight": 2246,
			"acceleration": 14,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "civic",
			"manufacturer": "honda",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "97",
			"weight": 2489,
			"acceleration": 15,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "none",
			"manufacturer": "subaru",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 108,
			"horsepower": "93",
			"weight": 2391,
			"acceleration": 15.5,
			"modelYear": 74,
			"origin": "Japanese"
		},
		{
			"car": "x1.9",
			"manufacturer": "fiat",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "67",
			"weight": 2000,
			"acceleration": 16,
			"modelYear": 74,
			"origin": "European"
		},
		{
			"car": "valiant custom",
			"manufacturer": "plymouth",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "95",
			"weight": 3264,
			"acceleration": 16,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "nova",
			"manufacturer": "chevrolet",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "105",
			"weight": 3459,
			"acceleration": 16,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "monarch",
			"manufacturer": "mercury",
			"mpg": "15",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "72",
			"weight": 3432,
			"acceleration": 21,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "maverick",
			"manufacturer": "ford",
			"mpg": "15",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "72",
			"weight": 3158,
			"acceleration": 19.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "catalina",
			"manufacturer": "pontiac",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "170",
			"weight": 4668,
			"acceleration": 11.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "bel air",
			"manufacturer": "chevrolet",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "145",
			"weight": 4440,
			"acceleration": 14,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "grand fury",
			"manufacturer": "plymouth",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4498,
			"acceleration": 14.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "ltd",
			"manufacturer": "ford",
			"mpg": "14",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "148",
			"weight": 4657,
			"acceleration": 13.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "century",
			"manufacturer": "buick",
			"mpg": "17",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "110",
			"weight": 3907,
			"acceleration": 21,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "chevelle malibu",
			"manufacturer": "chevrolet",
			"mpg": "16",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "105",
			"weight": 3897,
			"acceleration": 18.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "matador",
			"manufacturer": "amc",
			"mpg": "15",
			"cylinders": 6,
			"displacement": 258,
			"horsepower": "110",
			"weight": 3730,
			"acceleration": 19,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "fury",
			"manufacturer": "plymouth",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "95",
			"weight": 3785,
			"acceleration": 19,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "skyhawk",
			"manufacturer": "buick",
			"mpg": "21",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "110",
			"weight": 3039,
			"acceleration": 15,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "monza 2+2",
			"manufacturer": "chevrolet",
			"mpg": "20",
			"cylinders": 8,
			"displacement": 262,
			"horsepower": "110",
			"weight": 3221,
			"acceleration": 13.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "mustang ii",
			"manufacturer": "ford",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "129",
			"weight": 3169,
			"acceleration": 12,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "corolla",
			"manufacturer": "toyota",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "75",
			"weight": 2171,
			"acceleration": 16,
			"modelYear": 75,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "83",
			"weight": 2639,
			"acceleration": 17,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "gremlin",
			"manufacturer": "amc",
			"mpg": "20",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "100",
			"weight": 2914,
			"acceleration": 16,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "astro",
			"manufacturer": "pontiac",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "78",
			"weight": 2592,
			"acceleration": 18.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "corona",
			"manufacturer": "toyota",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 134,
			"horsepower": "96",
			"weight": 2702,
			"acceleration": 13.5,
			"modelYear": 75,
			"origin": "Japanese"
		},
		{
			"car": "dasher",
			"manufacturer": "vw",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "71",
			"weight": 2223,
			"acceleration": 16.5,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "710",
			"manufacturer": "datsun",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "97",
			"weight": 2545,
			"acceleration": 17,
			"modelYear": 75,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 171,
			"horsepower": "97",
			"weight": 2984,
			"acceleration": 14.5,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "rabbit",
			"manufacturer": "vw",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "70",
			"weight": 1937,
			"acceleration": 14,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "pacer",
			"manufacturer": "amc",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "90",
			"weight": 3211,
			"acceleration": 17,
			"modelYear": 75,
			"origin": "American"
		},
		{
			"car": "100ls",
			"manufacturer": "audi",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 115,
			"horsepower": "95",
			"weight": 2694,
			"acceleration": 15,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "504",
			"manufacturer": "peugeot",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "88",
			"weight": 2957,
			"acceleration": 17,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "244dl",
			"manufacturer": "volvo",
			"mpg": "22",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "98",
			"weight": 2945,
			"acceleration": 14.5,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "99le",
			"manufacturer": "saab",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "115",
			"weight": 2671,
			"acceleration": 13.5,
			"modelYear": 75,
			"origin": "European"
		},
		{
			"car": "civic cvcc",
			"manufacturer": "honda",
			"mpg": "33",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "53",
			"weight": 1795,
			"acceleration": 17.5,
			"modelYear": 75,
			"origin": "Japanese"
		},
		{
			"car": "131",
			"manufacturer": "fiat",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 107,
			"horsepower": "86",
			"weight": 2464,
			"acceleration": 15.5,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "opel 1900",
			"manufacturer": "buick",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 116,
			"horsepower": "81",
			"weight": 2220,
			"acceleration": 16.9,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "ii",
			"manufacturer": "capri",
			"mpg": "25",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "92",
			"weight": 2572,
			"acceleration": 14.9,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "colt",
			"manufacturer": "dodge",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "79",
			"weight": 2255,
			"acceleration": 17.7,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "12tl",
			"manufacturer": "renault",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 101,
			"horsepower": "83",
			"weight": 2202,
			"acceleration": 15.3,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "chevelle malibu classic",
			"manufacturer": "chevrolet",
			"mpg": "17.5",
			"cylinders": 8,
			"displacement": 305,
			"horsepower": "140",
			"weight": 4215,
			"acceleration": 13,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "coronet brougham",
			"manufacturer": "dodge",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 4190,
			"acceleration": 13,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "matador",
			"manufacturer": "amc",
			"mpg": "15.5",
			"cylinders": 8,
			"displacement": 304,
			"horsepower": "120",
			"weight": 3962,
			"acceleration": 13.9,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "gran torino",
			"manufacturer": "ford",
			"mpg": "14.5",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "152",
			"weight": 4215,
			"acceleration": 12.8,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "valiant",
			"manufacturer": "plymouth",
			"mpg": "22",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "100",
			"weight": 3233,
			"acceleration": 15.4,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "nova",
			"manufacturer": "chevrolet",
			"mpg": "22",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "105",
			"weight": 3353,
			"acceleration": 14.5,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "maverick",
			"manufacturer": "ford",
			"mpg": "24",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "81",
			"weight": 3012,
			"acceleration": 17.6,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "hornet",
			"manufacturer": "amc",
			"mpg": "22.5",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "90",
			"weight": 3085,
			"acceleration": 17.6,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "chevette",
			"manufacturer": "chevrolet",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "52",
			"weight": 2035,
			"acceleration": 22.2,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "woody",
			"manufacturer": "chevrolet",
			"mpg": "24.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "60",
			"weight": 2164,
			"acceleration": 22.1,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "rabbit",
			"manufacturer": "vw",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "70",
			"weight": 1937,
			"acceleration": 14.2,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "civic",
			"manufacturer": "honda",
			"mpg": "33",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "53",
			"weight": 1795,
			"acceleration": 17.4,
			"modelYear": 76,
			"origin": "Japanese"
		},
		{
			"car": "aspen se",
			"manufacturer": "dodge",
			"mpg": "20",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "100",
			"weight": 3651,
			"acceleration": 17.7,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "granada ghia",
			"manufacturer": "ford",
			"mpg": "18",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "78",
			"weight": 3574,
			"acceleration": 21,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "ventura sj",
			"manufacturer": "pontiac",
			"mpg": "18.5",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "110",
			"weight": 3645,
			"acceleration": 16.2,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "pacer d/l",
			"manufacturer": "amc",
			"mpg": "17.5",
			"cylinders": 6,
			"displacement": 258,
			"horsepower": "95",
			"weight": 3193,
			"acceleration": 17.8,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "rabbit",
			"manufacturer": "vw",
			"mpg": "29.5",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "71",
			"weight": 1825,
			"acceleration": 12.2,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "b-210",
			"manufacturer": "datsun",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "70",
			"weight": 1990,
			"acceleration": 17,
			"modelYear": 76,
			"origin": "Japanese"
		},
		{
			"car": "corolla",
			"manufacturer": "toyota",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "75",
			"weight": 2155,
			"acceleration": 16.4,
			"modelYear": 76,
			"origin": "Japanese"
		},
		{
			"car": "pinto",
			"manufacturer": "ford",
			"mpg": "26.5",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "72",
			"weight": 2565,
			"acceleration": 13.6,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "245",
			"manufacturer": "volvo",
			"mpg": "20",
			"cylinders": 4,
			"displacement": 130,
			"horsepower": "102",
			"weight": 3150,
			"acceleration": 15.7,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "volare premier v8",
			"manufacturer": "plymouth",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 3940,
			"acceleration": 13.2,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "504",
			"manufacturer": "peugeot",
			"mpg": "19",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "88",
			"weight": 3270,
			"acceleration": 21.9,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "mark ii",
			"manufacturer": "toyota",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 156,
			"horsepower": "108",
			"weight": 2930,
			"acceleration": 15.5,
			"modelYear": 76,
			"origin": "Japanese"
		},
		{
			"car": "280s",
			"manufacturer": "mercedes",
			"mpg": "16.5",
			"cylinders": 6,
			"displacement": 168,
			"horsepower": "120",
			"weight": 3820,
			"acceleration": 16.7,
			"modelYear": 76,
			"origin": "European"
		},
		{
			"car": "seville",
			"manufacturer": "cadillac",
			"mpg": "16.5",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "180",
			"weight": 4380,
			"acceleration": 12.1,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "c10",
			"manufacturer": "chevrolet",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "145",
			"weight": 4055,
			"acceleration": 12,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "f108",
			"manufacturer": "ford",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "130",
			"weight": 3870,
			"acceleration": 15,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "d100",
			"manufacturer": "dodge",
			"mpg": "13",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "150",
			"weight": 3755,
			"acceleration": 14,
			"modelYear": 76,
			"origin": "American"
		},
		{
			"car": "accord cvcc",
			"manufacturer": "honda",
			"mpg": "31.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "68",
			"weight": 2045,
			"acceleration": 18.5,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "opel isuzu deluxe",
			"manufacturer": "buick",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 111,
			"horsepower": "80",
			"weight": 2155,
			"acceleration": 14.8,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "5 gtl",
			"manufacturer": "renault",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "58",
			"weight": 1825,
			"acceleration": 18.6,
			"modelYear": 77,
			"origin": "European"
		},
		{
			"car": "arrow gs",
			"manufacturer": "plymouth",
			"mpg": "25.5",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "96",
			"weight": 2300,
			"acceleration": 15.5,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "f-10 hatchback",
			"manufacturer": "datsun",
			"mpg": "33.5",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "70",
			"weight": 1945,
			"acceleration": 16.8,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "caprice classic",
			"manufacturer": "chevrolet",
			"mpg": "17.5",
			"cylinders": 8,
			"displacement": 305,
			"horsepower": "145",
			"weight": 3880,
			"acceleration": 12.5,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "cutlass supreme",
			"manufacturer": "oldsmobile",
			"mpg": "17",
			"cylinders": 8,
			"displacement": 260,
			"horsepower": "110",
			"weight": 4060,
			"acceleration": 19,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "monaco brougham",
			"manufacturer": "dodge",
			"mpg": "15.5",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "145",
			"weight": 4140,
			"acceleration": 13.7,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "cougar brougham",
			"manufacturer": "mercury",
			"mpg": "15",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "130",
			"weight": 4295,
			"acceleration": 14.9,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "concours",
			"manufacturer": "chevrolet",
			"mpg": "17.5",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "110",
			"weight": 3520,
			"acceleration": 16.4,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "skylark",
			"manufacturer": "buick",
			"mpg": "20.5",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "105",
			"weight": 3425,
			"acceleration": 16.9,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "volare custom",
			"manufacturer": "plymouth",
			"mpg": "19",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "100",
			"weight": 3630,
			"acceleration": 17.7,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "granada",
			"manufacturer": "ford",
			"mpg": "18.5",
			"cylinders": 6,
			"displacement": 250,
			"horsepower": "98",
			"weight": 3525,
			"acceleration": 19,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "grand prix lj",
			"manufacturer": "pontiac",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "180",
			"weight": 4220,
			"acceleration": 11.1,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "monte carlo landau",
			"manufacturer": "chevrolet",
			"mpg": "15.5",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "170",
			"weight": 4165,
			"acceleration": 11.4,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "cordoba",
			"manufacturer": "chrysler",
			"mpg": "15.5",
			"cylinders": 8,
			"displacement": 400,
			"horsepower": "190",
			"weight": 4325,
			"acceleration": 12.2,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "thunderbird",
			"manufacturer": "ford",
			"mpg": "16",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "149",
			"weight": 4335,
			"acceleration": 14.5,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "rabbit custom",
			"manufacturer": "vw",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "78",
			"weight": 1940,
			"acceleration": 14.5,
			"modelYear": 77,
			"origin": "European"
		},
		{
			"car": "sunbird coupe",
			"manufacturer": "pontiac",
			"mpg": "24.5",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "88",
			"weight": 2740,
			"acceleration": 16,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "corolla liftback",
			"manufacturer": "toyota",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "75",
			"weight": 2265,
			"acceleration": 18.2,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "mustang ii 2+2",
			"manufacturer": "ford",
			"mpg": "25.5",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "89",
			"weight": 2755,
			"acceleration": 15.8,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "chevette",
			"manufacturer": "chevrolet",
			"mpg": "30.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "63",
			"weight": 2051,
			"acceleration": 17,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "colt m/m",
			"manufacturer": "dodge",
			"mpg": "33.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "83",
			"weight": 2075,
			"acceleration": 15.9,
			"modelYear": 77,
			"origin": "American"
		},
		{
			"car": "dl",
			"manufacturer": "subaru",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "67",
			"weight": 1985,
			"acceleration": 16.4,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "dasher",
			"manufacturer": "vw",
			"mpg": "30.5",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "78",
			"weight": 2190,
			"acceleration": 14.1,
			"modelYear": 77,
			"origin": "European"
		},
		{
			"car": "810",
			"manufacturer": "datsun",
			"mpg": "22",
			"cylinders": 6,
			"displacement": 146,
			"horsepower": "97",
			"weight": 2815,
			"acceleration": 14.5,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "320i",
			"manufacturer": "bmw",
			"mpg": "21.5",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "110",
			"weight": 2600,
			"acceleration": 12.8,
			"modelYear": 77,
			"origin": "European"
		},
		{
			"car": "rx-4",
			"manufacturer": "mazda",
			"mpg": "21.5",
			"cylinders": 3,
			"displacement": 80,
			"horsepower": "110",
			"weight": 2720,
			"acceleration": 13.5,
			"modelYear": 77,
			"origin": "Japanese"
		},
		{
			"car": "rabbit custom diesel",
			"manufacturer": "vw",
			"mpg": "43.1",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "48",
			"weight": 1985,
			"acceleration": 21.5,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "fiesta",
			"manufacturer": "ford",
			"mpg": "36.1",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "66",
			"weight": 1800,
			"acceleration": 14.4,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "glc deluxe",
			"manufacturer": "mazda",
			"mpg": "32.8",
			"cylinders": 4,
			"displacement": 78,
			"horsepower": "52",
			"weight": 1985,
			"acceleration": 19.4,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "b210 gx",
			"manufacturer": "datsun",
			"mpg": "39.4",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "70",
			"weight": 2070,
			"acceleration": 18.6,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "civic cvcc",
			"manufacturer": "honda",
			"mpg": "36.1",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "60",
			"weight": 1800,
			"acceleration": 16.4,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "cutlass salon brougham",
			"manufacturer": "oldsmobile",
			"mpg": "19.9",
			"cylinders": 8,
			"displacement": 260,
			"horsepower": "110",
			"weight": 3365,
			"acceleration": 15.5,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "diplomat",
			"manufacturer": "dodge",
			"mpg": "19.4",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "140",
			"weight": 3735,
			"acceleration": 13.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "monarch ghia",
			"manufacturer": "mercury",
			"mpg": "20.2",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "139",
			"weight": 3570,
			"acceleration": 12.8,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "phoenix lj",
			"manufacturer": "pontiac",
			"mpg": "19.2",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "105",
			"weight": 3535,
			"acceleration": 19.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "malibu",
			"manufacturer": "chevrolet",
			"mpg": "20.5",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "95",
			"weight": 3155,
			"acceleration": 18.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "fairmont (auto)",
			"manufacturer": "ford",
			"mpg": "20.2",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "85",
			"weight": 2965,
			"acceleration": 15.8,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "fairmont (man)",
			"manufacturer": "ford",
			"mpg": "25.1",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "88",
			"weight": 2720,
			"acceleration": 15.4,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "volare",
			"manufacturer": "plymouth",
			"mpg": "20.5",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "100",
			"weight": 3430,
			"acceleration": 17.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "concord",
			"manufacturer": "amc",
			"mpg": "19.4",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "90",
			"weight": 3210,
			"acceleration": 17.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "century special",
			"manufacturer": "buick",
			"mpg": "20.6",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "105",
			"weight": 3380,
			"acceleration": 15.8,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "zephyr",
			"manufacturer": "mercury",
			"mpg": "20.8",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "85",
			"weight": 3070,
			"acceleration": 16.7,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "aspen",
			"manufacturer": "dodge",
			"mpg": "18.6",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "110",
			"weight": 3620,
			"acceleration": 18.7,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "concord d/l",
			"manufacturer": "amc",
			"mpg": "18.1",
			"cylinders": 6,
			"displacement": 258,
			"horsepower": "120",
			"weight": 3410,
			"acceleration": 15.1,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "monte carlo landau",
			"manufacturer": "chevrolet",
			"mpg": "19.2",
			"cylinders": 8,
			"displacement": 305,
			"horsepower": "145",
			"weight": 3425,
			"acceleration": 13.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "regal sport coupe (turbo)",
			"manufacturer": "buick",
			"mpg": "17.7",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "165",
			"weight": 3445,
			"acceleration": 13.4,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "futura",
			"manufacturer": "ford",
			"mpg": "18.1",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "139",
			"weight": 3205,
			"acceleration": 11.2,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "magnum xe",
			"manufacturer": "dodge",
			"mpg": "17.5",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "140",
			"weight": 4080,
			"acceleration": 13.7,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "chevette",
			"manufacturer": "chevrolet",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "68",
			"weight": 2155,
			"acceleration": 16.5,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "corona",
			"manufacturer": "toyota",
			"mpg": "27.5",
			"cylinders": 4,
			"displacement": 134,
			"horsepower": "95",
			"weight": 2560,
			"acceleration": 14.2,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "510",
			"manufacturer": "datsun",
			"mpg": "27.2",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "97",
			"weight": 2300,
			"acceleration": 14.7,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "omni",
			"manufacturer": "dodge",
			"mpg": "30.9",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "75",
			"weight": 2230,
			"acceleration": 14.5,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "celica gt liftback",
			"manufacturer": "toyota",
			"mpg": "21.1",
			"cylinders": 4,
			"displacement": 134,
			"horsepower": "95",
			"weight": 2515,
			"acceleration": 14.8,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "sapporo",
			"manufacturer": "plymouth",
			"mpg": "23.2",
			"cylinders": 4,
			"displacement": 156,
			"horsepower": "105",
			"weight": 2745,
			"acceleration": 16.7,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "starfire sx",
			"manufacturer": "oldsmobile",
			"mpg": "23.8",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "85",
			"weight": 2855,
			"acceleration": 17.6,
			"modelYear": 78,
			"origin": "American"
		},
		{
			"car": "200-sx",
			"manufacturer": "datsun",
			"mpg": "23.9",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "97",
			"weight": 2405,
			"acceleration": 14.9,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "5000",
			"manufacturer": "audi",
			"mpg": "20.3",
			"cylinders": 5,
			"displacement": 131,
			"horsepower": "103",
			"weight": 2830,
			"acceleration": 15.9,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "264gl",
			"manufacturer": "volvo",
			"mpg": "17",
			"cylinders": 6,
			"displacement": 163,
			"horsepower": "125",
			"weight": 3140,
			"acceleration": 13.6,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "99gle",
			"manufacturer": "saab",
			"mpg": "21.6",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "115",
			"weight": 2795,
			"acceleration": 15.7,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "604sl",
			"manufacturer": "peugeot",
			"mpg": "16.2",
			"cylinders": 6,
			"displacement": 163,
			"horsepower": "133",
			"weight": 3410,
			"acceleration": 15.8,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "scirocco",
			"manufacturer": "vw",
			"mpg": "31.5",
			"cylinders": 4,
			"displacement": 89,
			"horsepower": "71",
			"weight": 1990,
			"acceleration": 14.9,
			"modelYear": 78,
			"origin": "European"
		},
		{
			"car": "accord lx",
			"manufacturer": "honda",
			"mpg": "29.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "68",
			"weight": 2135,
			"acceleration": 16.6,
			"modelYear": 78,
			"origin": "Japanese"
		},
		{
			"car": "lemans v6",
			"manufacturer": "pontiac",
			"mpg": "21.5",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "115",
			"weight": 3245,
			"acceleration": 15.4,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "zephyr 6",
			"manufacturer": "mercury",
			"mpg": "19.8",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "85",
			"weight": 2990,
			"acceleration": 18.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "fairmont 4",
			"manufacturer": "ford",
			"mpg": "22.3",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "88",
			"weight": 2890,
			"acceleration": 17.3,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "concord dl 6",
			"manufacturer": "amc",
			"mpg": "20.2",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "90",
			"weight": 3265,
			"acceleration": 18.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "aspen 6",
			"manufacturer": "dodge",
			"mpg": "20.6",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "110",
			"weight": 3360,
			"acceleration": 16.6,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "caprice classic",
			"manufacturer": "chevrolet",
			"mpg": "17",
			"cylinders": 8,
			"displacement": 305,
			"horsepower": "130",
			"weight": 3840,
			"acceleration": 15.4,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "ltd landau",
			"manufacturer": "ford",
			"mpg": "17.6",
			"cylinders": 8,
			"displacement": 302,
			"horsepower": "129",
			"weight": 3725,
			"acceleration": 13.4,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "grand marquis",
			"manufacturer": "mercury",
			"mpg": "16.5",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "138",
			"weight": 3955,
			"acceleration": 13.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "st. regis",
			"manufacturer": "dodge",
			"mpg": "18.2",
			"cylinders": 8,
			"displacement": 318,
			"horsepower": "135",
			"weight": 3830,
			"acceleration": 15.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "estate wagon (sw)",
			"manufacturer": "buick",
			"mpg": "16.9",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "155",
			"weight": 4360,
			"acceleration": 14.9,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "country squire (sw)",
			"manufacturer": "ford",
			"mpg": "15.5",
			"cylinders": 8,
			"displacement": 351,
			"horsepower": "142",
			"weight": 4054,
			"acceleration": 14.3,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "malibu classic (sw)",
			"manufacturer": "chevrolet",
			"mpg": "19.2",
			"cylinders": 8,
			"displacement": 267,
			"horsepower": "125",
			"weight": 3605,
			"acceleration": 15,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "lebaron town @ country (sw)",
			"manufacturer": "chrysler",
			"mpg": "18.5",
			"cylinders": 8,
			"displacement": 360,
			"horsepower": "150",
			"weight": 3940,
			"acceleration": 13,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "rabbit custom",
			"manufacturer": "vw",
			"mpg": "31.9",
			"cylinders": 4,
			"displacement": 89,
			"horsepower": "71",
			"weight": 1925,
			"acceleration": 14,
			"modelYear": 79,
			"origin": "European"
		},
		{
			"car": "glc deluxe",
			"manufacturer": "mazda",
			"mpg": "34.1",
			"cylinders": 4,
			"displacement": 86,
			"horsepower": "65",
			"weight": 1975,
			"acceleration": 15.2,
			"modelYear": 79,
			"origin": "Japanese"
		},
		{
			"car": "colt hatchback custom",
			"manufacturer": "dodge",
			"mpg": "35.7",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "80",
			"weight": 1915,
			"acceleration": 14.4,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "spirit dl",
			"manufacturer": "amc",
			"mpg": "27.4",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "80",
			"weight": 2670,
			"acceleration": 15,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "300d",
			"manufacturer": "mercedes",
			"mpg": "25.4",
			"cylinders": 5,
			"displacement": 183,
			"horsepower": "77",
			"weight": 3530,
			"acceleration": 20.1,
			"modelYear": 79,
			"origin": "European"
		},
		{
			"car": "eldorado",
			"manufacturer": "cadillac",
			"mpg": "23",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "125",
			"weight": 3900,
			"acceleration": 17.4,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "504",
			"manufacturer": "peugeot",
			"mpg": "27.2",
			"cylinders": 4,
			"displacement": 141,
			"horsepower": "71",
			"weight": 3190,
			"acceleration": 24.8,
			"modelYear": 79,
			"origin": "European"
		},
		{
			"car": "cutlass salon brougham",
			"manufacturer": "oldsmobile",
			"mpg": "23.9",
			"cylinders": 8,
			"displacement": 260,
			"horsepower": "90",
			"weight": 3420,
			"acceleration": 22.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "horizon",
			"manufacturer": "plymouth",
			"mpg": "34.2",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "70",
			"weight": 2200,
			"acceleration": 13.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "horizon tc3",
			"manufacturer": "plymouth",
			"mpg": "34.5",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "70",
			"weight": 2150,
			"acceleration": 14.9,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "210",
			"manufacturer": "datsun",
			"mpg": "31.8",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "65",
			"weight": 2020,
			"acceleration": 19.2,
			"modelYear": 79,
			"origin": "Japanese"
		},
		{
			"car": "strada custom",
			"manufacturer": "fiat",
			"mpg": "37.3",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "69",
			"weight": 2130,
			"acceleration": 14.7,
			"modelYear": 79,
			"origin": "European"
		},
		{
			"car": "skylark limited",
			"manufacturer": "buick",
			"mpg": "28.4",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 2670,
			"acceleration": 16,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "citation",
			"manufacturer": "chevrolet",
			"mpg": "28.8",
			"cylinders": 6,
			"displacement": 173,
			"horsepower": "115",
			"weight": 2595,
			"acceleration": 11.3,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "omega brougham",
			"manufacturer": "oldsmobile",
			"mpg": "26.8",
			"cylinders": 6,
			"displacement": 173,
			"horsepower": "115",
			"weight": 2700,
			"acceleration": 12.9,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "phoenix",
			"manufacturer": "pontiac",
			"mpg": "33.5",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 2556,
			"acceleration": 13.2,
			"modelYear": 79,
			"origin": "American"
		},
		{
			"car": "rabbit",
			"manufacturer": "vw",
			"mpg": "41.5",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "76",
			"weight": 2144,
			"acceleration": 14.7,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "corolla tercel",
			"manufacturer": "toyota",
			"mpg": "38.1",
			"cylinders": 4,
			"displacement": 89,
			"horsepower": "60",
			"weight": 1968,
			"acceleration": 18.8,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "chevette",
			"manufacturer": "chevrolet",
			"mpg": "32.1",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "70",
			"weight": 2120,
			"acceleration": 15.5,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "310",
			"manufacturer": "datsun",
			"mpg": "37.2",
			"cylinders": 4,
			"displacement": 86,
			"horsepower": "65",
			"weight": 2019,
			"acceleration": 16.4,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "citation",
			"manufacturer": "chevrolet",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 2678,
			"acceleration": 16.5,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "fairmont",
			"manufacturer": "ford",
			"mpg": "26.4",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "88",
			"weight": 2870,
			"acceleration": 18.1,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "concord",
			"manufacturer": "amc",
			"mpg": "24.3",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 3003,
			"acceleration": 20.1,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "aspen",
			"manufacturer": "dodge",
			"mpg": "19.1",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "90",
			"weight": 3381,
			"acceleration": 18.7,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "4000",
			"manufacturer": "audi",
			"mpg": "34.3",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "78",
			"weight": 2188,
			"acceleration": 15.8,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "corona liftback",
			"manufacturer": "toyota",
			"mpg": "29.8",
			"cylinders": 4,
			"displacement": 134,
			"horsepower": "90",
			"weight": 2711,
			"acceleration": 15.5,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "626",
			"manufacturer": "mazda",
			"mpg": "31.3",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "75",
			"weight": 2542,
			"acceleration": 17.5,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "510 hatchback",
			"manufacturer": "datsun",
			"mpg": "37",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "92",
			"weight": 2434,
			"acceleration": 15,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "corolla",
			"manufacturer": "toyota",
			"mpg": "32.2",
			"cylinders": 4,
			"displacement": 108,
			"horsepower": "75",
			"weight": 2265,
			"acceleration": 15.2,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "glc",
			"manufacturer": "mazda",
			"mpg": "46.6",
			"cylinders": 4,
			"displacement": 86,
			"horsepower": "65",
			"weight": 2110,
			"acceleration": 17.9,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "colt",
			"manufacturer": "dodge",
			"mpg": "27.9",
			"cylinders": 4,
			"displacement": 156,
			"horsepower": "105",
			"weight": 2800,
			"acceleration": 14.4,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "210",
			"manufacturer": "datsun",
			"mpg": "40.8",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "65",
			"weight": 2110,
			"acceleration": 19.2,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "rabbit c (diesel)",
			"manufacturer": "vw",
			"mpg": "44.3",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "48",
			"weight": 2085,
			"acceleration": 21.7,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "dasher (diesel)",
			"manufacturer": "vw",
			"mpg": "43.4",
			"cylinders": 4,
			"displacement": 90,
			"horsepower": "48",
			"weight": 2335,
			"acceleration": 23.7,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "5000s (diesel)",
			"manufacturer": "audi",
			"mpg": "36.4",
			"cylinders": 5,
			"displacement": 121,
			"horsepower": "67",
			"weight": 2950,
			"acceleration": 19.9,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "240d",
			"manufacturer": "mercedes",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 146,
			"horsepower": "67",
			"weight": 3250,
			"acceleration": 21.8,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "civic 1500 gl",
			"manufacturer": "honda",
			"mpg": "44.6",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "67",
			"weight": 1850,
			"acceleration": 13.8,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "lecar deluxe",
			"manufacturer": "renault",
			"mpg": "40.9",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "NA",
			"weight": 1835,
			"acceleration": 17.3,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "dl",
			"manufacturer": "subaru",
			"mpg": "33.8",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "67",
			"weight": 2145,
			"acceleration": 18,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "rabbit",
			"manufacturer": "vw",
			"mpg": "29.8",
			"cylinders": 4,
			"displacement": 89,
			"horsepower": "62",
			"weight": 1845,
			"acceleration": 15.3,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "280-zx",
			"manufacturer": "datsun",
			"mpg": "32.7",
			"cylinders": 6,
			"displacement": 168,
			"horsepower": "132",
			"weight": 2910,
			"acceleration": 11.4,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "rx-7 gs",
			"manufacturer": "mazda",
			"mpg": "23.7",
			"cylinders": 3,
			"displacement": 70,
			"horsepower": "100",
			"weight": 2420,
			"acceleration": 12.5,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "tr7 coupe",
			"manufacturer": "triumph",
			"mpg": "35",
			"cylinders": 4,
			"displacement": 122,
			"horsepower": "88",
			"weight": 2500,
			"acceleration": 15.1,
			"modelYear": 80,
			"origin": "European"
		},
		{
			"car": "mustang cobra",
			"manufacturer": "ford",
			"mpg": "23.6",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "NA",
			"weight": 2905,
			"acceleration": 14.3,
			"modelYear": 80,
			"origin": "American"
		},
		{
			"car": "accord",
			"manufacturer": "honda",
			"mpg": "32.4",
			"cylinders": 4,
			"displacement": 107,
			"horsepower": "72",
			"weight": 2290,
			"acceleration": 17,
			"modelYear": 80,
			"origin": "Japanese"
		},
		{
			"car": "reliant",
			"manufacturer": "plymouth",
			"mpg": "27.2",
			"cylinders": 4,
			"displacement": 135,
			"horsepower": "84",
			"weight": 2490,
			"acceleration": 15.7,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "skylark",
			"manufacturer": "buick",
			"mpg": "26.6",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "84",
			"weight": 2635,
			"acceleration": 16.4,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "aries wagon (sw)",
			"manufacturer": "dodge",
			"mpg": "25.8",
			"cylinders": 4,
			"displacement": 156,
			"horsepower": "92",
			"weight": 2620,
			"acceleration": 14.4,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "citation",
			"manufacturer": "chevrolet",
			"mpg": "23.5",
			"cylinders": 6,
			"displacement": 173,
			"horsepower": "110",
			"weight": 2725,
			"acceleration": 12.6,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "reliant",
			"manufacturer": "plymouth",
			"mpg": "30",
			"cylinders": 4,
			"displacement": 135,
			"horsepower": "84",
			"weight": 2385,
			"acceleration": 12.9,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "starlet",
			"manufacturer": "toyota",
			"mpg": "39.1",
			"cylinders": 4,
			"displacement": 79,
			"horsepower": "58",
			"weight": 1755,
			"acceleration": 16.9,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "champ",
			"manufacturer": "plymouth",
			"mpg": "39",
			"cylinders": 4,
			"displacement": 86,
			"horsepower": "64",
			"weight": 1875,
			"acceleration": 16.4,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "civic 1300",
			"manufacturer": "honda",
			"mpg": "35.1",
			"cylinders": 4,
			"displacement": 81,
			"horsepower": "60",
			"weight": 1760,
			"acceleration": 16.1,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "2",
			"manufacturer": "subaru",
			"mpg": "32.3",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "67",
			"weight": 2065,
			"acceleration": 17.8,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "210 mpg",
			"manufacturer": "datsun",
			"mpg": "37",
			"cylinders": 4,
			"displacement": 85,
			"horsepower": "65",
			"weight": 1975,
			"acceleration": 19.4,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "tercel",
			"manufacturer": "toyota",
			"mpg": "37.7",
			"cylinders": 4,
			"displacement": 89,
			"horsepower": "62",
			"weight": 2050,
			"acceleration": 17.3,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "glc 4",
			"manufacturer": "mazda",
			"mpg": "34.1",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "68",
			"weight": 1985,
			"acceleration": 16,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "horizon 4",
			"manufacturer": "plymouth",
			"mpg": "34.7",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "63",
			"weight": 2215,
			"acceleration": 14.9,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "escort 4w",
			"manufacturer": "ford",
			"mpg": "34.4",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "65",
			"weight": 2045,
			"acceleration": 16.2,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "escort 2h",
			"manufacturer": "ford",
			"mpg": "29.9",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "65",
			"weight": 2380,
			"acceleration": 20.7,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "jetta",
			"manufacturer": "vw",
			"mpg": "33",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "74",
			"weight": 2190,
			"acceleration": 14.2,
			"modelYear": 81,
			"origin": "European"
		},
		{
			"car": "18i",
			"manufacturer": "renault",
			"mpg": "34.5",
			"cylinders": 4,
			"displacement": 100,
			"horsepower": "NA",
			"weight": 2320,
			"acceleration": 15.8,
			"modelYear": 81,
			"origin": "European"
		},
		{
			"car": "prelude",
			"manufacturer": "honda",
			"mpg": "33.7",
			"cylinders": 4,
			"displacement": 107,
			"horsepower": "75",
			"weight": 2210,
			"acceleration": 14.4,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "corolla",
			"manufacturer": "toyota",
			"mpg": "32.4",
			"cylinders": 4,
			"displacement": 108,
			"horsepower": "75",
			"weight": 2350,
			"acceleration": 16.8,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "200sx",
			"manufacturer": "datsun",
			"mpg": "32.9",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "100",
			"weight": 2615,
			"acceleration": 14.8,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "626",
			"manufacturer": "mazda",
			"mpg": "31.6",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "74",
			"weight": 2635,
			"acceleration": 18.3,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "505s turbo diesel",
			"manufacturer": "peugeot",
			"mpg": "28.1",
			"cylinders": 4,
			"displacement": 141,
			"horsepower": "80",
			"weight": 3230,
			"acceleration": 20.4,
			"modelYear": 81,
			"origin": "European"
		},
		{
			"car": "900s",
			"manufacturer": "saab",
			"mpg": "NA",
			"cylinders": 4,
			"displacement": 121,
			"horsepower": "110",
			"weight": 2800,
			"acceleration": 15.4,
			"modelYear": 81,
			"origin": "European"
		},
		{
			"car": "diesel",
			"manufacturer": "volvo",
			"mpg": "30.7",
			"cylinders": 6,
			"displacement": 145,
			"horsepower": "76",
			"weight": 3160,
			"acceleration": 19.6,
			"modelYear": 81,
			"origin": "European"
		},
		{
			"car": "cressida",
			"manufacturer": "toyota",
			"mpg": "25.4",
			"cylinders": 6,
			"displacement": 168,
			"horsepower": "116",
			"weight": 2900,
			"acceleration": 12.6,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "810 maxima",
			"manufacturer": "datsun",
			"mpg": "24.2",
			"cylinders": 6,
			"displacement": 146,
			"horsepower": "120",
			"weight": 2930,
			"acceleration": 13.8,
			"modelYear": 81,
			"origin": "Japanese"
		},
		{
			"car": "century",
			"manufacturer": "buick",
			"mpg": "22.4",
			"cylinders": 6,
			"displacement": 231,
			"horsepower": "110",
			"weight": 3415,
			"acceleration": 15.8,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "cutlass ls",
			"manufacturer": "oldsmobile",
			"mpg": "26.6",
			"cylinders": 8,
			"displacement": 350,
			"horsepower": "105",
			"weight": 3725,
			"acceleration": 19,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "granada gl",
			"manufacturer": "ford",
			"mpg": "20.2",
			"cylinders": 6,
			"displacement": 200,
			"horsepower": "88",
			"weight": 3060,
			"acceleration": 17.1,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "lebaron salon",
			"manufacturer": "chrysler",
			"mpg": "17.6",
			"cylinders": 6,
			"displacement": 225,
			"horsepower": "85",
			"weight": 3465,
			"acceleration": 16.6,
			"modelYear": 81,
			"origin": "American"
		},
		{
			"car": "cavalier",
			"manufacturer": "chevrolet",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 112,
			"horsepower": "88",
			"weight": 2605,
			"acceleration": 19.6,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "cavalier wagon",
			"manufacturer": "chevrolet",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 112,
			"horsepower": "88",
			"weight": 2640,
			"acceleration": 18.6,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "cavalier 2-door",
			"manufacturer": "chevrolet",
			"mpg": "34",
			"cylinders": 4,
			"displacement": 112,
			"horsepower": "88",
			"weight": 2395,
			"acceleration": 18,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "j2000 se hatchback",
			"manufacturer": "pontiac",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 112,
			"horsepower": "85",
			"weight": 2575,
			"acceleration": 16.2,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "aries se",
			"manufacturer": "dodge",
			"mpg": "29",
			"cylinders": 4,
			"displacement": 135,
			"horsepower": "84",
			"weight": 2525,
			"acceleration": 16,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "phoenix",
			"manufacturer": "pontiac",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 2735,
			"acceleration": 18,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "fairmont futura",
			"manufacturer": "ford",
			"mpg": "24",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "92",
			"weight": 2865,
			"acceleration": 16.4,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "concord dl",
			"manufacturer": "amc",
			"mpg": "23",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "NA",
			"weight": 3035,
			"acceleration": 20.5,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "rabbit l",
			"manufacturer": "vw",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "74",
			"weight": 1980,
			"acceleration": 15.3,
			"modelYear": 82,
			"origin": "European"
		},
		{
			"car": "glc custom l",
			"manufacturer": "mazda",
			"mpg": "37",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "68",
			"weight": 2025,
			"acceleration": 18.2,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "glc custom",
			"manufacturer": "mazda",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "68",
			"weight": 1970,
			"acceleration": 17.6,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "horizon miser",
			"manufacturer": "plymouth",
			"mpg": "38",
			"cylinders": 4,
			"displacement": 105,
			"horsepower": "63",
			"weight": 2125,
			"acceleration": 14.7,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "lynx l",
			"manufacturer": "mercury",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 98,
			"horsepower": "70",
			"weight": 2125,
			"acceleration": 17.3,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "stanza xe",
			"manufacturer": "nissan",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "88",
			"weight": 2160,
			"acceleration": 14.5,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "accord",
			"manufacturer": "honda",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 107,
			"horsepower": "75",
			"weight": 2205,
			"acceleration": 14.5,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "corolla",
			"manufacturer": "toyota",
			"mpg": "34",
			"cylinders": 4,
			"displacement": 108,
			"horsepower": "70",
			"weight": 2245,
			"acceleration": 16.9,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "civic",
			"manufacturer": "honda",
			"mpg": "38",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "67",
			"weight": 1965,
			"acceleration": 15,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "civic (auto)",
			"manufacturer": "honda",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "67",
			"weight": 1965,
			"acceleration": 15.7,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "310 gx",
			"manufacturer": "datsun",
			"mpg": "38",
			"cylinders": 4,
			"displacement": 91,
			"horsepower": "67",
			"weight": 1995,
			"acceleration": 16.2,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "century limited",
			"manufacturer": "buick",
			"mpg": "25",
			"cylinders": 6,
			"displacement": 181,
			"horsepower": "110",
			"weight": 2945,
			"acceleration": 16.4,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "cutlass ciera (diesel)",
			"manufacturer": "oldsmobile",
			"mpg": "38",
			"cylinders": 6,
			"displacement": 262,
			"horsepower": "85",
			"weight": 3015,
			"acceleration": 17,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "lebaron medallion",
			"manufacturer": "chrysler",
			"mpg": "26",
			"cylinders": 4,
			"displacement": 156,
			"horsepower": "92",
			"weight": 2585,
			"acceleration": 14.5,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "granada l",
			"manufacturer": "ford",
			"mpg": "22",
			"cylinders": 6,
			"displacement": 232,
			"horsepower": "112",
			"weight": 2835,
			"acceleration": 14.7,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "celica gt",
			"manufacturer": "toyota",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 144,
			"horsepower": "96",
			"weight": 2665,
			"acceleration": 13.9,
			"modelYear": 82,
			"origin": "Japanese"
		},
		{
			"car": "charger 2.2",
			"manufacturer": "dodge",
			"mpg": "36",
			"cylinders": 4,
			"displacement": 135,
			"horsepower": "84",
			"weight": 2370,
			"acceleration": 13,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "camaro",
			"manufacturer": "chevrolet",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 151,
			"horsepower": "90",
			"weight": 2950,
			"acceleration": 17.3,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "mustang gl",
			"manufacturer": "ford",
			"mpg": "27",
			"cylinders": 4,
			"displacement": 140,
			"horsepower": "86",
			"weight": 2790,
			"acceleration": 15.6,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "pickup",
			"manufacturer": "vw",
			"mpg": "44",
			"cylinders": 4,
			"displacement": 97,
			"horsepower": "52",
			"weight": 2130,
			"acceleration": 24.6,
			"modelYear": 82,
			"origin": "European"
		},
		{
			"car": "rampage",
			"manufacturer": "dodge",
			"mpg": "32",
			"cylinders": 4,
			"displacement": 135,
			"horsepower": "84",
			"weight": 2295,
			"acceleration": 11.6,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "ranger",
			"manufacturer": "ford",
			"mpg": "28",
			"cylinders": 4,
			"displacement": 120,
			"horsepower": "79",
			"weight": 2625,
			"acceleration": 18.6,
			"modelYear": 82,
			"origin": "American"
		},
		{
			"car": "s-10",
			"manufacturer": "chevrolet",
			"mpg": "31",
			"cylinders": 4,
			"displacement": 119,
			"horsepower": "82",
			"weight": 2720,
			"acceleration": 19.4,
			"modelYear": 82,
			"origin": "American"
		}
	];

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(167);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host radar-chart {\n  width: 660px;\n  height: 400px; }\n\n:host .legend {\n  margin: 20px 0; }\n  :host .legend .entry {\n    display: inline-block; }\n    :host .legend .entry:not(:last-child) {\n      border-right: 1px solid #ccc;\n      padding-right: 7px;\n      margin-right: 5px; }\n\n:host .country-color-dot {\n  width: 10px;\n  height: 10px;\n  display: inline-block;\n  background: black;\n  border-radius: 50%; }\n\n:host .year-filter {\n  display: flex;\n  align-items: center; }\n  :host .year-filter label {\n    margin-right: 10px;\n    border-right: 1px solid #ccc;\n    padding-right: 10px; }\n  :host .year-filter range-slider {\n    flex-grow: 1; }\n\n:host table th {\n  cursor: pointer;\n  padding: 5px;\n  border-bottom: 1px solid #555; }\n\n:host table td {\n  padding: 10px 0;\n  border-bottom: 1px solid #efefef; }\n  :host table td span.maxVal {\n    font-weight: bold;\n    color: coral; }\n  :host table td span.minVal {\n    font-weight: bold;\n    color: darkcyan; }\n\n:host table tr:hover td {\n  background: #efefef; }\n", ""]);

	// exports


/***/ }),
/* 168 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <header>\n    <a routerLink=\"/dashboard\" class=\"btn btn-default\">Back</a>\n    <h1><i class=\"fa fa-flask\"></i> Multi Data Dimension Experiment</h1>\n  </header>\n\n  <section>\n    <tabs>\n      <tab title=\"All\">\n        <radar-chart [values]=\"radarChartCollection\" [labels]=\"radarChartLabels\"></radar-chart>\n      </tab>\n      <tab title=\"Compare Manufacturers\">\n\n        <data-per-manufacturer\n          [manufacturers]=\"manufacturers\"\n          [multiDataDimensionItems]=\"multiDataExperimentItems\"\n          [filterByYear]=\"yearFilter\">\n        </data-per-manufacturer>\n\n      </tab>\n    </tabs>\n  </section>\n\n  <section>\n    <div class=\"year-filter\">\n      <label>\n        <input type=\"checkbox\" [checked]=\"yearFilter != null\" (click)=\"toggleFilterByYear()\">\n        Filter by year\n      </label>\n      <range-slider\n        [min]=\"minYear\"\n        [max]=\"maxYear\"\n        [value]=\"yearFilter\"\n        [step]=\"1\"\n        (valueChange)=\"filterByYear($event)\"></range-slider>\n    </div>\n  </section>\n\n  <hr>\n\n  <section>\n    <div class=\"legend\">\n      <div class=\"entry\">\n        <span class=\"country-color-dot\" [style.background]=\"getColorForOrigin('European')\"></span>\n        European\n      </div>\n      <div class=\"entry\">\n        <span class=\"country-color-dot\" [style.background]=\"getColorForOrigin('American')\"></span>\n        American\n      </div>\n      <div class=\"entry\">\n        <span class=\"country-color-dot\" [style.background]=\"getColorForOrigin('Japanese')\"></span>\n        Japanese\n      </div>\n      <div class=\"entry\">\n        <span class=\"country-color-dot\"></span>\n        Average\n      </div>\n      <div class=\"entry\" [style.color]=\"'darkcyan'\">\n        Low Values\n      </div>\n      <div class=\"entry\" [style.color]=\"'coral'\">\n        High Values\n      </div>\n    </div>\n\n    <table>\n      <tr>\n        <th width=\"1%\"></th>\n        <th width=\"4%\" (click)=\"multiDataExperimentItems.toggleSort('origin')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('origin')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('origin')\" class=\"fa fa-sort-desc\"></span>\n          <span class=\"fa fa-globe\"></span>\n        </th>\n        <th width=\"9%\" (click)=\"multiDataExperimentItems.toggleSort('car')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('car')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('car')\" class=\"fa fa-sort-desc\"></span>\n          Name\n        </th>\n        <th width=\"9%\" (click)=\"multiDataExperimentItems.toggleSort('manufacturer')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('manufacturer')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('manufacturer')\" class=\"fa fa-sort-desc\"></span>\n          Manufacturer\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('mpg')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('mpg')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('mpg')\" class=\"fa fa-sort-desc\"></span>\n          MPG\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('cylinders')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('cylinders')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('cylinders')\" class=\"fa fa-sort-desc\"></span>\n          cylinders\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('displacement')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('displacement')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('displacement')\" class=\"fa fa-sort-desc\"></span>\n          displacement\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('horsepower')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('horsepower')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('horsepower')\" class=\"fa fa-sort-desc\"></span>\n          horsepower\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('weight')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('weight')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('weight')\" class=\"fa fa-sort-desc\"></span>\n          weight\n        </th>\n        <th width=\"10%\" (click)=\"multiDataExperimentItems.toggleSort('acceleration')\">\n          <span *ngIf=\"multiDataExperimentItems.isAscSorted('acceleration')\" class=\"fa fa-sort-asc\"></span>\n          <span *ngIf=\"multiDataExperimentItems.isDescSorted('acceleration')\" class=\"fa fa-sort-desc\"></span>\n          acceleration\n        </th>\n      </tr>\n      <tr *ngFor=\"let model of multiDataExperimentItems.models\"\n          [hidden]=\"yearFilter && model.get('modelYear') !== yearFilter\"\n          (click)=\"model.selectable.toggleSelect()\">\n        <td>\n          <input type=\"checkbox\"\n                 [disabled]=\"model.selectable.isDisabled()\"\n                 [checked]=\"model.selectable.isSelected()\">\n        </td>\n        <td style=\"text-align: center\">\n          <span class=\"country-color-dot\"\n                [style.background]=\"getColorForOrigin(model.get('origin'))\"></span>\n        </td>\n        <td>{{model.get('car')}}</td>\n        <td>{{model.get('manufacturer')}}</td>\n        <td>\n          <span [class.maxVal]=\"model.getPercentage('mpg')>70\"\n                [class.mediumVal]=\"model.getPercentage('mpg')>=30 && model.getPercentage('mpg')<=70\"\n                [class.minVal]=\"model.getPercentage('mpg')<30\">\n            {{model.get('mpg')}}\n          </span>\n        </td>\n        <td>\n          <span [class.maxVal]=\"model.getPercentage('cylinders')>70\"\n                [class.mediumVal]=\"model.getPercentage('cylinders')>=30 && model.getPercentage('cylinders')<=70\"\n                [class.minVal]=\"model.getPercentage('cylinders')<30\">\n            {{model.get('cylinders')}}\n          </span>\n        </td>\n        <td>\n           <span [class.maxVal]=\"model.getPercentage('displacement')>70\"\n                 [class.mediumVal]=\"model.getPercentage('displacement')>=30 && model.getPercentage('displacement')<=70\"\n                 [class.minVal]=\"model.getPercentage('displacement')<30\">\n            {{model.get('displacement')}}\n          </span>\n        </td>\n        <td>\n           <span [class.maxVal]=\"model.getPercentage('horsepower')>70\"\n                 [class.mediumVal]=\"model.getPercentage('horsepower')>=30 && model.getPercentage('horsepower')<=70\"\n                 [class.minVal]=\"model.getPercentage('horsepower')<30\">\n            {{model.get('horsepower')}}\n          </span>\n        </td>\n        <td>\n           <span [class.maxVal]=\"model.getPercentage('weight')>80\"\n                 [class.mediumVal]=\"model.getPercentage('weight')>=40 && model.getPercentage('weight')<=80\"\n                 [class.minVal]=\"model.getPercentage('weight')<40\">\n            {{model.get('weight')}}\n          </span>\n        </td>\n        <td>\n           <span [class.maxVal]=\"model.getPercentage('acceleration')>70\"\n                 [class.mediumVal]=\"model.getPercentage('acceleration')>=30 && model.getPercentage('acceleration')<=70\"\n                 [class.minVal]=\"model.getPercentage('acceleration')<30\">\n            {{model.get('acceleration')}}\n          </span>\n        </td>\n      </tr>\n    </table>\n\n  </section>\n\n</section>\n";

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var RandomSizeDirective = (function () {
	    function RandomSizeDirective(el) {
	        this.el = el;
	    }
	    RandomSizeDirective.prototype.getRandomInt = function (min, max) {
	        min = Math.ceil(min);
	        max = Math.floor(max);
	        return Math.floor(Math.random() * (max - min)) + min;
	    };
	    RandomSizeDirective.prototype.getRandomCircleSize = function (orgSize) {
	        var percent = (this.getRandomInt(1, 10)) * 10;
	        return orgSize * (1 + (percent / 100));
	    };
	    RandomSizeDirective.prototype.setSize = function () {
	        var randomSize = this.getRandomCircleSize(this.orgSize);
	        this.el.nativeElement.style.width = randomSize + "px";
	        this.el.nativeElement.style.height = randomSize + "px";
	        this.size = randomSize;
	    };
	    RandomSizeDirective.prototype.ngOnInit = function () {
	        this.setSize();
	    };
	    return RandomSizeDirective;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RandomSizeDirective.prototype, "orgSize", void 0);
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Number)
	], RandomSizeDirective.prototype, "size", void 0);
	RandomSizeDirective = __decorate([
	    core_1.Directive({
	        selector: '[randomSize]'
	    }),
	    __metadata("design:paramtypes", [core_1.ElementRef])
	], RandomSizeDirective);
	exports.RandomSizeDirective = RandomSizeDirective;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var platform_browser_1 = __webpack_require__(21);
	var forms_1 = __webpack_require__(62);
	var range_slider_component_1 = __webpack_require__(171);
	var wizard_component_1 = __webpack_require__(117);
	var wizard_entry_component_1 = __webpack_require__(175);
	var deviation_chart_component_1 = __webpack_require__(179);
	var random_element_placing_component_1 = __webpack_require__(137);
	var perception_chart_component_1 = __webpack_require__(183);
	var radar_chart_component_1 = __webpack_require__(187);
	var tabs_component_1 = __webpack_require__(191);
	var tab_component_1 = __webpack_require__(195);
	var SharedModule = (function () {
	    function SharedModule() {
	    }
	    return SharedModule;
	}());
	SharedModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule
	        ],
	        declarations: [
	            deviation_chart_component_1.DeviationChartComponent,
	            perception_chart_component_1.PerceptionChartComponent,
	            radar_chart_component_1.RadarChartComponent,
	            range_slider_component_1.RangeSliderComponent,
	            wizard_component_1.WizardComponent,
	            wizard_entry_component_1.WizardEntryComponent,
	            tabs_component_1.TabsComponent,
	            tab_component_1.TabComponent,
	            random_element_placing_component_1.RandomElementPlacingComponent
	        ],
	        exports: [
	            deviation_chart_component_1.DeviationChartComponent,
	            perception_chart_component_1.PerceptionChartComponent,
	            radar_chart_component_1.RadarChartComponent,
	            range_slider_component_1.RangeSliderComponent,
	            wizard_component_1.WizardComponent,
	            wizard_entry_component_1.WizardEntryComponent,
	            tabs_component_1.TabsComponent,
	            tab_component_1.TabComponent,
	            random_element_placing_component_1.RandomElementPlacingComponent
	        ]
	    })
	], SharedModule);
	exports.SharedModule = SharedModule;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var RangeSliderComponent = (function () {
	    function RangeSliderComponent(el) {
	        this.el = el;
	        this.tmpVal = 0;
	        this.val = 0;
	        this.minVal = 0;
	        this.maxVal = 0;
	        this.stepVal = 0.1;
	        this.showLoadingSpinner = false;
	        this.dragInProgress = false;
	        this.dragDisplayValue = 0;
	        this.draggerWidth = 0;
	        this.valueChange = new core_1.EventEmitter();
	        this.valueChanged = new core_1.EventEmitter();
	    }
	    Object.defineProperty(RangeSliderComponent.prototype, "tmpValue", {
	        get: function () {
	            return this.tmpVal;
	        },
	        set: function (val) {
	            this.tmpVal = val;
	            this.setDragPosFromVal();
	            this.dragDisplayValue = this.getDisplayValue(val);
	            this.valueChange.emit(val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeSliderComponent.prototype, "value", {
	        get: function () {
	            return this.val;
	        },
	        set: function (val) {
	            if (!this.dragInProgress) {
	                this.val = val;
	                this.tmpValue = val;
	                this.setDragPosFromVal();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeSliderComponent.prototype, "max", {
	        get: function () {
	            return this.maxVal;
	        },
	        set: function (val) {
	            if (val) {
	                this.maxVal = val;
	                this.setDragPosFromVal();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeSliderComponent.prototype, "min", {
	        get: function () {
	            return this.minVal;
	        },
	        set: function (val) {
	            if (val) {
	                this.minVal = val;
	                this.setDragPosFromVal();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeSliderComponent.prototype, "step", {
	        get: function () {
	            return this.stepVal;
	        },
	        set: function (val) {
	            if (val) {
	                this.stepVal = val;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeSliderComponent.prototype, "isLoading", {
	        get: function () {
	            return this.showLoadingSpinner;
	        },
	        set: function (val) {
	            this.showLoadingSpinner = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RangeSliderComponent.prototype.getDisplayValue = function (value) {
	        if (value && typeof this.transformDisplayValue === "function") {
	            return this.transformDisplayValue(value);
	        }
	        else {
	            return value;
	        }
	    };
	    RangeSliderComponent.prototype.setDragPosFromVal = function () {
	        var pos = 0;
	        if (this.tmpVal) {
	            pos = (((this.tmpVal - this.min) / (this.max - this.min)) * 100);
	        }
	        this.handle.nativeElement.style.left = pos + '%';
	        this.handle.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * pos) + 'px)';
	        this.progressBarLine.nativeElement.style.width = pos + '%';
	    };
	    RangeSliderComponent.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        this.el.nativeElement.addEventListener('mousedown', function () {
	            _this.draggerWidth = _this.handle.nativeElement.offsetWidth;
	            _this.dragInProgress = true;
	        });
	        this.el.nativeElement.addEventListener('mouseup', function () {
	            _this.dragInProgress = false;
	            _this.value = _this.tmpValue;
	            _this.valueChanged.emit(_this.value);
	        });
	        this.setDragPosFromVal();
	    };
	    ;
	    return RangeSliderComponent;
	}());
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Object)
	], RangeSliderComponent.prototype, "valueChange", void 0);
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Object)
	], RangeSliderComponent.prototype, "valueChanged", void 0);
	__decorate([
	    core_1.ViewChild('progressLine'),
	    __metadata("design:type", core_1.ElementRef)
	], RangeSliderComponent.prototype, "progressBarLine", void 0);
	__decorate([
	    core_1.ViewChild('progressBar'),
	    __metadata("design:type", core_1.ElementRef)
	], RangeSliderComponent.prototype, "progressBarBg", void 0);
	__decorate([
	    core_1.ViewChild('handle'),
	    __metadata("design:type", core_1.ElementRef)
	], RangeSliderComponent.prototype, "handle", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Function)
	], RangeSliderComponent.prototype, "transformDisplayValue", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean)
	], RangeSliderComponent.prototype, "hideSliderValue", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean)
	], RangeSliderComponent.prototype, "showCurrentValue", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number),
	    __metadata("design:paramtypes", [Number])
	], RangeSliderComponent.prototype, "value", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number),
	    __metadata("design:paramtypes", [Number])
	], RangeSliderComponent.prototype, "max", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number),
	    __metadata("design:paramtypes", [Number])
	], RangeSliderComponent.prototype, "min", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number),
	    __metadata("design:paramtypes", [Number])
	], RangeSliderComponent.prototype, "step", null);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Boolean),
	    __metadata("design:paramtypes", [Boolean])
	], RangeSliderComponent.prototype, "isLoading", null);
	RangeSliderComponent = __decorate([
	    core_1.Component({
	        selector: 'range-slider',
	        styles: [__webpack_require__(172)],
	        template: __webpack_require__(174)
	    }),
	    __metadata("design:paramtypes", [core_1.ElementRef])
	], RangeSliderComponent);
	exports.RangeSliderComponent = RangeSliderComponent;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(173);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ".range-slider-component {\n  position: relative;\n  margin: 10px 0;\n  display: flex;\n  align-items: center; }\n  .range-slider-component .min-value {\n    margin-right: 5px; }\n  .range-slider-component .progress-bar {\n    width: 100%;\n    background: #ccc;\n    position: relative;\n    height: 5px;\n    border-radius: 5px;\n    flex-grow: 1;\n    box-shadow: none; }\n    .range-slider-component .progress-bar .progress-line {\n      width: 0;\n      background: #1F8A70;\n      position: absolute;\n      left: 0;\n      top: 0;\n      height: 100%;\n      border-radius: 5px; }\n    .range-slider-component .progress-bar .visible-dragger {\n      padding: 5px;\n      border-radius: 4px;\n      background: white;\n      position: absolute;\n      top: -14px;\n      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.46);\n      transition: border-radius 0.5s ease;\n      cursor: pointer;\n      cursor: -webkit-grab;\n      pointer-events: none;\n      z-index: 99999;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n      .range-slider-component .progress-bar .visible-dragger[hidden] {\n        display: none !important; }\n    .range-slider-component .progress-bar input[type=\"range\"] {\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-webkit-slider-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -webkit-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-moz-range-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -moz-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-ms-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: pointer; }\n  .range-slider-component .max-value {\n    margin-left: 5px; }\n  .range-slider-component:hover .progress-bar .visible-dragger, .range-slider-component.is-loading .progress-bar .visible-dragger, .range-slider-component.is-dragging .progress-bar .visible-dragger {\n    opacity: 1; }\n  .range-slider-component.is-loading .progress-bar .visible-dragger .loading-spinner {\n    display: block; }\n  .range-slider-component.is-dragging .progress-bar .visible-dragger .loading-spinner {\n    display: none; }\n\n.loading-spinner {\n  border: 0 solid #f70;\n  border-radius: 50%;\n  position: relative;\n  animation: loader-figure 1.15s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;\n  transform: translate(3px, 3px);\n  display: none; }\n\n@keyframes loader-figure {\n  0% {\n    width: 0;\n    height: 0;\n    left: 4px;\n    top: 4px;\n    background-color: #f70; }\n  29% {\n    background-color: #f70; }\n  30% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n    border-width: 4px;\n    opacity: 1; }\n  100% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    border-width: 0;\n    opacity: 0;\n    background-color: transparent; } }\n", ""]);

	// exports


/***/ }),
/* 174 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"range-slider-component\" [class.is-loading]=\"showLoadingSpinner\" [class.is-dragging]=\"dragInProgress\">\n  <div *ngIf=\"!hideSliderValue && min !== null\"\n       class=\"min-value\">\n    <span *ngIf=\"showCurrentValue\">\n      {{getDisplayValue(value)}}\n    </span>\n    <span *ngIf=\"!showCurrentValue\">\n      {{getDisplayValue(min)}}\n    </span>\n  </div>\n\n  <div #progressBar class=\"progress-bar\">\n    <div #progressLine class=\"progress-line\"></div>\n    <div #handle class=\"visible-dragger\" [class.display-value]=\"!hideSliderValue\" [hidden]=\"!value\">\n      <span>{{dragDisplayValue}}</span>\n      <div class=\"loading-spinner\"></div>\n    </div>\n    <input type=\"range\" [min]=\"min\" [max]=\"max\" [(ngModel)]=\"tmpValue\" [step]=\"step\">\n  </div>\n\n  <div *ngIf=\"!hideSliderValue && max !== null\"\n       class=\"max-value\">\n    {{getDisplayValue(max)}}\n  </div>\n</div>\n";

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var wizard_component_1 = __webpack_require__(117);
	var WizardEntryComponent = (function () {
	    function WizardEntryComponent(wizardComponent, el) {
	        this.wizardComponent = wizardComponent;
	        this.el = el;
	        this.opened = false;
	        this.height = 0;
	        this.width = 0;
	    }
	    WizardEntryComponent.prototype.ngOnInit = function () {
	        this.wizardComponent.addEntry(this);
	    };
	    WizardEntryComponent.prototype.open = function () {
	        this.opened = true;
	    };
	    WizardEntryComponent.prototype.close = function () {
	        this.opened = false;
	    };
	    return WizardEntryComponent;
	}());
	WizardEntryComponent = __decorate([
	    core_1.Component({
	        selector: 'wizard-entry',
	        styles: [__webpack_require__(176)],
	        template: __webpack_require__(178)
	    }),
	    __metadata("design:paramtypes", [wizard_component_1.WizardComponent, core_1.ElementRef])
	], WizardEntryComponent);
	exports.WizardEntryComponent = WizardEntryComponent;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(177);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ }),
/* 178 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"slide\" *ngIf=\"opened\">\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var underscore_1 = __webpack_require__(67);
	var DeviationChartComponent = (function () {
	    function DeviationChartComponent() {
	        this.results = [];
	        this.bars = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	        this.average = 0;
	    }
	    DeviationChartComponent.prototype.getPercentageVal = function (key) {
	        var existing = underscore_1.findWhere(this.results, { key: key });
	        if (existing && this.values.length > 0) {
	            return ((existing.amount / this.values.length) * 10);
	        }
	        else {
	            return 1;
	        }
	    };
	    DeviationChartComponent.prototype.hasHighlight = function () {
	        return underscore_1.isNumber(this.highlight);
	    };
	    DeviationChartComponent.prototype.setResults = function () {
	        var _this = this;
	        if (this.values.length > 0) {
	            this.results = [];
	            var total_1 = 0;
	            this.values.forEach(function (value) {
	                var existing = underscore_1.findWhere(_this.results, { key: value });
	                if (existing) {
	                    existing.amount++;
	                }
	                else {
	                    _this.results.push({
	                        key: value,
	                        amount: 1
	                    });
	                }
	                total_1 += value;
	            });
	            this.average = Math.round(total_1 / this.values.length * 100) / 100;
	        }
	    };
	    DeviationChartComponent.prototype.ngOnInit = function () {
	        this.setResults();
	    };
	    DeviationChartComponent.prototype.ngOnChanges = function () {
	        this.setResults();
	    };
	    return DeviationChartComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], DeviationChartComponent.prototype, "values", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], DeviationChartComponent.prototype, "highlight", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], DeviationChartComponent.prototype, "xLabel", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], DeviationChartComponent.prototype, "yLabel", void 0);
	DeviationChartComponent = __decorate([
	    core_1.Component({
	        selector: 'deviation-chart',
	        styles: [__webpack_require__(180)],
	        template: __webpack_require__(182)
	    })
	], DeviationChartComponent);
	exports.DeviationChartComponent = DeviationChartComponent;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(181);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host {\n  width: 600px;\n  padding: 20px 10px;\n  position: relative;\n  display: block;\n  height: 340px; }\n  :host .deviation-chart {\n    position: relative;\n    margin-left: 80px; }\n    :host .deviation-chart .x-axis {\n      position: relative;\n      width: 100%;\n      height: 200px;\n      z-index: 1; }\n      :host .deviation-chart .x-axis .background {\n        background: linear-gradient(to right, rgba(53, 234, 138, 0.6) 0%, rgba(242, 232, 55, 0.6) 51%, rgba(255, 93, 0, 0.6) 100%);\n        /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n        position: absolute;\n        width: 100%;\n        height: 5px;\n        bottom: 0%; }\n      :host .deviation-chart .x-axis .x {\n        position: absolute;\n        border-right: 1px solid #bbb;\n        left: 0;\n        top: -2px;\n        height: 100%; }\n        :host .deviation-chart .x-axis .x.res-10 {\n          width: 10%; }\n        :host .deviation-chart .x-axis .x.res-20 {\n          width: 20%; }\n        :host .deviation-chart .x-axis .x.res-30 {\n          width: 30%; }\n        :host .deviation-chart .x-axis .x.res-40 {\n          width: 40%; }\n        :host .deviation-chart .x-axis .x.res-50 {\n          width: 50%; }\n        :host .deviation-chart .x-axis .x.res-60 {\n          width: 60%; }\n        :host .deviation-chart .x-axis .x.res-70 {\n          width: 70%; }\n        :host .deviation-chart .x-axis .x.res-80 {\n          width: 80%; }\n        :host .deviation-chart .x-axis .x.res-90 {\n          width: 90%; }\n        :host .deviation-chart .x-axis .x.res-100 {\n          width: 100%; }\n        :host .deviation-chart .x-axis .x.hasValue {\n          border-color: #5bc0de; }\n        :host .deviation-chart .x-axis .x .x-label {\n          position: absolute;\n          right: -18px;\n          bottom: -30px; }\n      :host .deviation-chart .x-axis .result {\n        position: absolute;\n        height: 100%;\n        border-right: 4px solid #1F8A70;\n        bottom: 4px;\n        left: 2px; }\n      :host .deviation-chart .x-axis .average-marker {\n        border-right-color: #5bc0de;\n        left: 1px;\n        border-width: 2px; }\n        :host .deviation-chart .x-axis .average-marker .indicator-label {\n          color: #5bc0de; }\n      :host .deviation-chart .x-axis .highlight {\n        border-right-color: #5cb85c;\n        left: 1px;\n        border-width: 2px; }\n        :host .deviation-chart .x-axis .highlight .indicator-label {\n          color: #5cb85c; }\n      :host .deviation-chart .x-axis .indicator-label {\n        position: absolute;\n        top: -26px;\n        right: -11px;\n        border: 1px solid;\n        width: 20px;\n        height: 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        font-size: 11px; }\n      :host .deviation-chart .x-axis .axis-label {\n        transform: rotate(-90deg);\n        position: absolute;\n        left: -109px;\n        margin-top: 20%; }\n    :host .deviation-chart .y-axis {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: -5px; }\n      :host .deviation-chart .y-axis .y {\n        height: 10%;\n        border-top: 1px solid #bbb; }\n        :host .deviation-chart .y-axis .y.res-10 {\n          top: 10%; }\n        :host .deviation-chart .y-axis .y.res-20 {\n          top: 20%; }\n        :host .deviation-chart .y-axis .y.res-30 {\n          top: 30%; }\n        :host .deviation-chart .y-axis .y.res-40 {\n          top: 40%; }\n        :host .deviation-chart .y-axis .y.res-50 {\n          top: 50%; }\n        :host .deviation-chart .y-axis .y.res-60 {\n          top: 60%; }\n        :host .deviation-chart .y-axis .y.res-70 {\n          top: 70%; }\n        :host .deviation-chart .y-axis .y.res-80 {\n          top: 80%; }\n        :host .deviation-chart .y-axis .y.res-90 {\n          top: 90%; }\n        :host .deviation-chart .y-axis .y.res-100 {\n          top: 100%; }\n        :host .deviation-chart .y-axis .y .y-label {\n          display: block;\n          left: -45px;\n          position: absolute;\n          margin-top: -11px; }\n      :host .deviation-chart .y-axis .axis-label {\n        position: absolute;\n        bottom: -60px;\n        width: 100%;\n        text-align: center; }\n  :host .legend {\n    position: absolute;\n    left: 0;\n    bottom: 10px;\n    display: flex; }\n    :host .legend .label {\n      margin: 0 5px 0 15px; }\n", ""]);

	// exports


/***/ }),
/* 182 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"deviation-chart\">\n  <div class=\"x-axis\">\n    <div *ngFor=\"let num of bars\"\n         class=\"x res-{{num}}\">\n      <div class=\"x-label\">{{num}}%</div>\n    </div>\n\n    <div *ngFor=\"let result of results\"\n         class=\"result\"\n         [style.width]=\"result.key+'%'\"\n         [style.height]=\"getPercentageVal(result.key)*10+'%'\">\n    </div>\n\n    <div class=\"result average-marker\" [style.width]=\"this.average+'%'\">\n      <span class=\"indicator-label\">\n        <span class=\"fa fa-users\"></span>\n      </span>\n    </div>\n\n    <div *ngIf=\"hasHighlight()\" class=\"result highlight\" [style.width]=\"this.highlight+'%'\">\n      <span class=\"indicator-label\">\n        <span class=\"fa fa-user\"></span>\n      </span>\n    </div>\n\n    <div class=\"background\"></div>\n    <b class=\"axis-label y\">{{yLabel}}</b>\n  </div>\n\n  <div class=\"y-axis\">\n    <div *ngFor=\"let num of bars\"\n         class=\"y res-{{num}}\">\n      <div *ngIf=\"(num/10)%2 === 0\" class=\"y-label\">{{100-num}}%</div>\n    </div>\n\n    <b class=\"axis-label x\">{{xLabel}}</b>\n  </div>\n</div>\n\n<div class=\"legend\">\n    <span class=\"label label-info label-light\">\n      <span class=\"fa fa-users\"></span>\n    </span> = Average Deviation ({{this.average}}%/{{values.length}} participants)\n\n    <span *ngIf=\"hasHighlight()\">\n      <span class=\"label label-success label-light\">\n        <span class=\"fa fa-user\"></span>\n      </span> = Your guess\n    </span>\n</div>\n";

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var PerceptionChartComponent = (function () {
	    function PerceptionChartComponent() {
	        this.results = [];
	        this.xBars = [];
	        this.yBars = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	    }
	    PerceptionChartComponent.prototype.getPercentageValue = function (value) {
	        return (value / 1000) * 100;
	    };
	    PerceptionChartComponent.prototype.setResults = function () {
	        var _this = this;
	        if (this.values.length > 0) {
	            this.results = [];
	            var total = 0;
	            console.log(this.values);
	            this.values.forEach(function (value) {
	                _this.xBars.push(value.amount);
	                _this.results.push({ key: value.amount, value: value.time });
	            });
	        }
	    };
	    PerceptionChartComponent.prototype.ngOnInit = function () {
	        this.setResults();
	    };
	    PerceptionChartComponent.prototype.ngOnChanges = function () {
	        this.setResults();
	    };
	    return PerceptionChartComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], PerceptionChartComponent.prototype, "values", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], PerceptionChartComponent.prototype, "highlight", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], PerceptionChartComponent.prototype, "xLabel", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], PerceptionChartComponent.prototype, "yLabel", void 0);
	PerceptionChartComponent = __decorate([
	    core_1.Component({
	        selector: 'perception-chart',
	        styles: [__webpack_require__(184)],
	        template: __webpack_require__(186)
	    })
	], PerceptionChartComponent);
	exports.PerceptionChartComponent = PerceptionChartComponent;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(185);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host {\n  width: 600px;\n  padding: 20px 10px;\n  position: relative;\n  display: block;\n  height: 340px; }\n  :host .perception-chart {\n    position: relative;\n    margin-left: 80px; }\n    :host .perception-chart .x-axis {\n      position: relative;\n      width: 100%;\n      height: 200px;\n      z-index: 1; }\n      :host .perception-chart .x-axis .x {\n        position: absolute;\n        border-right: 1px solid #bbb;\n        left: 0;\n        top: -2px;\n        height: 100%; }\n        :host .perception-chart .x-axis .x.res-10 {\n          width: 10%; }\n        :host .perception-chart .x-axis .x.res-20 {\n          width: 20%; }\n        :host .perception-chart .x-axis .x.res-30 {\n          width: 30%; }\n        :host .perception-chart .x-axis .x.res-40 {\n          width: 40%; }\n        :host .perception-chart .x-axis .x.res-50 {\n          width: 50%; }\n        :host .perception-chart .x-axis .x.res-60 {\n          width: 60%; }\n        :host .perception-chart .x-axis .x.res-70 {\n          width: 70%; }\n        :host .perception-chart .x-axis .x.res-80 {\n          width: 80%; }\n        :host .perception-chart .x-axis .x.res-90 {\n          width: 90%; }\n        :host .perception-chart .x-axis .x.res-100 {\n          width: 100%; }\n        :host .perception-chart .x-axis .x.hasValue {\n          border-color: #5bc0de; }\n        :host .perception-chart .x-axis .x .x-label {\n          position: absolute;\n          right: -8px;\n          bottom: -30px; }\n      :host .perception-chart .x-axis .result {\n        position: absolute;\n        border-right: 4px solid #1F8A70;\n        left: 2px; }\n        :host .perception-chart .x-axis .result:after {\n          content: '';\n          position: absolute;\n          top: -7.5px;\n          right: -4px;\n          height: 5px;\n          width: 5px;\n          background: #1F8A70;\n          border-radius: 50%; }\n      :host .perception-chart .x-axis .axis-label {\n        transform: rotate(-90deg);\n        position: absolute;\n        left: -128px;\n        margin-top: 16%; }\n    :host .perception-chart .y-axis {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: -5px; }\n      :host .perception-chart .y-axis .y {\n        height: 10%;\n        border-top: 1px solid #bbb; }\n        :host .perception-chart .y-axis .y.res-10 {\n          top: 10%; }\n        :host .perception-chart .y-axis .y.res-20 {\n          top: 20%; }\n        :host .perception-chart .y-axis .y.res-30 {\n          top: 30%; }\n        :host .perception-chart .y-axis .y.res-40 {\n          top: 40%; }\n        :host .perception-chart .y-axis .y.res-50 {\n          top: 50%; }\n        :host .perception-chart .y-axis .y.res-60 {\n          top: 60%; }\n        :host .perception-chart .y-axis .y.res-70 {\n          top: 70%; }\n        :host .perception-chart .y-axis .y.res-80 {\n          top: 80%; }\n        :host .perception-chart .y-axis .y.res-90 {\n          top: 90%; }\n        :host .perception-chart .y-axis .y.res-100 {\n          top: 100%; }\n        :host .perception-chart .y-axis .y .y-label {\n          display: block;\n          left: -45px;\n          position: absolute;\n          margin-top: -11px; }\n      :host .perception-chart .y-axis .axis-label {\n        position: absolute;\n        bottom: -60px;\n        width: 100%;\n        text-align: center; }\n", ""]);

	// exports


/***/ }),
/* 186 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"perception-chart\">\n  <div class=\"x-axis\">\n    <div *ngFor=\"let num of xBars\"\n         class=\"x res-{{num}}\">\n      <div class=\"x-label\">{{num}}</div>\n    </div>\n\n    <div *ngFor=\"let result of results\"\n         class=\"result\"\n         [style.width]=\"result.key+'%'\"\n         [style.bottom]=\"getPercentageValue(result.value)+'%'\">\n    </div>\n\n    <div class=\"background\"></div>\n    <b class=\"axis-label y\">{{yLabel}}</b>\n  </div>\n\n  <div class=\"y-axis\">\n    <div *ngFor=\"let num of yBars\"\n         class=\"y res-{{num}}\">\n      <div *ngIf=\"(num/10)%2 === 0\" class=\"y-label\">{{1000-num*10}}ms</div>\n    </div>\n\n    <b class=\"axis-label x\">{{xLabel}}</b>\n  </div>\n</div>\n";

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var radar_chart_collection_1 = __webpack_require__(163);
	var underscore_1 = __webpack_require__(67);
	var RadarChartComponent = (function () {
	    function RadarChartComponent(el) {
	        this.el = el;
	        this.width = 660;
	        this.height = 400;
	    }
	    RadarChartComponent.prototype.multiplyMatrix = function (matrix1, matrix2) {
	        var x = matrix1[0] * matrix2[0][0] + matrix1[1] * matrix2[0][1];
	        var y = matrix1[0] * matrix2[1][0] + matrix1[1] * matrix2[1][1];
	        return [x, y];
	    };
	    RadarChartComponent.prototype.toRadians = function (angle) {
	        return angle * (Math.PI / 180);
	    };
	    RadarChartComponent.prototype.rotate2dMatrix = function (matrix, degree, point, clockwise) {
	        if (point === void 0) { point = [0, 0]; }
	        if (clockwise === void 0) { clockwise = true; }
	        var rotationMatrix;
	        var rad = this.toRadians(degree);
	        if (clockwise) {
	            rotationMatrix = [
	                [Math.cos(rad), Math.sin(rad)],
	                [Math.sin(rad) * -1, Math.cos(rad)]
	            ];
	        }
	        else {
	            rotationMatrix = [
	                [Math.cos(rad), Math.sin(rad) * -1],
	                [Math.sin(rad), Math.cos(rad)]
	            ];
	        }
	        var rotateAroundPointMatrix = [matrix[0] - point[0], matrix[1] - point[1]];
	        var rotatedMatrix = this.multiplyMatrix(rotateAroundPointMatrix, rotationMatrix);
	        return [rotatedMatrix[0] + point[0], rotatedMatrix[1] + point[1]];
	    };
	    RadarChartComponent.prototype.drawAxes = function (ctx) {
	        var axes = 6;
	        var axeWidth = this.axisWidth;
	        var labelMargin = 10;
	        for (var i = 0; i < axes; i++) {
	            var from = [this.canvasCenter[0], this.canvasCenter[1]];
	            var to = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - axeWidth], (360 / axes) * i, from, false);
	            ctx.strokeStyle = '#aaa';
	            ctx.lineWidth = 1;
	            ctx.beginPath();
	            ctx.moveTo(from[0], from[1]);
	            ctx.lineTo(Math.round(to[0]), Math.round(to[1]));
	            ctx.stroke();
	            var labelPos = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - (axeWidth + labelMargin)], (360 / axes) * i, from, false);
	            if (this.labels && this.labels[i]) {
	                ctx.textAlign = "center";
	                ctx.fillStyle = 'black';
	                ctx.fillText(this.labels[i], labelPos[0], labelPos[1]);
	            }
	        }
	    };
	    RadarChartComponent.prototype.drawData = function (ctx, data, color) {
	        if (color === void 0) { color = 'black'; }
	        var axes = 6;
	        var axeWidth = this.axisWidth;
	        ctx.lineWidth = 2;
	        ctx.strokeStyle = color;
	        ctx.fillStyle = 'transparent';
	        ctx.beginPath();
	        for (var i = 0; i < axes; i++) {
	            var normalizedData = (axeWidth / 100) * data[i];
	            var from = [this.canvasCenter[0], this.canvasCenter[1]];
	            var to = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - normalizedData], (360 / axes) * i, from, false);
	            if (i === 0) {
	                ctx.moveTo(to[0], to[1]);
	            }
	            else {
	                ctx.lineTo(to[0], to[1]);
	            }
	        }
	        ctx.closePath();
	        ctx.stroke();
	        ctx.fill();
	    };
	    RadarChartComponent.prototype.draw = function () {
	        var _this = this;
	        this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	        this.drawAxes(this.canvasContext);
	        this.values.each(function (value) {
	            _this.drawData(_this.canvasContext, value.get('data'), value.get('color'));
	        });
	        if (this.values.length > 1) {
	            this.drawData(this.canvasContext, this.values.getAverage(), 'black');
	        }
	    };
	    RadarChartComponent.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        var canvas = this.radarChartCanvas.nativeElement;
	        var throttledDraw = underscore_1.debounce(function () {
	            _this.draw();
	        }, 100);
	        this.values.on('update reset', throttledDraw, this);
	        this.canvasWidth = this.width;
	        this.canvasHeight = this.height;
	        this.axisWidth = (Math.min(this.canvasWidth, this.canvasHeight) / 2) - 20;
	        this.canvasCenter = [this.canvasWidth / 2, this.canvasHeight / 2];
	        this.canvasContext = canvas.getContext('2d');
	        this.draw();
	    };
	    return RadarChartComponent;
	}());
	__decorate([
	    core_1.ViewChild('radarChart'),
	    __metadata("design:type", core_1.ElementRef)
	], RadarChartComponent.prototype, "radarChartCanvas", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", radar_chart_collection_1.RadarChartCollection)
	], RadarChartComponent.prototype, "values", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Array)
	], RadarChartComponent.prototype, "labels", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RadarChartComponent.prototype, "width", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], RadarChartComponent.prototype, "height", void 0);
	RadarChartComponent = __decorate([
	    core_1.Component({
	        selector: 'radar-chart',
	        styles: [__webpack_require__(188)],
	        template: __webpack_require__(190)
	    }),
	    __metadata("design:paramtypes", [core_1.ElementRef])
	], RadarChartComponent);
	exports.RadarChartComponent = RadarChartComponent;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(189);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ }),
/* 190 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"radar-chart\">\n  <canvas #radarChart style=\"width: 100%; height: 100%\" [width]=\"width\" [height]=\"height\"></canvas>\n</div>\n";

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var TabsComponent = (function () {
	    function TabsComponent() {
	        this.tabs = [];
	        this.opened = new core_1.EventEmitter();
	    }
	    TabsComponent.prototype.ngOnInit = function () {
	    };
	    TabsComponent.prototype.addEntry = function (tab) {
	        if (this.tabs.length === 0) {
	            this.openTab(tab);
	        }
	        this.tabs.push(tab);
	    };
	    TabsComponent.prototype.openTab = function (tab) {
	        this.tabs.forEach(function (tab) {
	            tab.close();
	        });
	        tab.open();
	    };
	    return TabsComponent;
	}());
	__decorate([
	    core_1.Output(),
	    __metadata("design:type", Object)
	], TabsComponent.prototype, "opened", void 0);
	TabsComponent = __decorate([
	    core_1.Component({
	        moduleId: module.id.toString(),
	        selector: 'tabs',
	        styles: [__webpack_require__(192)],
	        template: __webpack_require__(194)
	    }),
	    __metadata("design:paramtypes", [])
	], TabsComponent);
	exports.TabsComponent = TabsComponent;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(193);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .tabs-bar {\n  display: flex;\n  align-items: stretch;\n  border-bottom: 1px solid #ccc;\n  margin-bottom: 15px; }\n  :host .tabs-bar .tab {\n    flex-grow: 1;\n    padding: 5px;\n    text-align: center;\n    cursor: pointer; }\n    :host .tabs-bar .tab:not(:last-child) {\n      border-right: 1px solid #ccc; }\n    :host .tabs-bar .tab.opened {\n      border: 1px solid #ccc;\n      border-bottom: none; }\n      :host .tabs-bar .tab.opened:not(:first-child) {\n        border-left: none; }\n", ""]);

	// exports


/***/ }),
/* 194 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"tabs\">\n  <div class=\"tabs-bar\">\n    <div *ngFor=\"let tab of tabs\"\n         class=\"tab\"\n         [class.opened]=\"tab.isOpened()\"\n         (click)=\"openTab(tab)\">\n      {{tab.title}}\n    </div>\n  </div>\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var tabs_component_1 = __webpack_require__(191);
	var TabComponent = (function () {
	    function TabComponent(tabsComponent, el) {
	        this.tabsComponent = tabsComponent;
	        this.el = el;
	        this.opened = false;
	    }
	    TabComponent.prototype.ngOnInit = function () {
	        this.tabsComponent.addEntry(this);
	    };
	    TabComponent.prototype.isOpened = function () {
	        return this.opened;
	    };
	    TabComponent.prototype.open = function () {
	        this.opened = true;
	    };
	    TabComponent.prototype.close = function () {
	        this.opened = false;
	    };
	    return TabComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", String)
	], TabComponent.prototype, "title", void 0);
	TabComponent = __decorate([
	    core_1.Component({
	        selector: 'tab',
	        styles: [__webpack_require__(196)],
	        template: __webpack_require__(198)
	    }),
	    __metadata("design:paramtypes", [tabs_component_1.TabsComponent, core_1.ElementRef])
	], TabComponent);
	exports.TabComponent = TabComponent;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(197);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 197 */
177,
/* 198 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"tab\" *ngIf=\"opened\">\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var core_1 = __webpack_require__(3);
	var radar_chart_collection_1 = __webpack_require__(163);
	var visualisation_collection_1 = __webpack_require__(132);
	var multi_data_experiment_items_collection_1 = __webpack_require__(161);
	var radar_chart_model_1 = __webpack_require__(164);
	var underscore_1 = __webpack_require__(67);
	var DataPerManufacturerComponent = (function () {
	    function DataPerManufacturerComponent(radarChartCollection, el) {
	        this.radarChartCollection = radarChartCollection;
	        this.el = el;
	        this.elIsVisible = false;
	        this.radarChartLabels = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration'];
	    }
	    DataPerManufacturerComponent.prototype.setRadarChartCollectionPerManufacturer = function () {
	        var _this = this;
	        this.getManufacturers().each(function (manufacturer) {
	            var radarChartData = _this.getRadarChartCollection(_this.filterByYear, manufacturer.get('id'));
	            if (manufacturer.get('radarChartData')) {
	                manufacturer.get('radarChartData').reset(radarChartData.toJSON());
	            }
	            else {
	                manufacturer.set('radarChartData', radarChartData);
	            }
	        });
	    };
	    DataPerManufacturerComponent.prototype.getRadarChartCollection = function (yearFilter, manufacturer) {
	        var collection = this.multiDataDimensionItems;
	        var radarChartCollection = new radar_chart_collection_1.RadarChartCollection();
	        var items;
	        if (yearFilter) {
	            items = collection.where({
	                modelYear: yearFilter,
	                manufacturer: manufacturer
	            });
	        }
	        else {
	            items = collection.where({
	                manufacturer: manufacturer
	            });
	        }
	        items.forEach(function (item) {
	            var radarChartModel = new radar_chart_model_1.RadarChartModel({
	                color: item.getColor(),
	                data: [
	                    item.getPercentage('mpg'),
	                    item.getPercentage('cylinders'),
	                    item.getPercentage('displacement'),
	                    item.getPercentage('horsepower'),
	                    item.getPercentage('weight'),
	                    item.getPercentage('acceleration')
	                ]
	            });
	            radarChartCollection.add(radarChartModel);
	        });
	        return radarChartCollection;
	    };
	    DataPerManufacturerComponent.prototype.getPanelWidth = function () {
	        var manuSize = this.getManufacturers().length;
	        if (manuSize < 3) {
	            return 'col-md-6';
	        }
	        else {
	            return 'col-md-4';
	        }
	    };
	    DataPerManufacturerComponent.prototype.getManufacturers = function () {
	        if (this.manufacturers.selectable.getSelected().length > 0) {
	            return this.manufacturers.selectable.getSelected();
	        }
	        else {
	            return this.manufacturers;
	        }
	    };
	    DataPerManufacturerComponent.prototype.ngOnInit = function () {
	        this.setRadarChartCollectionPerManufacturer();
	    };
	    DataPerManufacturerComponent.prototype.ngOnChanges = function (changes) {
	        if (underscore_1.has(changes, 'filterByYear')) {
	            this.setRadarChartCollectionPerManufacturer();
	        }
	    };
	    DataPerManufacturerComponent.prototype.ngAfterViewChecked = function () {
	        // let wasVisible = this.elIsVisible;
	        // this.elIsVisible = !!this.el.nativeElement.offsetParent;
	        // if (!wasVisible && this.elIsVisible) {
	        //   this.ngOnInit();
	        // }
	    };
	    return DataPerManufacturerComponent;
	}());
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", visualisation_collection_1.VisualisationCollection)
	], DataPerManufacturerComponent.prototype, "manufacturers", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", multi_data_experiment_items_collection_1.MultiDataExperimentItems)
	], DataPerManufacturerComponent.prototype, "multiDataDimensionItems", void 0);
	__decorate([
	    core_1.Input(),
	    __metadata("design:type", Number)
	], DataPerManufacturerComponent.prototype, "filterByYear", void 0);
	DataPerManufacturerComponent = __decorate([
	    core_1.Component({
	        selector: 'data-per-manufacturer',
	        styles: [__webpack_require__(200)],
	        template: __webpack_require__(202),
	        providers: [radar_chart_collection_1.RadarChartCollection]
	    }),
	    __metadata("design:paramtypes", [radar_chart_collection_1.RadarChartCollection, core_1.ElementRef])
	], DataPerManufacturerComponent);
	exports.DataPerManufacturerComponent = DataPerManufacturerComponent;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(201);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports


	// module
	exports.push([module.id, ":host .manufacturer-selector {\n  margin-bottom: 15px; }\n  :host .manufacturer-selector .label {\n    display: inline-block;\n    cursor: pointer;\n    text-transform: capitalize; }\n\n:host .entry-panel {\n  margin-bottom: 20px;\n  border: 1px solid #efefef;\n  border-radius: 5px; }\n  :host .entry-panel .chart {\n    padding: 5px; }\n  :host .entry-panel .manufacturer {\n    padding: 5px 10px;\n    background: #efefef;\n    color: #1F8A70;\n    text-transform: capitalize;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    border-bottom-left-radius: 5px; }\n", ""]);

	// exports


/***/ }),
/* 202 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"data-per-manufacturer\">\n\n  <div class=\"manufacturer-selector row\">\n    <div class=\"col-md-12\">\n      Select the manufacturers that you want to compare\n      <br>\n    </div>\n    <div class=\"col-md-12\">\n      <div *ngFor=\"let manufacturer of manufacturers.models\"\n           class=\"label {{manufacturer.selectable.isSelected() ? 'label-primary' : 'label-default label-light'}}\"\n           (click)=\"manufacturer.selectable.toggleSelect()\">\n        {{manufacturer.get('id')}}\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div *ngFor=\"let manufacturer of getManufacturers().models\"\n         class=\"col {{getPanelWidth()}}\">\n      <div class=\"entry-panel\">\n        <div class=\"chart\">\n          <radar-chart [values]=\"manufacturer.get('radarChartData')\" [labels]=\"radarChartLabels\" [width]=\"400\" [height]=\"400\"></radar-chart>\n        </div>\n        <div class=\"manufacturer\">\n          {{manufacturer.get('id')}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ })
]);