import { Query } from '@datorama/akita';
import { UserState } from './user.state';
import { UserStore } from './user.store';
import { Injectable, OnInit } from '@angular/core';

// La clase UserQuery extiende Query para proporcionar métodos de consulta sobre el estado del usuario
@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> implements OnInit {
  // Declaramos las propiedades pero las inicializamos en ngOnInit
  allState$: any;
  isLoggedIn$: any;
  selectName$: any;
  multiProps$: any;
  multiPropsCallback$: any;

  // Constructor que inicializa el Query con el store correspondiente
  constructor(protected override store: UserStore) {
    super(store);
  }

  ngOnInit() {
    // Inicializamos las propiedades después de que el store esté listo
    this.allState$ = this.select();
    this.selectName$ = this.select('name');
    this.multiProps$ = this.select(['name', 'id']);
    this.multiPropsCallback$ = this.select(
      [state => state.name, state => state.id]
    );
  }
}

