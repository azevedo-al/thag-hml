using System.Threading.Tasks;
using Abp.Application.Services;
using TheHome.SistemaDeGestao.Authorization.Accounts.Dto;

namespace TheHome.SistemaDeGestao.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
