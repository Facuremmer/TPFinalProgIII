import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = './assets/img/usuario.png'
  miform: FormGroup;
  loading = false;
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,) 
  {
    this.miform = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getInto() {
  const user = this.miform.value.user;
  const password = this.miform.value.password;

  if (user == 'finalProg' && password == '12345'){
    this.fakeLoading();
  } else {
    this.error();
    this.miform.reset();
  }
}

error (){
  this._snackBar.open('Usuario o contraseña invalidos','',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition: 'bottom'
  })
}

fakeLoading(){
  this.loading=true;
  setTimeout(() => {
    this.router.navigate(['/Homepage/inicio']);
    this.miform.reset();
    this.loading=false;
  }, 1500);
}

}
