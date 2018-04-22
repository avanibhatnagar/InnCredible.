import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../models/hotel';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()

export class HotelInfo {

  private images: URL[] = [];
  // private _amenitiesList: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _imagesList: BehaviorSubject<URL[]> = new BehaviorSubject([]);
  private _thisHotel = new BehaviorSubject<Hotel>(null);
  public activeHotel = this._thisHotel.asObservable();

  hotel: Hotel;
  private hotelSubject: BehaviorSubject<Hotel>;

  constructor() {
  }

  public getHotelData(index: string) {
    this.hotel = new Hotel();
    const ref = firebase.database().ref('/hotels/' + index);

    const promise = ref.once('value')
      .then((snapshot) => {// ** My only change ** or use snapshot
        this.hotel.setIndex(index);
        this.hotel.setCity(snapshot.child('/location/city').val());
        this.hotel.setHotelID(snapshot.child('/id').val());
        this.hotel.setName(snapshot.child('/name').val());
        this.hotel.setPrice(snapshot.child('/price').val());
        this.hotel.setLocation(snapshot.child('/location/all').val());
        this.hotel.setRating(snapshot.child('/rating/rating').val());
        this.hotel.setDescription(snapshot.child('/attr/description').val());
        this.hotel.setRatingImg(snapshot.child('/rating/rating-img').val());
        this.hotel.setReviewNum(snapshot.child('/rating/reviews').val());
        this.hotel.setRoomText(snapshot.child('/amenities/room-text').val());
        this.hotel.setHotelText(snapshot.child('/amenities/hotel-text').val());
        this.hotel.setFirstImage(snapshot.child('/images/0').val());
        this.hotel.setCheckIn(snapshot.child('/availability/check-in').val());
        this.hotel.setCheckOut(snapshot.child('/availability/check-out').val());
      });

      this.retrieveAmenities(index);
      this._thisHotel.next(this.hotel);
      return promise;
  }

  public getHotel() {
    return this.hotel;
  }

  public retrieveAmenities(id: string) {
    const amenities_ref =  firebase.database().ref('/hotels/' + id + '/amenities/');
    const amenities: string[] = [];
    amenities_ref.child('room/').once('value')
      .then((snapshot) => {
        const countRoom = snapshot.numChildren();
        for (let i = 0; i < countRoom; i++) {
          const number = i.toString();
          amenities.push(snapshot.child(number).val());
          // alert(snapshot.child(number).val());
          // this.setAmenities(snapshot.child(number).val());
        }
      });

    amenities_ref.child('hotel/').once('value')
      .then((snapshot) => {
        const countHotel = snapshot.numChildren();
        for(var i = 0; i < countHotel; i++) {
          var number = i.toString();
          amenities.push(snapshot.child(number).val());
          // this.setAmenities(snapshot.child(number).val());
        }
      });

    this.hotel.setAmenities(amenities);
  }

  // public setAmenities(HotelAmenity:string){
  //   this.amenities.push(HotelAmenity);
  //   this._amenitiesList.next(this.amenities);
  // }
  //
  // public getAmenities(): Observable<string[]>{
  //   return this._amenitiesList.asObservable();
  // }
}


