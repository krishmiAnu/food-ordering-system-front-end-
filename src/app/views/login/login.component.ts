import { Component, OnInit } from '@angular/core';
import {UserDTO} from '../../dto/userdto';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserDTO = new UserDTO();
  failed: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.user)
      .subscribe(result => {
        this.failed = !result;
      });
  }

}
