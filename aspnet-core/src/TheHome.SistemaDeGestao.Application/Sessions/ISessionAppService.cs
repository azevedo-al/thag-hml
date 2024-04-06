using System.Threading.Tasks;
using Abp.Application.Services;
using TheHome.SistemaDeGestao.Sessions.Dto;

namespace TheHome.SistemaDeGestao.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
