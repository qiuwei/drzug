import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PacketMysuffix } from './packet-mysuffix.model';
import { PacketMysuffixService } from './packet-mysuffix.service';

@Component({
    selector: 'jhi-packet-mysuffix-detail',
    templateUrl: './packet-mysuffix-detail.component.html'
})
export class PacketMysuffixDetailComponent implements OnInit, OnDestroy {

    packet: PacketMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private packetService: PacketMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPackets();
    }

    load(id) {
        this.packetService.find(id).subscribe((packet) => {
            this.packet = packet;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPackets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'packetListModification',
            (response) => this.load(this.packet.id)
        );
    }
}
