import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoRequest } from '../modelContacto/contacto.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formContacto:FormGroup=this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {
    this.formContacto=this.formBuilder.group({
      nombre:['',[Validators.required]],
      correo:['',[Validators.required],Validators.email],
      mensaje:['',[Validators.required,Validators.maxLength(10)]]
    });
   }

  ngOnInit(): void {
  }
  contacto():void{
    const nombre=this.formContacto.get('nombre')?.value;
    const correo=this.formContacto.get('correo')?.value;
    const mensaje=this.formContacto.get('mensaje')?.value;

    const data={
      nombre:nombre,
      correo:correo,
      mensaje:mensaje
    } as ContactoRequest;

    console.log(data)
  }
}
