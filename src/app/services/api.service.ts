import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable
({
    providedIn: "root"
})
export class ApiService {
    private url = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    get(url: string): Observable<any> {
        return this.http.get(`${this.url}/${url}`);
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(`${this.url}/${url}`, data);
    }

    put(url: string, data: any): Observable<any> {
        return this.http.put(`${this.url}/${url}`, data);
    }

    delete(url: string): Observable<any> {
        return this.http.delete(`${this.url}/${url}`);
    }
}

