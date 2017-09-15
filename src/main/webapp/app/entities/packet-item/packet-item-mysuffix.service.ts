import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PacketItemMysuffix } from './packet-item-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PacketItemMysuffixService {

    private resourceUrl = SERVER_API_URL + 'api/packet-items';

    constructor(private http: Http) { }

    create(packetItem: PacketItemMysuffix): Observable<PacketItemMysuffix> {
        const copy = this.convert(packetItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(packetItem: PacketItemMysuffix): Observable<PacketItemMysuffix> {
        const copy = this.convert(packetItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<PacketItemMysuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(packetItem: PacketItemMysuffix): PacketItemMysuffix {
        const copy: PacketItemMysuffix = Object.assign({}, packetItem);
        return copy;
    }
}
