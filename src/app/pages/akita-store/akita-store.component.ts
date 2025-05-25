import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-akita-store',
  standalone: true,
  imports: [HeaderComponent, MarkdownComponent],
  providers: [provideMarkdown()],
  templateUrl: './akita-store.component.html',
  styles: ``
})
export default class AkitaStoreComponent {
  // Códigos fuente reales actualizados con la estructura user
  userComponentCode = `\`\`\`typescript
import { Component, OnInit, signal } from '@angular/core';
import { UserQuery } from '../../store/user/user.query';
import { UserService } from '../../store/user/user.service';
import { HeaderComponent } from '../../components/shared/header/header.component'

@Component({
  selector: 'app-user',
  imports: [HeaderComponent],
  templateUrl: './user.component.html',
  styles: \`\`
})
export default class UserComponent implements OnInit {
  userName = signal<string>('');

  constructor(private userQuery: UserQuery, private userService: UserService) {}

  ngOnInit(): void {
    // Usamos directamente el método del query
    this.userQuery.select(['name']).subscribe((state: any) => {
      this.userName.set(state.name);
    });
  }

  // Método para simular la obtención de datos de usuario
  fetchUserData(userId: number): void {
    this.userService.fetchUserData(userId);
  }

  // Método para actualizar el nombre de usuario
  updateUserName(newName: string): void {
    this.userService.updateUserName(newName);
  }
}
\`\`\``;

  userServiceCode = `\`\`\`typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { UserStore } from '../../store/user/user.store';
import { UserState } from '../../store/user/user.state';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private userStore: UserStore, 
        private http: HttpClient
    ) {}

    updateUserName(newName: string) {
        this.userStore.update({ name: newName });
    }

    fetchUserData(userId: number) {
        this.userStore.setLoading(true);
        this.http.get<UserState>(\`\${environment.apiUrl}/users/\${userId}\`)
            .subscribe({
                next: userData => {
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

    reset() {
        this.userStore.reset();
    }
}
\`\`\``;

  userQueryCode = `\`\`\`typescript
import { Query } from '@datorama/akita';
import { UserState } from './user.state';
import { UserStore } from './user.store';
import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> implements OnInit {
  allState$: any;
  selectName$: any;
  multiProps$: any;
  multiPropsCallback$: any;

  constructor(protected override store: UserStore) {
    super(store);
  }

  ngOnInit() {
    this.allState$ = this.select();
    this.selectName$ = this.select('name');
    this.multiProps$ = this.select(['name', 'id']);
    this.multiPropsCallback$ = this.select(
      [state => state.name, state => state.id]
    );
  }

  get hasUserData() {
    return !!this.getValue().name;
  }
}
\`\`\``;

  userStateCode = `\`\`\`typescript
export interface UserState {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address | null;
  phone:    string;
  website:  string;
  company:  Company | null;
}

export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}
\`\`\``;

  userStoreCode = `\`\`\`typescript
import { Store, StoreConfig } from '@datorama/akita';
import { UserState } from './user.state';
import { Injectable } from '@angular/core';

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

function customDeepFreeze(state: UserState): UserState {
  return Object.freeze(state);
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ 
  name: 'user', 
  resettable: true,
  deepFreezeFn: customDeepFreeze,
  cache: { ttl: 300000 }
})
export class UserStore extends Store<UserState> {
  constructor() {
    super(initialState);
  }
}
\`\`\``;

  appConfigCode = `\`\`\`typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserStore } from './store/user/user.store';
import { UserQuery } from './store/user/user.query';
import { UserService } from './store/user/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    UserStore, // Store se provee aquí
    UserQuery, // Query se provee aquí
    UserService  // Service se provee aquí (si es global)
    // akitaDevtools(), // Descomentar para Redux DevTools
    // persistState() // Descomentar para persistencia básica
  ]
};
\`\`\``;

  appRoutesCode = `\`\`\`typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user_by_id',
        loadComponent: () => import('./pages/user/user.component')
    },
    {
        path: 'akita-store',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: '**',
        redirectTo: 'akita-store'
    }
];
\`\`\``;

}
