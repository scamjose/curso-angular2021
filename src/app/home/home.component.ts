import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ropa } from '../model/ropa.model';
import { DataService } from '../services/data.service';
import { RopaService } from '../services/ropa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource= new MatTableDataSource<Ropa>();
  columns=['talla','color','categoria','actions','delete'];

  constructor(private dataService: DataService, private ropa:RopaService,private router:Router) {
    this.load();
   }

  ngOnInit(): void {
  }

  load():void{
    this.dataService.isLoading.next(true);
    this.ropa.getRopa().subscribe(ropa=>{
      this.dataSource.data=ropa;
      this.dataService.isLoading.next(false);
    },()=>{
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Lo sentimos, no se pudieron cargar los elementos')
      //alert('Lo sentimos, no se pudieron cargar los elementos')
    });
  }

  edit(item:Ropa):void{
    console.log(item);
    this.router.navigate(['ropa',item._id]);
  }

  newItem():void{
    this.router.navigate(['ropa']);
    }

  deleteItem(id:string):void{
      this.dataService.isLoading.next(true);

      this.ropa.deleteRopa(id).subscribe(del=>{
        this.dataService.message.next("Elemento borrado");

        this.load();
      
        this.dataService.isLoading.next(false);
      },()=>{
        this.dataService.isLoading.next(false);
        this.dataService.message.next("Ocurrio un error");
      });
    }
}
