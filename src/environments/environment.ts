// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Local Environment Heading',
  apiURL: 'http://localhost:8000/api',
  apiPostOneImg: 'http://upload.fukuro.website/file',
  apiPostImg: 'http://upload.fukuro.website/multipleFiles',
  linkImg: 'http://upload.fukuro.website/upload/',
  apiDeleteImg: 'http://upload.fukuro.website/file/delete',
  apiDeleteMultipleImg: 'http://upload.fukuro.website/files/delete',
  apiDetailURl:'http://localhost:4200/hoi-dap/chi-tiet'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
