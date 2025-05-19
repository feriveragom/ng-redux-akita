import { Query } from '@datorama/akita';
import { SessionState } from './session.state';
import { SessionStore } from './session.store';
import { Injectable, OnInit } from '@angular/core';

// La clase SessionQuery extiende Query para proporcionar métodos de consulta sobre el estado de la sesión
@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> implements OnInit {
  // Declaramos las propiedades pero las inicializamos en ngOnInit
  allState$: any;
  isLoggedIn$: any;
  selectName$: any;
  multiProps$: any;
  multiPropsCallback$: any;

  // Constructor que inicializa el Query con el store correspondiente
  constructor(protected override store: SessionStore) {
    super(store);
  }

  ngOnInit() {
    // Inicializamos las propiedades después de que el store esté listo
    this.allState$ = this.select();
    this.isLoggedIn$ = this.select(state => !!state.token);
    this.selectName$ = this.select('name');
    this.multiProps$ = this.select(['name', 'token']);
    this.multiPropsCallback$ = this.select(
      [state => state.name, state => state.token]
    );
  }

  // Método que devuelve el estado actual de si el usuario está logueado
  get isLoggedIn() {
    return !!this.getValue().token;
  }
}

