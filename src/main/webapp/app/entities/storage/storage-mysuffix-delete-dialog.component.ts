import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StorageMysuffix } from './storage-mysuffix.model';
import { StorageMysuffixPopupService } from './storage-mysuffix-popup.service';
import { StorageMysuffixService } from './storage-mysuffix.service';

@Component({
    selector: 'jhi-storage-mysuffix-delete-dialog',
    templateUrl: './storage-mysuffix-delete-dialog.component.html'
})
export class StorageMysuffixDeleteDialogComponent {

    storage: StorageMysuffix;

    constructor(
        private storageService: StorageMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storageListModification',
                content: 'Deleted an storage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-storage-mysuffix-delete-popup',
    template: ''
})
export class StorageMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storagePopupService
                .open(StorageMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
