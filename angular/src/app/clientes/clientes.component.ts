import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  ClienteServiceProxy,
  ClienteDto,
  ClienteDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';

class PagedClientesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './clientes.component.html',
  animations: [appModuleAnimation()]
})
export class ClientesComponent extends PagedListingComponentBase<ClienteDto> {
  clientes: ClienteDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _clienteService: ClienteServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedClientesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._clienteService
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
      .subscribe((result: ClienteDtoPagedResultDto) => {
        this.clientes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(cliente: ClienteDto): void {
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
}