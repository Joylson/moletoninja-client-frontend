import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading = false;
  private returnUrl: string;
  public loginData: any = {};
  public hide = true;

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // stop here if form is invalid
    if (!this.loginData.email || !this.loginData.password) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          // console.log(error);
          Swal.fire('Oops...', 'Erro não foi possível fazer o login, verifique e-mail e senha!', 'error')
          this.loading = false;
        });
  }
}
