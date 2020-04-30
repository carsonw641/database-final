import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileDialogComponent, ProfileData } from './components/profile-component/profile-dialog.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: string = '';

    constructor(public dialog: MatDialog) {}

    viewProfile(): void {
      const dialogRef = this.dialog.open(ProfileDialogComponent, {
        width: '50vw',
        data: {username: this.currentUser}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.currentUser = result;
      })
    }
}