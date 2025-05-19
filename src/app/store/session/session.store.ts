import { Store, StoreConfig } from '@datorama/akita';
import { SessionState } from './session.state';
import { Injectable } from '@angular/core';

// Estado inicial simplificado
const initialState: SessionState = {
  token: '',
  name: ''
};

// Función personalizada para congelar el estado
function customDeepFreeze(state: SessionState): SessionState {
  // Aquí puedes implementar lógica para congelar el estado
  // Esto es útil para evitar mutaciones en el estado
  return Object.freeze(state);
}

// Configuración del store con opciones adicionales
@Injectable({ providedIn: 'root' })
@StoreConfig({ 
  name: 'session', 
  resettable: true, // Permite restablecer el estado al inicial
  deepFreezeFn: customDeepFreeze, // Usa la función personalizada para congelar el estado
  cache: { ttl: 300000 } // Configura el caché con un tiempo de vida de 5 minutos
})
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(initialState);
  }
}