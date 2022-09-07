import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'https://crudcrud.com/api/85edc4747a66497f94a92a5a25ff01fa/employees';

  constructor(private http: HttpClient) {}

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(_id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/' + _id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL ,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateEmployee(_id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/' + _id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(_id: any) {
    return this.http
      .delete<Employee>(this.apiURL + '/' + _id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
