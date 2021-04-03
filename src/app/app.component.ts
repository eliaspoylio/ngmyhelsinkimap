import { Component, VERSION, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  nearbyPlaces: any;
  constructor(private httpClient: HttpClient) {
  }


  ngOnInit() {
    this.getLocation()
      .then((loc: any) => {
        this.httpClient
          .get('http://open-api.myhelsinki.fi/v1/places/?distance_filter=' + loc.lat + '%2C%20%20' + loc.lng + '%2C%201')
          .toPromise()
          .then(res => {
            console.log(res)
            this.nearbyPlaces = res
          })
      })
  }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      },
        err => {
          reject(err);
        });
    });

  }
}