import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserQuery } from '../../../store/user/user.query';
import { UserService } from '../../../store/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {
  userName = signal<string>('');

  constructor(
    private userQuery: UserQuery, 
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userQuery.select('name').subscribe((name: string) => {
      this.userName.set(name);
    });
  }

  reset(): void {
    this.userService.reset();
  }
}
