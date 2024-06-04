import {
  Component,
  Injector,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  EstoqueServiceProxy,
  CreateAbastecimentoEstoqueDto,
  CreateUsoEstoqueDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
    selector: 'fluxo-estoque-form',
    templateUrl: './fluxo-estoque-form.component.html'
})
export class FluxoEstoqueFormComponent extends AppComponentBase implements OnInit {
  // @Input() titulo : string;
  @Input() fluxo : CreateAbastecimentoEstoqueDto | CreateUsoEstoqueDto;

  constructor(
    injector: Injector,
    private _estoqueService : EstoqueServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }
}
