import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { PacketMysuffix } from './packet-mysuffix.model';
import { PacketMysuffixPopupService } from './packet-mysuffix-popup.service';
import { PacketMysuffixService } from './packet-mysuffix.service';
import { StorageMysuffix, StorageMysuffixService } from '../storage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-packet-mysuffix-dialog',
    templateUrl: './packet-mysuffix-dialog.component.html'
})
export class PacketMysuffixDialogComponent implements OnInit {

    packet: PacketMysuffix;
    authorities: any[];
    isSaving: boolean;

    destinations: StorageMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private packetService: PacketMysuffixService,
        private storageService: StorageMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.storageService
            .query({filter: 'packet-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.packet.destinationId) {
                    this.destinations = res.json;
                } else {
                    this.storageService
                        .find(this.packet.destinationId)
                        .subscribe((subRes: StorageMysuffix) => {
                            this.destinations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.packet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.packetService.update(this.packet), false);
        } else {
            this.subscribeToSaveResponse(
                this.packetService.create(this.packet), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PacketMysuffix>, isCreated: boolean) {
        result.subscribe((res: PacketMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PacketMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.packet.created'
            : 'drzugApp.packet.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'packetListModification', content: 'OK'});
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

    trackStorageById(index: number, item: StorageMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-packet-mysuffix-popup',
    template: ''
})
export class PacketMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetPopupService: PacketMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.packetPopupService
                    .open(PacketMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.packetPopupService
                    .open(PacketMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
