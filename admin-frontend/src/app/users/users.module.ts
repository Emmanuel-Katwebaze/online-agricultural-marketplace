import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
})
export class UsersModule { }
