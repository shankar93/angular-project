import { NgModule } from '@angular/core';

import {
  MatRadioModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  exports: [
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
