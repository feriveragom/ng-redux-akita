import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { SessionStore } from '../../store/session/session.store';
import { UserState } from '../../store/session/session.state';

@Injectable({ providedIn: 'root' })
export class SessionService {
    // Inyecta el SessionStore y HttpClient en el servicio
    constructor(
        private sessionStore: SessionStore, 
        private http: HttpClient
    ) {}

    // Actualiza el nombre de usuario en el estado de la sesión
    updateUserName(newName: string) {
        this.sessionStore.update({ name: newName });
    }

    fetchUserData(userId: number) {
        this.sessionStore.setLoading(true);
        this.http.get<UserState>(`${environment.apiUrl}/users/${userId}`)
            .subscribe({
                next: userData => {
                    // Aquí actualizas el estado con el valor real recibido
                    this.sessionStore.update({ name: userData.name, token: 'dummy-token' });
                },
                error: error => {
                    this.sessionStore.setError(error);
                },
                complete: () => {
                    this.sessionStore.setLoading(false);
                }
            });
    }

    // Función para cerrar sesión y limpiar el estado
    reset() {
        // Resetear el store a su estado inicial
        this.sessionStore.reset();
    }
}