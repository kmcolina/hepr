import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiKaran} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KaranApiService {
  constructor(private http: HttpClient) { }

  public registerNatural(info: any): Observable<any> {
    return this.http.post<any>(apiKaran.registerNat,info);
  }
  public registerJuridico(info: any): Observable<any> {
    return this.http.post<any>(apiKaran.registerJur,info);
  }

}


// apiURL = 'https://apikaran.herokuapp.com'
// registro natural: auth/register/natural/  POST
// registro juridico: auth/register/juridico/ POST

/* Objeto usado por ambos
{
  "email": "juridico1@gmail.com",
  "username": "juridico",
  "dni": 2,
  "first_name" : "juridico",
  "last_name" : "primero",
  "password" : "andres1234",
  "password_confirmation" : "andres1234"
}

email: ["Enter a valid email address."]
password: ["Ensure this field has at least 8 characters."]
password_confirmation: ["Ensure this field has at least 8 characters."]
username: ["This field must be unique."]
*/
