using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.Editions;

namespace TheHome.SistemaDeGestao.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}
