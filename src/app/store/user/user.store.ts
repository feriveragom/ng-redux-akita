import { Store, StoreConfig } from '@datorama/akita';
import { UserState } from './user.state';
import { Injectable } from '@angular/core';

// Estado inicial simplificado
const initialState: UserState = {
  id: 0,
  name: '',
  username: '',
  email: '',
  address: null,
  phone: '',
  website: '',
  company: null
};


// Función personalizada para congelar el estado
function customDeepFreeze(state: UserState): UserState {
  // Aquí puedes implementar lógica para congelar el estado
  // Esto es útil para evitar mutaciones en el estado
  return Object.freeze(state);
}

// Configuración del store con opciones adicionales
@Injectable({ providedIn: 'root' })
@StoreConfig({ 
  name: 'user', 
  resettable: true, // Permite restablecer el estado al inicial
  deepFreezeFn: customDeepFreeze, // Usa la función personalizada para congelar el estado
  cache: { ttl: 300000 } // Configura el caché con un tiempo de vida de 5 minutos
})
export class UserStore extends Store<UserState> {
  constructor() {
    super(initialState);
  }
}