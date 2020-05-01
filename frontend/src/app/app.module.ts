import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileDialogComponent } from './components/profile-component/profile-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateItemComponent } from './components/create-item/create-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    ProfileDialogComponent,
    CreateItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  entryComponents: [
    ProfileDialogComponent,
    CreateItemComponent
  ],
  providers: [ ConfigService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
