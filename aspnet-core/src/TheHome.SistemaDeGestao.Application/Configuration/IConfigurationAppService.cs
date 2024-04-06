using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Configuration.Dto;

namespace TheHome.SistemaDeGestao.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
