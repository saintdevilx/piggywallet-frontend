import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/core/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { TooltipsModule } from 'ionic-tooltips';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeHttpModule, NativeHttpFallback, NativeHttpBackend } from './ionic-native-http-connection-backend';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { MPWErrorHandler } from './core/errors/error.handler';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';


const firebaseConfig = {
  apiKey:"AIzaSyAmbz1tuU6gXBRFEkaNFo0NOhQOo4Dy22I",
  authDomain:"my-pi-264605.firebaseapp.com"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule, HttpClientModule, TooltipsModule.forRoot(), 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    NativeHttpModule,
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MPWErrorHandler},
    HttpClientModule,
    ApiService,
    Device,
    FCM,
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
    CodePush,
    {provide: ErrorHandler, useClass: ErrorHandler},
    GooglePlus ,
    FirebaseDynamicLinks,
    FirebaseX,
    FirebaseAnalytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
