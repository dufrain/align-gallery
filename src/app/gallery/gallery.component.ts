import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GalleryService } from '../gallery.service';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit,OnDestroy {
  chosenPhoto: Photo;
  subscription: Subscription;

  constructor(public galleryService: GalleryService) {}

  photoChosen(photo:Photo){
    this.chosenPhoto = photo;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    const timer = interval(30000);

    this.subscription = timer
      .pipe(
        switchMap((x) => {
          console.log("timer=",x);

          return this.galleryService.getPhotos$(true).pipe(
            tap((photos) => {
              this.galleryService.setPhotos$(photos);
            })
          );
        })
      )
      .subscribe();
  }

  resetTime(){
    this.subscription.unsubscribe();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
