import { Component, OnInit, signal } from '@angular/core';
import { UserQuery } from '../../store/user/user.query';
import { UserService } from '../../store/user/user.service';
import { HeaderComponent } from '../../components/shared/header/header.component'

@Component({
  selector: 'app-user',
  imports: [HeaderComponent],
  templateUrl: './user.component.html',
  styles: ``
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
