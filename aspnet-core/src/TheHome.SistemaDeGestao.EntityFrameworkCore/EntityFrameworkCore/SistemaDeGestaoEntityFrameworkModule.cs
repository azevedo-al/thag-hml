using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using TheHome.SistemaDeGestao.EntityFrameworkCore.Seed;

namespace TheHome.SistemaDeGestao.EntityFrameworkCore
{
    [DependsOn(
        typeof(SistemaDeGestaoCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class SistemaDeGestaoEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<SistemaDeGestaoDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        SistemaDeGestaoDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        SistemaDeGestaoDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SistemaDeGestaoEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
