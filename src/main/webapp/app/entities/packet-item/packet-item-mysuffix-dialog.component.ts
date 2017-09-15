import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PacketItemMysuffix } from './packet-item-mysuffix.model';
import { PacketItemMysuffixPopupService } from './packet-item-mysuffix-popup.service';
import { PacketItemMysuffixService } from './packet-item-mysuffix.service';
import { PacketMysuffix, PacketMysuffixService } from '../packet';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-packet-item-mysuffix-dialog',
    templateUrl: './packet-item-mysuffix-dialog.component.html'
})
export class PacketItemMysuffixDialogComponent implements OnInit {

    packetItem: PacketItemMysuffix;
    isSaving: boolean;

    packets: PacketMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private packetItemService: PacketItemMysuffixService,
        private packetService: PacketMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.packetService.query()
            .subscribe((res: ResponseWrapper) => { this.packets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.packetItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.packetItemService.update(this.packetItem));
        } else {
            this.subscribeToSaveResponse(
                this.packetItemService.create(this.packetItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<PacketItemMysuffix>) {
        result.subscribe((res: PacketItemMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PacketItemMysuffix) {
        this.eventManager.broadcast({ name: 'packetItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPacketById(index: number, item: PacketMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-packet-item-mysuffix-popup',
    template: ''
})
export class PacketItemMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetItemPopupService: PacketItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.packetItemPopupService
                    .open(PacketItemMysuffixDialogComponent as Component, params['id']);
            } else {
                this.packetItemPopupService
                    .open(PacketItemMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
