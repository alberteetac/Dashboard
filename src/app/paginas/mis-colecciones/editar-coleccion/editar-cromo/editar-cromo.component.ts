import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ResponseContentType, Http, Response } from '@angular/http';

// Clases
import { Cromo, Coleccion } from '../../../../clases/index';

// Servicios
import { ColeccionService } from '../../../../servicios/index';

export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}

@Component({
  selector: 'app-editar-cromo',
  templateUrl: './editar-cromo.component.html',
  styleUrls: ['./editar-cromo.component.scss']
})
export class EditarCromoComponent implements OnInit {

  cromo: Cromo;
  coleccion: Coleccion;


  nombreCromo: string;
  nivelCromo: string;
  probabilidadCromo: string;


  // imagen cromo
  imagenCromo: string;
  nombreImagenCromo: string;
  file: File;

  // tslint:disable-next-line:ban-types
  imagenCambiada: Boolean = false;

    // Opciones para mostrar en la lista desplegable para seleccionar el tipo de juego que listar
    opcionesProbabilidad: OpcionSeleccionada[] = [
      {nombre: 'Muy baja', id: 'Muy baja'},
      {nombre: 'Baja', id: 'Baja'},
      {nombre: 'Media', id: 'Media'},
      {nombre: 'Alta', id: 'Alta'},
      {nombre: 'Muy alta', id: 'Muy alta'},

    ];

    opcionSeleccionadaProbabilidad: string;

      // Opciones para mostrar en la lista desplegable para seleccionar el tipo de juego que listar
    opcionesNivel: OpcionSeleccionada[] = [
        {nombre: 'Diamante', id: 'Diamante'},
        {nombre: 'Platino', id: 'Platino'},
        {nombre: 'Oro', id: 'Oro'},
        {nombre: 'Plata', id: 'Plata'},
        {nombre: 'Bronce', id: 'Bronce'},
    ];
    opcionSeleccionadaNivel: string;

  constructor(
              private coleccionService: ColeccionService,
              public dialog: MatDialog,
              private location: Location,
              private http: Http
  ) { }

  ngOnInit() {
    this.cromo = this.coleccionService.RecibirCromoDelServicio();
    this.nombreCromo = this.cromo.Nombre;
    this.nivelCromo = this.cromo.Nivel;
    this.probabilidadCromo = this.cromo.Probabilidad;

    this.opcionSeleccionadaNivel = this.cromo.Nivel;
    this.opcionSeleccionadaProbabilidad = this.cromo.Probabilidad;
    console.log(this.cromo);
    // Cargo el imagen del cromo
    this.GET_Imagen();
  }

      // Busca el logo que tiene el nombre del equipo.FotoEquipo y lo carga en imagenLogo
      GET_Imagen() {

        if (this.cromo.Imagen !== undefined ) {
          // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
          this.http.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + this.cromo.Imagen,
          { responseType: ResponseContentType.Blob })
          .subscribe(response => {
            const blob = new Blob([response.blob()], { type: 'image/jpg'});

            const reader = new FileReader();
            reader.addEventListener('load', () => {
              this.imagenCromo = reader.result.toString();
            }, false);

            if (blob) {
              reader.readAsDataURL(blob);
            }
        });
        }
      }

      prueba() {
        console.log(this.cromo);

      }

      // AL CLICAR EN AGREGAR LOGO NOS ACTIVARÁ LA FUNCIÓN MOSTRAR DE ABAJO
      ActivarInput() {
        console.log('Activar input');
        document.getElementById('input').click();
      }


       // Seleccionamos una foto y guarda el nombre de la foto en la variable logo
      Mostrar($event) {
        this.file = $event.target.files[0];

        console.log('fichero ' + this.file.name);
        this.nombreImagenCromo = this.file.name;

        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          console.log('ya');
          this.imagenCambiada = true;
          this.imagenCromo = reader.result.toString();
        };
      }

    EditarCromo() {
        console.log('Entro a editar');
        console.log(this.probabilidadCromo);
        // tslint:disable-next-line:max-line-length
        this.coleccionService.PUT_CromoColeccion(new Cromo(this.nombreCromo, this.nombreImagenCromo, this.probabilidadCromo, this.nivelCromo), this.cromo.coleccionId, this.cromo.id)
        .subscribe((res) => {
          if (res != null) {
            console.log('Voy a editar el cromo con id ' + this.cromo.id);
            this.cromo = res;

            if (this.imagenCambiada === true) {
              // HACEMOS EL POST DE LA NUEVA IMAGEN EN LA BASE DE DATOS
              const formData: FormData = new FormData();
              formData.append(this.nombreImagenCromo, this.file);
              this.coleccionService.POST_ImagenCromo(formData)
              .subscribe(() => console.log('Imagen cargado'));
            }
          } else {
            console.log('fallo editando');
          }
        });
        this.goBack();
      }

      OpcionProbabilidadSeleccionada() {
        // Opcion selecionada para probabilidad
        if (this.opcionSeleccionadaProbabilidad === 'Muy baja') {
          this.probabilidadCromo = 'Muy baja';
        }
        if (this.opcionSeleccionadaProbabilidad === 'Baja') {
          this.probabilidadCromo = 'Baja';
        }

        if (this.opcionSeleccionadaProbabilidad === 'Media') {
          this.probabilidadCromo = 'Media';
        }

        if (this.opcionSeleccionadaProbabilidad === 'Alta') {
          this.probabilidadCromo = 'Alta';
        }

        if (this.opcionSeleccionadaProbabilidad === 'Muy alta') {
          this.probabilidadCromo = 'Muy alta';
        }
      }

      OpcionNivelSeleccionado() {
        // Opcion selecionada para nivel
        if (this.opcionSeleccionadaNivel === 'Diamante') {
          this.nivelCromo = 'Diamante';
        }
        if (this.opcionSeleccionadaNivel === 'Platino') {
          this.nivelCromo = 'Platino';
        }

        if (this.opcionSeleccionadaNivel === 'Oro') {
          this.nivelCromo = 'Oro';
        }

        if (this.opcionSeleccionadaNivel === 'Plata') {
          this.nivelCromo = 'Plata';
        }

        if (this.opcionSeleccionadaNivel === 'Bronce') {
          this.nivelCromo = 'Bronce';
        }
      }

      goBack() {
        this.location.back();
      }
}
