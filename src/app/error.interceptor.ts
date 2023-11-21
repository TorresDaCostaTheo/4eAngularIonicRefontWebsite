import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastController: ToastController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        console.error('Erreur HTTP interceptée :', error);
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client 
          console.error('Erreur côté client :', error.error.message);
        } else {
          // Erreur côté serveur
          console.error('Erreur côté serveur :', error.status, error.statusText, error.error);

          // Afficher un toast avec le code d'erreur
          this.showToast(`Erreur serveur: ${error.status}`);

        }

        // Passer l'erreur au gestionnaire d'erreurs suivant
        return throwError(error);
      })
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500, 
      position: 'bottom', 
      color: 'danger', 
    });
    await toast.present();
  }
}
