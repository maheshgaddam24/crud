import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  apiURL = 'https://crudcrud.com/api/2065d95c4384464484328e3317b87b75/employees';

  constructor(private http: HttpClient) {}


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL )
      .pipe(retry(1), catchError(this.handleError));
  }


  getEmployee(_id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/' + _id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL ,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  updateEmployee(_id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/' + _id ,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  deleteEmployee(_id: any) {
    return this.http
      .delete<Employee>(this.apiURL + '/' + _id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
