import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public textSearch: string;
  public show: boolean = false;
  public user: any;
  public order: any;
  public favorited: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authenticationService.currentToken.subscribe((data) => {
      if (data)
        this.user = data['user'];
    });
    this.orderService.currentOrder.subscribe((order) => {
      this.order = order;
    })

    this.activeRoute.queryParams.subscribe(params => {
      this.favorited = params['favorited'] && params['favorited'] === 'true' ? true : false;
    });
  }


  public search(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter')
      if (event.target['value'])
        this.router.navigate([''], { queryParams: { search: event.target['value'] } })
      else
        this.router.navigate([''])
  }


  public toggleShow() {
    this.show = !this.show;
  }


  async viewFavorited() {
    if (!this.favorited)
      this.router.navigate([''], { queryParams: { favorited: 'true' } })
    else
      this.router.navigate([''])
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
