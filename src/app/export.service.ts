import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Export} from "./home/home.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  // @TODO: IMPORTANT! Please change this URL to whatever you are using to run Symfony backend on
  private REST_API_SERVER = "http://lsi_backend.local";

  constructor(private httpClient: HttpClient) { }

  public getExports(): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER + "/api/export");
  }
}
