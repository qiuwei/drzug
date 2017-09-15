import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InvoiceMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/invoice/invoice-mysuffix-detail.component';
import { InvoiceMysuffixService } from '../../../../../../main/webapp/app/entities/invoice/invoice-mysuffix.service';
import { InvoiceMysuffix } from '../../../../../../main/webapp/app/entities/invoice/invoice-mysuffix.model';

describe('Component Tests', () => {

    describe('InvoiceMysuffix Management Detail Component', () => {
        let comp: InvoiceMysuffixDetailComponent;
        let fixture: ComponentFixture<InvoiceMysuffixDetailComponent>;
        let service: InvoiceMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [InvoiceMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InvoiceMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(InvoiceMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.invoice).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
