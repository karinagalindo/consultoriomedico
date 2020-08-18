import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
export interface cita {
  id : string
  especialidad: string
}
export interface doctor{
  id : string
  nombre : string
  telefono :  number
  especialidad: string
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private db : AngularFirestore) { }

  getCitas(){
    return this.db.collection('Especialidades').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as cita;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getDoctorEspe(){
   return this.db.collection('Doctores').snapshotChanges().pipe(map( doctores =>{
    return doctores.map(b =>{
        const data = b.payload.doc.data() as doctor;
        data.id = b.payload.doc.id;
       return data;
      }) 
    })) 
  } 
}


