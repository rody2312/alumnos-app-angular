import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public alumno:Alumno = new Alumno();
  public titulo:string = "Crear Alumno";

  constructor(private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    this.alumnoService.create(this.alumno).subscribe(
      response => this.router.navigate(['/alumnos'])
    )
  }

}
