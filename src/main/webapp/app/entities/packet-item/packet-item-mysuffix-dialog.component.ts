import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

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
    authorities: any[];
    isSaving: boolean;

    packets: PacketMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private packetItemService: PacketItemMysuffixService,
        private packetService: PacketMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
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
                this.packetItemService.update(this.packetItem), false);
        } else {
            this.subscribeToSaveResponse(
                this.packetItemService.create(this.packetItem), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PacketItemMysuffix>, isCreated: boolean) {
        result.subscribe((res: PacketItemMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PacketItemMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.packetItem.created'
            : 'drzugApp.packetItem.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'packetItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
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

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetItemPopupService: PacketItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.packetItemPopupService
                    .open(PacketItemMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.packetItemPopupService
                    .open(PacketItemMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
