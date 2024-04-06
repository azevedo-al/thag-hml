using Abp.Application.Services;
using TheHome.SistemaDeGestao.MultiTenancy.Dto;

namespace TheHome.SistemaDeGestao.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

