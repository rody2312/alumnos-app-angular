import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public alumno: Alumno = new Alumno();
  public titulo: string = "Crear Alumno";

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.alumnoService.getAlumno(id).subscribe((alumno) => this.alumno = alumno)
      }
    })
  }

  public create(): void {
    this.alumnoService.create(this.alumno)
      .subscribe(json => {
        this.router.navigate(['/alumnos'])
        swal.fire('Nuevo alumno', `Alumno ${json.alumno.nombre} creado con éxito!`, 'success')
      }
      )
  }

  update(): void {
    this.alumnoService.update(this.alumno)
      .subscribe(json => {
        this.router.navigate(['/alumnos'])
        swal.fire('Alumno actualizado', `Alumno actualizado con éxito!`, 'success')
      }
      )
  }

  

}
