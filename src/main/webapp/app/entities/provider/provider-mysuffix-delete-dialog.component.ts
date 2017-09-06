import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { ProviderMysuffix } from './provider-mysuffix.model';
import { ProviderMysuffixPopupService } from './provider-mysuffix-popup.service';
import { ProviderMysuffixService } from './provider-mysuffix.service';

@Component({
    selector: 'jhi-provider-mysuffix-delete-dialog',
    templateUrl: './provider-mysuffix-delete-dialog.component.html'
})
export class ProviderMysuffixDeleteDialogComponent {

    provider: ProviderMysuffix;

    constructor(
        private providerService: ProviderMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.providerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'providerListModification',
                content: 'Deleted an provider'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.provider.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-provider-mysuffix-delete-popup',
    template: ''
})
export class ProviderMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerPopupService: ProviderMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.providerPopupService
                .open(ProviderMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
