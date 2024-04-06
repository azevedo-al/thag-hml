using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using TheHome.SistemaDeGestao.Authorization.Roles;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.Configuration;
using TheHome.SistemaDeGestao.Localization;
using TheHome.SistemaDeGestao.MultiTenancy;
using TheHome.SistemaDeGestao.Timing;

namespace TheHome.SistemaDeGestao
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class SistemaDeGestaoCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            // Declare entity types
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            SistemaDeGestaoLocalizationConfigurer.Configure(Configuration.Localization);

            // Enable this line to create a multi-tenant application.
            Configuration.MultiTenancy.IsEnabled = SistemaDeGestaoConsts.MultiTenancyEnabled;

            // Configure roles
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

            Configuration.Settings.Providers.Add<AppSettingProvider>();
            
            Configuration.Localization.Languages.Add(new LanguageInfo("fa", "فارسی", "famfamfam-flags ir"));
            
            Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = SistemaDeGestaoConsts.DefaultPassPhrase;
            SimpleStringCipher.DefaultPassPhrase = SistemaDeGestaoConsts.DefaultPassPhrase;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SistemaDeGestaoCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}
