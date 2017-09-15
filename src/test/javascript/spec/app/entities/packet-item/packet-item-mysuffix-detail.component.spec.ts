/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PacketItemMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/packet-item/packet-item-mysuffix-detail.component';
import { PacketItemMysuffixService } from '../../../../../../main/webapp/app/entities/packet-item/packet-item-mysuffix.service';
import { PacketItemMysuffix } from '../../../../../../main/webapp/app/entities/packet-item/packet-item-mysuffix.model';

describe('Component Tests', () => {

    describe('PacketItemMysuffix Management Detail Component', () => {
        let comp: PacketItemMysuffixDetailComponent;
        let fixture: ComponentFixture<PacketItemMysuffixDetailComponent>;
        let service: PacketItemMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [PacketItemMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PacketItemMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PacketItemMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PacketItemMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PacketItemMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PacketItemMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.packetItem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
