import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { response } from "express";

@Injectable
({
    providedIn: "root"
})
export class ApiService {


    private url = "http://localhost:3000";

    private routes = {
        getDiscoveredTable: "get-discovered-table",
        getIngredients: "get-ingredients",
        startGame: "start-game",
        analyzeIngredient: "analyze-ingredient",
        tryStorage: "try-storage",
        getStorages: "get-storages",
    };

    constructor(private http: HttpClient) {}

    // ****************************************************************************************************

    get(route: string): Observable<any> {
        return this.http.get(`${this.url}/${route}`);
    }

    post(route: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return this.http.post(`${this.url}/${route}`, data, { headers, responseType: 'json' });
    }

    put(route: string, data: any): Observable<any> {
        return this.http.put(`${this.url}/${route}`, data);
    }

    delete(route: string): Observable<any> {
        return this.http.delete(`${this.url}/${route}`);
    }

    // ****************************************************************************************************

    startGame(code: string): Observable<any> {
        return this.post(`${this.routes.startGame}`, {
            code,
        });
    }

    getDiscoveredTable(group: string, ingredientId: string): Observable<any> {
        return this.post(`${this.routes.getDiscoveredTable}`, {
            group,
            ingredientId
        });
    }

    getIngredients(group: string): Observable<any> {
        return this.post(`${this.routes.getIngredients}`, {
            group
        });
    }
    getStorages(): Observable<any> {
        return this.get(`${this.routes.getStorages}`);
    }
    analyzeIngredient(group: string, ingredientId: string,condition: string, value:string): Observable<any> {
        return this.post(`${this.routes.analyzeIngredient}`, {
            group,
            ingredientId,
            condition,
            value
        });
    }
    tryStorage(storageId: string, ingredientId: string): Observable<any> {
        return this.post(`${this.routes.tryStorage}`, {
            ingredientId,
            storageId
        });
    }

}