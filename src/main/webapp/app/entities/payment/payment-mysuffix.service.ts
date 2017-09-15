import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { PaymentMysuffix } from './payment-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PaymentMysuffixService {

    private resourceUrl = 'api/payments';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(payment: PaymentMysuffix): Observable<PaymentMysuffix> {
        const copy = this.convert(payment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(payment: PaymentMysuffix): Observable<PaymentMysuffix> {
        const copy = this.convert(payment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<PaymentMysuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertDateTimeFromServer(entity.date);
    }

    private convert(payment: PaymentMysuffix): PaymentMysuffix {
        const copy: PaymentMysuffix = Object.assign({}, payment);

        copy.date = this.dateUtils.toDate(payment.date);
        return copy;
    }
}
