import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  EstoqueServiceProxy,
  ItemEstoqueDto,
  ItemEstoqueDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateItemEstoqueDialogComponent } from './create-item-estoque-dialog/create-item-estoque-dialog.component';
import { EditItemEstoqueDialogComponent } from './edit-item-estoque-dialog/edit-item-estoque-dialog.component';

class PagedItensEstoqueRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './estoque.component.html',
  animations: [appModuleAnimation()]
})
export class EstoqueComponent extends PagedListingComponentBase<ItemEstoqueDto> {
  itensEstoque: ItemEstoqueDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _clienteService: EstoqueServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  
  createItemEstoque(): void {
    this.showCreateOrEditItemEstoqueDialog();
  }

  editItemEstoque(cliente: ItemEstoqueDto): void {
    this.showCreateOrEditItemEstoqueDialog(cliente.id);
  }


  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedItensEstoqueRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._clienteService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ItemEstoqueDtoPagedResultDto) => {
        this.itensEstoque = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(cliente: ItemEstoqueDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', cliente.nome),
      undefined,
      (result: boolean) => {
        if (result) {
          this._clienteService.delete(cliente.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  private showCreateOrEditItemEstoqueDialog(id?: number): void {
    let createOrEditItemEstoqueDialog: BsModalRef;
    if (!id) {
      createOrEditItemEstoqueDialog = this._modalService.show(
        CreateItemEstoqueDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditItemEstoqueDialog = this._modalService.show(
        EditItemEstoqueDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditItemEstoqueDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}