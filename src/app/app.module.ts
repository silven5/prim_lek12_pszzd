import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Firebase connect
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHeaderComponent } from './my-header/my-header.component';
@NgModule({
  declarations: [AppComponent, MyHeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // !Підключення до Firebase
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
