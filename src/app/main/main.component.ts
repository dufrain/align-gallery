import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() photo: Photo;

  constructor() { }

  ngOnInit(): void {
  }

}
