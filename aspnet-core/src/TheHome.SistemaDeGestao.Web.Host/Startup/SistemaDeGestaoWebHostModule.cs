using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TheHome.SistemaDeGestao.Configuration;

namespace TheHome.SistemaDeGestao.Web.Host.Startup
{
    [DependsOn(
       typeof(SistemaDeGestaoWebCoreModule))]
    public class SistemaDeGestaoWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SistemaDeGestaoWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SistemaDeGestaoWebHostModule).GetAssembly());
        }
    }
}
