import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { PacketMysuffix } from './packet-mysuffix.model';
import { PacketMysuffixPopupService } from './packet-mysuffix-popup.service';
import { PacketMysuffixService } from './packet-mysuffix.service';

@Component({
    selector: 'jhi-packet-mysuffix-delete-dialog',
    templateUrl: './packet-mysuffix-delete-dialog.component.html'
})
export class PacketMysuffixDeleteDialogComponent {

    packet: PacketMysuffix;

    constructor(
        private packetService: PacketMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.packetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'packetListModification',
                content: 'Deleted an packet'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.packet.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-packet-mysuffix-delete-popup',
    template: ''
})
export class PacketMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetPopupService: PacketMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.packetPopupService
                .open(PacketMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
