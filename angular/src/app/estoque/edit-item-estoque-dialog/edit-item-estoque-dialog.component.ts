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
  UpdateItemEstoqueDto,
  CreateAbastecimentoEstoqueDto,
  CreateUsoEstoqueDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './edit-item-estoque-dialog.component.html'
})
export class EditItemEstoqueDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  itemEstoque = new UpdateItemEstoqueDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _estoqueService: EstoqueServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._estoqueService.get(this.id).subscribe((result) => {
      this.itemEstoque.id = this.id;
      this.itemEstoque.nome = result.nome;
      this.itemEstoque.desc = result.desc;
      this.itemEstoque.unidade = result.unidade;
      this.itemEstoque.novosAbastecimentos = [];
      this.itemEstoque.novosUsos = [];
    });
  }

  save(): void {
    this.saving = true;

    this._estoqueService.update(this.itemEstoque).subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.onSave.emit();
      this.saving = false;
      this.bsModalRef.hide();
    })
  }

  novoAbastecimento(): void {
    var f = new CreateAbastecimentoEstoqueDto();
    this.itemEstoque.novosAbastecimentos.push(f);
  }
  novoUso(): void {
    var f = new CreateUsoEstoqueDto();
    this.itemEstoque.novosUsos.push(f);
  }
}
