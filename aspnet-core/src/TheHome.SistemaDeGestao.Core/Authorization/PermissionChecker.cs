using Abp.Authorization;
using TheHome.SistemaDeGestao.Authorization.Roles;
using TheHome.SistemaDeGestao.Authorization.Users;

namespace TheHome.SistemaDeGestao.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
