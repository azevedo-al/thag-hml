(self["webpackChunkSistemaDeGestao"] = self["webpackChunkSistemaDeGestao"] || []).push([["main"],{

/***/ 80502:
/*!********************************!*\
  !*** ./src/app-initializer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppInitializer: () => (/* binding */ AppInitializer)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ 81525);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash-es */ 39990);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es */ 94011);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/session/app-session.service */ 20044);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 20553);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 44328);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver */ 36353);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver */ 75803);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 54860);












class AppInitializer {
  constructor(_injector, _platformLocation, _httpClient) {
    this._injector = _injector;
    this._platformLocation = _platformLocation;
    this._httpClient = _httpClient;
  }
  init() {
    return () => {
      abp.ui.setBusy();
      return new Promise((resolve, reject) => {
        _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          this.getUserConfiguration(() => {
            abp.event.trigger('abp.dynamicScriptsInitialized');
            // do not use constructor injection for AppSessionService
            const appSessionService = this._injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__.AppSessionService);
            appSessionService.init().then(result => {
              abp.ui.clearBusy();
              if (this.shouldLoadLocale()) {
                const angularLocale = this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
                __webpack_require__(14300)(`./${angularLocale}.mjs`).then(module => {
                  (0,_angular_common__WEBPACK_IMPORTED_MODULE_7__.registerLocaleData)(module.default);
                  resolve(result);
                }, reject);
              } else {
                resolve(result);
              }
            }, err => {
              abp.ui.clearBusy();
              reject(err);
            });
          });
        });
      });
    };
  }
  getBaseHref() {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }
    return '/';
  }
  getDocumentOrigin() {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return document.location.protocol + '//' + document.location.hostname + port;
    }
    return document.location.origin;
  }
  shouldLoadLocale() {
    return abp.localization.currentLanguage.name && abp.localization.currentLanguage.name !== 'en-US';
  }
  convertAbpLocaleToAngularLocale(locale) {
    if (!_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings) {
      return locale;
    }
    const localeMapings = (0,lodash_es__WEBPACK_IMPORTED_MODULE_8__["default"])(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings, {
      from: locale
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0]['to'];
    }
    return locale;
  }
  getCurrentClockProvider(currentProviderName) {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }
    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }
    return abp.timing.localClockProvider;
  }
  getUserConfiguration(callback) {
    const cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
    const token = abp.auth.getToken();
    const requestHeaders = {
      'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`,
      '.AspNetCore.Culture': `c=${cookieLangValue}|uic=${cookieLangValue}`
    };
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
    this._httpClient.get(`${_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`, {
      headers: requestHeaders
    }).subscribe(response => {
      const result = response.result;
      (0,lodash_es__WEBPACK_IMPORTED_MODULE_9__["default"])(abp, result);
      abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);
      moment_timezone__WEBPACK_IMPORTED_MODULE_0__.locale(abp.localization.currentLanguage.name);
      if (abp.clock.provider.supportsMultipleTimezone) {
        moment_timezone__WEBPACK_IMPORTED_MODULE_0__.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
      }
      callback();
    });
  }
  getApplicationConfig(appRootUrl, callback) {
    this._httpClient.get(`${appRootUrl}assets/${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.appConfig}`, {
      headers: {
        'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`
      }
    }).subscribe(response => {
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseUrl = response.appBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings = response.localeMappings;
      // Find tenant from subdomain
      var tenancyName = this.resolveTenancyName(response.appBaseUrl);
      if (tenancyName == null) {
        callback();
      } else {
        this.ConfigureTenantIdCookie(tenancyName, callback);
      }
    });
  }
  ConfigureTenantIdCookie(tenancyName, callback) {
    let accountServiceProxy = this._injector.get(_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.AccountServiceProxy);
    let input = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.IsTenantAvailableInput();
    input.tenancyName = tenancyName;
    accountServiceProxy.isTenantAvailable(input).subscribe(result => {
      if (result.state === _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.TenantAvailabilityState._1) {
        // Available
        abp.multiTenancy.setTenantIdCookie(result.tenantId);
      }
      callback();
    });
  }
  resolveTenancyName(appBaseUrl) {
    var subdomainTenantResolver = new _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__.SubdomainTenantResolver();
    var tenancyName = subdomainTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    var queryStirngTenantResolver = new _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__.QueryStringTenantResolver();
    var tenancyName = queryStirngTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    // add other tenancy resolvers here, ex: CookieTenantResolver, QueryStringTenantResolver etc...
    return null;
  }
  static #_ = this.ɵfac = function AppInitializer_Factory(t) {
    return new (t || AppInitializer)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
    token: AppInitializer,
    factory: AppInitializer.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 20553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const environment = {
  production: false,
  hmr: false,
  appConfig: 'appconfig.json'
};

/***/ }),

/***/ 46469:
/*!********************!*\
  !*** ./src/hmr.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hmrBootstrap: () => (/* binding */ hmrBootstrap)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angularclass/hmr */ 52502);


const hmrBootstrap = (module, bootstrap) => {
  let ngModule;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = (0,_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__.createNewHosts)(elements);
    ngModule.destroy();
    makeVisible();
  });
};

/***/ }),

/***/ 14913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments/environment */ 20553);
/* harmony import */ var _root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.module */ 77899);
/* harmony import */ var _hmr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hmr */ 46469);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/min/locales.min */ 72756);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ 81525);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);







if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.enableProdMode)();
}
const bootstrap = () => {
  return _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.platformBrowser().bootstrapModule(_root_module__WEBPACK_IMPORTED_MODULE_1__.RootModule);
};
/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */
if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hmr) {
  if (false) {} else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap(); // Regular bootstrap
}

/***/ }),

/***/ 91170:
/*!************************************!*\
  !*** ./src/root-routing.module.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootRoutingModule: () => (/* binding */ RootRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);



const routes = [{
  path: '',
  redirectTo: '/app/about',
  pathMatch: 'full'
}, {
  path: 'account',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_account_account_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! account/account.module */ 82570)).then(m => m.AccountModule),
  data: {
    preload: true
  }
}, {
  path: 'app',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_app_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! app/app.module */ 78629)).then(m => m.AppModule),
  data: {
    preload: true
  }
}];
class RootRoutingModule {
  static #_ = this.ɵfac = function RootRoutingModule_Factory(t) {
    return new (t || RootRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: RootRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RootRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 59010:
/*!*******************************!*\
  !*** ./src/root.component.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootComponent: () => (/* binding */ RootComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);


class RootComponent {
  static #_ = this.ɵfac = function RootComponent_Factory(t) {
    return new (t || RootComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: RootComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function RootComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    encapsulation: 2
  });
}

/***/ }),

/***/ 77899:
/*!****************************!*\
  !*** ./src/root.module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootModule: () => (/* binding */ RootModule),
/* harmony export */   getCurrentLanguage: () => (/* binding */ getCurrentLanguage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 24987);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/modal */ 17962);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 27019);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/collapse */ 46605);
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-bootstrap/tabs */ 49772);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! abp-ng2-module */ 8503);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/shared.module */ 79820);
/* harmony import */ var _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/service-proxies/service-proxy.module */ 55576);
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root-routing.module */ 91170);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 44328);
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./root.component */ 59010);
/* harmony import */ var _app_initializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-initializer */ 80502);






















function getCurrentLanguage() {
  if (abp.localization.currentLanguage.name) {
    return abp.localization.currentLanguage.name;
  }
  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'en';
}
class RootModule {
  static #_ = this.ɵfac = function RootModule_Factory(t) {
    return new (t || RootModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: RootModule,
    bootstrap: [_root_component__WEBPACK_IMPORTED_MODULE_5__.RootComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__.AbpHttpInterceptor,
      multi: true
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.APP_INITIALIZER,
      useFactory: appInitializer => appInitializer.init(),
      deps: [_app_initializer__WEBPACK_IMPORTED_MODULE_6__.AppInitializer],
      multi: true
    }, {
      provide: _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.API_BASE_URL,
      useFactory: () => _shared_AppConsts__WEBPACK_IMPORTED_MODULE_3__.AppConsts.remoteServiceBaseUrl
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.LOCALE_ID,
      useFactory: getCurrentLanguage
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule.forRoot(), ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule.forRoot(), ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule.forRoot(), ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule.forRoot(), ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule.forRoot(), _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](RootModule, {
    declarations: [_root_component__WEBPACK_IMPORTED_MODULE_5__.RootComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule, ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule, ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule]
  });
})();

/***/ }),

/***/ 15047:
/*!*********************************!*\
  !*** ./src/shared/AppConsts.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppConsts: () => (/* binding */ AppConsts)
/* harmony export */ });
class AppConsts {
  static #_ = this.tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';
  static #_2 = this.localeMappings = [];
  static #_3 = this.userManagement = {
    defaultAdminUserName: 'admin'
  };
  static #_4 = this.localization = {
    defaultLocalizationSourceName: 'SistemaDeGestao'
  };
  static #_5 = this.authorization = {
    encryptedAuthTokenName: 'enc_auth_token'
  };
}

/***/ }),

/***/ 44345:
/*!******************************************!*\
  !*** ./src/shared/app-component-base.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponentBase: () => (/* binding */ AppComponentBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 8503);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/session/app-session.service */ 20044);




class AppComponentBase {
  constructor(injector) {
    this.localizationSourceName = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.localization.defaultLocalizationSourceName;
    this.localization = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.LocalizationService);
    this.permission = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService);
    this.feature = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.FeatureCheckerService);
    this.notify = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.NotifyService);
    this.setting = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.SettingService);
    this.message = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.MessageService);
    this.multiTenancy = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService);
    this.appSession = injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService);
    this.elementRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
  }
  l(key, ...args) {
    let localizedText = this.localization.localize(key, this.localizationSourceName);
    if (!localizedText) {
      localizedText = key;
    }
    if (!args || !args.length) {
      return localizedText;
    }
    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }
  isGranted(permissionName) {
    return this.permission.isGranted(permissionName);
  }
}

/***/ }),

/***/ 64130:
/*!*********************************************!*\
  !*** ./src/shared/auth/app-auth.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppAuthService: () => (/* binding */ AppAuthService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 17474);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/UrlHelper */ 78770);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 44328);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! abp-ng2-module */ 8503);








class AppAuthService {
  constructor(_tokenAuthService, _router, _utilsService, _tokenService, _logService) {
    this._tokenAuthService = _tokenAuthService;
    this._router = _router;
    this._utilsService = _utilsService;
    this._tokenService = _tokenService;
    this._logService = _logService;
    this.clear();
  }
  logout(reload) {
    abp.auth.clearToken();
    abp.utils.deleteCookie(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName);
    if (reload !== false) {
      location.href = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
  }
  authenticate(finallyCallback) {
    finallyCallback = finallyCallback || (() => {});
    this._tokenAuthService.authenticate(this.authenticateModel).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => {
      finallyCallback();
    })).subscribe(result => {
      this.processAuthenticateResult(result);
    });
  }
  processAuthenticateResult(authenticateResult) {
    this.authenticateResult = authenticateResult;
    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);
    } else {
      // Unexpected result!
      this._logService.warn('Unexpected authenticateResult!');
      this._router.navigate(['account/login']);
    }
  }
  login(accessToken, encryptedAccessToken, expireInSeconds, rememberMe) {
    const tokenExpireDate = rememberMe ? new Date(new Date().getTime() + 1000 * expireInSeconds) : undefined;
    this._tokenService.setToken(accessToken, tokenExpireDate);
    this._utilsService.setCookieValue(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName, encryptedAccessToken, tokenExpireDate, abp.appPath);
    let initialUrl = _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__.UrlHelper.initialUrl;
    if (initialUrl.indexOf('/login') > 0) {
      initialUrl = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
    location.href = initialUrl;
  }
  clear() {
    this.authenticateModel = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
  static #_ = this.ɵfac = function AppAuthService_Factory(t) {
    return new (t || AppAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.TokenAuthServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.UtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.LogService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AppAuthService,
    factory: AppAuthService.ɵfac
  });
}

/***/ }),

/***/ 18829:
/*!*********************************************!*\
  !*** ./src/shared/auth/auth-route-guard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRouteGuard: () => (/* binding */ AppRouteGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 8503);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/app-session.service */ 20044);




class AppRouteGuard {
  constructor(_permissionChecker, _router, _sessionService) {
    this._permissionChecker = _permissionChecker;
    this._router = _router;
    this._sessionService = _sessionService;
  }
  canActivate(route, state) {
    if (!this._sessionService.user) {
      this._router.navigate(['/account/login']);
      return false;
    }
    if (!route.data || !route.data['permission']) {
      return true;
    }
    if (this._permissionChecker.isGranted(route.data['permission'])) {
      return true;
    }
    this._router.navigate([this.selectBestRoute()]);
    return false;
  }
  canActivateChild(route, state) {
    return this.canActivate(route, state);
  }
  selectBestRoute() {
    if (!this._sessionService.user) {
      return '/account/login';
    }
    if (this._permissionChecker.isGranted('Pages.Users')) {
      return '/app/admin/users';
    }
    return '/app/home';
  }
  static #_ = this.ɵfac = function AppRouteGuard_Factory(t) {
    return new (t || AppRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppRouteGuard,
    factory: AppRouteGuard.ɵfac
  });
}

/***/ }),

/***/ 11302:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-footer.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalFooterComponent: () => (/* binding */ AbpModalFooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 44345);



class AbpModalFooterComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.cancelLabel = this.l('Cancel');
    this.saveLabel = this.l('Save');
    this.onCancelClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = this.ɵfac = function AbpModalFooterComponent_Factory(t) {
    return new (t || AbpModalFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalFooterComponent,
    selectors: [["abp-modal-footer"]],
    inputs: {
      cancelLabel: "cancelLabel",
      cancelDisabled: "cancelDisabled",
      saveLabel: "saveLabel",
      saveDisabled: "saveDisabled"
    },
    outputs: {
      onCancelClick: "onCancelClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 5,
    vars: 4,
    consts: [[1, "modal-footer", "justify-content-between"], ["type", "button", 1, "btn", "btn-default", 3, "disabled", "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]],
    template: function AbpModalFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalFooterComponent_Template_button_click_1_listener() {
          return ctx.onCancelClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.cancelDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.cancelLabel, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saveDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saveLabel, " ");
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 68753:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-header.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalHeaderComponent: () => (/* binding */ AbpModalHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 44345);



class AbpModalHeaderComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.onCloseClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = this.ɵfac = function AbpModalHeaderComponent_Factory(t) {
    return new (t || AbpModalHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalHeaderComponent,
    selectors: [["abp-modal-header"]],
    inputs: {
      title: "title"
    },
    outputs: {
      onCloseClick: "onCloseClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 1,
    consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"]],
    template: function AbpModalHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalHeaderComponent_Template_button_click_3_listener() {
          return ctx.onCloseClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 91085:
/*!*******************************************************************************!*\
  !*** ./src/shared/components/pagination/abp-pagination-controls.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpPaginationControlsComponent: () => (/* binding */ AbpPaginationControlsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-pagination */ 71060);




function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.previous());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_1_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", _r0.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_r0.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.isFirstPage());
  }
}
function AbpPaginationControlsComponent_ul_3_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6)(1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_2_Template_a_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const page_r9 = restoredCtx.$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.setCurrent(page_r9.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const page_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("z-index", _r0.getCurrent() === page_r9.value ? "0" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", _r0.getCurrent() === page_r9.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", page_r9.label, " ");
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.next());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_3_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_3_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", _r0.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_r0.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.isLastPage());
  }
}
function AbpPaginationControlsComponent_ul_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_Template, 3, 4, "li", 4)(2, AbpPaginationControlsComponent_ul_3_li_2_Template, 3, 5, "li", 5)(3, AbpPaginationControlsComponent_ul_3_li_3_Template, 3, 4, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.directionLinks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _r0.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.directionLinks);
  }
}
class AbpPaginationControlsComponent {
  constructor() {
    this.maxSize = 7;
    this.previousLabel = 'Previous';
    this.nextLabel = 'Next';
    this.screenReaderPaginationLabel = 'Pagination';
    this.screenReaderPageLabel = 'page';
    this.screenReaderCurrentLabel = `You're on page`;
    this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._directionLinks = true;
    this._autoHide = false;
  }
  get directionLinks() {
    return this._directionLinks;
  }
  set directionLinks(value) {
    this._directionLinks = !!value && value !== 'false';
  }
  get autoHide() {
    return this._autoHide;
  }
  set autoHide(value) {
    this._autoHide = !!value && value !== 'false';
  }
  static #_ = this.ɵfac = function AbpPaginationControlsComponent_Factory(t) {
    return new (t || AbpPaginationControlsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AbpPaginationControlsComponent,
    selectors: [["abp-pagination-controls"]],
    inputs: {
      id: "id",
      maxSize: "maxSize",
      previousLabel: "previousLabel",
      nextLabel: "nextLabel",
      screenReaderPaginationLabel: "screenReaderPaginationLabel",
      screenReaderPageLabel: "screenReaderPageLabel",
      screenReaderCurrentLabel: "screenReaderCurrentLabel",
      directionLinks: "directionLinks",
      autoHide: "autoHide"
    },
    outputs: {
      pageChange: "pageChange"
    },
    decls: 4,
    vars: 3,
    consts: [[3, "id", "maxSize", "pageChange"], ["p", "paginationApi"], ["class", "pagination m-0", 4, "ngIf"], [1, "pagination", "m-0"], ["class", "page-item", 3, "disabled", 4, "ngIf"], ["class", "page-item", 3, "active", "z-index", 4, "ngFor", "ngForOf"], [1, "page-item"], ["class", "page-link", "href", "javascript:;", 3, "click", 4, "ngIf"], ["class", "page-link", "href", "javascript:;", 4, "ngIf"], ["href", "javascript:;", 1, "page-link", 3, "click"], [1, "fas", "fa-chevron-left"], ["href", "javascript:;", 1, "page-link"], [1, "fas", "fa-chevron-right"]],
    template: function AbpPaginationControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pagination-template", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function AbpPaginationControlsComponent_Template_pagination_template_pageChange_0_listener($event) {
          return ctx.pageChange.emit($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AbpPaginationControlsComponent_ul_3_Template, 4, 3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id)("maxSize", ctx.maxSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.autoHide && _r0.pages.length <= 1));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, ngx_pagination__WEBPACK_IMPORTED_MODULE_2__.PaginationControlsDirective],
    encapsulation: 2
  });
}

/***/ }),

/***/ 17164:
/*!******************************************************************************!*\
  !*** ./src/shared/components/validation/abp-validation.summary.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpValidationSummaryComponent: () => (/* binding */ AbpValidationSummaryComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 44345);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);



function AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const validationError_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("d-block", !!ctx_r3.control.errors[validationError_r2.name]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r3.getValidationErrorMessage(validationError_r2), " ");
  }
}
function AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template, 2, 3, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const validationError_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !!ctx_r1.control.errors[validationError_r2.name]);
  }
}
function AbpValidationSummaryComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.validationErrors);
  }
}
class AbpValidationSummaryComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _renderer) {
    super(injector);
    this._renderer = _renderer;
    this.defaultValidationErrors = [{
      name: 'required',
      localizationKey: 'ThisFieldIsRequired'
    }, {
      name: 'minlength',
      localizationKey: 'PleaseEnterAtLeastNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'maxlength',
      localizationKey: 'PleaseEnterNoMoreThanNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'email',
      localizationKey: 'InvalidEmailAddress'
    }, {
      name: 'pattern',
      localizationKey: 'InvalidPattern',
      propertyKey: 'requiredPattern'
    }, {
      name: 'validateEqual',
      localizationKey: 'PairsDoNotMatch'
    }];
    this.validationErrors = this.defaultValidationErrors;
  }
  set customValidationErrors(val) {
    if (val && val.length > 0) {
      const defaults = this.defaultValidationErrors.filter(defaultValidationError => !val.find(customValidationError => customValidationError.name === defaultValidationError.name));
      this.validationErrors = [...defaults, ...val];
    }
  }
  ngOnInit() {
    if (this.controlEl) {
      this.control.valueChanges.subscribe(() => {
        if (this.control.valid && (this.control.dirty || this.control.touched)) {
          this._renderer.removeClass(this.controlEl, 'is-invalid');
        }
      });
    }
  }
  getValidationErrorMessage(error) {
    if (this.controlEl) {
      this._renderer.addClass(this.controlEl, 'is-invalid');
    }
    const propertyValue = this.control.errors[error.name][error.propertyKey];
    return !!propertyValue ? this.l(error.localizationKey, propertyValue) : this.l(error.localizationKey);
  }
  static #_ = this.ɵfac = function AbpValidationSummaryComponent_Factory(t) {
    return new (t || AbpValidationSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpValidationSummaryComponent,
    selectors: [["abp-validation-summary"]],
    inputs: {
      control: "control",
      controlEl: "controlEl",
      customValidationErrors: "customValidationErrors"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "error invalid-feedback", 3, "d-block", 4, "ngIf"], [1, "error", "invalid-feedback"]],
    template: function AbpValidationSummaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AbpValidationSummaryComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.control.invalid && (ctx.control.dirty || ctx.control.touched));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    encapsulation: 2
  });
}

/***/ }),

/***/ 98094:
/*!*************************************************!*\
  !*** ./src/shared/directives/busy.directive.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BusyDirective: () => (/* binding */ BusyDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class BusyDirective {
  constructor(_element) {
    this._element = _element;
  }
  set busy(isBusy) {
    this.refreshState(isBusy);
  }
  refreshState(isBusy) {
    if (isBusy === undefined) {
      return;
    }
    if (isBusy) {
      abp.ui.setBusy(this._element.nativeElement);
    } else {
      abp.ui.clearBusy(this._element.nativeElement);
    }
  }
  static #_ = this.ɵfac = function BusyDirective_Factory(t) {
    return new (t || BusyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: BusyDirective,
    selectors: [["", "busy", ""]],
    inputs: {
      busy: "busy"
    }
  });
}

/***/ }),

/***/ 3979:
/*!************************************************************!*\
  !*** ./src/shared/directives/equal-validator.directive.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EqualValidator: () => (/* binding */ EqualValidator)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);



class EqualValidator {
  constructor(validateEqual, reverse) {
    this.validateEqual = validateEqual;
    this.reverse = reverse;
  }
  get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }
  validate(control) {
    // self value
    const value = control.value;
    // second control
    const control2 = control.root.get(this.validateEqual);
    // value not equal
    if (control2 && value !== control2.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }
    // value equal and reverse
    if (control2 && value === control2.value && this.isReverse) {
      delete control2.errors['validateEqual'];
      if (!Object.keys(control2.errors).length) {
        control2.setErrors(null);
      }
    }
    // value not equal and reverse
    if (control2 && value !== control2.value && this.isReverse) {
      control2.setErrors({
        validateEqual: true
      });
    }
    return null;
  }
  static #_ = this.ɵfac = function EqualValidator_Factory(t) {
    return new (t || EqualValidator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('validateEqual'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('reverse'));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: EqualValidator,
    selectors: [["", "validateEqual", "", "formControlName", ""], ["", "validateEqual", "", "formControl", ""], ["", "validateEqual", "", "ngModel", ""]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALIDATORS,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EqualValidator),
      multi: true
    }])]
  });
}

/***/ }),

/***/ 95449:
/*!*************************************************************!*\
  !*** ./src/shared/helpers/FormattedStringValueExtracter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormattedStringValueExtracter: () => (/* binding */ FormattedStringValueExtracter)
/* harmony export */ });
class ExtractionResult {
  constructor(isMatch) {
    this.IsMatch = isMatch;
    this.Matches = [];
  }
}
var FormatStringTokenType;
(function (FormatStringTokenType) {
  FormatStringTokenType[FormatStringTokenType["ConstantText"] = 0] = "ConstantText";
  FormatStringTokenType[FormatStringTokenType["DynamicValue"] = 1] = "DynamicValue";
})(FormatStringTokenType || (FormatStringTokenType = {}));
class FormatStringToken {
  constructor(text, type) {
    this.Text = text;
    this.Type = type;
  }
}
class FormatStringTokenizer {
  Tokenize(format, includeBracketsForDynamicValues = false) {
    const tokens = [];
    let currentText = '';
    let inDynamicValue = false;
    for (let i = 0; i < format.length; i++) {
      const c = format[i];
      switch (c) {
        case '{':
          if (inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! format string can not contain nested dynamic value expression!');
          }
          inDynamicValue = true;
          if (currentText.length > 0) {
            tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
            currentText = '';
          }
          break;
        case '}':
          if (!inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! These is no opening brackets for the closing bracket }.');
          }
          inDynamicValue = false;
          if (currentText.length <= 0) {
            throw new Error('Incorrect syntax at char ' + i + '! Brackets does not containt any chars.');
          }
          let dynamicValue = currentText;
          if (includeBracketsForDynamicValues) {
            dynamicValue = '{' + dynamicValue + '}';
          }
          tokens.push(new FormatStringToken(dynamicValue, FormatStringTokenType.DynamicValue));
          currentText = '';
          break;
        default:
          currentText += c;
          break;
      }
    }
    if (inDynamicValue) {
      throw new Error('There is no closing } char for an opened { char.');
    }
    if (currentText.length > 0) {
      tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
    }
    return tokens;
  }
}
class FormattedStringValueExtracter {
  Extract(str, format) {
    if (str === format) {
      return new ExtractionResult(true);
    }
    const formatTokens = new FormatStringTokenizer().Tokenize(format);
    if (!formatTokens) {
      return new ExtractionResult(str === '');
    }
    const result = new ExtractionResult(true);
    for (let i = 0; i < formatTokens.length; i++) {
      const currentToken = formatTokens[i];
      const previousToken = i > 0 ? formatTokens[i - 1] : null;
      if (currentToken.Type === FormatStringTokenType.ConstantText) {
        if (i === 0) {
          if (str.indexOf(currentToken.Text) !== 0) {
            result.IsMatch = false;
            return result;
          }
          str = str.substr(currentToken.Text.length, str.length - currentToken.Text.length);
        } else {
          const matchIndex = str.indexOf(currentToken.Text);
          if (matchIndex < 0) {
            result.IsMatch = false;
            return result;
          }
          result.Matches.push({
            name: previousToken?.Text,
            value: str.substr(0, matchIndex)
          });
          str = str.substring(0, matchIndex + currentToken.Text.length);
        }
      }
    }
    const lastToken = formatTokens[formatTokens.length - 1];
    if (lastToken.Type === FormatStringTokenType.DynamicValue) {
      result.Matches.push({
        name: lastToken.Text,
        value: str
      });
    }
    return result;
  }
  IsMatch(str, format) {
    const result = new FormattedStringValueExtracter().Extract(str, format);
    if (!result.IsMatch) {
      return [];
    }
    const values = [];
    for (let i = 0; i < result.Matches.length; i++) {
      values.push(result.Matches[i].value);
    }
    return values;
  }
}

/***/ }),

/***/ 30307:
/*!**********************************************************!*\
  !*** ./src/shared/helpers/SubdomainTenancyNameFinder.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenancyNameFinder: () => (/* binding */ SubdomainTenancyNameFinder)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/FormattedStringValueExtracter */ 95449);


class SubdomainTenancyNameFinder {
  urlHasTenancyNamePlaceholder(url) {
    return url.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) >= 0;
  }
  getCurrentTenancyNameOrNull(rootAddress) {
    if (rootAddress.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
      // Web site does not support subdomain tenant name
      return null;
    }
    const currentRootAddress = document.location.href;
    const formattedStringValueExtracter = new _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__.FormattedStringValueExtracter();
    const values = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
    if (!values.length) {
      return null;
    }
    return values[0];
  }
}

/***/ }),

/***/ 78770:
/*!*****************************************!*\
  !*** ./src/shared/helpers/UrlHelper.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlHelper: () => (/* binding */ UrlHelper)
/* harmony export */ });
class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static #_ = this.initialUrl = location.href;
  static getQueryParameters() {
    return document.location.search.replace(/(^\?)/, '').split('&').map(function (n) {
      return n = n.split('='), this[n[0]] = n[1], this;
    }.bind({}))[0];
  }
}

/***/ }),

/***/ 32425:
/*!***************************************************!*\
  !*** ./src/shared/layout/layout-store.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutStoreService: () => (/* binding */ LayoutStoreService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 58071);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 33246);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 53317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);



class LayoutStoreService {
  constructor() {
    this.initialLayoutConfig = {
      sidebarExpanded: false
    };
    this.configSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.initialLayoutConfig);
    this.config$ = this.configSource.asObservable();
  }
  get sidebarExpanded() {
    return this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.pluck)('sidebarExpanded'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)());
  }
  setSidebarExpanded(value) {
    this.configSource.next(Object.assign(this.configSource.value, {
      sidebarExpanded: value
    }));
  }
  static #_ = this.ɵfac = function LayoutStoreService_Factory(t) {
    return new (t || LayoutStoreService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: LayoutStoreService,
    factory: LayoutStoreService.ɵfac
  });
}

/***/ }),

/***/ 75803:
/*!***********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryStringTenantResolver: () => (/* binding */ QueryStringTenantResolver)
/* harmony export */ });
/* harmony import */ var _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/UrlHelper */ 78770);

class QueryStringTenantResolver {
  resolve(appBaseUrl) {
    let queryParams = _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__.UrlHelper.getQueryParameters();
    console.log('queryParams');
    console.log(queryParams);
    return queryParams['abp_tenancy_name'];
  }
}

/***/ }),

/***/ 36353:
/*!********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenantResolver: () => (/* binding */ SubdomainTenantResolver)
/* harmony export */ });
/* harmony import */ var _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/helpers/SubdomainTenancyNameFinder */ 30307);

class SubdomainTenantResolver {
  resolve(appBaseUrl) {
    const subdomainTenancyNameFinder = new _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__.SubdomainTenancyNameFinder();
    return subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(appBaseUrl);
  }
}

/***/ }),

/***/ 55988:
/*!*******************************************!*\
  !*** ./src/shared/nav/app-url.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUrlService: () => (/* binding */ AppUrlService)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 15047);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/app-session.service */ 20044);



class AppUrlService {
  static #_ = this.tenancyNamePlaceHolder = '{TENANCY_NAME}';
  constructor(_appSessionService) {
    this._appSessionService = _appSessionService;
  }
  get appRootUrl() {
    if (this._appSessionService.tenant) {
      return this.getAppRootUrlOfTenant(this._appSessionService.tenant.tenancyName);
    } else {
      return this.getAppRootUrlOfTenant(null);
    }
  }
  /**
   * Returning url ends with '/'.
   */
  getAppRootUrlOfTenant(tenancyName) {
    let baseUrl = this.ensureEndsWith(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl, '/');
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder) < 0) {
      return baseUrl;
    }
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder + '.') >= 0) {
      baseUrl = baseUrl.replace(AppUrlService.tenancyNamePlaceHolder + '.', AppUrlService.tenancyNamePlaceHolder);
      if (tenancyName) {
        tenancyName = tenancyName + '.';
      }
    }
    if (!tenancyName) {
      return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, '');
    }
    return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, tenancyName);
  }
  ensureEndsWith(str, c) {
    if (str.charAt(str.length - 1) !== c) {
      str = str + c;
    }
    return str;
  }
  removeFromEnd(str, c) {
    if (str.charAt(str.length - 1) === c) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  }
  static #_2 = this.ɵfac = function AppUrlService_Factory(t) {
    return new (t || AppUrlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService));
  };
  static #_3 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AppUrlService,
    factory: AppUrlService.ɵfac
  });
}

/***/ }),

/***/ 71581:
/*!*******************************************!*\
  !*** ./src/shared/pipes/localize.pipe.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalizePipe: () => (/* binding */ LocalizePipe)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 44345);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);


class LocalizePipe extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
  }
  transform(key, ...args) {
    return this.l(key, ...args);
  }
  static #_ = this.ɵfac = function LocalizePipe_Factory(t) {
    return new (t || LocalizePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector, 16));
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "localize",
    type: LocalizePipe,
    pure: true
  });
}

/***/ }),

/***/ 44328:
/*!*******************************************************!*\
  !*** ./src/shared/service-proxies/service-proxies.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE_URL: () => (/* binding */ API_BASE_URL),
/* harmony export */   AccountServiceProxy: () => (/* binding */ AccountServiceProxy),
/* harmony export */   ApiException: () => (/* binding */ ApiException),
/* harmony export */   ApplicationInfoDto: () => (/* binding */ ApplicationInfoDto),
/* harmony export */   AuthenticateModel: () => (/* binding */ AuthenticateModel),
/* harmony export */   AuthenticateResultModel: () => (/* binding */ AuthenticateResultModel),
/* harmony export */   ChangePasswordDto: () => (/* binding */ ChangePasswordDto),
/* harmony export */   ChangeUiThemeInput: () => (/* binding */ ChangeUiThemeInput),
/* harmony export */   ChangeUserLanguageDto: () => (/* binding */ ChangeUserLanguageDto),
/* harmony export */   ConfigurationServiceProxy: () => (/* binding */ ConfigurationServiceProxy),
/* harmony export */   CreateAbastecimentoEstoqueDto: () => (/* binding */ CreateAbastecimentoEstoqueDto),
/* harmony export */   CreateEnderecoDto: () => (/* binding */ CreateEnderecoDto),
/* harmony export */   CreateItemEstoqueDto: () => (/* binding */ CreateItemEstoqueDto),
/* harmony export */   CreateRoleDto: () => (/* binding */ CreateRoleDto),
/* harmony export */   CreateTenantDto: () => (/* binding */ CreateTenantDto),
/* harmony export */   CreateUserDto: () => (/* binding */ CreateUserDto),
/* harmony export */   CreateUsoEstoqueDto: () => (/* binding */ CreateUsoEstoqueDto),
/* harmony export */   EnderecoDto: () => (/* binding */ EnderecoDto),
/* harmony export */   EnderecoDtoPagedResultDto: () => (/* binding */ EnderecoDtoPagedResultDto),
/* harmony export */   EnderecoServiceProxy: () => (/* binding */ EnderecoServiceProxy),
/* harmony export */   EstoqueServiceProxy: () => (/* binding */ EstoqueServiceProxy),
/* harmony export */   FlatPermissionDto: () => (/* binding */ FlatPermissionDto),
/* harmony export */   GetCurrentLoginInformationsOutput: () => (/* binding */ GetCurrentLoginInformationsOutput),
/* harmony export */   GetRoleForEditOutput: () => (/* binding */ GetRoleForEditOutput),
/* harmony export */   Int64EntityDto: () => (/* binding */ Int64EntityDto),
/* harmony export */   IsTenantAvailableInput: () => (/* binding */ IsTenantAvailableInput),
/* harmony export */   IsTenantAvailableOutput: () => (/* binding */ IsTenantAvailableOutput),
/* harmony export */   ItemEstoqueDto: () => (/* binding */ ItemEstoqueDto),
/* harmony export */   ItemEstoqueDtoPagedResultDto: () => (/* binding */ ItemEstoqueDtoPagedResultDto),
/* harmony export */   PermissionDto: () => (/* binding */ PermissionDto),
/* harmony export */   PermissionDtoListResultDto: () => (/* binding */ PermissionDtoListResultDto),
/* harmony export */   RegisterInput: () => (/* binding */ RegisterInput),
/* harmony export */   RegisterOutput: () => (/* binding */ RegisterOutput),
/* harmony export */   ResetPasswordDto: () => (/* binding */ ResetPasswordDto),
/* harmony export */   RoleDto: () => (/* binding */ RoleDto),
/* harmony export */   RoleDtoListResultDto: () => (/* binding */ RoleDtoListResultDto),
/* harmony export */   RoleDtoPagedResultDto: () => (/* binding */ RoleDtoPagedResultDto),
/* harmony export */   RoleEditDto: () => (/* binding */ RoleEditDto),
/* harmony export */   RoleListDto: () => (/* binding */ RoleListDto),
/* harmony export */   RoleListDtoListResultDto: () => (/* binding */ RoleListDtoListResultDto),
/* harmony export */   RoleServiceProxy: () => (/* binding */ RoleServiceProxy),
/* harmony export */   SessionServiceProxy: () => (/* binding */ SessionServiceProxy),
/* harmony export */   TenantAvailabilityState: () => (/* binding */ TenantAvailabilityState),
/* harmony export */   TenantDto: () => (/* binding */ TenantDto),
/* harmony export */   TenantDtoPagedResultDto: () => (/* binding */ TenantDtoPagedResultDto),
/* harmony export */   TenantLoginInfoDto: () => (/* binding */ TenantLoginInfoDto),
/* harmony export */   TenantServiceProxy: () => (/* binding */ TenantServiceProxy),
/* harmony export */   TokenAuthServiceProxy: () => (/* binding */ TokenAuthServiceProxy),
/* harmony export */   UpdateItemEstoqueDto: () => (/* binding */ UpdateItemEstoqueDto),
/* harmony export */   UserDto: () => (/* binding */ UserDto),
/* harmony export */   UserDtoPagedResultDto: () => (/* binding */ UserDtoPagedResultDto),
/* harmony export */   UserLoginInfoDto: () => (/* binding */ UserLoginInfoDto),
/* harmony export */   UserServiceProxy: () => (/* binding */ UserServiceProxy)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 72607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 33252);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 84980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 12235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 58540);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.7.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming







const API_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('API_BASE_URL');
class AccountServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  isTenantAvailable(body) {
    let url_ = this.baseUrl + "/api/services/app/Account/IsTenantAvailable";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processIsTenantAvailable(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processIsTenantAvailable(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processIsTenantAvailable(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = IsTenantAvailableOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  register(body) {
    let url_ = this.baseUrl + "/api/services/app/Account/Register";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRegister(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRegister(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRegister(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegisterOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function AccountServiceProxy_Factory(t) {
    return new (t || AccountServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AccountServiceProxy,
    factory: AccountServiceProxy.ɵfac
  });
}
class ConfigurationServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changeUiTheme(body) {
    let url_ = this.baseUrl + "/api/services/app/Configuration/ChangeUiTheme";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeUiTheme(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeUiTheme(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeUiTheme(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function ConfigurationServiceProxy_Factory(t) {
    return new (t || ConfigurationServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ConfigurationServiceProxy,
    factory: ConfigurationServiceProxy.ɵfac
  });
}
class EnderecoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Endereco/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EnderecoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Endereco/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EnderecoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Endereco/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EnderecoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Endereco/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EnderecoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Endereco/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function EnderecoServiceProxy_Factory(t) {
    return new (t || EnderecoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: EnderecoServiceProxy,
    factory: EnderecoServiceProxy.ɵfac
  });
}
class EstoqueServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Estoque/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ItemEstoqueDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Estoque/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ItemEstoqueDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Estoque/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ItemEstoqueDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Estoque/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ItemEstoqueDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Estoque/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function EstoqueServiceProxy_Factory(t) {
    return new (t || EstoqueServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: EstoqueServiceProxy,
    factory: EstoqueServiceProxy.ɵfac
  });
}
class RoleServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Role/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param permission (optional)
   * @return Success
   */
  getRoles(permission) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetRoles?";
    if (permission === null) throw new Error("The parameter 'permission' cannot be null.");else if (permission !== undefined) url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleListDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Role/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return Success
   */
  getAllPermissions() {
    let url_ = this.baseUrl + "/api/services/app/Role/GetAllPermissions";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllPermissions(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllPermissions(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllPermissions(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = PermissionDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  getRoleForEdit(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetRoleForEdit?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoleForEdit(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoleForEdit(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoleForEdit(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetRoleForEditOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function RoleServiceProxy_Factory(t) {
    return new (t || RoleServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: RoleServiceProxy,
    factory: RoleServiceProxy.ɵfac
  });
}
class SessionServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @return Success
   */
  getCurrentLoginInformations() {
    let url_ = this.baseUrl + "/api/services/app/Session/GetCurrentLoginInformations";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetCurrentLoginInformations(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetCurrentLoginInformations(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetCurrentLoginInformations(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function SessionServiceProxy_Factory(t) {
    return new (t || SessionServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SessionServiceProxy,
    factory: SessionServiceProxy.ɵfac
  });
}
class TenantServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function TenantServiceProxy_Factory(t) {
    return new (t || TenantServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TenantServiceProxy,
    factory: TenantServiceProxy.ɵfac
  });
}
class TokenAuthServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  authenticate(body) {
    let url_ = this.baseUrl + "/api/TokenAuth/Authenticate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processAuthenticate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processAuthenticate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processAuthenticate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AuthenticateResultModel.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function TokenAuthServiceProxy_Factory(t) {
    return new (t || TokenAuthServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TokenAuthServiceProxy,
    factory: TokenAuthServiceProxy.ɵfac
  });
}
class UserServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return Success
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/User/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  activate(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Activate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  deActivate(body) {
    let url_ = this.baseUrl + "/api/services/app/User/DeActivate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return Success
   */
  getRoles() {
    let url_ = this.baseUrl + "/api/services/app/User/GetRoles";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changeLanguage(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ChangeLanguage";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeLanguage(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeLanguage(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeLanguage(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changePassword(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ChangePassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangePassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangePassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangePassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return Success
   */
  resetPassword(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ResetPassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processResetPassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processResetPassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processResetPassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return Success
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/User/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/User/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = this.ɵfac = function UserServiceProxy_Factory(t) {
    return new (t || UserServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: UserServiceProxy,
    factory: UserServiceProxy.ɵfac
  });
}
class ApplicationInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.version = _data["version"];
      this.releaseDate = _data["releaseDate"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["releaseDate"].toString()) : undefined;
      if (_data["features"]) {
        this.features = {};
        for (let key in _data["features"]) {
          if (_data["features"].hasOwnProperty(key)) this.features[key] = _data["features"][key];
        }
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ApplicationInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["version"] = this.version;
    data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : undefined;
    if (this.features) {
      data["features"] = {};
      for (let key in this.features) {
        if (this.features.hasOwnProperty(key)) data["features"][key] = this.features[key];
      }
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ApplicationInfoDto();
    result.init(json);
    return result;
  }
}
class AuthenticateModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
      this.password = _data["password"];
      this.rememberClient = _data["rememberClient"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AuthenticateModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
    data["password"] = this.password;
    data["rememberClient"] = this.rememberClient;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateModel();
    result.init(json);
    return result;
  }
}
class AuthenticateResultModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.accessToken = _data["accessToken"];
      this.encryptedAccessToken = _data["encryptedAccessToken"];
      this.expireInSeconds = _data["expireInSeconds"];
      this.userId = _data["userId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AuthenticateResultModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["accessToken"] = this.accessToken;
    data["encryptedAccessToken"] = this.encryptedAccessToken;
    data["expireInSeconds"] = this.expireInSeconds;
    data["userId"] = this.userId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateResultModel();
    result.init(json);
    return result;
  }
}
class ChangePasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.currentPassword = _data["currentPassword"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangePasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["currentPassword"] = this.currentPassword;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangePasswordDto();
    result.init(json);
    return result;
  }
}
class ChangeUiThemeInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.theme = _data["theme"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangeUiThemeInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["theme"] = this.theme;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUiThemeInput();
    result.init(json);
    return result;
  }
}
class ChangeUserLanguageDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.languageName = _data["languageName"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangeUserLanguageDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["languageName"] = this.languageName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUserLanguageDto();
    result.init(json);
    return result;
  }
}
class CreateAbastecimentoEstoqueDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.itemId = _data["itemId"];
      this.qtd = _data["qtd"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateAbastecimentoEstoqueDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["itemId"] = this.itemId;
    data["qtd"] = this.qtd;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateAbastecimentoEstoqueDto();
    result.init(json);
    return result;
  }
}
class CreateEnderecoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.numero = _data["numero"];
      this.logradouro = _data["logradouro"];
      this.bairro = _data["bairro"];
      this.cidade = _data["cidade"];
      this.uf = _data["uf"];
      this.cep = _data["cep"];
      this.complemento1 = _data["complemento1"];
      this.complemento2 = _data["complemento2"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateEnderecoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["numero"] = this.numero;
    data["logradouro"] = this.logradouro;
    data["bairro"] = this.bairro;
    data["cidade"] = this.cidade;
    data["uf"] = this.uf;
    data["cep"] = this.cep;
    data["complemento1"] = this.complemento1;
    data["complemento2"] = this.complemento2;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateEnderecoDto();
    result.init(json);
    return result;
  }
}
class CreateItemEstoqueDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.unidade = _data["unidade"];
      this.total = _data["total"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateItemEstoqueDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["unidade"] = this.unidade;
    data["total"] = this.total;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateItemEstoqueDto();
    result.init(json);
    return result;
  }
}
class CreateRoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateRoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateRoleDto();
    result.init(json);
    return result;
  }
}
class CreateTenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.adminEmailAddress = _data["adminEmailAddress"];
      this.connectionString = _data["connectionString"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateTenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["adminEmailAddress"] = this.adminEmailAddress;
    data["connectionString"] = this.connectionString;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateTenantDto();
    result.init(json);
    return result;
  }
}
class CreateUserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
      this.password = _data["password"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    data["password"] = this.password;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUserDto();
    result.init(json);
    return result;
  }
}
class CreateUsoEstoqueDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.itemId = _data["itemId"];
      this.qtd = _data["qtd"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUsoEstoqueDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["itemId"] = this.itemId;
    data["qtd"] = this.qtd;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUsoEstoqueDto();
    result.init(json);
    return result;
  }
}
class EnderecoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.numero = _data["numero"];
      this.logradouro = _data["logradouro"];
      this.bairro = _data["bairro"];
      this.cidade = _data["cidade"];
      this.uf = _data["uf"];
      this.cep = _data["cep"];
      this.complemento1 = _data["complemento1"];
      this.complemento2 = _data["complemento2"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new EnderecoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["numero"] = this.numero;
    data["logradouro"] = this.logradouro;
    data["bairro"] = this.bairro;
    data["cidade"] = this.cidade;
    data["uf"] = this.uf;
    data["cep"] = this.cep;
    data["complemento1"] = this.complemento1;
    data["complemento2"] = this.complemento2;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new EnderecoDto();
    result.init(json);
    return result;
  }
}
class EnderecoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(EnderecoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new EnderecoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new EnderecoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class FlatPermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FlatPermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FlatPermissionDto();
    result.init(json);
    return result;
  }
}
class GetCurrentLoginInformationsOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : undefined;
      this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : undefined;
      this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new GetCurrentLoginInformationsOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["application"] = this.application ? this.application.toJSON() : undefined;
    data["user"] = this.user ? this.user.toJSON() : undefined;
    data["tenant"] = this.tenant ? this.tenant.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetCurrentLoginInformationsOutput();
    result.init(json);
    return result;
  }
}
class GetRoleForEditOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.role = _data["role"] ? RoleEditDto.fromJS(_data["role"]) : undefined;
      if (Array.isArray(_data["permissions"])) {
        this.permissions = [];
        for (let item of _data["permissions"]) this.permissions.push(FlatPermissionDto.fromJS(item));
      }
      if (Array.isArray(_data["grantedPermissionNames"])) {
        this.grantedPermissionNames = [];
        for (let item of _data["grantedPermissionNames"]) this.grantedPermissionNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new GetRoleForEditOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["role"] = this.role ? this.role.toJSON() : undefined;
    if (Array.isArray(this.permissions)) {
      data["permissions"] = [];
      for (let item of this.permissions) data["permissions"].push(item.toJSON());
    }
    if (Array.isArray(this.grantedPermissionNames)) {
      data["grantedPermissionNames"] = [];
      for (let item of this.grantedPermissionNames) data["grantedPermissionNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetRoleForEditOutput();
    result.init(json);
    return result;
  }
}
class Int64EntityDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new Int64EntityDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new Int64EntityDto();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["tenancyName"] = this.tenancyName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableInput();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.state = _data["state"];
      this.tenantId = _data["tenantId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["state"] = this.state;
    data["tenantId"] = this.tenantId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableOutput();
    result.init(json);
    return result;
  }
}
class ItemEstoqueDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.unidade = _data["unidade"];
      this.total = _data["total"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ItemEstoqueDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["unidade"] = this.unidade;
    data["total"] = this.total;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ItemEstoqueDto();
    result.init(json);
    return result;
  }
}
class ItemEstoqueDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ItemEstoqueDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ItemEstoqueDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ItemEstoqueDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class PermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDto();
    result.init(json);
    return result;
  }
}
class PermissionDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(PermissionDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PermissionDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDtoListResultDto();
    result.init(json);
    return result;
  }
}
class RegisterInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
      this.password = _data["password"];
      this.captchaResponse = _data["captchaResponse"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegisterInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    data["password"] = this.password;
    data["captchaResponse"] = this.captchaResponse;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterInput();
    result.init(json);
    return result;
  }
}
class RegisterOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.canLogin = _data["canLogin"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegisterOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["canLogin"] = this.canLogin;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterOutput();
    result.init(json);
    return result;
  }
}
class ResetPasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.adminPassword = _data["adminPassword"];
      this.userId = _data["userId"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ResetPasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["adminPassword"] = this.adminPassword;
    data["userId"] = this.userId;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ResetPasswordDto();
    result.init(json);
    return result;
  }
}
class RoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDto();
    result.init(json);
    return result;
  }
}
class RoleDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoListResultDto();
    result.init(json);
    return result;
  }
}
class RoleDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class RoleEditDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
      this.isStatic = _data["isStatic"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleEditDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    data["isStatic"] = this.isStatic;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleEditDto();
    result.init(json);
    return result;
  }
}
class RoleListDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.isStatic = _data["isStatic"];
      this.isDefault = _data["isDefault"];
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleListDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["isStatic"] = this.isStatic;
    data["isDefault"] = this.isDefault;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDto();
    result.init(json);
    return result;
  }
}
class RoleListDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleListDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleListDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDtoListResultDto();
    result.init(json);
    return result;
  }
}
var TenantAvailabilityState;
(function (TenantAvailabilityState) {
  TenantAvailabilityState[TenantAvailabilityState["_1"] = 1] = "_1";
  TenantAvailabilityState[TenantAvailabilityState["_2"] = 2] = "_2";
  TenantAvailabilityState[TenantAvailabilityState["_3"] = 3] = "_3";
})(TenantAvailabilityState || (TenantAvailabilityState = {}));
class TenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDto();
    result.init(json);
    return result;
  }
}
class TenantDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TenantDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class TenantLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantLoginInfoDto();
    result.init(json);
    return result;
  }
}
class UpdateItemEstoqueDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.unidade = _data["unidade"];
      if (Array.isArray(_data["novosUsos"])) {
        this.novosUsos = [];
        for (let item of _data["novosUsos"]) this.novosUsos.push(CreateUsoEstoqueDto.fromJS(item));
      }
      if (Array.isArray(_data["novosAbastecimentos"])) {
        this.novosAbastecimentos = [];
        for (let item of _data["novosAbastecimentos"]) this.novosAbastecimentos.push(CreateAbastecimentoEstoqueDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateItemEstoqueDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["unidade"] = this.unidade;
    if (Array.isArray(this.novosUsos)) {
      data["novosUsos"] = [];
      for (let item of this.novosUsos) data["novosUsos"].push(item.toJSON());
    }
    if (Array.isArray(this.novosAbastecimentos)) {
      data["novosAbastecimentos"] = [];
      for (let item of this.novosAbastecimentos) data["novosAbastecimentos"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateItemEstoqueDto();
    result.init(json);
    return result;
  }
}
class UserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      this.fullName = _data["fullName"];
      this.lastLoginTime = _data["lastLoginTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["lastLoginTime"].toString()) : undefined;
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    data["fullName"] = this.fullName;
    data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : undefined;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDto();
    result.init(json);
    return result;
  }
}
class UserDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(UserDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class UserLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserLoginInfoDto();
    result.init(json);
    return result;
  }
}
class ApiException extends Error {
  constructor(message, status, response, headers, result) {
    super();
    this.isApiException = true;
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }
  static isApiException(obj) {
    return obj.isApiException === true;
  }
}
function throwException(message, status, response, headers, result) {
  if (result !== null && result !== undefined) return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(result);else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new ApiException(message, status, response, headers, null));
}
function blobToText(blob) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next(event.target.result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

/***/ }),

/***/ 55576:
/*!************************************************************!*\
  !*** ./src/shared/service-proxies/service-proxy.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceProxyModule: () => (/* binding */ ServiceProxyModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abp-ng2-module */ 8503);
/* harmony import */ var _service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-proxies */ 44328);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




class ServiceProxyModule {
  static #_ = this.ɵfac = function ServiceProxyModule_Factory(t) {
    return new (t || ServiceProxyModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ServiceProxyModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    providers: [_service_proxies__WEBPACK_IMPORTED_MODULE_0__.RoleServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.UserServiceProxy,
    // ApiServiceProxies.ClienteServiceProxy,
    // ApiServiceProxies.EnderecoServiceProxy,
    _service_proxies__WEBPACK_IMPORTED_MODULE_0__.EstoqueServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TokenAuthServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.AccountServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ConfigurationServiceProxy, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__.AbpHttpInterceptor,
      multi: true
    }]
  });
}

/***/ }),

/***/ 20044:
/*!***************************************************!*\
  !*** ./src/shared/session/app-session.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSessionService: () => (/* binding */ AppSessionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 44328);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 8503);



class AppSessionService {
  constructor(_sessionService, _abpMultiTenancyService) {
    this._sessionService = _sessionService;
    this._abpMultiTenancyService = _abpMultiTenancyService;
  }
  get application() {
    return this._application;
  }
  get user() {
    return this._user;
  }
  get userId() {
    return this.user ? this.user.id : null;
  }
  get tenant() {
    return this._tenant;
  }
  get tenantId() {
    return this.tenant ? this.tenant.id : null;
  }
  getShownLoginName() {
    const userName = this._user.userName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }
    return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
  }
  init() {
    return new Promise((resolve, reject) => {
      this._sessionService.getCurrentLoginInformations().toPromise().then(result => {
        this._application = result.application;
        this._user = result.user;
        this._tenant = result.tenant;
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }
  changeTenantIfNeeded(tenantId) {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }
    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }
  isCurrentTenant(tenantId) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }
    return true;
  }
  static #_ = this.ɵfac = function AppSessionService_Factory(t) {
    return new (t || AppSessionService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppSessionService,
    factory: AppSessionService.ɵfac
  });
}

/***/ }),

/***/ 79820:
/*!*************************************!*\
  !*** ./src/shared/shared.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-pagination */ 71060);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session/app-session.service */ 20044);
/* harmony import */ var _nav_app_url_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav/app-url.service */ 55988);
/* harmony import */ var _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/app-auth.service */ 64130);
/* harmony import */ var _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth-route-guard */ 18829);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 71581);
/* harmony import */ var _components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pagination/abp-pagination-controls.component */ 91085);
/* harmony import */ var _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/validation/abp-validation.summary.component */ 17164);
/* harmony import */ var _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/modal/abp-modal-header.component */ 68753);
/* harmony import */ var _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/modal/abp-modal-footer.component */ 11302);
/* harmony import */ var _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layout/layout-store.service */ 32425);
/* harmony import */ var _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/busy.directive */ 98094);
/* harmony import */ var _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/equal-validator.directive */ 3979);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
















class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService, _nav_app_url_service__WEBPACK_IMPORTED_MODULE_1__.AppUrlService, _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__.AppAuthService, _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_3__.AppRouteGuard, _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_9__.LayoutStoreService]
    };
  }
  static #_ = this.ɵfac = function SharedModule_Factory(t) {
    return new (t || SharedModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
    type: SharedModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_15__.NgxPaginationModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__.AbpPaginationControlsComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__.AbpValidationSummaryComponent, _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__.AbpModalHeaderComponent, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__.EqualValidator],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_15__.NgxPaginationModule],
    exports: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__.AbpPaginationControlsComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__.AbpValidationSummaryComponent, _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__.AbpModalHeaderComponent, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__.EqualValidator]
  });
})();

/***/ }),

/***/ 14300:
/*!***********************************************************************************!*\
  !*** ./node_modules/@angular/common/locales/ lazy ^\.\/.*\.mjs$ namespace object ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af-NA.mjs": [
		78411,
		"node_modules_angular_common_locales_af-NA_mjs"
	],
	"./af.mjs": [
		31268,
		"node_modules_angular_common_locales_af_mjs"
	],
	"./agq.mjs": [
		84008,
		"node_modules_angular_common_locales_agq_mjs"
	],
	"./ak.mjs": [
		8163,
		"node_modules_angular_common_locales_ak_mjs"
	],
	"./am.mjs": [
		60921,
		"node_modules_angular_common_locales_am_mjs"
	],
	"./ar-AE.mjs": [
		46624,
		"node_modules_angular_common_locales_ar-AE_mjs"
	],
	"./ar-BH.mjs": [
		16781,
		"node_modules_angular_common_locales_ar-BH_mjs"
	],
	"./ar-DJ.mjs": [
		78515,
		"node_modules_angular_common_locales_ar-DJ_mjs"
	],
	"./ar-DZ.mjs": [
		13162,
		"node_modules_angular_common_locales_ar-DZ_mjs"
	],
	"./ar-EG.mjs": [
		35214,
		"node_modules_angular_common_locales_ar-EG_mjs"
	],
	"./ar-EH.mjs": [
		73437,
		"node_modules_angular_common_locales_ar-EH_mjs"
	],
	"./ar-ER.mjs": [
		6779,
		"node_modules_angular_common_locales_ar-ER_mjs"
	],
	"./ar-IL.mjs": [
		87839,
		"node_modules_angular_common_locales_ar-IL_mjs"
	],
	"./ar-IQ.mjs": [
		71489,
		"node_modules_angular_common_locales_ar-IQ_mjs"
	],
	"./ar-JO.mjs": [
		92894,
		"node_modules_angular_common_locales_ar-JO_mjs"
	],
	"./ar-KM.mjs": [
		32009,
		"node_modules_angular_common_locales_ar-KM_mjs"
	],
	"./ar-KW.mjs": [
		59171,
		"node_modules_angular_common_locales_ar-KW_mjs"
	],
	"./ar-LB.mjs": [
		44706,
		"node_modules_angular_common_locales_ar-LB_mjs"
	],
	"./ar-LY.mjs": [
		87975,
		"node_modules_angular_common_locales_ar-LY_mjs"
	],
	"./ar-MA.mjs": [
		40002,
		"node_modules_angular_common_locales_ar-MA_mjs"
	],
	"./ar-MR.mjs": [
		9320,
		"node_modules_angular_common_locales_ar-MR_mjs"
	],
	"./ar-OM.mjs": [
		6771,
		"node_modules_angular_common_locales_ar-OM_mjs"
	],
	"./ar-PS.mjs": [
		28729,
		"node_modules_angular_common_locales_ar-PS_mjs"
	],
	"./ar-QA.mjs": [
		85343,
		"node_modules_angular_common_locales_ar-QA_mjs"
	],
	"./ar-SA.mjs": [
		58800,
		"node_modules_angular_common_locales_ar-SA_mjs"
	],
	"./ar-SD.mjs": [
		94778,
		"node_modules_angular_common_locales_ar-SD_mjs"
	],
	"./ar-SO.mjs": [
		17380,
		"node_modules_angular_common_locales_ar-SO_mjs"
	],
	"./ar-SS.mjs": [
		26231,
		"node_modules_angular_common_locales_ar-SS_mjs"
	],
	"./ar-SY.mjs": [
		27850,
		"node_modules_angular_common_locales_ar-SY_mjs"
	],
	"./ar-TD.mjs": [
		43718,
		"node_modules_angular_common_locales_ar-TD_mjs"
	],
	"./ar-TN.mjs": [
		4599,
		"node_modules_angular_common_locales_ar-TN_mjs"
	],
	"./ar-YE.mjs": [
		30533,
		"node_modules_angular_common_locales_ar-YE_mjs"
	],
	"./ar.mjs": [
		8726,
		"node_modules_angular_common_locales_ar_mjs"
	],
	"./as.mjs": [
		16716,
		"node_modules_angular_common_locales_as_mjs"
	],
	"./asa.mjs": [
		78435,
		"node_modules_angular_common_locales_asa_mjs"
	],
	"./ast.mjs": [
		56210,
		"node_modules_angular_common_locales_ast_mjs"
	],
	"./az-Cyrl.mjs": [
		28905,
		"node_modules_angular_common_locales_az-Cyrl_mjs"
	],
	"./az-Latn.mjs": [
		50818,
		"node_modules_angular_common_locales_az-Latn_mjs"
	],
	"./az.mjs": [
		29099,
		"node_modules_angular_common_locales_az_mjs"
	],
	"./bas.mjs": [
		7893,
		"node_modules_angular_common_locales_bas_mjs"
	],
	"./be-tarask.mjs": [
		15160,
		"node_modules_angular_common_locales_be-tarask_mjs"
	],
	"./be.mjs": [
		29262,
		"node_modules_angular_common_locales_be_mjs"
	],
	"./bem.mjs": [
		91471,
		"node_modules_angular_common_locales_bem_mjs"
	],
	"./bez.mjs": [
		24818,
		"node_modules_angular_common_locales_bez_mjs"
	],
	"./bg.mjs": [
		79430,
		"node_modules_angular_common_locales_bg_mjs"
	],
	"./bm.mjs": [
		72579,
		"node_modules_angular_common_locales_bm_mjs"
	],
	"./bn-IN.mjs": [
		78418,
		"node_modules_angular_common_locales_bn-IN_mjs"
	],
	"./bn.mjs": [
		42925,
		"node_modules_angular_common_locales_bn_mjs"
	],
	"./bo-IN.mjs": [
		45885,
		"node_modules_angular_common_locales_bo-IN_mjs"
	],
	"./bo.mjs": [
		3288,
		"node_modules_angular_common_locales_bo_mjs"
	],
	"./br.mjs": [
		30129,
		"node_modules_angular_common_locales_br_mjs"
	],
	"./brx.mjs": [
		28978,
		"node_modules_angular_common_locales_brx_mjs"
	],
	"./bs-Cyrl.mjs": [
		2669,
		"node_modules_angular_common_locales_bs-Cyrl_mjs"
	],
	"./bs-Latn.mjs": [
		11443,
		"node_modules_angular_common_locales_bs-Latn_mjs"
	],
	"./bs.mjs": [
		32309,
		"node_modules_angular_common_locales_bs_mjs"
	],
	"./ca-AD.mjs": [
		92263,
		"node_modules_angular_common_locales_ca-AD_mjs"
	],
	"./ca-ES-valencia.mjs": [
		88652,
		"node_modules_angular_common_locales_ca-ES-valencia_mjs"
	],
	"./ca-FR.mjs": [
		8856,
		"node_modules_angular_common_locales_ca-FR_mjs"
	],
	"./ca-IT.mjs": [
		76648,
		"node_modules_angular_common_locales_ca-IT_mjs"
	],
	"./ca.mjs": [
		29118,
		"node_modules_angular_common_locales_ca_mjs"
	],
	"./ccp-IN.mjs": [
		49055,
		"node_modules_angular_common_locales_ccp-IN_mjs"
	],
	"./ccp.mjs": [
		55166,
		"node_modules_angular_common_locales_ccp_mjs"
	],
	"./ce.mjs": [
		51994,
		"node_modules_angular_common_locales_ce_mjs"
	],
	"./ceb.mjs": [
		8053,
		"node_modules_angular_common_locales_ceb_mjs"
	],
	"./cgg.mjs": [
		89779,
		"node_modules_angular_common_locales_cgg_mjs"
	],
	"./chr.mjs": [
		93294,
		"node_modules_angular_common_locales_chr_mjs"
	],
	"./ckb-IR.mjs": [
		47068,
		"node_modules_angular_common_locales_ckb-IR_mjs"
	],
	"./ckb.mjs": [
		67898,
		"node_modules_angular_common_locales_ckb_mjs"
	],
	"./cs.mjs": [
		58845,
		"node_modules_angular_common_locales_cs_mjs"
	],
	"./cy.mjs": [
		60274,
		"node_modules_angular_common_locales_cy_mjs"
	],
	"./da-GL.mjs": [
		74000,
		"node_modules_angular_common_locales_da-GL_mjs"
	],
	"./da.mjs": [
		73727,
		"node_modules_angular_common_locales_da_mjs"
	],
	"./dav.mjs": [
		90645,
		"node_modules_angular_common_locales_dav_mjs"
	],
	"./de-AT.mjs": [
		54006,
		"node_modules_angular_common_locales_de-AT_mjs"
	],
	"./de-BE.mjs": [
		7022,
		"node_modules_angular_common_locales_de-BE_mjs"
	],
	"./de-CH.mjs": [
		84904,
		"node_modules_angular_common_locales_de-CH_mjs"
	],
	"./de-IT.mjs": [
		17780,
		"node_modules_angular_common_locales_de-IT_mjs"
	],
	"./de-LI.mjs": [
		18046,
		"node_modules_angular_common_locales_de-LI_mjs"
	],
	"./de-LU.mjs": [
		30267,
		"node_modules_angular_common_locales_de-LU_mjs"
	],
	"./de.mjs": [
		67584,
		"node_modules_angular_common_locales_de_mjs"
	],
	"./dje.mjs": [
		15314,
		"node_modules_angular_common_locales_dje_mjs"
	],
	"./doi.mjs": [
		19251,
		"node_modules_angular_common_locales_doi_mjs"
	],
	"./dsb.mjs": [
		84774,
		"node_modules_angular_common_locales_dsb_mjs"
	],
	"./dua.mjs": [
		72917,
		"node_modules_angular_common_locales_dua_mjs"
	],
	"./dyo.mjs": [
		29469,
		"node_modules_angular_common_locales_dyo_mjs"
	],
	"./dz.mjs": [
		98297,
		"node_modules_angular_common_locales_dz_mjs"
	],
	"./ebu.mjs": [
		26086,
		"node_modules_angular_common_locales_ebu_mjs"
	],
	"./ee-TG.mjs": [
		23565,
		"node_modules_angular_common_locales_ee-TG_mjs"
	],
	"./ee.mjs": [
		23562,
		"node_modules_angular_common_locales_ee_mjs"
	],
	"./el-CY.mjs": [
		7456,
		"node_modules_angular_common_locales_el-CY_mjs"
	],
	"./el.mjs": [
		11319,
		"node_modules_angular_common_locales_el_mjs"
	],
	"./en-001.mjs": [
		57861,
		"node_modules_angular_common_locales_en-001_mjs"
	],
	"./en-150.mjs": [
		24852,
		"node_modules_angular_common_locales_en-150_mjs"
	],
	"./en-AE.mjs": [
		84812,
		"node_modules_angular_common_locales_en-AE_mjs"
	],
	"./en-AG.mjs": [
		99004,
		"node_modules_angular_common_locales_en-AG_mjs"
	],
	"./en-AI.mjs": [
		89254,
		"node_modules_angular_common_locales_en-AI_mjs"
	],
	"./en-AS.mjs": [
		32836,
		"node_modules_angular_common_locales_en-AS_mjs"
	],
	"./en-AT.mjs": [
		58940,
		"node_modules_angular_common_locales_en-AT_mjs"
	],
	"./en-AU.mjs": [
		10795,
		"node_modules_angular_common_locales_en-AU_mjs"
	],
	"./en-BB.mjs": [
		16664,
		"node_modules_angular_common_locales_en-BB_mjs"
	],
	"./en-BE.mjs": [
		36938,
		"node_modules_angular_common_locales_en-BE_mjs"
	],
	"./en-BI.mjs": [
		80782,
		"node_modules_angular_common_locales_en-BI_mjs"
	],
	"./en-BM.mjs": [
		5201,
		"node_modules_angular_common_locales_en-BM_mjs"
	],
	"./en-BS.mjs": [
		10310,
		"node_modules_angular_common_locales_en-BS_mjs"
	],
	"./en-BW.mjs": [
		391,
		"node_modules_angular_common_locales_en-BW_mjs"
	],
	"./en-BZ.mjs": [
		60926,
		"node_modules_angular_common_locales_en-BZ_mjs"
	],
	"./en-CA.mjs": [
		97806,
		"node_modules_angular_common_locales_en-CA_mjs"
	],
	"./en-CC.mjs": [
		2256,
		"node_modules_angular_common_locales_en-CC_mjs"
	],
	"./en-CH.mjs": [
		68601,
		"node_modules_angular_common_locales_en-CH_mjs"
	],
	"./en-CK.mjs": [
		33113,
		"node_modules_angular_common_locales_en-CK_mjs"
	],
	"./en-CM.mjs": [
		97886,
		"node_modules_angular_common_locales_en-CM_mjs"
	],
	"./en-CX.mjs": [
		6324,
		"node_modules_angular_common_locales_en-CX_mjs"
	],
	"./en-CY.mjs": [
		77978,
		"node_modules_angular_common_locales_en-CY_mjs"
	],
	"./en-DE.mjs": [
		54250,
		"node_modules_angular_common_locales_en-DE_mjs"
	],
	"./en-DG.mjs": [
		51792,
		"node_modules_angular_common_locales_en-DG_mjs"
	],
	"./en-DK.mjs": [
		29797,
		"node_modules_angular_common_locales_en-DK_mjs"
	],
	"./en-DM.mjs": [
		66214,
		"node_modules_angular_common_locales_en-DM_mjs"
	],
	"./en-ER.mjs": [
		67507,
		"node_modules_angular_common_locales_en-ER_mjs"
	],
	"./en-FI.mjs": [
		51612,
		"node_modules_angular_common_locales_en-FI_mjs"
	],
	"./en-FJ.mjs": [
		9786,
		"node_modules_angular_common_locales_en-FJ_mjs"
	],
	"./en-FK.mjs": [
		66993,
		"node_modules_angular_common_locales_en-FK_mjs"
	],
	"./en-FM.mjs": [
		98171,
		"node_modules_angular_common_locales_en-FM_mjs"
	],
	"./en-GB.mjs": [
		66147,
		"node_modules_angular_common_locales_en-GB_mjs"
	],
	"./en-GD.mjs": [
		53763,
		"node_modules_angular_common_locales_en-GD_mjs"
	],
	"./en-GG.mjs": [
		67215,
		"node_modules_angular_common_locales_en-GG_mjs"
	],
	"./en-GH.mjs": [
		55933,
		"node_modules_angular_common_locales_en-GH_mjs"
	],
	"./en-GI.mjs": [
		76782,
		"node_modules_angular_common_locales_en-GI_mjs"
	],
	"./en-GM.mjs": [
		65242,
		"node_modules_angular_common_locales_en-GM_mjs"
	],
	"./en-GU.mjs": [
		83821,
		"node_modules_angular_common_locales_en-GU_mjs"
	],
	"./en-GY.mjs": [
		98136,
		"node_modules_angular_common_locales_en-GY_mjs"
	],
	"./en-HK.mjs": [
		73097,
		"node_modules_angular_common_locales_en-HK_mjs"
	],
	"./en-IE.mjs": [
		41050,
		"node_modules_angular_common_locales_en-IE_mjs"
	],
	"./en-IL.mjs": [
		39068,
		"node_modules_angular_common_locales_en-IL_mjs"
	],
	"./en-IM.mjs": [
		21607,
		"node_modules_angular_common_locales_en-IM_mjs"
	],
	"./en-IN.mjs": [
		11944,
		"node_modules_angular_common_locales_en-IN_mjs"
	],
	"./en-IO.mjs": [
		22264,
		"node_modules_angular_common_locales_en-IO_mjs"
	],
	"./en-JE.mjs": [
		2436,
		"node_modules_angular_common_locales_en-JE_mjs"
	],
	"./en-JM.mjs": [
		67207,
		"node_modules_angular_common_locales_en-JM_mjs"
	],
	"./en-KE.mjs": [
		264,
		"node_modules_angular_common_locales_en-KE_mjs"
	],
	"./en-KI.mjs": [
		98208,
		"node_modules_angular_common_locales_en-KI_mjs"
	],
	"./en-KN.mjs": [
		72182,
		"node_modules_angular_common_locales_en-KN_mjs"
	],
	"./en-KY.mjs": [
		30697,
		"node_modules_angular_common_locales_en-KY_mjs"
	],
	"./en-LC.mjs": [
		79494,
		"node_modules_angular_common_locales_en-LC_mjs"
	],
	"./en-LR.mjs": [
		5006,
		"node_modules_angular_common_locales_en-LR_mjs"
	],
	"./en-LS.mjs": [
		69553,
		"node_modules_angular_common_locales_en-LS_mjs"
	],
	"./en-MG.mjs": [
		15562,
		"node_modules_angular_common_locales_en-MG_mjs"
	],
	"./en-MH.mjs": [
		67243,
		"node_modules_angular_common_locales_en-MH_mjs"
	],
	"./en-MO.mjs": [
		81477,
		"node_modules_angular_common_locales_en-MO_mjs"
	],
	"./en-MP.mjs": [
		1365,
		"node_modules_angular_common_locales_en-MP_mjs"
	],
	"./en-MS.mjs": [
		39242,
		"node_modules_angular_common_locales_en-MS_mjs"
	],
	"./en-MT.mjs": [
		84180,
		"node_modules_angular_common_locales_en-MT_mjs"
	],
	"./en-MU.mjs": [
		53976,
		"node_modules_angular_common_locales_en-MU_mjs"
	],
	"./en-MV.mjs": [
		99613,
		"node_modules_angular_common_locales_en-MV_mjs"
	],
	"./en-MW.mjs": [
		94073,
		"node_modules_angular_common_locales_en-MW_mjs"
	],
	"./en-MY.mjs": [
		29020,
		"node_modules_angular_common_locales_en-MY_mjs"
	],
	"./en-NA.mjs": [
		19657,
		"node_modules_angular_common_locales_en-NA_mjs"
	],
	"./en-NF.mjs": [
		7188,
		"node_modules_angular_common_locales_en-NF_mjs"
	],
	"./en-NG.mjs": [
		24876,
		"node_modules_angular_common_locales_en-NG_mjs"
	],
	"./en-NL.mjs": [
		85288,
		"node_modules_angular_common_locales_en-NL_mjs"
	],
	"./en-NR.mjs": [
		25039,
		"node_modules_angular_common_locales_en-NR_mjs"
	],
	"./en-NU.mjs": [
		6593,
		"node_modules_angular_common_locales_en-NU_mjs"
	],
	"./en-NZ.mjs": [
		76529,
		"node_modules_angular_common_locales_en-NZ_mjs"
	],
	"./en-PG.mjs": [
		64530,
		"node_modules_angular_common_locales_en-PG_mjs"
	],
	"./en-PH.mjs": [
		22969,
		"node_modules_angular_common_locales_en-PH_mjs"
	],
	"./en-PK.mjs": [
		84584,
		"node_modules_angular_common_locales_en-PK_mjs"
	],
	"./en-PN.mjs": [
		31718,
		"node_modules_angular_common_locales_en-PN_mjs"
	],
	"./en-PR.mjs": [
		10992,
		"node_modules_angular_common_locales_en-PR_mjs"
	],
	"./en-PW.mjs": [
		1276,
		"node_modules_angular_common_locales_en-PW_mjs"
	],
	"./en-RW.mjs": [
		25832,
		"node_modules_angular_common_locales_en-RW_mjs"
	],
	"./en-SB.mjs": [
		75926,
		"node_modules_angular_common_locales_en-SB_mjs"
	],
	"./en-SC.mjs": [
		87254,
		"node_modules_angular_common_locales_en-SC_mjs"
	],
	"./en-SD.mjs": [
		69386,
		"node_modules_angular_common_locales_en-SD_mjs"
	],
	"./en-SE.mjs": [
		61390,
		"node_modules_angular_common_locales_en-SE_mjs"
	],
	"./en-SG.mjs": [
		86490,
		"node_modules_angular_common_locales_en-SG_mjs"
	],
	"./en-SH.mjs": [
		82802,
		"node_modules_angular_common_locales_en-SH_mjs"
	],
	"./en-SI.mjs": [
		62160,
		"node_modules_angular_common_locales_en-SI_mjs"
	],
	"./en-SL.mjs": [
		57978,
		"node_modules_angular_common_locales_en-SL_mjs"
	],
	"./en-SS.mjs": [
		66598,
		"node_modules_angular_common_locales_en-SS_mjs"
	],
	"./en-SX.mjs": [
		1818,
		"node_modules_angular_common_locales_en-SX_mjs"
	],
	"./en-SZ.mjs": [
		32995,
		"node_modules_angular_common_locales_en-SZ_mjs"
	],
	"./en-TC.mjs": [
		30798,
		"node_modules_angular_common_locales_en-TC_mjs"
	],
	"./en-TK.mjs": [
		35059,
		"node_modules_angular_common_locales_en-TK_mjs"
	],
	"./en-TO.mjs": [
		2164,
		"node_modules_angular_common_locales_en-TO_mjs"
	],
	"./en-TT.mjs": [
		23884,
		"node_modules_angular_common_locales_en-TT_mjs"
	],
	"./en-TV.mjs": [
		95415,
		"node_modules_angular_common_locales_en-TV_mjs"
	],
	"./en-TZ.mjs": [
		43788,
		"node_modules_angular_common_locales_en-TZ_mjs"
	],
	"./en-UG.mjs": [
		19676,
		"node_modules_angular_common_locales_en-UG_mjs"
	],
	"./en-UM.mjs": [
		75121,
		"node_modules_angular_common_locales_en-UM_mjs"
	],
	"./en-VC.mjs": [
		16067,
		"node_modules_angular_common_locales_en-VC_mjs"
	],
	"./en-VG.mjs": [
		45842,
		"node_modules_angular_common_locales_en-VG_mjs"
	],
	"./en-VI.mjs": [
		49058,
		"node_modules_angular_common_locales_en-VI_mjs"
	],
	"./en-VU.mjs": [
		76705,
		"node_modules_angular_common_locales_en-VU_mjs"
	],
	"./en-WS.mjs": [
		14943,
		"node_modules_angular_common_locales_en-WS_mjs"
	],
	"./en-ZA.mjs": [
		79978,
		"node_modules_angular_common_locales_en-ZA_mjs"
	],
	"./en-ZM.mjs": [
		6657,
		"node_modules_angular_common_locales_en-ZM_mjs"
	],
	"./en-ZW.mjs": [
		2445,
		"node_modules_angular_common_locales_en-ZW_mjs"
	],
	"./en.mjs": [
		72060,
		"node_modules_angular_common_locales_en_mjs"
	],
	"./eo.mjs": [
		99594,
		"node_modules_angular_common_locales_eo_mjs"
	],
	"./es-419.mjs": [
		78832,
		"node_modules_angular_common_locales_es-419_mjs"
	],
	"./es-AR.mjs": [
		25010,
		"node_modules_angular_common_locales_es-AR_mjs"
	],
	"./es-BO.mjs": [
		35904,
		"node_modules_angular_common_locales_es-BO_mjs"
	],
	"./es-BR.mjs": [
		73375,
		"node_modules_angular_common_locales_es-BR_mjs"
	],
	"./es-BZ.mjs": [
		17968,
		"node_modules_angular_common_locales_es-BZ_mjs"
	],
	"./es-CL.mjs": [
		57085,
		"node_modules_angular_common_locales_es-CL_mjs"
	],
	"./es-CO.mjs": [
		22971,
		"node_modules_angular_common_locales_es-CO_mjs"
	],
	"./es-CR.mjs": [
		76696,
		"node_modules_angular_common_locales_es-CR_mjs"
	],
	"./es-CU.mjs": [
		90482,
		"node_modules_angular_common_locales_es-CU_mjs"
	],
	"./es-DO.mjs": [
		14941,
		"node_modules_angular_common_locales_es-DO_mjs"
	],
	"./es-EA.mjs": [
		65895,
		"node_modules_angular_common_locales_es-EA_mjs"
	],
	"./es-EC.mjs": [
		49136,
		"node_modules_angular_common_locales_es-EC_mjs"
	],
	"./es-GQ.mjs": [
		99880,
		"node_modules_angular_common_locales_es-GQ_mjs"
	],
	"./es-GT.mjs": [
		4029,
		"node_modules_angular_common_locales_es-GT_mjs"
	],
	"./es-HN.mjs": [
		98946,
		"node_modules_angular_common_locales_es-HN_mjs"
	],
	"./es-IC.mjs": [
		97775,
		"node_modules_angular_common_locales_es-IC_mjs"
	],
	"./es-MX.mjs": [
		82405,
		"node_modules_angular_common_locales_es-MX_mjs"
	],
	"./es-NI.mjs": [
		19539,
		"node_modules_angular_common_locales_es-NI_mjs"
	],
	"./es-PA.mjs": [
		90091,
		"node_modules_angular_common_locales_es-PA_mjs"
	],
	"./es-PE.mjs": [
		36405,
		"node_modules_angular_common_locales_es-PE_mjs"
	],
	"./es-PH.mjs": [
		95602,
		"node_modules_angular_common_locales_es-PH_mjs"
	],
	"./es-PR.mjs": [
		66556,
		"node_modules_angular_common_locales_es-PR_mjs"
	],
	"./es-PY.mjs": [
		64068,
		"node_modules_angular_common_locales_es-PY_mjs"
	],
	"./es-SV.mjs": [
		86212,
		"node_modules_angular_common_locales_es-SV_mjs"
	],
	"./es-US.mjs": [
		17334,
		"node_modules_angular_common_locales_es-US_mjs"
	],
	"./es-UY.mjs": [
		18587,
		"node_modules_angular_common_locales_es-UY_mjs"
	],
	"./es-VE.mjs": [
		48703,
		"node_modules_angular_common_locales_es-VE_mjs"
	],
	"./es.mjs": [
		47957,
		"node_modules_angular_common_locales_es_mjs"
	],
	"./et.mjs": [
		95605,
		"node_modules_angular_common_locales_et_mjs"
	],
	"./eu.mjs": [
		40417,
		"node_modules_angular_common_locales_eu_mjs"
	],
	"./ewo.mjs": [
		14381,
		"node_modules_angular_common_locales_ewo_mjs"
	],
	"./extra/af-NA.mjs": [
		91611,
		"node_modules_angular_common_locales_extra_af-NA_mjs"
	],
	"./extra/af.mjs": [
		97607,
		"node_modules_angular_common_locales_extra_af_mjs"
	],
	"./extra/agq.mjs": [
		61485,
		"node_modules_angular_common_locales_extra_agq_mjs"
	],
	"./extra/ak.mjs": [
		55892,
		"node_modules_angular_common_locales_extra_ak_mjs"
	],
	"./extra/am.mjs": [
		24898,
		"node_modules_angular_common_locales_extra_am_mjs"
	],
	"./extra/ar-AE.mjs": [
		73040,
		"node_modules_angular_common_locales_extra_ar-AE_mjs"
	],
	"./extra/ar-BH.mjs": [
		44349,
		"node_modules_angular_common_locales_extra_ar-BH_mjs"
	],
	"./extra/ar-DJ.mjs": [
		25394,
		"node_modules_angular_common_locales_extra_ar-DJ_mjs"
	],
	"./extra/ar-DZ.mjs": [
		84686,
		"node_modules_angular_common_locales_extra_ar-DZ_mjs"
	],
	"./extra/ar-EG.mjs": [
		77009,
		"node_modules_angular_common_locales_extra_ar-EG_mjs"
	],
	"./extra/ar-EH.mjs": [
		34404,
		"node_modules_angular_common_locales_extra_ar-EH_mjs"
	],
	"./extra/ar-ER.mjs": [
		34151,
		"node_modules_angular_common_locales_extra_ar-ER_mjs"
	],
	"./extra/ar-IL.mjs": [
		87600,
		"node_modules_angular_common_locales_extra_ar-IL_mjs"
	],
	"./extra/ar-IQ.mjs": [
		11012,
		"node_modules_angular_common_locales_extra_ar-IQ_mjs"
	],
	"./extra/ar-JO.mjs": [
		17809,
		"node_modules_angular_common_locales_extra_ar-JO_mjs"
	],
	"./extra/ar-KM.mjs": [
		67390,
		"node_modules_angular_common_locales_extra_ar-KM_mjs"
	],
	"./extra/ar-KW.mjs": [
		66589,
		"node_modules_angular_common_locales_extra_ar-KW_mjs"
	],
	"./extra/ar-LB.mjs": [
		51916,
		"node_modules_angular_common_locales_extra_ar-LB_mjs"
	],
	"./extra/ar-LY.mjs": [
		64253,
		"node_modules_angular_common_locales_extra_ar-LY_mjs"
	],
	"./extra/ar-MA.mjs": [
		49059,
		"node_modules_angular_common_locales_extra_ar-MA_mjs"
	],
	"./extra/ar-MR.mjs": [
		11310,
		"node_modules_angular_common_locales_extra_ar-MR_mjs"
	],
	"./extra/ar-OM.mjs": [
		33830,
		"node_modules_angular_common_locales_extra_ar-OM_mjs"
	],
	"./extra/ar-PS.mjs": [
		86951,
		"node_modules_angular_common_locales_extra_ar-PS_mjs"
	],
	"./extra/ar-QA.mjs": [
		19397,
		"node_modules_angular_common_locales_extra_ar-QA_mjs"
	],
	"./extra/ar-SA.mjs": [
		47332,
		"node_modules_angular_common_locales_extra_ar-SA_mjs"
	],
	"./extra/ar-SD.mjs": [
		7805,
		"node_modules_angular_common_locales_extra_ar-SD_mjs"
	],
	"./extra/ar-SO.mjs": [
		86297,
		"node_modules_angular_common_locales_extra_ar-SO_mjs"
	],
	"./extra/ar-SS.mjs": [
		68378,
		"node_modules_angular_common_locales_extra_ar-SS_mjs"
	],
	"./extra/ar-SY.mjs": [
		91284,
		"node_modules_angular_common_locales_extra_ar-SY_mjs"
	],
	"./extra/ar-TD.mjs": [
		46571,
		"node_modules_angular_common_locales_extra_ar-TD_mjs"
	],
	"./extra/ar-TN.mjs": [
		30436,
		"node_modules_angular_common_locales_extra_ar-TN_mjs"
	],
	"./extra/ar-YE.mjs": [
		27326,
		"node_modules_angular_common_locales_extra_ar-YE_mjs"
	],
	"./extra/ar.mjs": [
		98258,
		"node_modules_angular_common_locales_extra_ar_mjs"
	],
	"./extra/as.mjs": [
		71149,
		"node_modules_angular_common_locales_extra_as_mjs"
	],
	"./extra/asa.mjs": [
		19613,
		"node_modules_angular_common_locales_extra_asa_mjs"
	],
	"./extra/ast.mjs": [
		1388,
		"node_modules_angular_common_locales_extra_ast_mjs"
	],
	"./extra/az-Cyrl.mjs": [
		41692,
		"node_modules_angular_common_locales_extra_az-Cyrl_mjs"
	],
	"./extra/az-Latn.mjs": [
		38526,
		"node_modules_angular_common_locales_extra_az-Latn_mjs"
	],
	"./extra/az.mjs": [
		65564,
		"node_modules_angular_common_locales_extra_az_mjs"
	],
	"./extra/bas.mjs": [
		21338,
		"node_modules_angular_common_locales_extra_bas_mjs"
	],
	"./extra/be-tarask.mjs": [
		37604,
		"node_modules_angular_common_locales_extra_be-tarask_mjs"
	],
	"./extra/be.mjs": [
		2047,
		"node_modules_angular_common_locales_extra_be_mjs"
	],
	"./extra/bem.mjs": [
		99369,
		"node_modules_angular_common_locales_extra_bem_mjs"
	],
	"./extra/bez.mjs": [
		52973,
		"node_modules_angular_common_locales_extra_bez_mjs"
	],
	"./extra/bg.mjs": [
		79998,
		"node_modules_angular_common_locales_extra_bg_mjs"
	],
	"./extra/bm.mjs": [
		70560,
		"node_modules_angular_common_locales_extra_bm_mjs"
	],
	"./extra/bn-IN.mjs": [
		49847,
		"node_modules_angular_common_locales_extra_bn-IN_mjs"
	],
	"./extra/bn.mjs": [
		63323,
		"node_modules_angular_common_locales_extra_bn_mjs"
	],
	"./extra/bo-IN.mjs": [
		21859,
		"node_modules_angular_common_locales_extra_bo-IN_mjs"
	],
	"./extra/bo.mjs": [
		98154,
		"node_modules_angular_common_locales_extra_bo_mjs"
	],
	"./extra/br.mjs": [
		67663,
		"node_modules_angular_common_locales_extra_br_mjs"
	],
	"./extra/brx.mjs": [
		35937,
		"node_modules_angular_common_locales_extra_brx_mjs"
	],
	"./extra/bs-Cyrl.mjs": [
		76079,
		"node_modules_angular_common_locales_extra_bs-Cyrl_mjs"
	],
	"./extra/bs-Latn.mjs": [
		13428,
		"node_modules_angular_common_locales_extra_bs-Latn_mjs"
	],
	"./extra/bs.mjs": [
		78133,
		"node_modules_angular_common_locales_extra_bs_mjs"
	],
	"./extra/ca-AD.mjs": [
		64508,
		"node_modules_angular_common_locales_extra_ca-AD_mjs"
	],
	"./extra/ca-ES-valencia.mjs": [
		80106,
		"node_modules_angular_common_locales_extra_ca-ES-valencia_mjs"
	],
	"./extra/ca-FR.mjs": [
		22374,
		"node_modules_angular_common_locales_extra_ca-FR_mjs"
	],
	"./extra/ca-IT.mjs": [
		13082,
		"node_modules_angular_common_locales_extra_ca-IT_mjs"
	],
	"./extra/ca.mjs": [
		61425,
		"node_modules_angular_common_locales_extra_ca_mjs"
	],
	"./extra/ccp-IN.mjs": [
		29511,
		"node_modules_angular_common_locales_extra_ccp-IN_mjs"
	],
	"./extra/ccp.mjs": [
		2045,
		"node_modules_angular_common_locales_extra_ccp_mjs"
	],
	"./extra/ce.mjs": [
		81589,
		"node_modules_angular_common_locales_extra_ce_mjs"
	],
	"./extra/ceb.mjs": [
		69564,
		"node_modules_angular_common_locales_extra_ceb_mjs"
	],
	"./extra/cgg.mjs": [
		66504,
		"node_modules_angular_common_locales_extra_cgg_mjs"
	],
	"./extra/chr.mjs": [
		23302,
		"node_modules_angular_common_locales_extra_chr_mjs"
	],
	"./extra/ckb-IR.mjs": [
		91309,
		"node_modules_angular_common_locales_extra_ckb-IR_mjs"
	],
	"./extra/ckb.mjs": [
		20101,
		"node_modules_angular_common_locales_extra_ckb_mjs"
	],
	"./extra/cs.mjs": [
		72859,
		"node_modules_angular_common_locales_extra_cs_mjs"
	],
	"./extra/cy.mjs": [
		11403,
		"node_modules_angular_common_locales_extra_cy_mjs"
	],
	"./extra/da-GL.mjs": [
		86136,
		"node_modules_angular_common_locales_extra_da-GL_mjs"
	],
	"./extra/da.mjs": [
		16837,
		"node_modules_angular_common_locales_extra_da_mjs"
	],
	"./extra/dav.mjs": [
		76314,
		"node_modules_angular_common_locales_extra_dav_mjs"
	],
	"./extra/de-AT.mjs": [
		22835,
		"node_modules_angular_common_locales_extra_de-AT_mjs"
	],
	"./extra/de-BE.mjs": [
		4405,
		"node_modules_angular_common_locales_extra_de-BE_mjs"
	],
	"./extra/de-CH.mjs": [
		63548,
		"node_modules_angular_common_locales_extra_de-CH_mjs"
	],
	"./extra/de-IT.mjs": [
		49300,
		"node_modules_angular_common_locales_extra_de-IT_mjs"
	],
	"./extra/de-LI.mjs": [
		47013,
		"node_modules_angular_common_locales_extra_de-LI_mjs"
	],
	"./extra/de-LU.mjs": [
		46636,
		"node_modules_angular_common_locales_extra_de-LU_mjs"
	],
	"./extra/de.mjs": [
		99928,
		"node_modules_angular_common_locales_extra_de_mjs"
	],
	"./extra/dje.mjs": [
		54367,
		"node_modules_angular_common_locales_extra_dje_mjs"
	],
	"./extra/doi.mjs": [
		96745,
		"node_modules_angular_common_locales_extra_doi_mjs"
	],
	"./extra/dsb.mjs": [
		73981,
		"node_modules_angular_common_locales_extra_dsb_mjs"
	],
	"./extra/dua.mjs": [
		32111,
		"node_modules_angular_common_locales_extra_dua_mjs"
	],
	"./extra/dyo.mjs": [
		26601,
		"node_modules_angular_common_locales_extra_dyo_mjs"
	],
	"./extra/dz.mjs": [
		49062,
		"node_modules_angular_common_locales_extra_dz_mjs"
	],
	"./extra/ebu.mjs": [
		53521,
		"node_modules_angular_common_locales_extra_ebu_mjs"
	],
	"./extra/ee-TG.mjs": [
		61958,
		"node_modules_angular_common_locales_extra_ee-TG_mjs"
	],
	"./extra/ee.mjs": [
		46643,
		"node_modules_angular_common_locales_extra_ee_mjs"
	],
	"./extra/el-CY.mjs": [
		46679,
		"node_modules_angular_common_locales_extra_el-CY_mjs"
	],
	"./extra/el.mjs": [
		74418,
		"node_modules_angular_common_locales_extra_el_mjs"
	],
	"./extra/en-001.mjs": [
		6048,
		"node_modules_angular_common_locales_extra_en-001_mjs"
	],
	"./extra/en-150.mjs": [
		79150,
		"node_modules_angular_common_locales_extra_en-150_mjs"
	],
	"./extra/en-AE.mjs": [
		44199,
		"node_modules_angular_common_locales_extra_en-AE_mjs"
	],
	"./extra/en-AG.mjs": [
		22385,
		"node_modules_angular_common_locales_extra_en-AG_mjs"
	],
	"./extra/en-AI.mjs": [
		94228,
		"node_modules_angular_common_locales_extra_en-AI_mjs"
	],
	"./extra/en-AS.mjs": [
		71903,
		"node_modules_angular_common_locales_extra_en-AS_mjs"
	],
	"./extra/en-AT.mjs": [
		43863,
		"node_modules_angular_common_locales_extra_en-AT_mjs"
	],
	"./extra/en-AU.mjs": [
		60916,
		"node_modules_angular_common_locales_extra_en-AU_mjs"
	],
	"./extra/en-BB.mjs": [
		22279,
		"node_modules_angular_common_locales_extra_en-BB_mjs"
	],
	"./extra/en-BE.mjs": [
		61040,
		"node_modules_angular_common_locales_extra_en-BE_mjs"
	],
	"./extra/en-BI.mjs": [
		51719,
		"node_modules_angular_common_locales_extra_en-BI_mjs"
	],
	"./extra/en-BM.mjs": [
		86487,
		"node_modules_angular_common_locales_extra_en-BM_mjs"
	],
	"./extra/en-BS.mjs": [
		70129,
		"node_modules_angular_common_locales_extra_en-BS_mjs"
	],
	"./extra/en-BW.mjs": [
		88057,
		"node_modules_angular_common_locales_extra_en-BW_mjs"
	],
	"./extra/en-BZ.mjs": [
		32714,
		"node_modules_angular_common_locales_extra_en-BZ_mjs"
	],
	"./extra/en-CA.mjs": [
		84583,
		"node_modules_angular_common_locales_extra_en-CA_mjs"
	],
	"./extra/en-CC.mjs": [
		77579,
		"node_modules_angular_common_locales_extra_en-CC_mjs"
	],
	"./extra/en-CH.mjs": [
		9649,
		"node_modules_angular_common_locales_extra_en-CH_mjs"
	],
	"./extra/en-CK.mjs": [
		92351,
		"node_modules_angular_common_locales_extra_en-CK_mjs"
	],
	"./extra/en-CM.mjs": [
		13716,
		"node_modules_angular_common_locales_extra_en-CM_mjs"
	],
	"./extra/en-CX.mjs": [
		49535,
		"node_modules_angular_common_locales_extra_en-CX_mjs"
	],
	"./extra/en-CY.mjs": [
		69215,
		"node_modules_angular_common_locales_extra_en-CY_mjs"
	],
	"./extra/en-DE.mjs": [
		36983,
		"node_modules_angular_common_locales_extra_en-DE_mjs"
	],
	"./extra/en-DG.mjs": [
		24844,
		"node_modules_angular_common_locales_extra_en-DG_mjs"
	],
	"./extra/en-DK.mjs": [
		48115,
		"node_modules_angular_common_locales_extra_en-DK_mjs"
	],
	"./extra/en-DM.mjs": [
		84851,
		"node_modules_angular_common_locales_extra_en-DM_mjs"
	],
	"./extra/en-ER.mjs": [
		98481,
		"node_modules_angular_common_locales_extra_en-ER_mjs"
	],
	"./extra/en-FI.mjs": [
		97082,
		"node_modules_angular_common_locales_extra_en-FI_mjs"
	],
	"./extra/en-FJ.mjs": [
		51977,
		"node_modules_angular_common_locales_extra_en-FJ_mjs"
	],
	"./extra/en-FK.mjs": [
		32401,
		"node_modules_angular_common_locales_extra_en-FK_mjs"
	],
	"./extra/en-FM.mjs": [
		93431,
		"node_modules_angular_common_locales_extra_en-FM_mjs"
	],
	"./extra/en-GB.mjs": [
		20033,
		"node_modules_angular_common_locales_extra_en-GB_mjs"
	],
	"./extra/en-GD.mjs": [
		58815,
		"node_modules_angular_common_locales_extra_en-GD_mjs"
	],
	"./extra/en-GG.mjs": [
		28100,
		"node_modules_angular_common_locales_extra_en-GG_mjs"
	],
	"./extra/en-GH.mjs": [
		87915,
		"node_modules_angular_common_locales_extra_en-GH_mjs"
	],
	"./extra/en-GI.mjs": [
		78559,
		"node_modules_angular_common_locales_extra_en-GI_mjs"
	],
	"./extra/en-GM.mjs": [
		64259,
		"node_modules_angular_common_locales_extra_en-GM_mjs"
	],
	"./extra/en-GU.mjs": [
		3978,
		"node_modules_angular_common_locales_extra_en-GU_mjs"
	],
	"./extra/en-GY.mjs": [
		8616,
		"node_modules_angular_common_locales_extra_en-GY_mjs"
	],
	"./extra/en-HK.mjs": [
		3263,
		"node_modules_angular_common_locales_extra_en-HK_mjs"
	],
	"./extra/en-IE.mjs": [
		43790,
		"node_modules_angular_common_locales_extra_en-IE_mjs"
	],
	"./extra/en-IL.mjs": [
		41456,
		"node_modules_angular_common_locales_extra_en-IL_mjs"
	],
	"./extra/en-IM.mjs": [
		81905,
		"node_modules_angular_common_locales_extra_en-IM_mjs"
	],
	"./extra/en-IN.mjs": [
		25588,
		"node_modules_angular_common_locales_extra_en-IN_mjs"
	],
	"./extra/en-IO.mjs": [
		3799,
		"node_modules_angular_common_locales_extra_en-IO_mjs"
	],
	"./extra/en-JE.mjs": [
		32301,
		"node_modules_angular_common_locales_extra_en-JE_mjs"
	],
	"./extra/en-JM.mjs": [
		65305,
		"node_modules_angular_common_locales_extra_en-JM_mjs"
	],
	"./extra/en-KE.mjs": [
		61908,
		"node_modules_angular_common_locales_extra_en-KE_mjs"
	],
	"./extra/en-KI.mjs": [
		20343,
		"node_modules_angular_common_locales_extra_en-KI_mjs"
	],
	"./extra/en-KN.mjs": [
		96161,
		"node_modules_angular_common_locales_extra_en-KN_mjs"
	],
	"./extra/en-KY.mjs": [
		89460,
		"node_modules_angular_common_locales_extra_en-KY_mjs"
	],
	"./extra/en-LC.mjs": [
		85599,
		"node_modules_angular_common_locales_extra_en-LC_mjs"
	],
	"./extra/en-LR.mjs": [
		11013,
		"node_modules_angular_common_locales_extra_en-LR_mjs"
	],
	"./extra/en-LS.mjs": [
		43868,
		"node_modules_angular_common_locales_extra_en-LS_mjs"
	],
	"./extra/en-MG.mjs": [
		14211,
		"node_modules_angular_common_locales_extra_en-MG_mjs"
	],
	"./extra/en-MH.mjs": [
		94337,
		"node_modules_angular_common_locales_extra_en-MH_mjs"
	],
	"./extra/en-MO.mjs": [
		82067,
		"node_modules_angular_common_locales_extra_en-MO_mjs"
	],
	"./extra/en-MP.mjs": [
		13762,
		"node_modules_angular_common_locales_extra_en-MP_mjs"
	],
	"./extra/en-MS.mjs": [
		61683,
		"node_modules_angular_common_locales_extra_en-MS_mjs"
	],
	"./extra/en-MT.mjs": [
		96308,
		"node_modules_angular_common_locales_extra_en-MT_mjs"
	],
	"./extra/en-MU.mjs": [
		25839,
		"node_modules_angular_common_locales_extra_en-MU_mjs"
	],
	"./extra/en-MV.mjs": [
		93550,
		"node_modules_angular_common_locales_extra_en-MV_mjs"
	],
	"./extra/en-MW.mjs": [
		50164,
		"node_modules_angular_common_locales_extra_en-MW_mjs"
	],
	"./extra/en-MY.mjs": [
		82692,
		"node_modules_angular_common_locales_extra_en-MY_mjs"
	],
	"./extra/en-NA.mjs": [
		15559,
		"node_modules_angular_common_locales_extra_en-NA_mjs"
	],
	"./extra/en-NF.mjs": [
		47794,
		"node_modules_angular_common_locales_extra_en-NF_mjs"
	],
	"./extra/en-NG.mjs": [
		34449,
		"node_modules_angular_common_locales_extra_en-NG_mjs"
	],
	"./extra/en-NL.mjs": [
		77828,
		"node_modules_angular_common_locales_extra_en-NL_mjs"
	],
	"./extra/en-NR.mjs": [
		87521,
		"node_modules_angular_common_locales_extra_en-NR_mjs"
	],
	"./extra/en-NU.mjs": [
		72231,
		"node_modules_angular_common_locales_extra_en-NU_mjs"
	],
	"./extra/en-NZ.mjs": [
		85486,
		"node_modules_angular_common_locales_extra_en-NZ_mjs"
	],
	"./extra/en-PG.mjs": [
		35862,
		"node_modules_angular_common_locales_extra_en-PG_mjs"
	],
	"./extra/en-PH.mjs": [
		37797,
		"node_modules_angular_common_locales_extra_en-PH_mjs"
	],
	"./extra/en-PK.mjs": [
		61504,
		"node_modules_angular_common_locales_extra_en-PK_mjs"
	],
	"./extra/en-PN.mjs": [
		66507,
		"node_modules_angular_common_locales_extra_en-PN_mjs"
	],
	"./extra/en-PR.mjs": [
		50998,
		"node_modules_angular_common_locales_extra_en-PR_mjs"
	],
	"./extra/en-PW.mjs": [
		5563,
		"node_modules_angular_common_locales_extra_en-PW_mjs"
	],
	"./extra/en-RW.mjs": [
		66083,
		"node_modules_angular_common_locales_extra_en-RW_mjs"
	],
	"./extra/en-SB.mjs": [
		71869,
		"node_modules_angular_common_locales_extra_en-SB_mjs"
	],
	"./extra/en-SC.mjs": [
		83075,
		"node_modules_angular_common_locales_extra_en-SC_mjs"
	],
	"./extra/en-SD.mjs": [
		70321,
		"node_modules_angular_common_locales_extra_en-SD_mjs"
	],
	"./extra/en-SE.mjs": [
		9098,
		"node_modules_angular_common_locales_extra_en-SE_mjs"
	],
	"./extra/en-SG.mjs": [
		24137,
		"node_modules_angular_common_locales_extra_en-SG_mjs"
	],
	"./extra/en-SH.mjs": [
		44338,
		"node_modules_angular_common_locales_extra_en-SH_mjs"
	],
	"./extra/en-SI.mjs": [
		90467,
		"node_modules_angular_common_locales_extra_en-SI_mjs"
	],
	"./extra/en-SL.mjs": [
		79543,
		"node_modules_angular_common_locales_extra_en-SL_mjs"
	],
	"./extra/en-SS.mjs": [
		27822,
		"node_modules_angular_common_locales_extra_en-SS_mjs"
	],
	"./extra/en-SX.mjs": [
		53795,
		"node_modules_angular_common_locales_extra_en-SX_mjs"
	],
	"./extra/en-SZ.mjs": [
		92414,
		"node_modules_angular_common_locales_extra_en-SZ_mjs"
	],
	"./extra/en-TC.mjs": [
		90819,
		"node_modules_angular_common_locales_extra_en-TC_mjs"
	],
	"./extra/en-TK.mjs": [
		35632,
		"node_modules_angular_common_locales_extra_en-TK_mjs"
	],
	"./extra/en-TO.mjs": [
		29512,
		"node_modules_angular_common_locales_extra_en-TO_mjs"
	],
	"./extra/en-TT.mjs": [
		86549,
		"node_modules_angular_common_locales_extra_en-TT_mjs"
	],
	"./extra/en-TV.mjs": [
		16689,
		"node_modules_angular_common_locales_extra_en-TV_mjs"
	],
	"./extra/en-TZ.mjs": [
		30038,
		"node_modules_angular_common_locales_extra_en-TZ_mjs"
	],
	"./extra/en-UG.mjs": [
		77106,
		"node_modules_angular_common_locales_extra_en-UG_mjs"
	],
	"./extra/en-UM.mjs": [
		60182,
		"node_modules_angular_common_locales_extra_en-UM_mjs"
	],
	"./extra/en-VC.mjs": [
		65408,
		"node_modules_angular_common_locales_extra_en-VC_mjs"
	],
	"./extra/en-VG.mjs": [
		15250,
		"node_modules_angular_common_locales_extra_en-VG_mjs"
	],
	"./extra/en-VI.mjs": [
		62264,
		"node_modules_angular_common_locales_extra_en-VI_mjs"
	],
	"./extra/en-VU.mjs": [
		6599,
		"node_modules_angular_common_locales_extra_en-VU_mjs"
	],
	"./extra/en-WS.mjs": [
		2941,
		"node_modules_angular_common_locales_extra_en-WS_mjs"
	],
	"./extra/en-ZA.mjs": [
		84522,
		"node_modules_angular_common_locales_extra_en-ZA_mjs"
	],
	"./extra/en-ZM.mjs": [
		25823,
		"node_modules_angular_common_locales_extra_en-ZM_mjs"
	],
	"./extra/en-ZW.mjs": [
		49530,
		"node_modules_angular_common_locales_extra_en-ZW_mjs"
	],
	"./extra/en.mjs": [
		10138,
		"node_modules_angular_common_locales_extra_en_mjs"
	],
	"./extra/eo.mjs": [
		93798,
		"node_modules_angular_common_locales_extra_eo_mjs"
	],
	"./extra/es-419.mjs": [
		67773,
		"node_modules_angular_common_locales_extra_es-419_mjs"
	],
	"./extra/es-AR.mjs": [
		69675,
		"node_modules_angular_common_locales_extra_es-AR_mjs"
	],
	"./extra/es-BO.mjs": [
		63401,
		"node_modules_angular_common_locales_extra_es-BO_mjs"
	],
	"./extra/es-BR.mjs": [
		4897,
		"node_modules_angular_common_locales_extra_es-BR_mjs"
	],
	"./extra/es-BZ.mjs": [
		47904,
		"node_modules_angular_common_locales_extra_es-BZ_mjs"
	],
	"./extra/es-CL.mjs": [
		32002,
		"node_modules_angular_common_locales_extra_es-CL_mjs"
	],
	"./extra/es-CO.mjs": [
		45726,
		"node_modules_angular_common_locales_extra_es-CO_mjs"
	],
	"./extra/es-CR.mjs": [
		3537,
		"node_modules_angular_common_locales_extra_es-CR_mjs"
	],
	"./extra/es-CU.mjs": [
		53072,
		"node_modules_angular_common_locales_extra_es-CU_mjs"
	],
	"./extra/es-DO.mjs": [
		86317,
		"node_modules_angular_common_locales_extra_es-DO_mjs"
	],
	"./extra/es-EA.mjs": [
		88579,
		"node_modules_angular_common_locales_extra_es-EA_mjs"
	],
	"./extra/es-EC.mjs": [
		94698,
		"node_modules_angular_common_locales_extra_es-EC_mjs"
	],
	"./extra/es-GQ.mjs": [
		37722,
		"node_modules_angular_common_locales_extra_es-GQ_mjs"
	],
	"./extra/es-GT.mjs": [
		89593,
		"node_modules_angular_common_locales_extra_es-GT_mjs"
	],
	"./extra/es-HN.mjs": [
		90895,
		"node_modules_angular_common_locales_extra_es-HN_mjs"
	],
	"./extra/es-IC.mjs": [
		37678,
		"node_modules_angular_common_locales_extra_es-IC_mjs"
	],
	"./extra/es-MX.mjs": [
		50944,
		"node_modules_angular_common_locales_extra_es-MX_mjs"
	],
	"./extra/es-NI.mjs": [
		74548,
		"node_modules_angular_common_locales_extra_es-NI_mjs"
	],
	"./extra/es-PA.mjs": [
		88286,
		"node_modules_angular_common_locales_extra_es-PA_mjs"
	],
	"./extra/es-PE.mjs": [
		36370,
		"node_modules_angular_common_locales_extra_es-PE_mjs"
	],
	"./extra/es-PH.mjs": [
		66501,
		"node_modules_angular_common_locales_extra_es-PH_mjs"
	],
	"./extra/es-PR.mjs": [
		58477,
		"node_modules_angular_common_locales_extra_es-PR_mjs"
	],
	"./extra/es-PY.mjs": [
		32552,
		"node_modules_angular_common_locales_extra_es-PY_mjs"
	],
	"./extra/es-SV.mjs": [
		46531,
		"node_modules_angular_common_locales_extra_es-SV_mjs"
	],
	"./extra/es-US.mjs": [
		33046,
		"node_modules_angular_common_locales_extra_es-US_mjs"
	],
	"./extra/es-UY.mjs": [
		70965,
		"node_modules_angular_common_locales_extra_es-UY_mjs"
	],
	"./extra/es-VE.mjs": [
		11104,
		"node_modules_angular_common_locales_extra_es-VE_mjs"
	],
	"./extra/es.mjs": [
		16833,
		"node_modules_angular_common_locales_extra_es_mjs"
	],
	"./extra/et.mjs": [
		26874,
		"node_modules_angular_common_locales_extra_et_mjs"
	],
	"./extra/eu.mjs": [
		1671,
		"node_modules_angular_common_locales_extra_eu_mjs"
	],
	"./extra/ewo.mjs": [
		15308,
		"node_modules_angular_common_locales_extra_ewo_mjs"
	],
	"./extra/fa-AF.mjs": [
		69711,
		"node_modules_angular_common_locales_extra_fa-AF_mjs"
	],
	"./extra/fa.mjs": [
		46780,
		"node_modules_angular_common_locales_extra_fa_mjs"
	],
	"./extra/ff-Adlm-BF.mjs": [
		20808,
		"node_modules_angular_common_locales_extra_ff-Adlm-BF_mjs"
	],
	"./extra/ff-Adlm-CM.mjs": [
		56271,
		"node_modules_angular_common_locales_extra_ff-Adlm-CM_mjs"
	],
	"./extra/ff-Adlm-GH.mjs": [
		89936,
		"node_modules_angular_common_locales_extra_ff-Adlm-GH_mjs"
	],
	"./extra/ff-Adlm-GM.mjs": [
		88708,
		"node_modules_angular_common_locales_extra_ff-Adlm-GM_mjs"
	],
	"./extra/ff-Adlm-GW.mjs": [
		77631,
		"node_modules_angular_common_locales_extra_ff-Adlm-GW_mjs"
	],
	"./extra/ff-Adlm-LR.mjs": [
		95908,
		"node_modules_angular_common_locales_extra_ff-Adlm-LR_mjs"
	],
	"./extra/ff-Adlm-MR.mjs": [
		94268,
		"node_modules_angular_common_locales_extra_ff-Adlm-MR_mjs"
	],
	"./extra/ff-Adlm-NE.mjs": [
		65615,
		"node_modules_angular_common_locales_extra_ff-Adlm-NE_mjs"
	],
	"./extra/ff-Adlm-NG.mjs": [
		8203,
		"node_modules_angular_common_locales_extra_ff-Adlm-NG_mjs"
	],
	"./extra/ff-Adlm-SL.mjs": [
		43897,
		"node_modules_angular_common_locales_extra_ff-Adlm-SL_mjs"
	],
	"./extra/ff-Adlm-SN.mjs": [
		38099,
		"node_modules_angular_common_locales_extra_ff-Adlm-SN_mjs"
	],
	"./extra/ff-Adlm.mjs": [
		94163,
		"node_modules_angular_common_locales_extra_ff-Adlm_mjs"
	],
	"./extra/ff-CM.mjs": [
		47318,
		"node_modules_angular_common_locales_extra_ff-CM_mjs"
	],
	"./extra/ff-GN.mjs": [
		78299,
		"node_modules_angular_common_locales_extra_ff-GN_mjs"
	],
	"./extra/ff-Latn-BF.mjs": [
		77817,
		"node_modules_angular_common_locales_extra_ff-Latn-BF_mjs"
	],
	"./extra/ff-Latn-CM.mjs": [
		47986,
		"node_modules_angular_common_locales_extra_ff-Latn-CM_mjs"
	],
	"./extra/ff-Latn-GH.mjs": [
		92393,
		"node_modules_angular_common_locales_extra_ff-Latn-GH_mjs"
	],
	"./extra/ff-Latn-GM.mjs": [
		96379,
		"node_modules_angular_common_locales_extra_ff-Latn-GM_mjs"
	],
	"./extra/ff-Latn-GN.mjs": [
		96101,
		"node_modules_angular_common_locales_extra_ff-Latn-GN_mjs"
	],
	"./extra/ff-Latn-GW.mjs": [
		89461,
		"node_modules_angular_common_locales_extra_ff-Latn-GW_mjs"
	],
	"./extra/ff-Latn-LR.mjs": [
		29668,
		"node_modules_angular_common_locales_extra_ff-Latn-LR_mjs"
	],
	"./extra/ff-Latn-MR.mjs": [
		27301,
		"node_modules_angular_common_locales_extra_ff-Latn-MR_mjs"
	],
	"./extra/ff-Latn-NE.mjs": [
		95626,
		"node_modules_angular_common_locales_extra_ff-Latn-NE_mjs"
	],
	"./extra/ff-Latn-NG.mjs": [
		23894,
		"node_modules_angular_common_locales_extra_ff-Latn-NG_mjs"
	],
	"./extra/ff-Latn-SL.mjs": [
		45239,
		"node_modules_angular_common_locales_extra_ff-Latn-SL_mjs"
	],
	"./extra/ff-Latn.mjs": [
		57247,
		"node_modules_angular_common_locales_extra_ff-Latn_mjs"
	],
	"./extra/ff-MR.mjs": [
		99391,
		"node_modules_angular_common_locales_extra_ff-MR_mjs"
	],
	"./extra/ff.mjs": [
		5152,
		"node_modules_angular_common_locales_extra_ff_mjs"
	],
	"./extra/fi.mjs": [
		95876,
		"node_modules_angular_common_locales_extra_fi_mjs"
	],
	"./extra/fil.mjs": [
		83820,
		"node_modules_angular_common_locales_extra_fil_mjs"
	],
	"./extra/fo-DK.mjs": [
		51062,
		"node_modules_angular_common_locales_extra_fo-DK_mjs"
	],
	"./extra/fo.mjs": [
		57228,
		"node_modules_angular_common_locales_extra_fo_mjs"
	],
	"./extra/fr-BE.mjs": [
		7541,
		"node_modules_angular_common_locales_extra_fr-BE_mjs"
	],
	"./extra/fr-BF.mjs": [
		86922,
		"node_modules_angular_common_locales_extra_fr-BF_mjs"
	],
	"./extra/fr-BI.mjs": [
		84126,
		"node_modules_angular_common_locales_extra_fr-BI_mjs"
	],
	"./extra/fr-BJ.mjs": [
		13033,
		"node_modules_angular_common_locales_extra_fr-BJ_mjs"
	],
	"./extra/fr-BL.mjs": [
		31151,
		"node_modules_angular_common_locales_extra_fr-BL_mjs"
	],
	"./extra/fr-CA.mjs": [
		59719,
		"node_modules_angular_common_locales_extra_fr-CA_mjs"
	],
	"./extra/fr-CD.mjs": [
		84305,
		"node_modules_angular_common_locales_extra_fr-CD_mjs"
	],
	"./extra/fr-CF.mjs": [
		47597,
		"node_modules_angular_common_locales_extra_fr-CF_mjs"
	],
	"./extra/fr-CG.mjs": [
		63512,
		"node_modules_angular_common_locales_extra_fr-CG_mjs"
	],
	"./extra/fr-CH.mjs": [
		48181,
		"node_modules_angular_common_locales_extra_fr-CH_mjs"
	],
	"./extra/fr-CI.mjs": [
		27991,
		"node_modules_angular_common_locales_extra_fr-CI_mjs"
	],
	"./extra/fr-CM.mjs": [
		86400,
		"node_modules_angular_common_locales_extra_fr-CM_mjs"
	],
	"./extra/fr-DJ.mjs": [
		2238,
		"node_modules_angular_common_locales_extra_fr-DJ_mjs"
	],
	"./extra/fr-DZ.mjs": [
		48865,
		"node_modules_angular_common_locales_extra_fr-DZ_mjs"
	],
	"./extra/fr-GA.mjs": [
		7114,
		"node_modules_angular_common_locales_extra_fr-GA_mjs"
	],
	"./extra/fr-GF.mjs": [
		97057,
		"node_modules_angular_common_locales_extra_fr-GF_mjs"
	],
	"./extra/fr-GN.mjs": [
		47156,
		"node_modules_angular_common_locales_extra_fr-GN_mjs"
	],
	"./extra/fr-GP.mjs": [
		96659,
		"node_modules_angular_common_locales_extra_fr-GP_mjs"
	],
	"./extra/fr-GQ.mjs": [
		70283,
		"node_modules_angular_common_locales_extra_fr-GQ_mjs"
	],
	"./extra/fr-HT.mjs": [
		26885,
		"node_modules_angular_common_locales_extra_fr-HT_mjs"
	],
	"./extra/fr-KM.mjs": [
		19982,
		"node_modules_angular_common_locales_extra_fr-KM_mjs"
	],
	"./extra/fr-LU.mjs": [
		37248,
		"node_modules_angular_common_locales_extra_fr-LU_mjs"
	],
	"./extra/fr-MA.mjs": [
		12618,
		"node_modules_angular_common_locales_extra_fr-MA_mjs"
	],
	"./extra/fr-MC.mjs": [
		37171,
		"node_modules_angular_common_locales_extra_fr-MC_mjs"
	],
	"./extra/fr-MF.mjs": [
		91387,
		"node_modules_angular_common_locales_extra_fr-MF_mjs"
	],
	"./extra/fr-MG.mjs": [
		61620,
		"node_modules_angular_common_locales_extra_fr-MG_mjs"
	],
	"./extra/fr-ML.mjs": [
		862,
		"node_modules_angular_common_locales_extra_fr-ML_mjs"
	],
	"./extra/fr-MQ.mjs": [
		35959,
		"node_modules_angular_common_locales_extra_fr-MQ_mjs"
	],
	"./extra/fr-MR.mjs": [
		45332,
		"node_modules_angular_common_locales_extra_fr-MR_mjs"
	],
	"./extra/fr-MU.mjs": [
		74632,
		"node_modules_angular_common_locales_extra_fr-MU_mjs"
	],
	"./extra/fr-NC.mjs": [
		27949,
		"node_modules_angular_common_locales_extra_fr-NC_mjs"
	],
	"./extra/fr-NE.mjs": [
		93573,
		"node_modules_angular_common_locales_extra_fr-NE_mjs"
	],
	"./extra/fr-PF.mjs": [
		56039,
		"node_modules_angular_common_locales_extra_fr-PF_mjs"
	],
	"./extra/fr-PM.mjs": [
		12691,
		"node_modules_angular_common_locales_extra_fr-PM_mjs"
	],
	"./extra/fr-RE.mjs": [
		18685,
		"node_modules_angular_common_locales_extra_fr-RE_mjs"
	],
	"./extra/fr-RW.mjs": [
		95882,
		"node_modules_angular_common_locales_extra_fr-RW_mjs"
	],
	"./extra/fr-SC.mjs": [
		85659,
		"node_modules_angular_common_locales_extra_fr-SC_mjs"
	],
	"./extra/fr-SN.mjs": [
		70802,
		"node_modules_angular_common_locales_extra_fr-SN_mjs"
	],
	"./extra/fr-SY.mjs": [
		60516,
		"node_modules_angular_common_locales_extra_fr-SY_mjs"
	],
	"./extra/fr-TD.mjs": [
		96476,
		"node_modules_angular_common_locales_extra_fr-TD_mjs"
	],
	"./extra/fr-TG.mjs": [
		63089,
		"node_modules_angular_common_locales_extra_fr-TG_mjs"
	],
	"./extra/fr-TN.mjs": [
		44242,
		"node_modules_angular_common_locales_extra_fr-TN_mjs"
	],
	"./extra/fr-VU.mjs": [
		64018,
		"node_modules_angular_common_locales_extra_fr-VU_mjs"
	],
	"./extra/fr-WF.mjs": [
		51935,
		"node_modules_angular_common_locales_extra_fr-WF_mjs"
	],
	"./extra/fr-YT.mjs": [
		66435,
		"node_modules_angular_common_locales_extra_fr-YT_mjs"
	],
	"./extra/fr.mjs": [
		46767,
		"node_modules_angular_common_locales_extra_fr_mjs"
	],
	"./extra/fur.mjs": [
		35266,
		"node_modules_angular_common_locales_extra_fur_mjs"
	],
	"./extra/fy.mjs": [
		10657,
		"node_modules_angular_common_locales_extra_fy_mjs"
	],
	"./extra/ga-GB.mjs": [
		30161,
		"node_modules_angular_common_locales_extra_ga-GB_mjs"
	],
	"./extra/ga.mjs": [
		21400,
		"node_modules_angular_common_locales_extra_ga_mjs"
	],
	"./extra/gd.mjs": [
		56088,
		"node_modules_angular_common_locales_extra_gd_mjs"
	],
	"./extra/gl.mjs": [
		85998,
		"node_modules_angular_common_locales_extra_gl_mjs"
	],
	"./extra/gsw-FR.mjs": [
		63144,
		"node_modules_angular_common_locales_extra_gsw-FR_mjs"
	],
	"./extra/gsw-LI.mjs": [
		75711,
		"node_modules_angular_common_locales_extra_gsw-LI_mjs"
	],
	"./extra/gsw.mjs": [
		33746,
		"node_modules_angular_common_locales_extra_gsw_mjs"
	],
	"./extra/gu.mjs": [
		67516,
		"node_modules_angular_common_locales_extra_gu_mjs"
	],
	"./extra/guz.mjs": [
		53749,
		"node_modules_angular_common_locales_extra_guz_mjs"
	],
	"./extra/gv.mjs": [
		22634,
		"node_modules_angular_common_locales_extra_gv_mjs"
	],
	"./extra/ha-GH.mjs": [
		32491,
		"node_modules_angular_common_locales_extra_ha-GH_mjs"
	],
	"./extra/ha-NE.mjs": [
		7287,
		"node_modules_angular_common_locales_extra_ha-NE_mjs"
	],
	"./extra/ha.mjs": [
		19581,
		"node_modules_angular_common_locales_extra_ha_mjs"
	],
	"./extra/haw.mjs": [
		37081,
		"node_modules_angular_common_locales_extra_haw_mjs"
	],
	"./extra/he.mjs": [
		19036,
		"node_modules_angular_common_locales_extra_he_mjs"
	],
	"./extra/hi-Latn.mjs": [
		31927,
		"node_modules_angular_common_locales_extra_hi-Latn_mjs"
	],
	"./extra/hi.mjs": [
		10539,
		"node_modules_angular_common_locales_extra_hi_mjs"
	],
	"./extra/hr-BA.mjs": [
		64873,
		"node_modules_angular_common_locales_extra_hr-BA_mjs"
	],
	"./extra/hr.mjs": [
		97985,
		"node_modules_angular_common_locales_extra_hr_mjs"
	],
	"./extra/hsb.mjs": [
		29741,
		"node_modules_angular_common_locales_extra_hsb_mjs"
	],
	"./extra/hu.mjs": [
		89812,
		"node_modules_angular_common_locales_extra_hu_mjs"
	],
	"./extra/hy.mjs": [
		54891,
		"node_modules_angular_common_locales_extra_hy_mjs"
	],
	"./extra/ia.mjs": [
		26072,
		"node_modules_angular_common_locales_extra_ia_mjs"
	],
	"./extra/id.mjs": [
		66179,
		"node_modules_angular_common_locales_extra_id_mjs"
	],
	"./extra/ig.mjs": [
		24753,
		"node_modules_angular_common_locales_extra_ig_mjs"
	],
	"./extra/ii.mjs": [
		71597,
		"node_modules_angular_common_locales_extra_ii_mjs"
	],
	"./extra/is.mjs": [
		45560,
		"node_modules_angular_common_locales_extra_is_mjs"
	],
	"./extra/it-CH.mjs": [
		28673,
		"node_modules_angular_common_locales_extra_it-CH_mjs"
	],
	"./extra/it-SM.mjs": [
		28536,
		"node_modules_angular_common_locales_extra_it-SM_mjs"
	],
	"./extra/it-VA.mjs": [
		70214,
		"node_modules_angular_common_locales_extra_it-VA_mjs"
	],
	"./extra/it.mjs": [
		29383,
		"node_modules_angular_common_locales_extra_it_mjs"
	],
	"./extra/ja.mjs": [
		75047,
		"node_modules_angular_common_locales_extra_ja_mjs"
	],
	"./extra/jgo.mjs": [
		27023,
		"node_modules_angular_common_locales_extra_jgo_mjs"
	],
	"./extra/jmc.mjs": [
		4474,
		"node_modules_angular_common_locales_extra_jmc_mjs"
	],
	"./extra/jv.mjs": [
		89664,
		"node_modules_angular_common_locales_extra_jv_mjs"
	],
	"./extra/ka.mjs": [
		58449,
		"node_modules_angular_common_locales_extra_ka_mjs"
	],
	"./extra/kab.mjs": [
		65569,
		"node_modules_angular_common_locales_extra_kab_mjs"
	],
	"./extra/kam.mjs": [
		10926,
		"node_modules_angular_common_locales_extra_kam_mjs"
	],
	"./extra/kde.mjs": [
		35459,
		"node_modules_angular_common_locales_extra_kde_mjs"
	],
	"./extra/kea.mjs": [
		46268,
		"node_modules_angular_common_locales_extra_kea_mjs"
	],
	"./extra/kgp.mjs": [
		71113,
		"node_modules_angular_common_locales_extra_kgp_mjs"
	],
	"./extra/khq.mjs": [
		25489,
		"node_modules_angular_common_locales_extra_khq_mjs"
	],
	"./extra/ki.mjs": [
		98501,
		"node_modules_angular_common_locales_extra_ki_mjs"
	],
	"./extra/kk.mjs": [
		22367,
		"node_modules_angular_common_locales_extra_kk_mjs"
	],
	"./extra/kkj.mjs": [
		43337,
		"node_modules_angular_common_locales_extra_kkj_mjs"
	],
	"./extra/kl.mjs": [
		78635,
		"node_modules_angular_common_locales_extra_kl_mjs"
	],
	"./extra/kln.mjs": [
		83699,
		"node_modules_angular_common_locales_extra_kln_mjs"
	],
	"./extra/km.mjs": [
		50113,
		"node_modules_angular_common_locales_extra_km_mjs"
	],
	"./extra/kn.mjs": [
		54694,
		"node_modules_angular_common_locales_extra_kn_mjs"
	],
	"./extra/ko-KP.mjs": [
		95136,
		"node_modules_angular_common_locales_extra_ko-KP_mjs"
	],
	"./extra/ko.mjs": [
		74266,
		"node_modules_angular_common_locales_extra_ko_mjs"
	],
	"./extra/kok.mjs": [
		22691,
		"node_modules_angular_common_locales_extra_kok_mjs"
	],
	"./extra/ks-Arab.mjs": [
		57765,
		"node_modules_angular_common_locales_extra_ks-Arab_mjs"
	],
	"./extra/ks-Deva.mjs": [
		81266,
		"node_modules_angular_common_locales_extra_ks-Deva_mjs"
	],
	"./extra/ks.mjs": [
		65164,
		"node_modules_angular_common_locales_extra_ks_mjs"
	],
	"./extra/ksb.mjs": [
		98203,
		"node_modules_angular_common_locales_extra_ksb_mjs"
	],
	"./extra/ksf.mjs": [
		27052,
		"node_modules_angular_common_locales_extra_ksf_mjs"
	],
	"./extra/ksh.mjs": [
		97392,
		"node_modules_angular_common_locales_extra_ksh_mjs"
	],
	"./extra/ku.mjs": [
		98754,
		"node_modules_angular_common_locales_extra_ku_mjs"
	],
	"./extra/kw.mjs": [
		29280,
		"node_modules_angular_common_locales_extra_kw_mjs"
	],
	"./extra/ky.mjs": [
		72047,
		"node_modules_angular_common_locales_extra_ky_mjs"
	],
	"./extra/lag.mjs": [
		87109,
		"node_modules_angular_common_locales_extra_lag_mjs"
	],
	"./extra/lb.mjs": [
		49451,
		"node_modules_angular_common_locales_extra_lb_mjs"
	],
	"./extra/lg.mjs": [
		9784,
		"node_modules_angular_common_locales_extra_lg_mjs"
	],
	"./extra/lkt.mjs": [
		80939,
		"node_modules_angular_common_locales_extra_lkt_mjs"
	],
	"./extra/ln-AO.mjs": [
		99376,
		"node_modules_angular_common_locales_extra_ln-AO_mjs"
	],
	"./extra/ln-CF.mjs": [
		71440,
		"node_modules_angular_common_locales_extra_ln-CF_mjs"
	],
	"./extra/ln-CG.mjs": [
		97455,
		"node_modules_angular_common_locales_extra_ln-CG_mjs"
	],
	"./extra/ln.mjs": [
		68328,
		"node_modules_angular_common_locales_extra_ln_mjs"
	],
	"./extra/lo.mjs": [
		95157,
		"node_modules_angular_common_locales_extra_lo_mjs"
	],
	"./extra/lrc-IQ.mjs": [
		31119,
		"node_modules_angular_common_locales_extra_lrc-IQ_mjs"
	],
	"./extra/lrc.mjs": [
		96847,
		"node_modules_angular_common_locales_extra_lrc_mjs"
	],
	"./extra/lt.mjs": [
		50365,
		"node_modules_angular_common_locales_extra_lt_mjs"
	],
	"./extra/lu.mjs": [
		85581,
		"node_modules_angular_common_locales_extra_lu_mjs"
	],
	"./extra/luo.mjs": [
		97024,
		"node_modules_angular_common_locales_extra_luo_mjs"
	],
	"./extra/luy.mjs": [
		77086,
		"node_modules_angular_common_locales_extra_luy_mjs"
	],
	"./extra/lv.mjs": [
		16321,
		"node_modules_angular_common_locales_extra_lv_mjs"
	],
	"./extra/mai.mjs": [
		75131,
		"node_modules_angular_common_locales_extra_mai_mjs"
	],
	"./extra/mas-TZ.mjs": [
		71518,
		"node_modules_angular_common_locales_extra_mas-TZ_mjs"
	],
	"./extra/mas.mjs": [
		84436,
		"node_modules_angular_common_locales_extra_mas_mjs"
	],
	"./extra/mer.mjs": [
		78060,
		"node_modules_angular_common_locales_extra_mer_mjs"
	],
	"./extra/mfe.mjs": [
		59802,
		"node_modules_angular_common_locales_extra_mfe_mjs"
	],
	"./extra/mg.mjs": [
		52205,
		"node_modules_angular_common_locales_extra_mg_mjs"
	],
	"./extra/mgh.mjs": [
		93169,
		"node_modules_angular_common_locales_extra_mgh_mjs"
	],
	"./extra/mgo.mjs": [
		8930,
		"node_modules_angular_common_locales_extra_mgo_mjs"
	],
	"./extra/mi.mjs": [
		63339,
		"node_modules_angular_common_locales_extra_mi_mjs"
	],
	"./extra/mk.mjs": [
		41588,
		"node_modules_angular_common_locales_extra_mk_mjs"
	],
	"./extra/ml.mjs": [
		28709,
		"node_modules_angular_common_locales_extra_ml_mjs"
	],
	"./extra/mn.mjs": [
		23033,
		"node_modules_angular_common_locales_extra_mn_mjs"
	],
	"./extra/mni-Beng.mjs": [
		40394,
		"node_modules_angular_common_locales_extra_mni-Beng_mjs"
	],
	"./extra/mni.mjs": [
		5569,
		"node_modules_angular_common_locales_extra_mni_mjs"
	],
	"./extra/mr.mjs": [
		77271,
		"node_modules_angular_common_locales_extra_mr_mjs"
	],
	"./extra/ms-BN.mjs": [
		37696,
		"node_modules_angular_common_locales_extra_ms-BN_mjs"
	],
	"./extra/ms-ID.mjs": [
		84839,
		"node_modules_angular_common_locales_extra_ms-ID_mjs"
	],
	"./extra/ms-SG.mjs": [
		33022,
		"node_modules_angular_common_locales_extra_ms-SG_mjs"
	],
	"./extra/ms.mjs": [
		88701,
		"node_modules_angular_common_locales_extra_ms_mjs"
	],
	"./extra/mt.mjs": [
		86582,
		"node_modules_angular_common_locales_extra_mt_mjs"
	],
	"./extra/mua.mjs": [
		78790,
		"node_modules_angular_common_locales_extra_mua_mjs"
	],
	"./extra/my.mjs": [
		18952,
		"node_modules_angular_common_locales_extra_my_mjs"
	],
	"./extra/mzn.mjs": [
		52428,
		"node_modules_angular_common_locales_extra_mzn_mjs"
	],
	"./extra/naq.mjs": [
		24889,
		"node_modules_angular_common_locales_extra_naq_mjs"
	],
	"./extra/nb-SJ.mjs": [
		65341,
		"node_modules_angular_common_locales_extra_nb-SJ_mjs"
	],
	"./extra/nb.mjs": [
		53546,
		"node_modules_angular_common_locales_extra_nb_mjs"
	],
	"./extra/nd.mjs": [
		65169,
		"node_modules_angular_common_locales_extra_nd_mjs"
	],
	"./extra/nds-NL.mjs": [
		41559,
		"node_modules_angular_common_locales_extra_nds-NL_mjs"
	],
	"./extra/nds.mjs": [
		35026,
		"node_modules_angular_common_locales_extra_nds_mjs"
	],
	"./extra/ne-IN.mjs": [
		32794,
		"node_modules_angular_common_locales_extra_ne-IN_mjs"
	],
	"./extra/ne.mjs": [
		57643,
		"node_modules_angular_common_locales_extra_ne_mjs"
	],
	"./extra/nl-AW.mjs": [
		56321,
		"node_modules_angular_common_locales_extra_nl-AW_mjs"
	],
	"./extra/nl-BE.mjs": [
		87333,
		"node_modules_angular_common_locales_extra_nl-BE_mjs"
	],
	"./extra/nl-BQ.mjs": [
		75571,
		"node_modules_angular_common_locales_extra_nl-BQ_mjs"
	],
	"./extra/nl-CW.mjs": [
		62374,
		"node_modules_angular_common_locales_extra_nl-CW_mjs"
	],
	"./extra/nl-SR.mjs": [
		27854,
		"node_modules_angular_common_locales_extra_nl-SR_mjs"
	],
	"./extra/nl-SX.mjs": [
		43957,
		"node_modules_angular_common_locales_extra_nl-SX_mjs"
	],
	"./extra/nl.mjs": [
		33314,
		"node_modules_angular_common_locales_extra_nl_mjs"
	],
	"./extra/nmg.mjs": [
		3299,
		"node_modules_angular_common_locales_extra_nmg_mjs"
	],
	"./extra/nn.mjs": [
		14388,
		"node_modules_angular_common_locales_extra_nn_mjs"
	],
	"./extra/nnh.mjs": [
		92645,
		"node_modules_angular_common_locales_extra_nnh_mjs"
	],
	"./extra/no.mjs": [
		68129,
		"node_modules_angular_common_locales_extra_no_mjs"
	],
	"./extra/nus.mjs": [
		86834,
		"node_modules_angular_common_locales_extra_nus_mjs"
	],
	"./extra/nyn.mjs": [
		53983,
		"node_modules_angular_common_locales_extra_nyn_mjs"
	],
	"./extra/om-KE.mjs": [
		13170,
		"node_modules_angular_common_locales_extra_om-KE_mjs"
	],
	"./extra/om.mjs": [
		63671,
		"node_modules_angular_common_locales_extra_om_mjs"
	],
	"./extra/or.mjs": [
		19830,
		"node_modules_angular_common_locales_extra_or_mjs"
	],
	"./extra/os-RU.mjs": [
		71082,
		"node_modules_angular_common_locales_extra_os-RU_mjs"
	],
	"./extra/os.mjs": [
		2561,
		"node_modules_angular_common_locales_extra_os_mjs"
	],
	"./extra/pa-Arab.mjs": [
		51575,
		"node_modules_angular_common_locales_extra_pa-Arab_mjs"
	],
	"./extra/pa-Guru.mjs": [
		5297,
		"node_modules_angular_common_locales_extra_pa-Guru_mjs"
	],
	"./extra/pa.mjs": [
		26383,
		"node_modules_angular_common_locales_extra_pa_mjs"
	],
	"./extra/pcm.mjs": [
		19026,
		"node_modules_angular_common_locales_extra_pcm_mjs"
	],
	"./extra/pl.mjs": [
		21974,
		"node_modules_angular_common_locales_extra_pl_mjs"
	],
	"./extra/ps-PK.mjs": [
		33348,
		"node_modules_angular_common_locales_extra_ps-PK_mjs"
	],
	"./extra/ps.mjs": [
		10812,
		"node_modules_angular_common_locales_extra_ps_mjs"
	],
	"./extra/pt-AO.mjs": [
		58784,
		"node_modules_angular_common_locales_extra_pt-AO_mjs"
	],
	"./extra/pt-CH.mjs": [
		30861,
		"node_modules_angular_common_locales_extra_pt-CH_mjs"
	],
	"./extra/pt-CV.mjs": [
		99147,
		"node_modules_angular_common_locales_extra_pt-CV_mjs"
	],
	"./extra/pt-GQ.mjs": [
		48916,
		"node_modules_angular_common_locales_extra_pt-GQ_mjs"
	],
	"./extra/pt-GW.mjs": [
		70340,
		"node_modules_angular_common_locales_extra_pt-GW_mjs"
	],
	"./extra/pt-LU.mjs": [
		46781,
		"node_modules_angular_common_locales_extra_pt-LU_mjs"
	],
	"./extra/pt-MO.mjs": [
		71428,
		"node_modules_angular_common_locales_extra_pt-MO_mjs"
	],
	"./extra/pt-MZ.mjs": [
		80128,
		"node_modules_angular_common_locales_extra_pt-MZ_mjs"
	],
	"./extra/pt-PT.mjs": [
		871,
		"node_modules_angular_common_locales_extra_pt-PT_mjs"
	],
	"./extra/pt-ST.mjs": [
		15133,
		"node_modules_angular_common_locales_extra_pt-ST_mjs"
	],
	"./extra/pt-TL.mjs": [
		25980,
		"node_modules_angular_common_locales_extra_pt-TL_mjs"
	],
	"./extra/pt.mjs": [
		5699,
		"node_modules_angular_common_locales_extra_pt_mjs"
	],
	"./extra/qu-BO.mjs": [
		5673,
		"node_modules_angular_common_locales_extra_qu-BO_mjs"
	],
	"./extra/qu-EC.mjs": [
		81918,
		"node_modules_angular_common_locales_extra_qu-EC_mjs"
	],
	"./extra/qu.mjs": [
		5715,
		"node_modules_angular_common_locales_extra_qu_mjs"
	],
	"./extra/rm.mjs": [
		66572,
		"node_modules_angular_common_locales_extra_rm_mjs"
	],
	"./extra/rn.mjs": [
		5711,
		"node_modules_angular_common_locales_extra_rn_mjs"
	],
	"./extra/ro-MD.mjs": [
		37631,
		"node_modules_angular_common_locales_extra_ro-MD_mjs"
	],
	"./extra/ro.mjs": [
		7698,
		"node_modules_angular_common_locales_extra_ro_mjs"
	],
	"./extra/rof.mjs": [
		22592,
		"node_modules_angular_common_locales_extra_rof_mjs"
	],
	"./extra/ru-BY.mjs": [
		70593,
		"node_modules_angular_common_locales_extra_ru-BY_mjs"
	],
	"./extra/ru-KG.mjs": [
		56168,
		"node_modules_angular_common_locales_extra_ru-KG_mjs"
	],
	"./extra/ru-KZ.mjs": [
		22927,
		"node_modules_angular_common_locales_extra_ru-KZ_mjs"
	],
	"./extra/ru-MD.mjs": [
		34435,
		"node_modules_angular_common_locales_extra_ru-MD_mjs"
	],
	"./extra/ru-UA.mjs": [
		37927,
		"node_modules_angular_common_locales_extra_ru-UA_mjs"
	],
	"./extra/ru.mjs": [
		91258,
		"node_modules_angular_common_locales_extra_ru_mjs"
	],
	"./extra/rw.mjs": [
		40888,
		"node_modules_angular_common_locales_extra_rw_mjs"
	],
	"./extra/rwk.mjs": [
		7242,
		"node_modules_angular_common_locales_extra_rwk_mjs"
	],
	"./extra/sa.mjs": [
		11504,
		"node_modules_angular_common_locales_extra_sa_mjs"
	],
	"./extra/sah.mjs": [
		9355,
		"node_modules_angular_common_locales_extra_sah_mjs"
	],
	"./extra/saq.mjs": [
		44475,
		"node_modules_angular_common_locales_extra_saq_mjs"
	],
	"./extra/sat-Olck.mjs": [
		51601,
		"node_modules_angular_common_locales_extra_sat-Olck_mjs"
	],
	"./extra/sat.mjs": [
		27447,
		"node_modules_angular_common_locales_extra_sat_mjs"
	],
	"./extra/sbp.mjs": [
		99663,
		"node_modules_angular_common_locales_extra_sbp_mjs"
	],
	"./extra/sc.mjs": [
		96994,
		"node_modules_angular_common_locales_extra_sc_mjs"
	],
	"./extra/sd-Arab.mjs": [
		6842,
		"node_modules_angular_common_locales_extra_sd-Arab_mjs"
	],
	"./extra/sd-Deva.mjs": [
		294,
		"node_modules_angular_common_locales_extra_sd-Deva_mjs"
	],
	"./extra/sd.mjs": [
		61602,
		"node_modules_angular_common_locales_extra_sd_mjs"
	],
	"./extra/se-FI.mjs": [
		29758,
		"node_modules_angular_common_locales_extra_se-FI_mjs"
	],
	"./extra/se-SE.mjs": [
		8929,
		"node_modules_angular_common_locales_extra_se-SE_mjs"
	],
	"./extra/se.mjs": [
		41004,
		"node_modules_angular_common_locales_extra_se_mjs"
	],
	"./extra/seh.mjs": [
		22768,
		"node_modules_angular_common_locales_extra_seh_mjs"
	],
	"./extra/ses.mjs": [
		38617,
		"node_modules_angular_common_locales_extra_ses_mjs"
	],
	"./extra/sg.mjs": [
		1893,
		"node_modules_angular_common_locales_extra_sg_mjs"
	],
	"./extra/shi-Latn.mjs": [
		22423,
		"node_modules_angular_common_locales_extra_shi-Latn_mjs"
	],
	"./extra/shi-Tfng.mjs": [
		43243,
		"node_modules_angular_common_locales_extra_shi-Tfng_mjs"
	],
	"./extra/shi.mjs": [
		60018,
		"node_modules_angular_common_locales_extra_shi_mjs"
	],
	"./extra/si.mjs": [
		78906,
		"node_modules_angular_common_locales_extra_si_mjs"
	],
	"./extra/sk.mjs": [
		63440,
		"node_modules_angular_common_locales_extra_sk_mjs"
	],
	"./extra/sl.mjs": [
		13287,
		"node_modules_angular_common_locales_extra_sl_mjs"
	],
	"./extra/smn.mjs": [
		85398,
		"node_modules_angular_common_locales_extra_smn_mjs"
	],
	"./extra/sn.mjs": [
		82689,
		"node_modules_angular_common_locales_extra_sn_mjs"
	],
	"./extra/so-DJ.mjs": [
		62450,
		"node_modules_angular_common_locales_extra_so-DJ_mjs"
	],
	"./extra/so-ET.mjs": [
		70669,
		"node_modules_angular_common_locales_extra_so-ET_mjs"
	],
	"./extra/so-KE.mjs": [
		21457,
		"node_modules_angular_common_locales_extra_so-KE_mjs"
	],
	"./extra/so.mjs": [
		24563,
		"node_modules_angular_common_locales_extra_so_mjs"
	],
	"./extra/sq-MK.mjs": [
		72864,
		"node_modules_angular_common_locales_extra_sq-MK_mjs"
	],
	"./extra/sq-XK.mjs": [
		91549,
		"node_modules_angular_common_locales_extra_sq-XK_mjs"
	],
	"./extra/sq.mjs": [
		27469,
		"node_modules_angular_common_locales_extra_sq_mjs"
	],
	"./extra/sr-Cyrl-BA.mjs": [
		468,
		"node_modules_angular_common_locales_extra_sr-Cyrl-BA_mjs"
	],
	"./extra/sr-Cyrl-ME.mjs": [
		45983,
		"node_modules_angular_common_locales_extra_sr-Cyrl-ME_mjs"
	],
	"./extra/sr-Cyrl-XK.mjs": [
		36117,
		"node_modules_angular_common_locales_extra_sr-Cyrl-XK_mjs"
	],
	"./extra/sr-Cyrl.mjs": [
		64262,
		"node_modules_angular_common_locales_extra_sr-Cyrl_mjs"
	],
	"./extra/sr-Latn-BA.mjs": [
		8639,
		"node_modules_angular_common_locales_extra_sr-Latn-BA_mjs"
	],
	"./extra/sr-Latn-ME.mjs": [
		67401,
		"node_modules_angular_common_locales_extra_sr-Latn-ME_mjs"
	],
	"./extra/sr-Latn-XK.mjs": [
		2203,
		"node_modules_angular_common_locales_extra_sr-Latn-XK_mjs"
	],
	"./extra/sr-Latn.mjs": [
		85970,
		"node_modules_angular_common_locales_extra_sr-Latn_mjs"
	],
	"./extra/sr.mjs": [
		58246,
		"node_modules_angular_common_locales_extra_sr_mjs"
	],
	"./extra/su-Latn.mjs": [
		26716,
		"node_modules_angular_common_locales_extra_su-Latn_mjs"
	],
	"./extra/su.mjs": [
		64015,
		"node_modules_angular_common_locales_extra_su_mjs"
	],
	"./extra/sv-AX.mjs": [
		51836,
		"node_modules_angular_common_locales_extra_sv-AX_mjs"
	],
	"./extra/sv-FI.mjs": [
		40040,
		"node_modules_angular_common_locales_extra_sv-FI_mjs"
	],
	"./extra/sv.mjs": [
		28522,
		"node_modules_angular_common_locales_extra_sv_mjs"
	],
	"./extra/sw-CD.mjs": [
		98751,
		"node_modules_angular_common_locales_extra_sw-CD_mjs"
	],
	"./extra/sw-KE.mjs": [
		17182,
		"node_modules_angular_common_locales_extra_sw-KE_mjs"
	],
	"./extra/sw-UG.mjs": [
		43264,
		"node_modules_angular_common_locales_extra_sw-UG_mjs"
	],
	"./extra/sw.mjs": [
		36036,
		"node_modules_angular_common_locales_extra_sw_mjs"
	],
	"./extra/ta-LK.mjs": [
		76249,
		"node_modules_angular_common_locales_extra_ta-LK_mjs"
	],
	"./extra/ta-MY.mjs": [
		44633,
		"node_modules_angular_common_locales_extra_ta-MY_mjs"
	],
	"./extra/ta-SG.mjs": [
		76895,
		"node_modules_angular_common_locales_extra_ta-SG_mjs"
	],
	"./extra/ta.mjs": [
		68849,
		"node_modules_angular_common_locales_extra_ta_mjs"
	],
	"./extra/te.mjs": [
		97402,
		"node_modules_angular_common_locales_extra_te_mjs"
	],
	"./extra/teo-KE.mjs": [
		47573,
		"node_modules_angular_common_locales_extra_teo-KE_mjs"
	],
	"./extra/teo.mjs": [
		83297,
		"node_modules_angular_common_locales_extra_teo_mjs"
	],
	"./extra/tg.mjs": [
		62420,
		"node_modules_angular_common_locales_extra_tg_mjs"
	],
	"./extra/th.mjs": [
		40405,
		"node_modules_angular_common_locales_extra_th_mjs"
	],
	"./extra/ti-ER.mjs": [
		96750,
		"node_modules_angular_common_locales_extra_ti-ER_mjs"
	],
	"./extra/ti.mjs": [
		62096,
		"node_modules_angular_common_locales_extra_ti_mjs"
	],
	"./extra/tk.mjs": [
		7073,
		"node_modules_angular_common_locales_extra_tk_mjs"
	],
	"./extra/to.mjs": [
		88019,
		"node_modules_angular_common_locales_extra_to_mjs"
	],
	"./extra/tr-CY.mjs": [
		22907,
		"node_modules_angular_common_locales_extra_tr-CY_mjs"
	],
	"./extra/tr.mjs": [
		64979,
		"node_modules_angular_common_locales_extra_tr_mjs"
	],
	"./extra/tt.mjs": [
		48163,
		"node_modules_angular_common_locales_extra_tt_mjs"
	],
	"./extra/twq.mjs": [
		55701,
		"node_modules_angular_common_locales_extra_twq_mjs"
	],
	"./extra/tzm.mjs": [
		79942,
		"node_modules_angular_common_locales_extra_tzm_mjs"
	],
	"./extra/ug.mjs": [
		88495,
		"node_modules_angular_common_locales_extra_ug_mjs"
	],
	"./extra/uk.mjs": [
		22110,
		"node_modules_angular_common_locales_extra_uk_mjs"
	],
	"./extra/und.mjs": [
		2149,
		"node_modules_angular_common_locales_extra_und_mjs"
	],
	"./extra/ur-IN.mjs": [
		92041,
		"node_modules_angular_common_locales_extra_ur-IN_mjs"
	],
	"./extra/ur.mjs": [
		18386,
		"node_modules_angular_common_locales_extra_ur_mjs"
	],
	"./extra/uz-Arab.mjs": [
		60332,
		"node_modules_angular_common_locales_extra_uz-Arab_mjs"
	],
	"./extra/uz-Cyrl.mjs": [
		24303,
		"node_modules_angular_common_locales_extra_uz-Cyrl_mjs"
	],
	"./extra/uz-Latn.mjs": [
		91866,
		"node_modules_angular_common_locales_extra_uz-Latn_mjs"
	],
	"./extra/uz.mjs": [
		21465,
		"node_modules_angular_common_locales_extra_uz_mjs"
	],
	"./extra/vai-Latn.mjs": [
		43948,
		"node_modules_angular_common_locales_extra_vai-Latn_mjs"
	],
	"./extra/vai-Vaii.mjs": [
		30835,
		"node_modules_angular_common_locales_extra_vai-Vaii_mjs"
	],
	"./extra/vai.mjs": [
		83030,
		"node_modules_angular_common_locales_extra_vai_mjs"
	],
	"./extra/vi.mjs": [
		450,
		"node_modules_angular_common_locales_extra_vi_mjs"
	],
	"./extra/vun.mjs": [
		60045,
		"node_modules_angular_common_locales_extra_vun_mjs"
	],
	"./extra/wae.mjs": [
		96968,
		"node_modules_angular_common_locales_extra_wae_mjs"
	],
	"./extra/wo.mjs": [
		93579,
		"node_modules_angular_common_locales_extra_wo_mjs"
	],
	"./extra/xh.mjs": [
		73438,
		"node_modules_angular_common_locales_extra_xh_mjs"
	],
	"./extra/xog.mjs": [
		89888,
		"node_modules_angular_common_locales_extra_xog_mjs"
	],
	"./extra/yav.mjs": [
		54007,
		"node_modules_angular_common_locales_extra_yav_mjs"
	],
	"./extra/yi.mjs": [
		86375,
		"node_modules_angular_common_locales_extra_yi_mjs"
	],
	"./extra/yo-BJ.mjs": [
		38142,
		"node_modules_angular_common_locales_extra_yo-BJ_mjs"
	],
	"./extra/yo.mjs": [
		32916,
		"node_modules_angular_common_locales_extra_yo_mjs"
	],
	"./extra/yrl-CO.mjs": [
		82185,
		"node_modules_angular_common_locales_extra_yrl-CO_mjs"
	],
	"./extra/yrl-VE.mjs": [
		57357,
		"node_modules_angular_common_locales_extra_yrl-VE_mjs"
	],
	"./extra/yrl.mjs": [
		76540,
		"node_modules_angular_common_locales_extra_yrl_mjs"
	],
	"./extra/yue-Hans.mjs": [
		38922,
		"node_modules_angular_common_locales_extra_yue-Hans_mjs"
	],
	"./extra/yue-Hant.mjs": [
		91230,
		"node_modules_angular_common_locales_extra_yue-Hant_mjs"
	],
	"./extra/yue.mjs": [
		11316,
		"node_modules_angular_common_locales_extra_yue_mjs"
	],
	"./extra/zgh.mjs": [
		15621,
		"node_modules_angular_common_locales_extra_zgh_mjs"
	],
	"./extra/zh-Hans-HK.mjs": [
		99595,
		"node_modules_angular_common_locales_extra_zh-Hans-HK_mjs"
	],
	"./extra/zh-Hans-MO.mjs": [
		26364,
		"node_modules_angular_common_locales_extra_zh-Hans-MO_mjs"
	],
	"./extra/zh-Hans-SG.mjs": [
		58009,
		"node_modules_angular_common_locales_extra_zh-Hans-SG_mjs"
	],
	"./extra/zh-Hans.mjs": [
		17413,
		"node_modules_angular_common_locales_extra_zh-Hans_mjs"
	],
	"./extra/zh-Hant-HK.mjs": [
		71290,
		"node_modules_angular_common_locales_extra_zh-Hant-HK_mjs"
	],
	"./extra/zh-Hant-MO.mjs": [
		45118,
		"node_modules_angular_common_locales_extra_zh-Hant-MO_mjs"
	],
	"./extra/zh-Hant.mjs": [
		15431,
		"node_modules_angular_common_locales_extra_zh-Hant_mjs"
	],
	"./extra/zh.mjs": [
		20310,
		"node_modules_angular_common_locales_extra_zh_mjs"
	],
	"./extra/zu.mjs": [
		72034,
		"node_modules_angular_common_locales_extra_zu_mjs"
	],
	"./fa-AF.mjs": [
		44597,
		"node_modules_angular_common_locales_fa-AF_mjs"
	],
	"./fa.mjs": [
		9523,
		"node_modules_angular_common_locales_fa_mjs"
	],
	"./ff-Adlm-BF.mjs": [
		15735,
		"node_modules_angular_common_locales_ff-Adlm-BF_mjs"
	],
	"./ff-Adlm-CM.mjs": [
		37007,
		"node_modules_angular_common_locales_ff-Adlm-CM_mjs"
	],
	"./ff-Adlm-GH.mjs": [
		11845,
		"node_modules_angular_common_locales_ff-Adlm-GH_mjs"
	],
	"./ff-Adlm-GM.mjs": [
		39268,
		"node_modules_angular_common_locales_ff-Adlm-GM_mjs"
	],
	"./ff-Adlm-GW.mjs": [
		19994,
		"node_modules_angular_common_locales_ff-Adlm-GW_mjs"
	],
	"./ff-Adlm-LR.mjs": [
		97374,
		"node_modules_angular_common_locales_ff-Adlm-LR_mjs"
	],
	"./ff-Adlm-MR.mjs": [
		45898,
		"node_modules_angular_common_locales_ff-Adlm-MR_mjs"
	],
	"./ff-Adlm-NE.mjs": [
		28304,
		"node_modules_angular_common_locales_ff-Adlm-NE_mjs"
	],
	"./ff-Adlm-NG.mjs": [
		5234,
		"node_modules_angular_common_locales_ff-Adlm-NG_mjs"
	],
	"./ff-Adlm-SL.mjs": [
		76382,
		"node_modules_angular_common_locales_ff-Adlm-SL_mjs"
	],
	"./ff-Adlm-SN.mjs": [
		72576,
		"node_modules_angular_common_locales_ff-Adlm-SN_mjs"
	],
	"./ff-Adlm.mjs": [
		8443,
		"node_modules_angular_common_locales_ff-Adlm_mjs"
	],
	"./ff-CM.mjs": [
		80562,
		"node_modules_angular_common_locales_ff-CM_mjs"
	],
	"./ff-GN.mjs": [
		69851,
		"node_modules_angular_common_locales_ff-GN_mjs"
	],
	"./ff-Latn-BF.mjs": [
		52643,
		"node_modules_angular_common_locales_ff-Latn-BF_mjs"
	],
	"./ff-Latn-CM.mjs": [
		12442,
		"node_modules_angular_common_locales_ff-Latn-CM_mjs"
	],
	"./ff-Latn-GH.mjs": [
		81479,
		"node_modules_angular_common_locales_ff-Latn-GH_mjs"
	],
	"./ff-Latn-GM.mjs": [
		13473,
		"node_modules_angular_common_locales_ff-Latn-GM_mjs"
	],
	"./ff-Latn-GN.mjs": [
		44081,
		"node_modules_angular_common_locales_ff-Latn-GN_mjs"
	],
	"./ff-Latn-GW.mjs": [
		53926,
		"node_modules_angular_common_locales_ff-Latn-GW_mjs"
	],
	"./ff-Latn-LR.mjs": [
		34378,
		"node_modules_angular_common_locales_ff-Latn-LR_mjs"
	],
	"./ff-Latn-MR.mjs": [
		26332,
		"node_modules_angular_common_locales_ff-Latn-MR_mjs"
	],
	"./ff-Latn-NE.mjs": [
		21489,
		"node_modules_angular_common_locales_ff-Latn-NE_mjs"
	],
	"./ff-Latn-NG.mjs": [
		78718,
		"node_modules_angular_common_locales_ff-Latn-NG_mjs"
	],
	"./ff-Latn-SL.mjs": [
		88847,
		"node_modules_angular_common_locales_ff-Latn-SL_mjs"
	],
	"./ff-Latn.mjs": [
		4299,
		"node_modules_angular_common_locales_ff-Latn_mjs"
	],
	"./ff-MR.mjs": [
		56787,
		"node_modules_angular_common_locales_ff-MR_mjs"
	],
	"./ff.mjs": [
		15976,
		"node_modules_angular_common_locales_ff_mjs"
	],
	"./fi.mjs": [
		57518,
		"node_modules_angular_common_locales_fi_mjs"
	],
	"./fil.mjs": [
		83869,
		"node_modules_angular_common_locales_fil_mjs"
	],
	"./fo-DK.mjs": [
		97203,
		"node_modules_angular_common_locales_fo-DK_mjs"
	],
	"./fo.mjs": [
		7768,
		"node_modules_angular_common_locales_fo_mjs"
	],
	"./fr-BE.mjs": [
		5411,
		"node_modules_angular_common_locales_fr-BE_mjs"
	],
	"./fr-BF.mjs": [
		70907,
		"node_modules_angular_common_locales_fr-BF_mjs"
	],
	"./fr-BI.mjs": [
		84365,
		"node_modules_angular_common_locales_fr-BI_mjs"
	],
	"./fr-BJ.mjs": [
		16703,
		"node_modules_angular_common_locales_fr-BJ_mjs"
	],
	"./fr-BL.mjs": [
		32737,
		"node_modules_angular_common_locales_fr-BL_mjs"
	],
	"./fr-CA.mjs": [
		44826,
		"node_modules_angular_common_locales_fr-CA_mjs"
	],
	"./fr-CD.mjs": [
		18967,
		"node_modules_angular_common_locales_fr-CD_mjs"
	],
	"./fr-CF.mjs": [
		26980,
		"node_modules_angular_common_locales_fr-CF_mjs"
	],
	"./fr-CG.mjs": [
		68667,
		"node_modules_angular_common_locales_fr-CG_mjs"
	],
	"./fr-CH.mjs": [
		27304,
		"node_modules_angular_common_locales_fr-CH_mjs"
	],
	"./fr-CI.mjs": [
		30452,
		"node_modules_angular_common_locales_fr-CI_mjs"
	],
	"./fr-CM.mjs": [
		56404,
		"node_modules_angular_common_locales_fr-CM_mjs"
	],
	"./fr-DJ.mjs": [
		99377,
		"node_modules_angular_common_locales_fr-DJ_mjs"
	],
	"./fr-DZ.mjs": [
		18309,
		"node_modules_angular_common_locales_fr-DZ_mjs"
	],
	"./fr-GA.mjs": [
		99403,
		"node_modules_angular_common_locales_fr-GA_mjs"
	],
	"./fr-GF.mjs": [
		79789,
		"node_modules_angular_common_locales_fr-GF_mjs"
	],
	"./fr-GN.mjs": [
		49577,
		"node_modules_angular_common_locales_fr-GN_mjs"
	],
	"./fr-GP.mjs": [
		24257,
		"node_modules_angular_common_locales_fr-GP_mjs"
	],
	"./fr-GQ.mjs": [
		59478,
		"node_modules_angular_common_locales_fr-GQ_mjs"
	],
	"./fr-HT.mjs": [
		46322,
		"node_modules_angular_common_locales_fr-HT_mjs"
	],
	"./fr-KM.mjs": [
		56978,
		"node_modules_angular_common_locales_fr-KM_mjs"
	],
	"./fr-LU.mjs": [
		41476,
		"node_modules_angular_common_locales_fr-LU_mjs"
	],
	"./fr-MA.mjs": [
		22897,
		"node_modules_angular_common_locales_fr-MA_mjs"
	],
	"./fr-MC.mjs": [
		27800,
		"node_modules_angular_common_locales_fr-MC_mjs"
	],
	"./fr-MF.mjs": [
		72341,
		"node_modules_angular_common_locales_fr-MF_mjs"
	],
	"./fr-MG.mjs": [
		74816,
		"node_modules_angular_common_locales_fr-MG_mjs"
	],
	"./fr-ML.mjs": [
		19680,
		"node_modules_angular_common_locales_fr-ML_mjs"
	],
	"./fr-MQ.mjs": [
		36094,
		"node_modules_angular_common_locales_fr-MQ_mjs"
	],
	"./fr-MR.mjs": [
		4909,
		"node_modules_angular_common_locales_fr-MR_mjs"
	],
	"./fr-MU.mjs": [
		4218,
		"node_modules_angular_common_locales_fr-MU_mjs"
	],
	"./fr-NC.mjs": [
		81042,
		"node_modules_angular_common_locales_fr-NC_mjs"
	],
	"./fr-NE.mjs": [
		34104,
		"node_modules_angular_common_locales_fr-NE_mjs"
	],
	"./fr-PF.mjs": [
		60135,
		"node_modules_angular_common_locales_fr-PF_mjs"
	],
	"./fr-PM.mjs": [
		15848,
		"node_modules_angular_common_locales_fr-PM_mjs"
	],
	"./fr-RE.mjs": [
		65004,
		"node_modules_angular_common_locales_fr-RE_mjs"
	],
	"./fr-RW.mjs": [
		3662,
		"node_modules_angular_common_locales_fr-RW_mjs"
	],
	"./fr-SC.mjs": [
		88135,
		"node_modules_angular_common_locales_fr-SC_mjs"
	],
	"./fr-SN.mjs": [
		60789,
		"node_modules_angular_common_locales_fr-SN_mjs"
	],
	"./fr-SY.mjs": [
		4418,
		"node_modules_angular_common_locales_fr-SY_mjs"
	],
	"./fr-TD.mjs": [
		72373,
		"node_modules_angular_common_locales_fr-TD_mjs"
	],
	"./fr-TG.mjs": [
		1187,
		"node_modules_angular_common_locales_fr-TG_mjs"
	],
	"./fr-TN.mjs": [
		16234,
		"node_modules_angular_common_locales_fr-TN_mjs"
	],
	"./fr-VU.mjs": [
		71934,
		"node_modules_angular_common_locales_fr-VU_mjs"
	],
	"./fr-WF.mjs": [
		41364,
		"node_modules_angular_common_locales_fr-WF_mjs"
	],
	"./fr-YT.mjs": [
		20947,
		"node_modules_angular_common_locales_fr-YT_mjs"
	],
	"./fr.mjs": [
		12602,
		"node_modules_angular_common_locales_fr_mjs"
	],
	"./fur.mjs": [
		98151,
		"node_modules_angular_common_locales_fur_mjs"
	],
	"./fy.mjs": [
		81292,
		"node_modules_angular_common_locales_fy_mjs"
	],
	"./ga-GB.mjs": [
		76866,
		"node_modules_angular_common_locales_ga-GB_mjs"
	],
	"./ga.mjs": [
		1354,
		"node_modules_angular_common_locales_ga_mjs"
	],
	"./gd.mjs": [
		18551,
		"node_modules_angular_common_locales_gd_mjs"
	],
	"./gl.mjs": [
		68734,
		"node_modules_angular_common_locales_gl_mjs"
	],
	"./gsw-FR.mjs": [
		32085,
		"node_modules_angular_common_locales_gsw-FR_mjs"
	],
	"./gsw-LI.mjs": [
		15773,
		"node_modules_angular_common_locales_gsw-LI_mjs"
	],
	"./gsw.mjs": [
		90045,
		"node_modules_angular_common_locales_gsw_mjs"
	],
	"./gu.mjs": [
		9951,
		"node_modules_angular_common_locales_gu_mjs"
	],
	"./guz.mjs": [
		87538,
		"node_modules_angular_common_locales_guz_mjs"
	],
	"./gv.mjs": [
		49552,
		"node_modules_angular_common_locales_gv_mjs"
	],
	"./ha-GH.mjs": [
		84212,
		"node_modules_angular_common_locales_ha-GH_mjs"
	],
	"./ha-NE.mjs": [
		70837,
		"node_modules_angular_common_locales_ha-NE_mjs"
	],
	"./ha.mjs": [
		77679,
		"node_modules_angular_common_locales_ha_mjs"
	],
	"./haw.mjs": [
		6986,
		"node_modules_angular_common_locales_haw_mjs"
	],
	"./he.mjs": [
		6284,
		"node_modules_angular_common_locales_he_mjs"
	],
	"./hi-Latn.mjs": [
		20098,
		"node_modules_angular_common_locales_hi-Latn_mjs"
	],
	"./hi.mjs": [
		30309,
		"node_modules_angular_common_locales_hi_mjs"
	],
	"./hr-BA.mjs": [
		85084,
		"node_modules_angular_common_locales_hr-BA_mjs"
	],
	"./hr.mjs": [
		40490,
		"node_modules_angular_common_locales_hr_mjs"
	],
	"./hsb.mjs": [
		9948,
		"node_modules_angular_common_locales_hsb_mjs"
	],
	"./hu.mjs": [
		94886,
		"node_modules_angular_common_locales_hu_mjs"
	],
	"./hy.mjs": [
		47398,
		"node_modules_angular_common_locales_hy_mjs"
	],
	"./ia.mjs": [
		39240,
		"node_modules_angular_common_locales_ia_mjs"
	],
	"./id.mjs": [
		92496,
		"node_modules_angular_common_locales_id_mjs"
	],
	"./ig.mjs": [
		20469,
		"node_modules_angular_common_locales_ig_mjs"
	],
	"./ii.mjs": [
		41084,
		"node_modules_angular_common_locales_ii_mjs"
	],
	"./is.mjs": [
		69113,
		"node_modules_angular_common_locales_is_mjs"
	],
	"./it-CH.mjs": [
		66743,
		"node_modules_angular_common_locales_it-CH_mjs"
	],
	"./it-SM.mjs": [
		58429,
		"node_modules_angular_common_locales_it-SM_mjs"
	],
	"./it-VA.mjs": [
		69378,
		"node_modules_angular_common_locales_it-VA_mjs"
	],
	"./it.mjs": [
		86928,
		"node_modules_angular_common_locales_it_mjs"
	],
	"./ja.mjs": [
		39856,
		"node_modules_angular_common_locales_ja_mjs"
	],
	"./jgo.mjs": [
		62343,
		"node_modules_angular_common_locales_jgo_mjs"
	],
	"./jmc.mjs": [
		13938,
		"node_modules_angular_common_locales_jmc_mjs"
	],
	"./jv.mjs": [
		13800,
		"node_modules_angular_common_locales_jv_mjs"
	],
	"./ka.mjs": [
		52294,
		"node_modules_angular_common_locales_ka_mjs"
	],
	"./kab.mjs": [
		25649,
		"node_modules_angular_common_locales_kab_mjs"
	],
	"./kam.mjs": [
		14606,
		"node_modules_angular_common_locales_kam_mjs"
	],
	"./kde.mjs": [
		12141,
		"node_modules_angular_common_locales_kde_mjs"
	],
	"./kea.mjs": [
		7905,
		"node_modules_angular_common_locales_kea_mjs"
	],
	"./kgp.mjs": [
		47472,
		"node_modules_angular_common_locales_kgp_mjs"
	],
	"./khq.mjs": [
		23817,
		"node_modules_angular_common_locales_khq_mjs"
	],
	"./ki.mjs": [
		39016,
		"node_modules_angular_common_locales_ki_mjs"
	],
	"./kk.mjs": [
		37611,
		"node_modules_angular_common_locales_kk_mjs"
	],
	"./kkj.mjs": [
		70666,
		"node_modules_angular_common_locales_kkj_mjs"
	],
	"./kl.mjs": [
		66275,
		"node_modules_angular_common_locales_kl_mjs"
	],
	"./kln.mjs": [
		43397,
		"node_modules_angular_common_locales_kln_mjs"
	],
	"./km.mjs": [
		58868,
		"node_modules_angular_common_locales_km_mjs"
	],
	"./kn.mjs": [
		9986,
		"node_modules_angular_common_locales_kn_mjs"
	],
	"./ko-KP.mjs": [
		28310,
		"node_modules_angular_common_locales_ko-KP_mjs"
	],
	"./ko.mjs": [
		29499,
		"node_modules_angular_common_locales_ko_mjs"
	],
	"./kok.mjs": [
		7659,
		"node_modules_angular_common_locales_kok_mjs"
	],
	"./ks-Arab.mjs": [
		24900,
		"node_modules_angular_common_locales_ks-Arab_mjs"
	],
	"./ks-Deva.mjs": [
		21781,
		"node_modules_angular_common_locales_ks-Deva_mjs"
	],
	"./ks.mjs": [
		36633,
		"node_modules_angular_common_locales_ks_mjs"
	],
	"./ksb.mjs": [
		40275,
		"node_modules_angular_common_locales_ksb_mjs"
	],
	"./ksf.mjs": [
		99918,
		"node_modules_angular_common_locales_ksf_mjs"
	],
	"./ksh.mjs": [
		37525,
		"node_modules_angular_common_locales_ksh_mjs"
	],
	"./ku.mjs": [
		29875,
		"node_modules_angular_common_locales_ku_mjs"
	],
	"./kw.mjs": [
		80353,
		"node_modules_angular_common_locales_kw_mjs"
	],
	"./ky.mjs": [
		4615,
		"node_modules_angular_common_locales_ky_mjs"
	],
	"./lag.mjs": [
		61949,
		"node_modules_angular_common_locales_lag_mjs"
	],
	"./lb.mjs": [
		29113,
		"node_modules_angular_common_locales_lb_mjs"
	],
	"./lg.mjs": [
		47404,
		"node_modules_angular_common_locales_lg_mjs"
	],
	"./lkt.mjs": [
		87835,
		"node_modules_angular_common_locales_lkt_mjs"
	],
	"./ln-AO.mjs": [
		47924,
		"node_modules_angular_common_locales_ln-AO_mjs"
	],
	"./ln-CF.mjs": [
		85270,
		"node_modules_angular_common_locales_ln-CF_mjs"
	],
	"./ln-CG.mjs": [
		74523,
		"node_modules_angular_common_locales_ln-CG_mjs"
	],
	"./ln.mjs": [
		13944,
		"node_modules_angular_common_locales_ln_mjs"
	],
	"./lo.mjs": [
		4642,
		"node_modules_angular_common_locales_lo_mjs"
	],
	"./lrc-IQ.mjs": [
		43476,
		"node_modules_angular_common_locales_lrc-IQ_mjs"
	],
	"./lrc.mjs": [
		38819,
		"node_modules_angular_common_locales_lrc_mjs"
	],
	"./lt.mjs": [
		94174,
		"node_modules_angular_common_locales_lt_mjs"
	],
	"./lu.mjs": [
		60612,
		"node_modules_angular_common_locales_lu_mjs"
	],
	"./luo.mjs": [
		69462,
		"node_modules_angular_common_locales_luo_mjs"
	],
	"./luy.mjs": [
		8080,
		"node_modules_angular_common_locales_luy_mjs"
	],
	"./lv.mjs": [
		25229,
		"node_modules_angular_common_locales_lv_mjs"
	],
	"./mai.mjs": [
		31153,
		"node_modules_angular_common_locales_mai_mjs"
	],
	"./mas-TZ.mjs": [
		92923,
		"node_modules_angular_common_locales_mas-TZ_mjs"
	],
	"./mas.mjs": [
		45299,
		"node_modules_angular_common_locales_mas_mjs"
	],
	"./mer.mjs": [
		95105,
		"node_modules_angular_common_locales_mer_mjs"
	],
	"./mfe.mjs": [
		26004,
		"node_modules_angular_common_locales_mfe_mjs"
	],
	"./mg.mjs": [
		93074,
		"node_modules_angular_common_locales_mg_mjs"
	],
	"./mgh.mjs": [
		81488,
		"node_modules_angular_common_locales_mgh_mjs"
	],
	"./mgo.mjs": [
		88819,
		"node_modules_angular_common_locales_mgo_mjs"
	],
	"./mi.mjs": [
		69466,
		"node_modules_angular_common_locales_mi_mjs"
	],
	"./mk.mjs": [
		88992,
		"node_modules_angular_common_locales_mk_mjs"
	],
	"./ml.mjs": [
		49,
		"node_modules_angular_common_locales_ml_mjs"
	],
	"./mn.mjs": [
		17950,
		"node_modules_angular_common_locales_mn_mjs"
	],
	"./mni-Beng.mjs": [
		97560,
		"node_modules_angular_common_locales_mni-Beng_mjs"
	],
	"./mni.mjs": [
		5637,
		"node_modules_angular_common_locales_mni_mjs"
	],
	"./mr.mjs": [
		56150,
		"node_modules_angular_common_locales_mr_mjs"
	],
	"./ms-BN.mjs": [
		28287,
		"node_modules_angular_common_locales_ms-BN_mjs"
	],
	"./ms-ID.mjs": [
		47326,
		"node_modules_angular_common_locales_ms-ID_mjs"
	],
	"./ms-SG.mjs": [
		64754,
		"node_modules_angular_common_locales_ms-SG_mjs"
	],
	"./ms.mjs": [
		59118,
		"node_modules_angular_common_locales_ms_mjs"
	],
	"./mt.mjs": [
		68193,
		"node_modules_angular_common_locales_mt_mjs"
	],
	"./mua.mjs": [
		14285,
		"node_modules_angular_common_locales_mua_mjs"
	],
	"./my.mjs": [
		85109,
		"node_modules_angular_common_locales_my_mjs"
	],
	"./mzn.mjs": [
		84827,
		"node_modules_angular_common_locales_mzn_mjs"
	],
	"./naq.mjs": [
		67109,
		"node_modules_angular_common_locales_naq_mjs"
	],
	"./nb-SJ.mjs": [
		14950,
		"node_modules_angular_common_locales_nb-SJ_mjs"
	],
	"./nb.mjs": [
		49485,
		"node_modules_angular_common_locales_nb_mjs"
	],
	"./nd.mjs": [
		97962,
		"node_modules_angular_common_locales_nd_mjs"
	],
	"./nds-NL.mjs": [
		56386,
		"node_modules_angular_common_locales_nds-NL_mjs"
	],
	"./nds.mjs": [
		75018,
		"node_modules_angular_common_locales_nds_mjs"
	],
	"./ne-IN.mjs": [
		94818,
		"node_modules_angular_common_locales_ne-IN_mjs"
	],
	"./ne.mjs": [
		91969,
		"node_modules_angular_common_locales_ne_mjs"
	],
	"./nl-AW.mjs": [
		4569,
		"node_modules_angular_common_locales_nl-AW_mjs"
	],
	"./nl-BE.mjs": [
		56047,
		"node_modules_angular_common_locales_nl-BE_mjs"
	],
	"./nl-BQ.mjs": [
		66821,
		"node_modules_angular_common_locales_nl-BQ_mjs"
	],
	"./nl-CW.mjs": [
		22860,
		"node_modules_angular_common_locales_nl-CW_mjs"
	],
	"./nl-SR.mjs": [
		57462,
		"node_modules_angular_common_locales_nl-SR_mjs"
	],
	"./nl-SX.mjs": [
		27366,
		"node_modules_angular_common_locales_nl-SX_mjs"
	],
	"./nl.mjs": [
		17754,
		"node_modules_angular_common_locales_nl_mjs"
	],
	"./nmg.mjs": [
		15893,
		"node_modules_angular_common_locales_nmg_mjs"
	],
	"./nn.mjs": [
		88491,
		"node_modules_angular_common_locales_nn_mjs"
	],
	"./nnh.mjs": [
		64001,
		"node_modules_angular_common_locales_nnh_mjs"
	],
	"./no.mjs": [
		85786,
		"node_modules_angular_common_locales_no_mjs"
	],
	"./nus.mjs": [
		46333,
		"node_modules_angular_common_locales_nus_mjs"
	],
	"./nyn.mjs": [
		36729,
		"node_modules_angular_common_locales_nyn_mjs"
	],
	"./om-KE.mjs": [
		96867,
		"node_modules_angular_common_locales_om-KE_mjs"
	],
	"./om.mjs": [
		17302,
		"node_modules_angular_common_locales_om_mjs"
	],
	"./or.mjs": [
		50845,
		"node_modules_angular_common_locales_or_mjs"
	],
	"./os-RU.mjs": [
		56555,
		"node_modules_angular_common_locales_os-RU_mjs"
	],
	"./os.mjs": [
		83617,
		"node_modules_angular_common_locales_os_mjs"
	],
	"./pa-Arab.mjs": [
		75989,
		"node_modules_angular_common_locales_pa-Arab_mjs"
	],
	"./pa-Guru.mjs": [
		56539,
		"node_modules_angular_common_locales_pa-Guru_mjs"
	],
	"./pa.mjs": [
		84551,
		"node_modules_angular_common_locales_pa_mjs"
	],
	"./pcm.mjs": [
		74718,
		"node_modules_angular_common_locales_pcm_mjs"
	],
	"./pl.mjs": [
		32981,
		"node_modules_angular_common_locales_pl_mjs"
	],
	"./ps-PK.mjs": [
		52918,
		"node_modules_angular_common_locales_ps-PK_mjs"
	],
	"./ps.mjs": [
		81103,
		"node_modules_angular_common_locales_ps_mjs"
	],
	"./pt-AO.mjs": [
		5289,
		"node_modules_angular_common_locales_pt-AO_mjs"
	],
	"./pt-CH.mjs": [
		35,
		"node_modules_angular_common_locales_pt-CH_mjs"
	],
	"./pt-CV.mjs": [
		84534,
		"node_modules_angular_common_locales_pt-CV_mjs"
	],
	"./pt-GQ.mjs": [
		9296,
		"node_modules_angular_common_locales_pt-GQ_mjs"
	],
	"./pt-GW.mjs": [
		1313,
		"node_modules_angular_common_locales_pt-GW_mjs"
	],
	"./pt-LU.mjs": [
		6903,
		"node_modules_angular_common_locales_pt-LU_mjs"
	],
	"./pt-MO.mjs": [
		68841,
		"node_modules_angular_common_locales_pt-MO_mjs"
	],
	"./pt-MZ.mjs": [
		70532,
		"node_modules_angular_common_locales_pt-MZ_mjs"
	],
	"./pt-PT.mjs": [
		94817,
		"node_modules_angular_common_locales_pt-PT_mjs"
	],
	"./pt-ST.mjs": [
		48942,
		"node_modules_angular_common_locales_pt-ST_mjs"
	],
	"./pt-TL.mjs": [
		98745,
		"node_modules_angular_common_locales_pt-TL_mjs"
	],
	"./pt.mjs": [
		37595,
		"node_modules_angular_common_locales_pt_mjs"
	],
	"./qu-BO.mjs": [
		82311,
		"node_modules_angular_common_locales_qu-BO_mjs"
	],
	"./qu-EC.mjs": [
		30979,
		"node_modules_angular_common_locales_qu-EC_mjs"
	],
	"./qu.mjs": [
		66128,
		"node_modules_angular_common_locales_qu_mjs"
	],
	"./rm.mjs": [
		57929,
		"node_modules_angular_common_locales_rm_mjs"
	],
	"./rn.mjs": [
		86045,
		"node_modules_angular_common_locales_rn_mjs"
	],
	"./ro-MD.mjs": [
		91204,
		"node_modules_angular_common_locales_ro-MD_mjs"
	],
	"./ro.mjs": [
		6457,
		"node_modules_angular_common_locales_ro_mjs"
	],
	"./rof.mjs": [
		27557,
		"node_modules_angular_common_locales_rof_mjs"
	],
	"./ru-BY.mjs": [
		74001,
		"node_modules_angular_common_locales_ru-BY_mjs"
	],
	"./ru-KG.mjs": [
		70533,
		"node_modules_angular_common_locales_ru-KG_mjs"
	],
	"./ru-KZ.mjs": [
		31086,
		"node_modules_angular_common_locales_ru-KZ_mjs"
	],
	"./ru-MD.mjs": [
		95412,
		"node_modules_angular_common_locales_ru-MD_mjs"
	],
	"./ru-UA.mjs": [
		58785,
		"node_modules_angular_common_locales_ru-UA_mjs"
	],
	"./ru.mjs": [
		9933,
		"node_modules_angular_common_locales_ru_mjs"
	],
	"./rw.mjs": [
		38143,
		"node_modules_angular_common_locales_rw_mjs"
	],
	"./rwk.mjs": [
		15710,
		"node_modules_angular_common_locales_rwk_mjs"
	],
	"./sa.mjs": [
		17920,
		"node_modules_angular_common_locales_sa_mjs"
	],
	"./sah.mjs": [
		84124,
		"node_modules_angular_common_locales_sah_mjs"
	],
	"./saq.mjs": [
		14894,
		"node_modules_angular_common_locales_saq_mjs"
	],
	"./sat-Olck.mjs": [
		81980,
		"node_modules_angular_common_locales_sat-Olck_mjs"
	],
	"./sat.mjs": [
		56803,
		"node_modules_angular_common_locales_sat_mjs"
	],
	"./sbp.mjs": [
		41760,
		"node_modules_angular_common_locales_sbp_mjs"
	],
	"./sc.mjs": [
		83842,
		"node_modules_angular_common_locales_sc_mjs"
	],
	"./sd-Arab.mjs": [
		17410,
		"node_modules_angular_common_locales_sd-Arab_mjs"
	],
	"./sd-Deva.mjs": [
		75609,
		"node_modules_angular_common_locales_sd-Deva_mjs"
	],
	"./sd.mjs": [
		46045,
		"node_modules_angular_common_locales_sd_mjs"
	],
	"./se-FI.mjs": [
		52895,
		"node_modules_angular_common_locales_se-FI_mjs"
	],
	"./se-SE.mjs": [
		37745,
		"node_modules_angular_common_locales_se-SE_mjs"
	],
	"./se.mjs": [
		45425,
		"node_modules_angular_common_locales_se_mjs"
	],
	"./seh.mjs": [
		97659,
		"node_modules_angular_common_locales_seh_mjs"
	],
	"./ses.mjs": [
		76878,
		"node_modules_angular_common_locales_ses_mjs"
	],
	"./sg.mjs": [
		83419,
		"node_modules_angular_common_locales_sg_mjs"
	],
	"./shi-Latn.mjs": [
		85799,
		"node_modules_angular_common_locales_shi-Latn_mjs"
	],
	"./shi-Tfng.mjs": [
		2823,
		"node_modules_angular_common_locales_shi-Tfng_mjs"
	],
	"./shi.mjs": [
		84813,
		"node_modules_angular_common_locales_shi_mjs"
	],
	"./si.mjs": [
		97770,
		"node_modules_angular_common_locales_si_mjs"
	],
	"./sk.mjs": [
		27992,
		"node_modules_angular_common_locales_sk_mjs"
	],
	"./sl.mjs": [
		4011,
		"node_modules_angular_common_locales_sl_mjs"
	],
	"./smn.mjs": [
		26372,
		"node_modules_angular_common_locales_smn_mjs"
	],
	"./sn.mjs": [
		76191,
		"node_modules_angular_common_locales_sn_mjs"
	],
	"./so-DJ.mjs": [
		70984,
		"node_modules_angular_common_locales_so-DJ_mjs"
	],
	"./so-ET.mjs": [
		5166,
		"node_modules_angular_common_locales_so-ET_mjs"
	],
	"./so-KE.mjs": [
		23638,
		"node_modules_angular_common_locales_so-KE_mjs"
	],
	"./so.mjs": [
		77059,
		"node_modules_angular_common_locales_so_mjs"
	],
	"./sq-MK.mjs": [
		70167,
		"node_modules_angular_common_locales_sq-MK_mjs"
	],
	"./sq-XK.mjs": [
		6557,
		"node_modules_angular_common_locales_sq-XK_mjs"
	],
	"./sq.mjs": [
		31906,
		"node_modules_angular_common_locales_sq_mjs"
	],
	"./sr-Cyrl-BA.mjs": [
		13454,
		"node_modules_angular_common_locales_sr-Cyrl-BA_mjs"
	],
	"./sr-Cyrl-ME.mjs": [
		35228,
		"node_modules_angular_common_locales_sr-Cyrl-ME_mjs"
	],
	"./sr-Cyrl-XK.mjs": [
		38205,
		"node_modules_angular_common_locales_sr-Cyrl-XK_mjs"
	],
	"./sr-Cyrl.mjs": [
		43761,
		"node_modules_angular_common_locales_sr-Cyrl_mjs"
	],
	"./sr-Latn-BA.mjs": [
		42934,
		"node_modules_angular_common_locales_sr-Latn-BA_mjs"
	],
	"./sr-Latn-ME.mjs": [
		99087,
		"node_modules_angular_common_locales_sr-Latn-ME_mjs"
	],
	"./sr-Latn-XK.mjs": [
		31577,
		"node_modules_angular_common_locales_sr-Latn-XK_mjs"
	],
	"./sr-Latn.mjs": [
		28549,
		"node_modules_angular_common_locales_sr-Latn_mjs"
	],
	"./sr.mjs": [
		44190,
		"node_modules_angular_common_locales_sr_mjs"
	],
	"./su-Latn.mjs": [
		98052,
		"node_modules_angular_common_locales_su-Latn_mjs"
	],
	"./su.mjs": [
		10321,
		"node_modules_angular_common_locales_su_mjs"
	],
	"./sv-AX.mjs": [
		89542,
		"node_modules_angular_common_locales_sv-AX_mjs"
	],
	"./sv-FI.mjs": [
		13090,
		"node_modules_angular_common_locales_sv-FI_mjs"
	],
	"./sv.mjs": [
		38085,
		"node_modules_angular_common_locales_sv_mjs"
	],
	"./sw-CD.mjs": [
		10392,
		"node_modules_angular_common_locales_sw-CD_mjs"
	],
	"./sw-KE.mjs": [
		42976,
		"node_modules_angular_common_locales_sw-KE_mjs"
	],
	"./sw-UG.mjs": [
		76785,
		"node_modules_angular_common_locales_sw-UG_mjs"
	],
	"./sw.mjs": [
		61641,
		"node_modules_angular_common_locales_sw_mjs"
	],
	"./ta-LK.mjs": [
		71956,
		"node_modules_angular_common_locales_ta-LK_mjs"
	],
	"./ta-MY.mjs": [
		46185,
		"node_modules_angular_common_locales_ta-MY_mjs"
	],
	"./ta-SG.mjs": [
		54495,
		"node_modules_angular_common_locales_ta-SG_mjs"
	],
	"./ta.mjs": [
		6227,
		"node_modules_angular_common_locales_ta_mjs"
	],
	"./te.mjs": [
		44490,
		"node_modules_angular_common_locales_te_mjs"
	],
	"./teo-KE.mjs": [
		70261,
		"node_modules_angular_common_locales_teo-KE_mjs"
	],
	"./teo.mjs": [
		15800,
		"node_modules_angular_common_locales_teo_mjs"
	],
	"./tg.mjs": [
		73198,
		"node_modules_angular_common_locales_tg_mjs"
	],
	"./th.mjs": [
		16332,
		"node_modules_angular_common_locales_th_mjs"
	],
	"./ti-ER.mjs": [
		99441,
		"node_modules_angular_common_locales_ti-ER_mjs"
	],
	"./ti.mjs": [
		43528,
		"node_modules_angular_common_locales_ti_mjs"
	],
	"./tk.mjs": [
		60,
		"node_modules_angular_common_locales_tk_mjs"
	],
	"./to.mjs": [
		70596,
		"node_modules_angular_common_locales_to_mjs"
	],
	"./tr-CY.mjs": [
		41186,
		"node_modules_angular_common_locales_tr-CY_mjs"
	],
	"./tr.mjs": [
		53787,
		"node_modules_angular_common_locales_tr_mjs"
	],
	"./tt.mjs": [
		24604,
		"node_modules_angular_common_locales_tt_mjs"
	],
	"./twq.mjs": [
		18945,
		"node_modules_angular_common_locales_twq_mjs"
	],
	"./tzm.mjs": [
		60126,
		"node_modules_angular_common_locales_tzm_mjs"
	],
	"./ug.mjs": [
		67940,
		"node_modules_angular_common_locales_ug_mjs"
	],
	"./uk.mjs": [
		27360,
		"node_modules_angular_common_locales_uk_mjs"
	],
	"./und.mjs": [
		91682,
		"node_modules_angular_common_locales_und_mjs"
	],
	"./ur-IN.mjs": [
		38103,
		"node_modules_angular_common_locales_ur-IN_mjs"
	],
	"./ur.mjs": [
		34885,
		"node_modules_angular_common_locales_ur_mjs"
	],
	"./uz-Arab.mjs": [
		85319,
		"node_modules_angular_common_locales_uz-Arab_mjs"
	],
	"./uz-Cyrl.mjs": [
		79999,
		"node_modules_angular_common_locales_uz-Cyrl_mjs"
	],
	"./uz-Latn.mjs": [
		94483,
		"node_modules_angular_common_locales_uz-Latn_mjs"
	],
	"./uz.mjs": [
		3454,
		"node_modules_angular_common_locales_uz_mjs"
	],
	"./vai-Latn.mjs": [
		29902,
		"node_modules_angular_common_locales_vai-Latn_mjs"
	],
	"./vai-Vaii.mjs": [
		80383,
		"node_modules_angular_common_locales_vai-Vaii_mjs"
	],
	"./vai.mjs": [
		58680,
		"node_modules_angular_common_locales_vai_mjs"
	],
	"./vi.mjs": [
		61128,
		"node_modules_angular_common_locales_vi_mjs"
	],
	"./vun.mjs": [
		27624,
		"node_modules_angular_common_locales_vun_mjs"
	],
	"./wae.mjs": [
		98091,
		"node_modules_angular_common_locales_wae_mjs"
	],
	"./wo.mjs": [
		21071,
		"node_modules_angular_common_locales_wo_mjs"
	],
	"./xh.mjs": [
		41930,
		"node_modules_angular_common_locales_xh_mjs"
	],
	"./xog.mjs": [
		46423,
		"node_modules_angular_common_locales_xog_mjs"
	],
	"./yav.mjs": [
		26763,
		"node_modules_angular_common_locales_yav_mjs"
	],
	"./yi.mjs": [
		67881,
		"node_modules_angular_common_locales_yi_mjs"
	],
	"./yo-BJ.mjs": [
		76758,
		"node_modules_angular_common_locales_yo-BJ_mjs"
	],
	"./yo.mjs": [
		47912,
		"node_modules_angular_common_locales_yo_mjs"
	],
	"./yrl-CO.mjs": [
		37410,
		"node_modules_angular_common_locales_yrl-CO_mjs"
	],
	"./yrl-VE.mjs": [
		4470,
		"node_modules_angular_common_locales_yrl-VE_mjs"
	],
	"./yrl.mjs": [
		79823,
		"node_modules_angular_common_locales_yrl_mjs"
	],
	"./yue-Hans.mjs": [
		83774,
		"node_modules_angular_common_locales_yue-Hans_mjs"
	],
	"./yue-Hant.mjs": [
		25153,
		"node_modules_angular_common_locales_yue-Hant_mjs"
	],
	"./yue.mjs": [
		19413,
		"node_modules_angular_common_locales_yue_mjs"
	],
	"./zgh.mjs": [
		22830,
		"node_modules_angular_common_locales_zgh_mjs"
	],
	"./zh-Hans-HK.mjs": [
		49911,
		"node_modules_angular_common_locales_zh-Hans-HK_mjs"
	],
	"./zh-Hans-MO.mjs": [
		49107,
		"node_modules_angular_common_locales_zh-Hans-MO_mjs"
	],
	"./zh-Hans-SG.mjs": [
		8214,
		"node_modules_angular_common_locales_zh-Hans-SG_mjs"
	],
	"./zh-Hans.mjs": [
		10275,
		"node_modules_angular_common_locales_zh-Hans_mjs"
	],
	"./zh-Hant-HK.mjs": [
		13027,
		"node_modules_angular_common_locales_zh-Hant-HK_mjs"
	],
	"./zh-Hant-MO.mjs": [
		17408,
		"node_modules_angular_common_locales_zh-Hant-MO_mjs"
	],
	"./zh-Hant.mjs": [
		62368,
		"node_modules_angular_common_locales_zh-Hant_mjs"
	],
	"./zh.mjs": [
		22247,
		"node_modules_angular_common_locales_zh_mjs"
	],
	"./zu.mjs": [
		76757,
		"node_modules_angular_common_locales_zu_mjs"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 14300;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 11799:
/*!********************************************************************************!*\
  !*** ./node_modules/moment-timezone/node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 93855,
	"./af.js": 93855,
	"./ar": 80707,
	"./ar-dz": 59364,
	"./ar-dz.js": 59364,
	"./ar-kw": 21772,
	"./ar-kw.js": 21772,
	"./ar-ly": 18947,
	"./ar-ly.js": 18947,
	"./ar-ma": 67165,
	"./ar-ma.js": 67165,
	"./ar-sa": 3204,
	"./ar-sa.js": 3204,
	"./ar-tn": 69910,
	"./ar-tn.js": 69910,
	"./ar.js": 80707,
	"./az": 675,
	"./az.js": 675,
	"./be": 98434,
	"./be.js": 98434,
	"./bg": 93981,
	"./bg.js": 93981,
	"./bm": 62653,
	"./bm.js": 62653,
	"./bn": 28973,
	"./bn-bd": 23046,
	"./bn-bd.js": 23046,
	"./bn.js": 28973,
	"./bo": 81570,
	"./bo.js": 81570,
	"./br": 22945,
	"./br.js": 22945,
	"./bs": 33697,
	"./bs.js": 33697,
	"./ca": 78644,
	"./ca.js": 78644,
	"./cs": 10893,
	"./cs.js": 10893,
	"./cv": 16306,
	"./cv.js": 16306,
	"./cy": 70617,
	"./cy.js": 70617,
	"./da": 66939,
	"./da.js": 66939,
	"./de": 29400,
	"./de-at": 61289,
	"./de-at.js": 61289,
	"./de-ch": 41199,
	"./de-ch.js": 41199,
	"./de.js": 29400,
	"./dv": 72841,
	"./dv.js": 72841,
	"./el": 98600,
	"./el.js": 98600,
	"./en-au": 83377,
	"./en-au.js": 83377,
	"./en-ca": 74430,
	"./en-ca.js": 74430,
	"./en-gb": 85764,
	"./en-gb.js": 85764,
	"./en-ie": 59023,
	"./en-ie.js": 59023,
	"./en-il": 16289,
	"./en-il.js": 16289,
	"./en-in": 76569,
	"./en-in.js": 76569,
	"./en-nz": 26924,
	"./en-nz.js": 26924,
	"./en-sg": 94181,
	"./en-sg.js": 94181,
	"./eo": 3029,
	"./eo.js": 3029,
	"./es": 23114,
	"./es-do": 97287,
	"./es-do.js": 97287,
	"./es-mx": 85358,
	"./es-mx.js": 85358,
	"./es-us": 86657,
	"./es-us.js": 86657,
	"./es.js": 23114,
	"./et": 83580,
	"./et.js": 83580,
	"./eu": 72353,
	"./eu.js": 72353,
	"./fa": 95046,
	"./fa.js": 95046,
	"./fi": 81632,
	"./fi.js": 81632,
	"./fil": 24802,
	"./fil.js": 24802,
	"./fo": 67275,
	"./fo.js": 67275,
	"./fr": 67254,
	"./fr-ca": 34329,
	"./fr-ca.js": 34329,
	"./fr-ch": 37199,
	"./fr-ch.js": 37199,
	"./fr.js": 67254,
	"./fy": 86500,
	"./fy.js": 86500,
	"./ga": 54878,
	"./ga.js": 54878,
	"./gd": 33638,
	"./gd.js": 33638,
	"./gl": 72221,
	"./gl.js": 72221,
	"./gom-deva": 7246,
	"./gom-deva.js": 7246,
	"./gom-latn": 69488,
	"./gom-latn.js": 69488,
	"./gu": 22314,
	"./gu.js": 22314,
	"./he": 64714,
	"./he.js": 64714,
	"./hi": 99453,
	"./hi.js": 99453,
	"./hr": 14635,
	"./hr.js": 14635,
	"./hu": 73914,
	"./hu.js": 73914,
	"./hy-am": 83381,
	"./hy-am.js": 83381,
	"./id": 56685,
	"./id.js": 56685,
	"./is": 46015,
	"./is.js": 46015,
	"./it": 1586,
	"./it-ch": 15792,
	"./it-ch.js": 15792,
	"./it.js": 1586,
	"./ja": 99892,
	"./ja.js": 99892,
	"./jv": 10493,
	"./jv.js": 10493,
	"./ka": 82807,
	"./ka.js": 82807,
	"./kk": 41341,
	"./kk.js": 41341,
	"./km": 66261,
	"./km.js": 66261,
	"./kn": 19069,
	"./kn.js": 19069,
	"./ko": 22544,
	"./ko.js": 22544,
	"./ku": 48321,
	"./ku.js": 48321,
	"./ky": 79864,
	"./ky.js": 79864,
	"./lb": 53559,
	"./lb.js": 53559,
	"./lo": 93343,
	"./lo.js": 93343,
	"./lt": 42455,
	"./lt.js": 42455,
	"./lv": 72749,
	"./lv.js": 72749,
	"./me": 86450,
	"./me.js": 86450,
	"./mi": 840,
	"./mi.js": 840,
	"./mk": 98337,
	"./mk.js": 98337,
	"./ml": 94941,
	"./ml.js": 94941,
	"./mn": 86414,
	"./mn.js": 86414,
	"./mr": 96802,
	"./mr.js": 96802,
	"./ms": 16646,
	"./ms-my": 52743,
	"./ms-my.js": 52743,
	"./ms.js": 16646,
	"./mt": 83215,
	"./mt.js": 83215,
	"./my": 95762,
	"./my.js": 95762,
	"./nb": 61312,
	"./nb.js": 61312,
	"./ne": 80044,
	"./ne.js": 80044,
	"./nl": 62617,
	"./nl-be": 21610,
	"./nl-be.js": 21610,
	"./nl.js": 62617,
	"./nn": 7109,
	"./nn.js": 7109,
	"./oc-lnc": 55911,
	"./oc-lnc.js": 55911,
	"./pa-in": 57187,
	"./pa-in.js": 57187,
	"./pl": 80872,
	"./pl.js": 80872,
	"./pt": 47954,
	"./pt-br": 96026,
	"./pt-br.js": 96026,
	"./pt.js": 47954,
	"./ro": 96541,
	"./ro.js": 96541,
	"./ru": 7082,
	"./ru.js": 7082,
	"./sd": 56480,
	"./sd.js": 56480,
	"./se": 61561,
	"./se.js": 61561,
	"./si": 11123,
	"./si.js": 11123,
	"./sk": 48710,
	"./sk.js": 48710,
	"./sl": 67542,
	"./sl.js": 67542,
	"./sq": 6321,
	"./sq.js": 6321,
	"./sr": 91796,
	"./sr-cyrl": 28972,
	"./sr-cyrl.js": 28972,
	"./sr.js": 91796,
	"./ss": 19378,
	"./ss.js": 19378,
	"./sv": 18434,
	"./sv.js": 18434,
	"./sw": 6651,
	"./sw.js": 6651,
	"./ta": 67639,
	"./ta.js": 67639,
	"./te": 4686,
	"./te.js": 4686,
	"./tet": 54062,
	"./tet.js": 54062,
	"./tg": 52636,
	"./tg.js": 52636,
	"./th": 33771,
	"./th.js": 33771,
	"./tk": 63325,
	"./tk.js": 63325,
	"./tl-ph": 68507,
	"./tl-ph.js": 68507,
	"./tlh": 3926,
	"./tlh.js": 3926,
	"./tr": 98330,
	"./tr.js": 98330,
	"./tzl": 28685,
	"./tzl.js": 28685,
	"./tzm": 21258,
	"./tzm-latn": 4562,
	"./tzm-latn.js": 4562,
	"./tzm.js": 21258,
	"./ug-cn": 23761,
	"./ug-cn.js": 23761,
	"./uk": 60664,
	"./uk.js": 60664,
	"./ur": 66011,
	"./ur.js": 66011,
	"./uz": 70331,
	"./uz-latn": 31008,
	"./uz-latn.js": 31008,
	"./uz.js": 70331,
	"./vi": 84439,
	"./vi.js": 84439,
	"./x-pseudo": 35587,
	"./x-pseudo.js": 35587,
	"./yo": 95330,
	"./yo.js": 95330,
	"./zh-cn": 15786,
	"./zh-cn.js": 15786,
	"./zh-hk": 42153,
	"./zh-hk.js": 42153,
	"./zh-mo": 54675,
	"./zh-mo.js": 54675,
	"./zh-tw": 34365,
	"./zh-tw.js": 34365
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11799;

/***/ }),

/***/ 46700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 35528,
	"./af.js": 35528,
	"./ar": 1036,
	"./ar-dz": 17579,
	"./ar-dz.js": 17579,
	"./ar-kw": 69588,
	"./ar-kw.js": 69588,
	"./ar-ly": 11650,
	"./ar-ly.js": 11650,
	"./ar-ma": 93258,
	"./ar-ma.js": 93258,
	"./ar-ps": 25467,
	"./ar-ps.js": 25467,
	"./ar-sa": 54085,
	"./ar-sa.js": 54085,
	"./ar-tn": 90287,
	"./ar-tn.js": 90287,
	"./ar.js": 1036,
	"./az": 89757,
	"./az.js": 89757,
	"./be": 59620,
	"./be.js": 59620,
	"./bg": 31139,
	"./bg.js": 31139,
	"./bm": 4042,
	"./bm.js": 4042,
	"./bn": 19641,
	"./bn-bd": 19126,
	"./bn-bd.js": 19126,
	"./bn.js": 19641,
	"./bo": 494,
	"./bo.js": 494,
	"./br": 20934,
	"./br.js": 20934,
	"./bs": 26274,
	"./bs.js": 26274,
	"./ca": 45831,
	"./ca.js": 45831,
	"./cs": 92354,
	"./cs.js": 92354,
	"./cv": 79692,
	"./cv.js": 79692,
	"./cy": 58774,
	"./cy.js": 58774,
	"./da": 38955,
	"./da.js": 38955,
	"./de": 21557,
	"./de-at": 24954,
	"./de-at.js": 24954,
	"./de-ch": 81881,
	"./de-ch.js": 81881,
	"./de.js": 21557,
	"./dv": 16475,
	"./dv.js": 16475,
	"./el": 38877,
	"./el.js": 38877,
	"./en-au": 70454,
	"./en-au.js": 70454,
	"./en-ca": 67356,
	"./en-ca.js": 67356,
	"./en-gb": 10456,
	"./en-gb.js": 10456,
	"./en-ie": 28789,
	"./en-ie.js": 28789,
	"./en-il": 85471,
	"./en-il.js": 85471,
	"./en-in": 39664,
	"./en-in.js": 39664,
	"./en-nz": 97672,
	"./en-nz.js": 97672,
	"./en-sg": 80805,
	"./en-sg.js": 80805,
	"./eo": 87390,
	"./eo.js": 87390,
	"./es": 1564,
	"./es-do": 51473,
	"./es-do.js": 51473,
	"./es-mx": 92089,
	"./es-mx.js": 92089,
	"./es-us": 84156,
	"./es-us.js": 84156,
	"./es.js": 1564,
	"./et": 6513,
	"./et.js": 6513,
	"./eu": 7856,
	"./eu.js": 7856,
	"./fa": 2378,
	"./fa.js": 2378,
	"./fi": 22687,
	"./fi.js": 22687,
	"./fil": 80032,
	"./fil.js": 80032,
	"./fo": 46845,
	"./fo.js": 46845,
	"./fr": 8875,
	"./fr-ca": 56425,
	"./fr-ca.js": 56425,
	"./fr-ch": 41746,
	"./fr-ch.js": 41746,
	"./fr.js": 8875,
	"./fy": 67037,
	"./fy.js": 67037,
	"./ga": 11217,
	"./ga.js": 11217,
	"./gd": 37010,
	"./gd.js": 37010,
	"./gl": 51931,
	"./gl.js": 51931,
	"./gom-deva": 64488,
	"./gom-deva.js": 64488,
	"./gom-latn": 8032,
	"./gom-latn.js": 8032,
	"./gu": 34984,
	"./gu.js": 34984,
	"./he": 69090,
	"./he.js": 69090,
	"./hi": 42085,
	"./hi.js": 42085,
	"./hr": 38787,
	"./hr.js": 38787,
	"./hu": 2901,
	"./hu.js": 2901,
	"./hy-am": 59819,
	"./hy-am.js": 59819,
	"./id": 44074,
	"./id.js": 44074,
	"./is": 70715,
	"./is.js": 70715,
	"./it": 31746,
	"./it-ch": 77040,
	"./it-ch.js": 77040,
	"./it.js": 31746,
	"./ja": 3180,
	"./ja.js": 3180,
	"./jv": 34346,
	"./jv.js": 34346,
	"./ka": 65538,
	"./ka.js": 65538,
	"./kk": 79772,
	"./kk.js": 79772,
	"./km": 87905,
	"./km.js": 87905,
	"./kn": 79125,
	"./kn.js": 79125,
	"./ko": 69140,
	"./ko.js": 69140,
	"./ku": 2354,
	"./ku-kmr": 44662,
	"./ku-kmr.js": 44662,
	"./ku.js": 2354,
	"./ky": 63768,
	"./ky.js": 63768,
	"./lb": 14016,
	"./lb.js": 14016,
	"./lo": 83169,
	"./lo.js": 83169,
	"./lt": 62353,
	"./lt.js": 62353,
	"./lv": 83243,
	"./lv.js": 83243,
	"./me": 52338,
	"./me.js": 52338,
	"./mi": 35555,
	"./mi.js": 35555,
	"./mk": 85794,
	"./mk.js": 85794,
	"./ml": 53151,
	"./ml.js": 53151,
	"./mn": 46458,
	"./mn.js": 46458,
	"./mr": 69165,
	"./mr.js": 69165,
	"./ms": 8680,
	"./ms-my": 87477,
	"./ms-my.js": 87477,
	"./ms.js": 8680,
	"./mt": 79684,
	"./mt.js": 79684,
	"./my": 40285,
	"./my.js": 40285,
	"./nb": 45922,
	"./nb.js": 45922,
	"./ne": 29040,
	"./ne.js": 29040,
	"./nl": 5066,
	"./nl-be": 74460,
	"./nl-be.js": 74460,
	"./nl.js": 5066,
	"./nn": 53693,
	"./nn.js": 53693,
	"./oc-lnc": 88676,
	"./oc-lnc.js": 88676,
	"./pa-in": 92341,
	"./pa-in.js": 92341,
	"./pl": 57416,
	"./pl.js": 57416,
	"./pt": 84344,
	"./pt-br": 30113,
	"./pt-br.js": 30113,
	"./pt.js": 84344,
	"./ro": 72643,
	"./ro.js": 72643,
	"./ru": 61305,
	"./ru.js": 61305,
	"./sd": 96095,
	"./sd.js": 96095,
	"./se": 74486,
	"./se.js": 74486,
	"./si": 58742,
	"./si.js": 58742,
	"./sk": 96722,
	"./sk.js": 96722,
	"./sl": 3345,
	"./sl.js": 3345,
	"./sq": 52416,
	"./sq.js": 52416,
	"./sr": 39450,
	"./sr-cyrl": 50501,
	"./sr-cyrl.js": 50501,
	"./sr.js": 39450,
	"./ss": 32222,
	"./ss.js": 32222,
	"./sv": 9454,
	"./sv.js": 9454,
	"./sw": 19638,
	"./sw.js": 19638,
	"./ta": 96494,
	"./ta.js": 96494,
	"./te": 94435,
	"./te.js": 94435,
	"./tet": 25003,
	"./tet.js": 25003,
	"./tg": 13706,
	"./tg.js": 13706,
	"./th": 16025,
	"./th.js": 16025,
	"./tk": 59780,
	"./tk.js": 59780,
	"./tl-ph": 22068,
	"./tl-ph.js": 22068,
	"./tlh": 39167,
	"./tlh.js": 39167,
	"./tr": 32494,
	"./tr.js": 32494,
	"./tzl": 58707,
	"./tzl.js": 58707,
	"./tzm": 91296,
	"./tzm-latn": 34532,
	"./tzm-latn.js": 34532,
	"./tzm.js": 91296,
	"./ug-cn": 12086,
	"./ug-cn.js": 12086,
	"./uk": 85069,
	"./uk.js": 85069,
	"./ur": 29304,
	"./ur.js": 29304,
	"./uz": 95115,
	"./uz-latn": 97609,
	"./uz-latn.js": 97609,
	"./uz.js": 95115,
	"./vi": 34802,
	"./vi.js": 34802,
	"./x-pseudo": 65605,
	"./x-pseudo.js": 65605,
	"./yo": 88456,
	"./yo.js": 88456,
	"./zh-cn": 23272,
	"./zh-cn.js": 23272,
	"./zh-hk": 9402,
	"./zh-hk.js": 9402,
	"./zh-mo": 48101,
	"./zh-mo.js": 48101,
	"./zh-tw": 40262,
	"./zh-tw.js": 40262
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46700;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map