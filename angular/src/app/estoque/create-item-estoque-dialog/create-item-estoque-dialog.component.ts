import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  EstoqueServiceProxy,
  CreateItemEstoqueDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-item-estoque-dialog.component.html'
})
export class CreateItemEstoqueDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  itemEstoque = new CreateItemEstoqueDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _estoqueService: EstoqueServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.saving = true;

    this._estoqueService.create(this.itemEstoque).subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.onSave.emit();
      this.saving = false;
      this.bsModalRef.hide();
    })
  }
}
