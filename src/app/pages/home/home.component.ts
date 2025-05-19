import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MarkdownComponent],
  providers: [provideMarkdown()],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {
  // Códigos fuente reales 
  userComponentCode = `\`\`\`typescript
import { Component, OnInit, signal } from '@angular/core';
import { SessionQuery } from '../../store/session/session.query';
import { SessionService } from '../../services/session/session.service';
import { HeaderComponent } from '../../components/shared/header/header.component'

@Component({
  selector: 'app-user',
  imports: [HeaderComponent],
  templateUrl: './user.component.html',
  styles: \`\`
})
export default class UserComponent implements OnInit {
  userName = signal<string>('');

  constructor(private sessionQuery: SessionQuery, private sessionService: SessionService) {}

  ngOnInit(): void {
    // Usamos directamente el método del query
    this.sessionQuery.select(['name']).subscribe((state: any) => {
      this.userName.set(state.name);
    });
  }

  // Método para simular la obtención de datos de usuario
  fetchUserData(userId: number): void {
    this.sessionService.fetchUserData(userId);
  }

  // Método para actualizar el nombre de usuario
  updateUserName(newName: string): void {
    this.sessionService.updateUserName(newName);
  }
}
\`\`\``;

  sessionServiceCode = `\`\`\`typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore } from '../../store/session/session.store';
import { UserState } from '../../store/session/session.state';

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(
        private sessionStore: SessionStore, 
        private http: HttpClient
    ) {}

    updateUserName(newName: string) {
        this.sessionStore.update({ name: newName });
    }

    fetchUserData(userId: number) {
        this.sessionStore.setLoading(true);
        this.http.get<UserState>(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
            .subscribe({
                next: userData => {
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

    reset() {
        this.sessionStore.reset();
    }
}
\`\`\``;

  sessionQueryCode = `\`\`\`typescript
import { Query } from '@datorama/akita';
import { SessionState } from './session.state';
import { SessionStore } from './session.store';
import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> implements OnInit {
  allState$: any;
  isLoggedIn$: any;
  selectName$: any;
  multiProps$: any;
  multiPropsCallback$: any;

  constructor(protected override store: SessionStore) {
    super(store);
  }

  ngOnInit() {
    this.allState$ = this.select();
    this.isLoggedIn$ = this.select(state => !!state.token);
    this.selectName$ = this.select('name');
    this.multiProps$ = this.select(['name', 'token']);
    this.multiPropsCallback$ = this.select(
      [state => state.name, state => state.token]
    );
  }

  get isLoggedIn() {
    return !!this.getValue().token;
  }
}
\`\`\``;

  sessionStateCode = `\`\`\`typescript
export interface SessionState {
    token: string;
    name: string;
  }

export interface UserState {
    name: string;
}
\`\`\``;

  sessionStoreCode = `\`\`\`typescript
import { Store, StoreConfig } from '@datorama/akita';
import { SessionState } from './session.state';
import { Injectable } from '@angular/core';

const initialState: SessionState = {
  token: '',
  name: ''
};

function createInitialState(): SessionState {
  return {
    token: '',
    name: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ 
  name: 'session', 
  resettable: true
})
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
\`\`\``;

  appConfigCode = `\`\`\`typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SessionStore } from './store/session/session.store';
import { SessionQuery } from './store/session/session.query';
import { SessionService } from './services/session/session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    SessionStore, // Store se provee aquí
    SessionQuery, // Query se provee aquí
    SessionService  // Service se provee aquí (si es global)
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
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
\`\`\``;

}
