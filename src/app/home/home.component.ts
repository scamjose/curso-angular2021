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
  columns=['talla','color','categoria','actions'];

  constructor(private dataService: DataService, private ropa:RopaService,private router:Router) {
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

  ngOnInit(): void {
  }

  edit(item:Ropa):void{
    console.log(item);
    this.router.navigate(['ropa',item._id]);
  }

  newItem():void{
    this.router.navigate(['ropa']);
    }
}
