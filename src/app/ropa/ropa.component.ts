import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Ropa } from '../model/ropa.model';
import { DataService } from '../services/data.service';
import { RopaService } from '../services/ropa.service';

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.css']
})
export class RopaComponent implements OnInit {
  formRopa:FormGroup=this.formBuilder.group({});
  disableButton=false;
  id:string='';
  title='Crear elemento';
  titleB='Guardar'

  constructor(private formBuilder: FormBuilder,
    private ropaService:RopaService,
    private router:Router, 
    private dataService:DataService, 
    private activatedRoute: ActivatedRoute,
    private snackbar:MatSnackBar) { 
    this.formRopa=this.formBuilder.group({
      color:['',[Validators.required]],
      talla:['',[Validators.required]],
      categoria:['',[Validators.required]]
    });
    this.dataService.isLoading.subscribe(isLoading=>{
      this.disableButton=isLoading;
    });

    this.activatedRoute.params.subscribe(parameters=>{
      if(parameters.id){
        this.id=parameters.id;
        this.title='Actualizar elemento';

        this.dataService.isLoading.next(true);
        this.ropaService.getSingleRopa(parameters.id).subscribe(item=>{
          this.formRopa.patchValue(item);
          this.dataService.isLoading.next(false);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  save():void{
    const data={
      talla:this.formRopa.get('talla')?.value,
      color:this.formRopa.get('color')?.value,
      categoria:this.formRopa.get('categoria')?.value,
    } as Ropa;

    console.log(data);

    this.dataService.isLoading.next(true);

    this.ropaService.saveRopa(data,this.id).subscribe(()=>{
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
    },()=>{
      this.dataService.isLoading.next(false);
      this.snackbar.open('Ocurrio un error','Ok',{duration:3000});
      //alert(err.error.error);
    });
  }

}
