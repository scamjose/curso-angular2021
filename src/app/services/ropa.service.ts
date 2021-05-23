import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ropa } from '../model/ropa.model';

@Injectable({
  providedIn: 'root'
})
export class RopaService {

  constructor(private http:HttpClient) { }

  getRopa(): Observable<[Ropa]>{
    return this.http.get<[Ropa]>('https://super-rest.herokuapp.com/test/ropa');
  }

  getSingleRopa(id:string):Observable<Ropa>{
    return this.http.get<Ropa>('https://super-rest.herokuapp.com/test/ropa' + id);
  }

  saveRopa(item:Ropa,id?:string):Observable<any>{
    //update
    if(id !==''){
      return this.http.put('https://super-rest.herokuapp.com/test/ropa/'+id,item);
    }

    return this.http.post('https://super-rest.herokuapp.com/test/ropa',item);
  }

  deleteRopa(id:string):Observable<any>{
    return this.http.delete('https://super-rest.herokuapp.com/test/ropa/'+id);
  }

}
