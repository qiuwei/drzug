/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PurchaseMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/purchase/purchase-mysuffix-detail.component';
import { PurchaseMysuffixService } from '../../../../../../main/webapp/app/entities/purchase/purchase-mysuffix.service';
import { PurchaseMysuffix } from '../../../../../../main/webapp/app/entities/purchase/purchase-mysuffix.model';

describe('Component Tests', () => {

    describe('PurchaseMysuffix Management Detail Component', () => {
        let comp: PurchaseMysuffixDetailComponent;
        let fixture: ComponentFixture<PurchaseMysuffixDetailComponent>;
        let service: PurchaseMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [PurchaseMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PurchaseMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PurchaseMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PurchaseMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.purchase).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
