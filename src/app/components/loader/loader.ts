import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
loading: any;

}
