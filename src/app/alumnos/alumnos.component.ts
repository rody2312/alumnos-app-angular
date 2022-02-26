import { Component, OnInit } from '@angular/core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(
      alumnos => this.alumnos = alumnos
    );
  }

  delete(alumno: Alumno): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al alumno ${alumno.nombre} ${alumno.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.delete(alumno.id).subscribe(
          response => {
            this.alumnos = this.alumnos.filter(alum => alum !== alumno)
            swalWithBootstrapButtons.fire(
              'Alumno eliminado!',
              `El alumno ${alumno.nombre} ha sido eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
