using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Estoque.Dto;

namespace TheHome.SistemaDeGestao.Business.Estoque
{
    public interface IEstoqueAppService : IAsyncCrudAppService<ItemEstoqueDto, int, PagedItemEstoqueResultRequestDto, CreateItemEstoqueDto, UpdateItemEstoqueDto>
    {

    }
}
