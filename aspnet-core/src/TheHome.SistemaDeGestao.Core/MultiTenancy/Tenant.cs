using Abp.MultiTenancy;
using TheHome.SistemaDeGestao.Authorization.Users;

namespace TheHome.SistemaDeGestao.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
