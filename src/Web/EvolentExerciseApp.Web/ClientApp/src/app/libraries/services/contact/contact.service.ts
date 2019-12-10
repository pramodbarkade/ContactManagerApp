import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { globalVarible } from "../../global/globalVariable";
import { ApiResponse } from "../../entities/common/stdresp.model";
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactService {

    //===||
    private apiListUrl: string = "/api/" + globalVarible.API_VER + "/contact/getlist";

    //===||
    constructor(private http: HttpClient) {

    }

    //===||  
    public getList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiListUrl, httpOptions);
    }
}

