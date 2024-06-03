using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TheHome.SistemaDeGestao.Authorization;
using TheHome.SistemaDeGestao.Business.Estoque;
using TheHome.SistemaDeGestao.Business.Estoque.Dto;

namespace TheHome.SistemaDeGestao
{
    [DependsOn(
        typeof(SistemaDeGestaoCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SistemaDeGestaoApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SistemaDeGestaoAuthorizationProvider>();
            Configuration.Modules.AbpAutoMapper().Configurators.Add(EstoqueCustomMappers.ConfigMaps);
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SistemaDeGestaoApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
