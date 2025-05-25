import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { UserStore } from '../../store/user/user.store';
import { UserState } from '../../store/user/user.state';

@Injectable({ providedIn: 'root' })
export class UserService {
    // Inyecta el UserStore y HttpClient en el servicio
    constructor(
        private userStore: UserStore, 
        private http: HttpClient
    ) {}

    // Actualiza el nombre de usuario en el estado del usuario
    updateUserName(newName: string) {
        this.userStore.update({ name: newName });
    }

    fetchUserData(userId: number) {
        this.userStore.setLoading(true);
        this.http.get<UserState>(`${environment.apiUrl}/users/${userId}`)
            .subscribe({
                next: userData => {
                    // Aquí actualizas el estado con el valor real recibido
                    this.userStore.update({ name: userData.name });
                },
                error: error => {
                    this.userStore.setError(error);
                },
                complete: () => {
                    this.userStore.setLoading(false);
                }
            });
    }

    // Función para cerrar sesión y limpiar el estado
    reset() {
        // Resetear el store a su estado inicial
        this.userStore.reset();
    }
}