import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

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
        private eventManager: JhiEventManager
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
    }
}

@Component({
    selector: 'jhi-packet-item-mysuffix-delete-popup',
    template: ''
})
export class PacketItemMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private packetItemPopupService: PacketItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.packetItemPopupService
                .open(PacketItemMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
