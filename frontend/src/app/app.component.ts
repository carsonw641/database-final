import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileDialogComponent, ProfileData } from './components/profile-component/profile-dialog.component'
import { CreateItemComponent, Gift } from "./components/create-item/create-item.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: string ='';
    currentList: string ='';

    gifts: Gift[];
    users: ProfileData[] = [];
    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _config: ConfigService) {}

    public purchaseItem(gift: Gift): void {
      gift.purchaserId = this.currentUser;
      this._config.updateItem(gift);
    }

    public async viewProfile(): Promise<void> {
      const dialogRef = this.dialog.open(ProfileDialogComponent, {
        width: '50vw',
        data: {'email': this.currentUser}
      });

       dialogRef.afterClosed().subscribe(async result => {
        if (result !== undefined){
          this.currentUser = result;
          if (this.currentUser){
            this.gifts = await this._config.getItems(this.currentUser);
            this.currentList = this.currentUser;
          }else {
            this.gifts = [];
          }
        }
      });
    }

    public async viewList(email: string): Promise<void> {
      this.gifts = await this._config.getItems(email);
      for (let gift of this.gifts) {
        gift.purchased = gift.purchased == true;
      }

      this.currentList = email;
    }

    public async loadAccounts(): Promise<void> {
      let newUsers = await this._config.getProfiles()
      this.users = newUsers;
    }

    public addItem(): void {
      if (this.currentUser) {
        let gift: Gift = {
          "id": this.generateGuid(),
          "userEmail": this.currentUser,
          "itemName": '',
          "price": 0,
          "url": '',
          "purchased": false,
          "purchaserId": null
        };


        const dialogRef = this.dialog.open(CreateItemComponent, {
          width: '50vw',
          data: gift
        });

        dialogRef.afterClosed().subscribe(results => {
          if (results){
            this._config.createItem(results);
            this.gifts.push(results);
          }
        });
      }else {
        this._snackBar.open("Please sign in first...", "Close")
      }
    }

    public editItem(index): void {
      let gift: Gift = Object.assign({}, this.gifts[index]);
      const dialogRef = this.dialog.open(CreateItemComponent, {
        width: '50vw',
        data: gift
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.gifts[index] = gift;
          this._config.updateItem(gift);
      });
    }

    public deleteItem(index): void {
      const id = this.gifts[index].id;
      this.gifts.splice(index, 1);
      this._config.deleteItem(id);
    }


    private generateGuid(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

}