import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface ProfileData {
  name: string,
  email: string
}

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  usernameField: string = '';
  emailField: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  public signOut(): void {
    this.dialogRef.close('');
  }

  public async userLogin(): Promise<void> {
    if (this.emailField){
      let response: boolean = await this.configService.getProfile(this.emailField);

      if (response)
        this.dialogRef.close(this.emailField);
      else
        this._snackBar.open("Account doesn't exist", "Cry a little")
    }
  }

  public async signUp(): Promise<void> {
    if (this.usernameField && this.emailField){
      await this.configService.createProfile(this.usernameField, this.emailField);
      this.dialogRef.close(this.emailField)
    }
  }

}
