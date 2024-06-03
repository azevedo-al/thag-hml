using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Abp.Application.Services;
using Abp.IdentityFramework;
using Abp.Runtime.Session;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.MultiTenancy;
using Abp.Localization;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;

namespace TheHome.SistemaDeGestao
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class SistemaDeGestaoAppServiceBase : ApplicationService
    {
        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        protected SistemaDeGestaoAppServiceBase()
        {
            LocalizationSourceName = SistemaDeGestaoConsts.LocalizationSourceName;
        }

        protected async Task<User> GetCurrentUserAsync()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }

            return user;
        }

        protected Task<Tenant> GetCurrentTenantAsync()
        {
            return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class SistemaDeGestaoCrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput> : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateInput : IEntityDto<TPrimaryKey>
    {
        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        protected SistemaDeGestaoCrudAppServiceBase(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
            LocalizationSourceName = SistemaDeGestaoConsts.LocalizationSourceName;
        }

        protected async Task<User> GetCurrentUserAsync()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }

            return user;
        }

        protected Task<Tenant> GetCurrentTenantAsync()
        {
            return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
