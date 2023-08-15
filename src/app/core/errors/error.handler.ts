import { Injectable, ErrorHandler, Injector } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MPWErrorHandler implements ErrorHandler {

  constructor(injector: Injector) {}

  handleError(err: any): void {
    
  }
}