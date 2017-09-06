import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { OrderMysuffix } from './order-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderMysuffixService {

    private resourceUrl = 'api/orders';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(order: OrderMysuffix): Observable<OrderMysuffix> {
        const copy = this.convert(order);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(order: OrderMysuffix): Observable<OrderMysuffix> {
        const copy = this.convert(order);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<OrderMysuffix> {
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
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(entity.createdAt);
    }

    private convert(order: OrderMysuffix): OrderMysuffix {
        const copy: OrderMysuffix = Object.assign({}, order);

        copy.createdAt = this.dateUtils.toDate(order.createdAt);
        return copy;
    }
}
