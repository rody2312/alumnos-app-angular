import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoService } from './alumnos/alumno.service';
import { RouterModule, Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './alumnos/form.component'
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/alumnos', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    AlumnosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
