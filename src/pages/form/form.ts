import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  moduleId: '1234',
  selector: 'hero-form',
  templateUrl: 'form.html'
})

export class FormPage {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  newHero() {
    this.model = new Hero(42, '', '');
  }
}
