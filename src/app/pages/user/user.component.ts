import { Component, OnInit, signal } from '@angular/core';
import { SessionQuery } from '../../store/session/session.query';
import { SessionService } from '../../store/session/session.service';
import { HeaderComponent } from '../../components/shared/header/header.component'

@Component({
  selector: 'app-user',
  imports: [HeaderComponent],
  templateUrl: './user.component.html',
  styles: ``
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
