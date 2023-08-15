export class PaymentResponse {
    orderId:string;
    referenceId:string;
    orderAmount:number;
    txStatus:string;
    txMsg:string;
    txTime:string;
    paymentMode:string;
    signature:string;
}