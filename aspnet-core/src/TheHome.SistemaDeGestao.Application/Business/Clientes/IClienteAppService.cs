﻿using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Clientes.Dto;

namespace TheHome.SistemaDeGestao.Business.Clientes
{
    public interface IClienteAppService : IAsyncCrudAppService<ClienteDto, int, PagedClienteResultRequestDto, CreateClienteDto, ClienteDto>
    {
    }
}
