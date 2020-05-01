import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Gift {
  id: string,
  userEmail: string
  itemName: string,
  price: number,
  url: string,
  purchased: boolean,
  purchaserId: string
}

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})

export class CreateItemComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gift) { 
    }

  ngOnInit(): void {
  }

  public submit(): void {
    if (this.data.itemName){
      this.dialogRef.close(this.data);
    }
  }

}
