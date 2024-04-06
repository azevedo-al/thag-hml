using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TheHome.SistemaDeGestao.EntityFrameworkCore;
using TheHome.SistemaDeGestao.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace TheHome.SistemaDeGestao.Web.Tests
{
    [DependsOn(
        typeof(SistemaDeGestaoWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class SistemaDeGestaoWebTestModule : AbpModule
    {
        public SistemaDeGestaoWebTestModule(SistemaDeGestaoEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SistemaDeGestaoWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(SistemaDeGestaoWebMvcModule).Assembly);
        }
    }
}