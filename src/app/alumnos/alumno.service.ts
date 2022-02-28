import { Injectable } from '@angular/core';
import { ALUMNOS } from './alumnos.json';
import { Alumno } from './alumno';
import { Observable, of, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlEndPoint: string = 'http://localhost:8080/api/alumnos'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getAlumnos(): Observable<Alumno[]> {
    //return of(ALUMNOS);
    return this.http.get<Alumno[]>(this.urlEndPoint);
  }

  create(alumno: Alumno): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, alumno, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.error);
        Swal.fire('Error al crear un nuevo alumno', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );


  }

  getAlumno(id): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/alumnos']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  update(alumno: Alumno): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${alumno.id}`, alumno, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  delete(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }
}
