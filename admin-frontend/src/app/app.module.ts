import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DefaultModule } from './layouts/default/default.module';
import { UsersComponent } from './users/users.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesAddEditComponent } from './categories-add-edit/categories-add-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductsAddEditComponent } from './products-add-edit/products-add-edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsAddEditComponent } from './reviews-add-edit/reviews-add-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersAddEditComponent } from './orders-add-edit/orders-add-edit.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderItemsAddEditComponent } from './order-items-add-edit/order-items-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpAddEditComponent,
    UsersAddEditComponent,
    UsersComponent,
    AppNavComponent,
    CategoryComponent,
    CategoriesAddEditComponent,
    ProductsComponent,
    ProductsAddEditComponent,
    ReviewsComponent,
    ReviewsAddEditComponent,
    OrdersComponent,
    OrdersAddEditComponent,
    OrderItemsComponent,
    OrderItemsAddEditComponent,
    // HeaderComponent,
    // FooterComponent,
    // SidebarComponent,
    // PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
