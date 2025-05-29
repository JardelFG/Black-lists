import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './features/layout/layout.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './shared/components/list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { listReducer } from './Store/reducers/list.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestNewListComponent } from './shared/components/request-new-list/request-new-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BgSelectorComponent } from './shared/components/bg-selector/bg-selector.component';
import { localStorageMetaReducer } from './Store/reducers/localStorage.metareducer';
import { DisplayTagComponent } from './shared/components/display-tag/display-tag.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ButtonComponent,
    InputComponent,
    SidebarComponent,
    HomeComponent,
    ListComponent,
    RequestNewListComponent,
    BgSelectorComponent,
    DisplayTagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    StoreModule.forRoot(
      { lists: listReducer },
      { metaReducers: [localStorageMetaReducer] }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
