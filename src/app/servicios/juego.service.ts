import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDePuntos, AsignacionPuntosJuego, Nivel, EquipoJuegoDePuntos, Alumno, Equipo, Punto,
         TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';
  private APIURLPuntosJuego = 'http://localhost:3000/api/AsignacionPuntosJuego';
  private APIUrlAlumnoJuego = 'http://localhost:3000/api/AlumnoJuegosDePuntos';
  private APIUrlEquipoJuego = 'http://localhost:3000/api/EquiposJuegosDePuntos';
  private APIRURLJuegoDePuntos = 'http://localhost:3000/api/JuegosDePuntos';
  private APIURLImagenNivel = 'http://localhost:3000/api/imagenes/imagenNivel';
  private APIURLAlumnoJuegoDePuntos = 'http://localhost:3000/api/AlumnoJuegosDePuntos';
  private APIURLHistorialPuntosAlumno = 'http://localhost:3000/api/HistorialesPuntosAlumno';

  juegoSeleccionado: Juego;
  rankingJuegoDePunto: TablaAlumnoJuegoDePuntos[];
  listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDePuntos[];

  inscripcionAlumnoJuego: AlumnoJuegoDePuntos;

  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntos: Punto[];
  niveles: Nivel[];


  GET_JuegoDeColeccion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions');
  }

  GET_JuegoDeCompeticion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions');
  }


  POST_JuegoDeColeccion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions', juego);
  }

  POST_JuegoDeCompeticion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions', juego);
  }


  ///////////////////////////////////// PARA JUEGO DE PUNTOS ////////////////////////////////////////

  GET_JuegoDePuntos(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos');
  }

  POST_JuegoDePuntos(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos', juego);
  }

  POST_AsignacionPuntoJuego(asignacionPuntoJuego: AsignacionPuntosJuego) {
    return this.http.post<AsignacionPuntosJuego>(this.APIURLPuntosJuego, asignacionPuntoJuego);
  }

  POST_AlumnoJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos) {
    return this.http.post<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuego, alumnoJuegoDePuntos);
  }

  POST_EquipoJuegoDePuntos(equipoJuegoDePuntos: EquipoJuegoDePuntos) {
    return this.http.post<EquipoJuegoDePuntos>(this.APIUrlEquipoJuego, equipoJuegoDePuntos);
  }

  POST_Nivel(nivel: Nivel, juegoDePuntosId: number) {
    return this.http.post<Nivel>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/nivels', nivel);
  }

  POST_ImagenNivel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLImagenNivel + '/upload', formData);
  }

  GET_AlumnosJuegoDePuntos(juegoDePuntosId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/alumnos');
  }

  GET_EquiposJuegoDePuntos(juegoDePuntosId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/equipos');
  }

  GET_PuntosJuegoDePuntos(juegoDePuntosId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/puntos');
  }

  GET_NivelesJuegoDePuntos(juegoDePuntosId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/nivels');
  }

  GET_InscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    return this.http.get<AlumnoJuegoDePuntos>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
    + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  GET_InscripcionesAlumnoJuegoDePuntos(juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos[]> {
    return this.http.get<AlumnoJuegoDePuntos[]>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  PUT_PuntosJuegoDePuntos( alumnoJuegoDePuntos: AlumnoJuegoDePuntos, alumnoJuegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDePuntos>(this.APIURLAlumnoJuegoDePuntos + '/' + alumnoJuegoDePuntosId, alumnoJuegoDePuntos);
  }

  POST_HistorialPuntosAlumno(historial: HistorialPuntosAlumno): Observable<HistorialPuntosAlumno> {
    return this.http.post<HistorialPuntosAlumno>(this. APIURLHistorialPuntosAlumno, historial);
  }



  // Enviar y recibir juegos entre componentes

  // ESTA ES LA FUNCION QUE HAY QUE LLAMAR PARA ENVIAR EL JUEGO SELECIIONADO
  EnviarJuegoAlServicio(juego: any) {
    this.juegoSeleccionado = juego;
  }

  // ESTA ES LA QUE HAY QUE LLAMAR PARA RECOGER EL JUEGO EN OTRO COMPONENTE
  RecibirJuegoDelServicio(): any {
    return this.juegoSeleccionado;
  }

  EnviarAlumnoJuegoAlServicio(alumnos: any) {
    this.alumnosDelJuego = alumnos;
  }

  RecibirAlumnoJuegoDelServicio() {
    return this.alumnosDelJuego;
  }

  EnviarEquipoJuegoAlServicio(equipos: any) {
    this.equiposDelJuego = equipos;
  }

  RecibirEquipoJuegoDelServicio() {
    return this.equiposDelJuego;
  }

  EnviarListaOrdenadaJuegoPuntosAlServicio(lista: any) {
    this.listaAlumnosOrdenadaPorPuntos = lista;
  }

  RecibirListaOrdenadaJuegoPuntosDelServicio(): any {
    return this.listaAlumnosOrdenadaPorPuntos;
  }

  EnviarRankingJuegoPuntosAlServicio(ranking: any) {
    this.rankingJuegoDePunto = ranking;
  }

  RecibirRankingJuegoPuntosDelServicio(): any {
    return this.rankingJuegoDePunto;
  }

  EnviarPuntosAlServicio(puntos: any) {
    this.puntos = puntos;
  }

  RecibirPuntosDelServicio(): any {
    return this.puntos;
  }

  EnviarNivelesAlServicio(niveles: any) {
    this.niveles = niveles;
  }

  RecibirNivelesDelServicio(): any {
    return this.niveles;
  }

  EnviarInscripcionAlServicio(alumnoJuegoPuntos: any) {
    this.inscripcionAlumnoJuego = alumnoJuegoPuntos;
  }

  RecibirInscripcionDelServicio(): any {
    return this.inscripcionAlumnoJuego;
  }
}
