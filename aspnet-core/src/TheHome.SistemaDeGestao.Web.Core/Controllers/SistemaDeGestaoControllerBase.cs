using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace TheHome.SistemaDeGestao.Controllers
{
    public abstract class SistemaDeGestaoControllerBase: AbpController
    {
        protected SistemaDeGestaoControllerBase()
        {
            LocalizationSourceName = SistemaDeGestaoConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
