using Microsoft.EntityFrameworkCore;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Estoque;
using TheHome.SistemaDeGestao.Business.Estoque.Dto;
using TheHome.SistemaDeGestao.EntityFrameworkCore;
using Xunit;

namespace TheHome.SistemaDeGestao.Tests.Business.Estoque
{
    public class EstoqueAppService_Test : SistemaDeGestaoTestBase
    {
        private readonly IEstoqueAppService _estoqueAppService;
        public EstoqueAppService_Test()
        {
            _estoqueAppService = Resolve<IEstoqueAppService>();
        }

        private CreateItemEstoqueDto ExampleCreateItemEstoqueDto { get; } = new CreateItemEstoqueDto 
        {
            Nome = "Parafuso 25mm",
            Desc = "Exemplo",
            Unidade = "Caixa com 25 parafuso"
        };

        private ItemEstoqueDto transferItemEstoqueDto;
        private async Task CreateItemEstoque(CreateItemEstoqueDto item) => transferItemEstoqueDto = await _estoqueAppService.CreateAsync(item);
        private async Task CreateItemEstoque() => await CreateItemEstoque(ExampleCreateItemEstoqueDto);
        private async Task CheckItemEstoqueCreated(SistemaDeGestaoDbContext context) 
        {
            transferItemEstoqueDto.ShouldNotBeNull();
            var lookup = await context.ItensEstoque.FirstOrDefaultAsync(ie => ie.Id == transferItemEstoqueDto.Id);
            lookup.ShouldNotBeNull();
            Assert.True(
                lookup.Nome    == ExampleCreateItemEstoqueDto.Nome    &&
                lookup.Desc    == ExampleCreateItemEstoqueDto.Desc    &&
                lookup.Unidade == ExampleCreateItemEstoqueDto.Unidade &&
                lookup.Total   == ExampleCreateItemEstoqueDto.Total);
        }

        [Fact]
        public async Task TestCreateItemEstoque()
        {
            await CreateItemEstoque();
            await UsingDbContextAsync(CheckItemEstoqueCreated);
        }
    }
}
