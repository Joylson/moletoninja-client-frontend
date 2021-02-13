import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public textSearch: string;
  public show: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public search(event: KeyboardEvent) {
    console.log(event.target['value'])
    if (event.code === 'Enter' || event.code === 'NumpadEnter')
      if (event.target['value'])
        this.router.navigate([''], { queryParams: { search: event.target['value'] } })
      else
        this.router.navigate([''])
  }


  public toggleShow() {
    this.show = !this.show;
  }

}
