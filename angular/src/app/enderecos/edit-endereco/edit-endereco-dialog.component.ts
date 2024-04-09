import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  EnderecoServiceProxy,
  EnderecoDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-endereco-dialog.component.html'
})
export class EditEnderecoDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  endereco = new EnderecoDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _enderecoService: EnderecoServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._enderecoService.get(this.id).subscribe((result) => {
      this.endereco = result;
    });
  }

  save(): void {
    this.saving = true;

    this._enderecoService.update(this.endereco).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
