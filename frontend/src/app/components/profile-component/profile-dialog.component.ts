import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../../services/config.service';

export interface ProfileData {
  username: string
  password: string
}

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  usernameField: string = '';

  constructor(
    private configService: ConfigService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileData) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async userLogin(): Promise<void> {
    let response: boolean = await this.configService.getProfile(this.usernameField);
    console.log(`The response was: ${response}`);
  }

  public async signUp(): Promise<void> {
    let response: string = await this.configService.createProfile(this.usernameField);
  }

}
