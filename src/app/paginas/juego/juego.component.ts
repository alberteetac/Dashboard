import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Alumno, Equipo, Juego} from '../../clases/index';

// Services
import { JuegoService, GrupoService } from '../../servicios/index';

export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {


  opcionesMostrar: OpcionSeleccionada[] = [
    {nombre: 'Todos los juegos', id: 'todosLosJuegos'},
    {nombre: 'Juegos de puntos', id: 'juegosDePuntos'},
    {nombre: 'Juegos de colección', id: 'juegosDeColeccion'},
    {nombre: 'Juegos de competición', id: 'juegosDeCompeticion'},

  ];

  juegosDePuntos: Juego[];
  juegosDeColeccion: Juego[];
  juegosDeCompeticion: Juego[];

  juegosDePuntosActivos: Juego[] = [];
  juegosDePuntosInactivos: Juego[] = [];

  juegosDeColeccionActivos: Juego[] = [];
  juegosDeColeccionInactivos: Juego[] = [];

  juegosDeCompeticionActivos: Juego[] = [];
  juegosDeCompeticionInactivos: Juego[] = [];

  todosLosJuegosActivos: Juego[] = [];
  todosLosJuegosInactivos: Juego[] = [];

  grupoId: number;
  alumnosGrupo: Alumno[];

  // tslint:disable-next-line:no-inferrable-types
  opcionSeleccionada: string = 'todosLosJuegos';

  ListaJuegosSeleccionadoActivo: Juego[];

  ListaJuegosSeleccionadoInactivo: Juego[];





  constructor( private location: Location,
               private juegoService: JuegoService,
               private grupoService: GrupoService ) { }

  ngOnInit() {
    this.grupoId = this.grupoService.RecibirGrupoIdDelServicio();
    this.alumnosGrupo = this.grupoService.RecibirAlumnosGrupoDelServicio();



    this.ListaJuegosDePuntos();
  }

  ListaJuegosDePuntos() {
    this.juegoService.GET_JuegoDePuntos(this.grupoId)
    .subscribe(juegos => {
      console.log('He recibido los juegos de puntos');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDePuntosActivos.push(juegos[i]);
        } else {
          this.juegosDePuntosInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosDeColeccion();
    });
  }

  ListaJuegosDeColeccion() {
    this.juegoService.GET_JuegoDeColeccion(this.grupoId)
    .subscribe(juegos => {
      console.log('He recibido los juegos de coleccion');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDeColeccionActivos.push(juegos[i]);
        } else {
          this.juegosDeColeccionInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosTotales();
    });
  }

  ListaJuegosTotales() {

    for (let i = 0; i < (this.juegosDePuntosActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDePuntosActivos[i]);
    }

    for (let i = 0; i < (this.juegosDePuntosInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDePuntosInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeColeccionActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeColeccionInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeCompeticionActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeCompeticionInactivos[i]);
    }

    // Por defecto al principio mostraremos la lista de todos los juegos
    this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
    this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
  }

  ListaJuegoSeleccionado() {

    console.log('Busquemos la lista correspondiente');
    console.log(this.opcionSeleccionada);

    if (this.opcionSeleccionada === 'todosLosJuegos') {
      this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
      console.log('todos los juegos');
    }
    if (this.opcionSeleccionada === 'juegosDePuntos') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDePuntosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDePuntosInactivos;
      console.log('juego de puntos');

    }

    if (this.opcionSeleccionada === 'juegosDeColeccion') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDeColeccionActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeColeccionInactivos;
      console.log('juego de coleccion');
    }

    if (this.opcionSeleccionada === 'juegoDeCompeticion') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDeCompeticionActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeCompeticionInactivos;
      console.log('juego de competicion');

    }

  }

  prueba() {
    console.log('Juegos de puntos activos e inactivos');
    console.log(this.juegosDePuntosActivos);
    console.log(this.juegosDePuntosInactivos);

    console.log('Juegos de coleccion activos e inactivos');
    console.log(this.juegosDeColeccionActivos);
    console.log(this.juegosDeColeccionInactivos);

    console.log('Todos los juegod activos e inactivos');
    console.log(this.todosLosJuegosActivos);
    console.log(this.todosLosJuegosInactivos);
  }

  JuegoSeleccionado(juego: Juego) {
    this.juegoService.EnviarJuegoAlServicio(juego);
  }

  // NOS DEVOLVERÁ A LA DE LA QUE VENIMOS
  goBack() {
    this.location.back();
  }
}