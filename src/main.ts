// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';


// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app/app';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { routes } from './app/app.routes'; // your routing file
// import { authInterceptor } from './app/interceptors/auth.interceptor';

// bootstrapApplication(App, {
//  providers: [
//     provideRouter(routes),
//     provideHttpClient(
//       withInterceptors([authInterceptor])
//     )
//   ]
// }).catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes'; // your routing file
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // ✅ enable Fetch API for SSR
      withInterceptors([authInterceptor]) // ✅ attach your interceptor
    )
  ]
}).catch(err => console.error(err));
