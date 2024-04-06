using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Models.TokenAuth;
using TheHome.SistemaDeGestao.Web.Controllers;
using Shouldly;
using Xunit;

namespace TheHome.SistemaDeGestao.Web.Tests.Controllers
{
    public class HomeController_Tests: SistemaDeGestaoWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}