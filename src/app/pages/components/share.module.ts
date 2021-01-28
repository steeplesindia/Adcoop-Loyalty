import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPage } from './Header/header.page';

@NgModule({
  imports:[ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderPage
  ],
  exports:[HeaderPage]
 
})
export class ShareModule {}
