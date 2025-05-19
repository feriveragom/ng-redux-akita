import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionQuery } from '../../../store/session/session.query';
import { SessionService } from '../../../store/session/session.service';

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
    private sessionQuery: SessionQuery, 
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.sessionQuery.select('name').subscribe((name: string) => {
      this.userName.set(name);
    });
  }

  reset(): void {
    this.sessionService.reset();
  }
}
