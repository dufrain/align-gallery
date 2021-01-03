import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private _photos$ = new BehaviorSubject(new Array<Photo>());
  apiUrl = 'https://localhost:44382/api/gallery/get';
  picUrl = 'https://picsum.photos/id';

  //picsum.photos/id/1/100/200/

  constructor(private http: HttpClient) {}

  setPhotos$(photos:Photo[]){
    this._photos$.next(photos);
  }

  getPhotos$(getNew: boolean=false) {
    return this._photos$.pipe(
      take(1),
      switchMap((photos) => {
        if (photos.length > 0 && !getNew) {
          return of(photos);
        }
        return this.getPhotosFromApi$().pipe(
          tap((photos) => this._photos$.next(photos))
        );
      })
    );
  }

  private getPhotosFromApi$() {
    return this.http.get<Photo[]>(this.apiUrl);
  }
}
