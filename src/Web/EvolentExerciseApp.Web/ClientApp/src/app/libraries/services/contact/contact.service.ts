import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { globalVarible } from "../../global/globalVariable";
import { ApiResponse } from "../../entities/common/stdresp.model";
import { Observable } from 'rxjs';
import { ContactModel } from '../../entities/app/contact.model';
import { ContactStatusModel } from '../../entities/app/contactstatus.model';

//===|| HttpHeaders
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//===|| Injectable
@Injectable()

export class ContactService {

    //===|| api urls
    private serviceName = "contact";
    private apiListUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/list";
    private apiViewUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/view";
    private apiCreateUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/create";
    private apiUpdateUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/update";
    private apiStatusUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/status";
    private apiDeleteUrl: string = "/api/" + globalVarible.API_VER + "/" + this.serviceName + "/delete";

    //===|| constructor
    constructor(private http: HttpClient) {

    }

    //===|| list 
    public list(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiListUrl, httpOptions);
    }

    //===|| view
    public view(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiViewUrl + "/" + id, httpOptions);
    }

    //===|| create
    public create(contactModel : ContactModel): Observable<ApiResponse> {
        console.log(JSON.stringify(contactModel));
        return this.http.post<ApiResponse>(this.apiCreateUrl, JSON.stringify(contactModel), httpOptions);
    }

    //===|| update
    public update(contactModel : ContactModel): Observable<ApiResponse> {        
        return this.http.put<ApiResponse>(this.apiUpdateUrl, JSON.stringify(contactModel), httpOptions);
    }

    //===|| status
    public status(contactStatusModel : ContactStatusModel): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(this.apiStatusUrl, JSON.stringify(contactStatusModel), httpOptions);
    }

    //===|| delete
    public delete(id : number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.apiDeleteUrl +"/" + id, httpOptions);
    }
}

