import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from './services/ui/ui.service';
import {FbService} from './services/fb/fb.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive: boolean;

  userEmail = '';

  constructor(public ui: UiService, public fb: FbService, public router: Router) {
  }

  loggedIn = this.fb.isAuth();
  sub1;

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fb.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
    });

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
  }

  // Slick Items
  title = 'ngSlick';


  slides = [
    {img: "../assets/images/1.jpg"},
    {img: "../assets/images/2.jpg"},
    {img: "../assets/images/3.jpg"},
    {img: "../assets/images/4.jpg"},
    {img: "../assets/images/5.jpg"},
    {img: "../assets/images/6.jpg"},
    {img: "../assets/images/7.jpg"},
    {img: "../assets/images/8.jpg"},
    {img: "../assets/images/9.jpg"},
    {img: "../assets/images/10.jpg"},
    {img: "../assets/images/11.jpg"},
    {img: "../assets/images/12.jpg"}
  ];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn next-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": false
  };

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
