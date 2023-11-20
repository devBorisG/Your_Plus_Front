// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const urlBase = 'http://localhost:8080';
export const environment = {
  production: true,
  url: `${urlBase}`,
  urlautentication: `${urlBase}/yourplus/v1/personas/authenticate`,
  urllaboratorio: `${urlBase}/yourplus/v1/laboratorios`,
  urlpersona: `${urlBase}/yourplus/v1/personas`,
  urlproducto: `${urlBase}/yourplus/v1/productos`,
  urlcategoria: `${urlBase}/yourplus/v1/categorias`,
  urlrol: `${urlBase}/yourplus/v1/roles`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
