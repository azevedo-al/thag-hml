using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TheHome.SistemaDeGestao.Authorization;

namespace TheHome.SistemaDeGestao
{
    [DependsOn(
        typeof(SistemaDeGestaoCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SistemaDeGestaoApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<Authorization.SistemaDeGestaoAuthorizationProvider>();
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
