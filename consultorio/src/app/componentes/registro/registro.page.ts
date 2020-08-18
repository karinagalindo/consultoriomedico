import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email : string;
  public password: string;
  public Cpassword: string;
  public tipo :string;

  constructor(private auth : AuthService, private router : Router,  public alerta : AlertController) { }

  ngOnInit() {
  }
  OnSubmitRegister(){
    if(this.Cpassword === this.password){
      this.auth.register(this.email, this.password, this.tipo).then(auth => {
      console.log(auth);
      if(this.tipo === "Administrador"){
        this.router.navigate(['/home-admin'])
      }else if(this.tipo === "Paciente"){
        this.router.navigate(['/home']);
      }

    }).catch(err => console.log(err))
    }else{ this.myAlerta();

    }
  }
  async myAlerta(){
    const miAlerta = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Las contraseñas no son las mismas',
      buttons: ['OK']
    });
   await miAlerta.present();
  }


}
