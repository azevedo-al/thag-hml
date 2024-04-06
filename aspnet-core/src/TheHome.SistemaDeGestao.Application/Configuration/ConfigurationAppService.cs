using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using TheHome.SistemaDeGestao.Configuration.Dto;

namespace TheHome.SistemaDeGestao.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : SistemaDeGestaoAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
