import { Component, OnInit } from '@angular/core';
import { CitasService, cita, doctor } from '../../servicios/citas.service';
import { ModalController, AlertController, ActionSheetController,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistorialCitasComponent } from "../../componentes/historial-citas/historial-citas.component";;

 
@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  public citasRooms :any = [];
  public doctores :any = [];
  docinfo : string;

  constructor(
    public citasservice : CitasService,
    public alerta : AlertController,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.citasservice.getCitas().subscribe(citas => {

     this.citasRooms = citas;
    })
  }
  onChange(event){
    //console.log(event.detail.value);
    this.citasservice.getDoctorEspe().subscribe(doctor =>{
      this.doctores = doctor;
      this.doctores = this.doctores.filter(data =>{
        console.log(event.detail.value);
      return  data.especialidad.toString().trim() === event.detail.value;
      })
      if(this.doctores.length === 0){
        this.myAlerta();
      }
    });
  }
  async myAlerta(){
    const miAlerta = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'No hay docotres disponibles para esta especialidad',
      buttons: ['OK']
    });
   await miAlerta.present();
  }
  close(){
    this.router.navigate(['/home']);
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Historial de citas',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Mis citas',
        icon: 'reader-outline',
        handler: () => {
          this.modal.create({
            component: HistorialCitasComponent,
            componentProps : {

            }

          }).then((modal)=> modal.present() )
        },
      }]
    });
    await actionSheet.present();
  }
}
