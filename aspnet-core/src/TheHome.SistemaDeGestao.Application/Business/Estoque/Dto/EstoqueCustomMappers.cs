using Abp.Application.Services.Dto;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheHome.SistemaDeGestao.Business.Estoque.Dto
{
    public static class EstoqueCustomMappers
    {
        public static void ConfigMaps(IMapperConfigurationExpression config)
        {
            ConfigItemEstoqueMaps (config);
            ConfigFluxoEstoqueMaps(config);
        }
        private static void ConfigItemEstoqueMaps (IMapperConfigurationExpression config) 
        {
            //Create Dto
            config.CreateMap<CreateItemEstoqueDto, ItemEstoque>()
                .ForMember(ie => ie.Nome, options => options.MapFrom(ieDto => ieDto.Nome))
                .ForMember(ie => ie.Desc, options => options.MapFrom(ieDto => ieDto.Desc))
                .ForMember(ie => ie.Unidade, options => options.MapFrom(ieDto => ieDto.Unidade))
                .ForMember(ie => ie.Total, options => options.MapFrom(ieDto => ieDto.Total));

            // Retrieve and Update Dto Partial
            config.CreateMap<EntityDto, ItemEstoque>()
                .ForMember(ie => ie.Id, options => options.MapFrom(eDto => eDto.Id))
                .IncludeAllDerived()
                .ReverseMap()
                .IncludeAllDerived();
            config.CreateMap<BaseItemEstoqueDto, ItemEstoque>()
                .ForMember(ie => ie.Nome, options => options.MapFrom(ieDto => ieDto.Nome))
                .ForMember(ie => ie.Desc, options => options.MapFrom(ieDto => ieDto.Desc))
                .ForMember(ie => ie.Unidade, options => options.MapFrom(ieDto => ieDto.Unidade))
                .IncludeAllDerived()
                .ReverseMap()
                .IncludeAllDerived();

            // Retrieve Dto
            config.CreateMap<ItemEstoque, ItemEstoqueDto>()
                .ForMember(ie => ie.Total, options => options.MapFrom(ieDto => ieDto.Total));

            // Update Dto
            config.CreateMap<UpdateItemEstoqueDto, ItemEstoque>();
        }
        private static void ConfigFluxoEstoqueMaps(IMapperConfigurationExpression config)
        {
            // Create Dto
            config.CreateMap<CreateFluxoEstoqueDto, FluxoEstoque>()
                .ForMember(ie => ie.ItemId, options => options.MapFrom(ieDto => ieDto.ItemId))
                .ForMember(ie => ie.Qtd,  options => options.MapFrom(ieDto => ieDto.Qtd))
                .ForMember(ie => ie.Desc, options => options.MapFrom(ieDto => ieDto.Desc))
                .IncludeAllDerived();
            config.CreateMap<CreateAbastecimentoEstoqueDto, AbastecimentoEstoque>();
            config.CreateMap<CreateUsoEstoqueDto, UsoEstoque>();

            // Retrieve and Update Dto Partial
            config.CreateMap<EntityDto, FluxoEstoque>()
                .ForMember(ie => ie.Id, options => options.MapFrom(eDto => eDto.Id))
                .IncludeAllDerived()
                .ReverseMap()
                .IncludeAllDerived();

            // Retrieve Dto
            config.CreateMap<FluxoEstoque, FluxoEstoqueDto>()
                .ForMember(ie => ie.ItemId, options => options.MapFrom(ieDto => ieDto.ItemId))
                .ForMember(ie => ie.DataCadastroFluxo, options => options.MapFrom(ieDto => ieDto.DataCadastroFluxo))
                .ForMember(ie => ie.Qtd, options => options.MapFrom(ieDto => ieDto.Qtd))
                .ForMember(ie => ie.Desc, options => options.MapFrom(ieDto => ieDto.Desc))
                .ForMember(ie => ie.DataRetirado, options => options.MapFrom(ieDto => ieDto.DataRetirado))
                .ForMember(ie => ie.Substituto, options => options.MapFrom(ieDto => ieDto.Substituto))
                .IncludeAllDerived();
            config.CreateMap<AbastecimentoEstoque, AbastecimentoEstoqueDto>();
            config.CreateMap<UsoEstoque, UsoEstoqueDto>();
        }
    }
}
