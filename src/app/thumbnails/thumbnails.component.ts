import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-thumbnails',
  templateUrl: './thumbnails.component.html',
  styleUrls: ['./thumbnails.component.scss'],
})
export class ThumbnailsComponent implements OnInit {
  _photos: Photo[];
  @Input() set photos(photos: Photo[]) {
    this._photos = photos;
    if (!this.photos || this.photos.length == 0) {
      return;
    }
    setTimeout(() => {
      this.photoChosen.emit(this._photos[2])
    }, 1);
  }
  get photos(): Photo[] {
     return this._photos;
  }

  @Output() photoChosen = new EventEmitter<Photo>();
  @Output() resetTimer = new EventEmitter<true>();
  startIndex = 1;

  constructor() {}

  getThumbnail(index: number, width: number = 200, height: number = 100) {
    if (!this.photos || this.photos.length == 0) {
      return;
    }
    return `https://picsum.photos/id/${this.photos[index].id}/${width}/${height}`;
  }

  leftArrow(){
    if (this.startIndex > 0){
      this.startIndex-=1;
    }
    this.resetTimer.emit(true);
  }

  rightArrow(){
    if (this.startIndex < 2 ){
      this.startIndex+=1;
    }
    this.resetTimer.emit(true);
  }

  onPhotoChosen(index: number){
    this.photoChosen.emit(this.photos[index])
    this.resetTimer.emit(true);
  }

  ngOnInit(): void {
  }
}
