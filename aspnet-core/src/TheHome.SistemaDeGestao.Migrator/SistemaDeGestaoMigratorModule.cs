using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TheHome.SistemaDeGestao.Configuration;
using TheHome.SistemaDeGestao.EntityFrameworkCore;
using TheHome.SistemaDeGestao.Migrator.DependencyInjection;

namespace TheHome.SistemaDeGestao.Migrator
{
    [DependsOn(typeof(SistemaDeGestaoEntityFrameworkModule))]
    public class SistemaDeGestaoMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public SistemaDeGestaoMigratorModule(SistemaDeGestaoEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(SistemaDeGestaoMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                SistemaDeGestaoConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SistemaDeGestaoMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
