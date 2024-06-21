import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponseModel, Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = 'http://localhost:3000/todos/';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return throwError(error); // Rethrow the error or handle as needed
        })
      );
  }

  addTodo(todo: Task): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: Task): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(`${this.apiUrl}${id}`, todo); // Corrected URL
  }

  deleteTodo(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(`${this.apiUrl}${id}`); // Corrected URL
  }
}
