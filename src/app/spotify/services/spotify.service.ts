import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, firstValueFrom, Observable, lastValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  urlSpotify: string = "https://api.spotify.com/v1";
  tokenSpotify: string = environment.tokenSpotify;

  async getToken() {
    const client_id = "dca770d7a8c04eedbfcb8381b4c4e76a";
    const client_secret = "23ecc99b63c246dfbdeb5f0e21dd0e54";
    const url = `${this.tokenSpotify}/${client_id}/${client_secret}`;
    return await firstValueFrom(this.http.get(`${url}`).pipe(map((a: any) => a.access_token)));
  }

  async getQuery(query: string) {
    const token = await this.getToken();
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)
    return this.http.get(`${this.urlSpotify}/${query}`, { headers })

  }

  async getNewRelease() {
    const obs = await this.getQuery("browse/new-releases");
    return obs.pipe(map((data: any) => data.albums.items))
  }

  async searchArtist(termino: string) {
    const obs = await this.getQuery(`search?q=${termino}&type=artist&limit=15`);
    return obs.pipe(map((data: any) => data.artists.items));

  }

  async getArtistByID(id: string) {
    const obs = await this.getQuery(`artists/${id}`);
    return obs;
  }


  async getTopTracks(id: string) {
    const obs = await this.getQuery(`artists/${id}/top-tracks?country=ES`);
    return obs.pipe(map((data: any) => data.tracks));

  }

  /*   EJM  de como sería el observable si no utilizara el async en el getToken, además recordar que solo se resolvería una vez el observable en el ts donde se invoca.
    getTopTracks(id: string) {
      return this.getQuery(`artists/${id}/top-tracks?country=ES`)
        .pipe(map((data: any) => data.tracks))
    }
   */
  constructor(private http: HttpClient) {
    this.getToken();
  }
}
