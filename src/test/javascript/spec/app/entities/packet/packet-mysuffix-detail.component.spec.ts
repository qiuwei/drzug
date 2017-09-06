import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PacketMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/packet/packet-mysuffix-detail.component';
import { PacketMysuffixService } from '../../../../../../main/webapp/app/entities/packet/packet-mysuffix.service';
import { PacketMysuffix } from '../../../../../../main/webapp/app/entities/packet/packet-mysuffix.model';

describe('Component Tests', () => {

    describe('PacketMysuffix Management Detail Component', () => {
        let comp: PacketMysuffixDetailComponent;
        let fixture: ComponentFixture<PacketMysuffixDetailComponent>;
        let service: PacketMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [PacketMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PacketMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(PacketMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PacketMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PacketMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PacketMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.packet).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
