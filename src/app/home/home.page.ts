import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public text: string;
  public from: string;
  public to: string;

  constructor(private http: HttpClient, private alert: AlertController) { }

  public sendSms() {
    const payload = new HttpParams()
      .set('from', this.from)
      .set('to', this.to)
      .set('text', this.text);

    return this.http.post('https://shielded-forest-97546.herokuapp.com/send-sms', payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.alert.create({ message: 'Oops!' })
            .then((alert) => alert.present());
          return throwError('Oops!');
        }))
      .subscribe(async (resp: any) => {
        const alert = await this.alert.create({ message: resp.message });
        await alert.present();
      });
  }
}