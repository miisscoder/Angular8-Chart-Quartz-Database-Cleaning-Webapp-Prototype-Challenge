import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(private router: Router,
        public cookieService: CookieService
    ) {}

  ngOnInit() {
    // scroll to top when changing route
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
      });

    }

  
  getCookie(key: string) {
      return this.cookieService.get(key);
  }
}
