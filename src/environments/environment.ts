// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 //API_URL: 'http://mpw-django-staging.herokuapp.com/api/',
 //API_URL: 'https://dev.mypiggywallet.com/api/',
 // API_URL: 'http://localhost:8000/api/',
  API_URL: 'http://192.168.43.165:8000/api/',
  OTP_COUNTDOWN_TIME:10,
  WEBSITE_DOMAIN:'domain.com',
  CASHFREE_JS_SDK: 'https://www.cashfree.com/assets/cashfree.sdk.v1.2.js',
  SYNC_TIMEOUT: 60*60*12*1000, // milliseconds ,
  APP_VERSION_XML_URL:'http://192.168.43.165:8000/app_version_update.xml',
  GOOGLE_WEB_CLIENT_ID:'domain.apps.googleusercontent.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
