﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace TheHome.SistemaDeGestao.Authorization
{
    public class SistemaDeGestaoAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Business_Management, L("BusinessManagement"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, SistemaDeGestaoConsts.LocalizationSourceName);
        }
    }
}
