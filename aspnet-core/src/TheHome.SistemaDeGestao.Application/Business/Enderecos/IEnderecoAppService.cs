using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos.Dto;

namespace TheHome.SistemaDeGestao.Business.Enderecos
{
    public interface IEnderecoAppService : IAsyncCrudAppService<EnderecoDto, long, PagedEnderecoResultRequestDto, CreateEnderecoDto, EnderecoDto>
    {
    }
}
