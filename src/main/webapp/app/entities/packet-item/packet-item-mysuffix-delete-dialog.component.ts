import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { PacketItemMysuffix } from './packet-item-mysuffix.model';
import { PacketItemMysuffixPopupService } from './packet-item-mysuffix-popup.service';
import { PacketItemMysuffixService } from './packet-item-mysuffix.service';

@Component({
    selector: 'jhi-packet-item-mysuffix-delete-dialog',
    templateUrl: './packet-item-mysuffix-delete-dialog.component.html'
})
export class PacketItemMysuffixDeleteDialogComponent {

    packetItem: PacketItemMysuffix;

    constructor(
        private packetItemService: PacketItemMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.packetItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'packetItemListModification',
                content: 'Deleted an packetItem'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.packetItem.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-packet-item-mysuffix-delete-popup',
    template: ''
})
export class PacketItemMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetItemPopupService: PacketItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.packetItemPopupService
                .open(PacketItemMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
