import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  EnderecoServiceProxy,
  EnderecoDto,
  EnderecoDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateEnderecoDialogComponent } from './create-endereco/create-endereco-dialog.component';
import { EditEnderecoDialogComponent } from './edit-endereco/edit-endereco-dialog.component';


class PagedEnderecosRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './enderecos.component.html',
  animations: [appModuleAnimation()]
})
export class EnderecosComponent extends PagedListingComponentBase<EnderecoDto> {
  enderecos: EnderecoDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _enderecoService: EnderecoServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  
  createEndereco(): void {
    this.showCreateOrEditEnderecoDialog();
  }

  editEndereco(endereco: EnderecoDto): void {
    this.showCreateOrEditEnderecoDialog(endereco.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedEnderecosRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._enderecoService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EnderecoDtoPagedResultDto) => {
        this.enderecos = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(endereco: EnderecoDto): void {
    abp.message.confirm(
      "O seguinte endereço será excluído do banco: \r\n" +
      (endereco.logradouro + ", " + endereco.numero + " - " + 
      ((endereco.complemento1 == null || endereco.complemento1 == "") ? "" : (endereco.complemento1)) + "\r\n" +
      ((endereco.complemento2 == null || endereco.complemento2 == "") ? "" : (endereco.complemento2)) + "\r\n" +
      endereco.bairro + "\r\n" + 
      endereco.cidade + " - " + endereco.uf + 
      ((endereco.cep == null || endereco.cep == "") ? "" : ("\r\n" + endereco.cep))),
      undefined,
      (result: boolean) => {
        if (result) {
          this._enderecoService.delete(endereco.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  private showCreateOrEditEnderecoDialog(id?: number): void {
    let createOrEditEnderecoDialog: BsModalRef;
    if (!id) {
      createOrEditEnderecoDialog = this._modalService.show(
        CreateEnderecoDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditEnderecoDialog = this._modalService.show(
        EditEnderecoDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditEnderecoDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
