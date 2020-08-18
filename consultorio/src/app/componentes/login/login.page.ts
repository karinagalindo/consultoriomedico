import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private authServices: AuthService, public router: Router, public alerta : AlertController ) { }

  ngOnInit() {
  }

  OnSubmitLogin(){
    this.authServices.login(this.email, this.password).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err => {
      this.myAlerta();
    })   
  }
  async myAlerta(){
    const miAlerta = await this.alerta.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Los datos son incorrectos o aun no esta registrado el usuario',
      buttons: ['OK']
    });
   await miAlerta.present();
  }
}