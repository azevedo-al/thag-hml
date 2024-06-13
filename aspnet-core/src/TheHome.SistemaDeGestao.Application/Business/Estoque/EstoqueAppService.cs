using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Estoque.Dto;

namespace TheHome.SistemaDeGestao.Business.Estoque
{
    public class EstoqueAppService : 
        SistemaDeGestaoCrudAppServiceBase
            <ItemEstoque, ItemEstoqueDto, int, PagedItemEstoqueResultRequestDto, CreateItemEstoqueDto, UpdateItemEstoqueDto>, 
        IEstoqueAppService
    {
        private readonly IRepository<UsoEstoque, long> _usoEstoqueRepo;
        private readonly IRepository<AbastecimentoEstoque, long> _abastecimentoEstoqueRepo;
        public EstoqueAppService(
            IRepository<ItemEstoque> repository, 
            IRepository<UsoEstoque, long> usoEstoqueRepo,
            IRepository<AbastecimentoEstoque, long> abastecimentoEstoqueRepo) : 
        base(repository) 
        {
            _usoEstoqueRepo = usoEstoqueRepo;
            _abastecimentoEstoqueRepo = abastecimentoEstoqueRepo;
        }

        public async override Task<ItemEstoqueDto> UpdateAsync(UpdateItemEstoqueDto input)
        {
            CheckUpdatePermission();

            var entity = await GetEntityByIdAsync(input.Id);

            MapToEntity(input, entity);
            foreach(var abastecimento in input.NovosAbastecimentos)
            {
                abastecimento.ItemId = input.Id;
                var absEntity = await _abastecimentoEstoqueRepo.InsertAsync(ObjectMapper.Map<AbastecimentoEstoque>(abastecimento));
                entity.Total += absEntity.Qtd;
            }
            foreach (var uso in input.NovosUsos)
            {
                uso.ItemId = input.Id;
                var usoEntity = await _usoEstoqueRepo.InsertAsync(ObjectMapper.Map<UsoEstoque>(uso));
                entity.Total -= usoEntity.Qtd;
            }

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }
    }
}
