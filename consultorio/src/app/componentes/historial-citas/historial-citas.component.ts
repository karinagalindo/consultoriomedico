import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ActionSheetController,  } from '@ionic/angular';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.scss'],
})
export class HistorialCitasComponent implements OnInit {
  public modal: ModalController

  constructor(public router: Router) { }

  ngOnInit() {}
  close(){
    this.modal.dismiss();
  }

}
