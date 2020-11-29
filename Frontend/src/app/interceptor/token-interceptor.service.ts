import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {
	constructor(private injector: Injector, public router: Router) {}
	intercept(request, next) {
		let token = localStorage.getItem('accessToken');
		if (token) {
			request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
		} else {
			localStorage.clear();
			this.router.navigate([ '/' ]);
		}

		return next.handle(request).pipe(
			tap((evt) => {
				if (evt instanceof HttpResponse) {
				}
			}),
			catchError((err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						// store.remove('app.settings.currentProduct');
						// store.remove('accessToken');
						// store.remove('users');
						// // this.toasterService.error('Unauthorized Request', 'Session Timed Out! Please Login');
						// this.router.navigate([ 'auth/login' ]);
						// this.store.dispatch(new UserActions.Logout());
						localStorage.clear();
						this.router.navigate([ '/' ]);
						return;
					} else {
						// this.toasterService.error('Error', 'Something went wrong.');
						return;
					}
					//log error
				}
				return of(err);
			})
		);
	}
}
