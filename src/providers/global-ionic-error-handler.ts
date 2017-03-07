import { IonicErrorHandler } from 'ionic-angular';

export class GlobalIonicErrorHandler extends IonicErrorHandler {

  handleError(err: any): void {
    let _message = err._nativeError || err.message || err._nativeError.message || "";
    let _stack = err._nativeError || err.stack || err._nativeError.stack;
    console.log("---- global ionic error handler ----");
    console.log("msg: " + _message);
    console.log("stk: " + _stack);
    console.log("----");
  }
}
