FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/TheHome.SistemaDeGestao.Web.Host/TheHome.SistemaDeGestao.Web.Host.csproj", "src/TheHome.SistemaDeGestao.Web.Host/"]
COPY ["src/TheHome.SistemaDeGestao.Web.Core/TheHome.SistemaDeGestao.Web.Core.csproj", "src/TheHome.SistemaDeGestao.Web.Core/"]
COPY ["src/TheHome.SistemaDeGestao.Application/TheHome.SistemaDeGestao.Application.csproj", "src/TheHome.SistemaDeGestao.Application/"]
COPY ["src/TheHome.SistemaDeGestao.Core/TheHome.SistemaDeGestao.Core.csproj", "src/TheHome.SistemaDeGestao.Core/"]
COPY ["src/TheHome.SistemaDeGestao.EntityFrameworkCore/TheHome.SistemaDeGestao.EntityFrameworkCore.csproj", "src/TheHome.SistemaDeGestao.EntityFrameworkCore/"]
WORKDIR "/src/src/TheHome.SistemaDeGestao.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/TheHome.SistemaDeGestao.Web.Host", "src/TheHome.SistemaDeGestao.Web.Host"]
COPY ["src/TheHome.SistemaDeGestao.Web.Core", "src/TheHome.SistemaDeGestao.Web.Core"]
COPY ["src/TheHome.SistemaDeGestao.Application", "src/TheHome.SistemaDeGestao.Application"]
COPY ["src/TheHome.SistemaDeGestao.Core", "src/TheHome.SistemaDeGestao.Core"]
COPY ["src/TheHome.SistemaDeGestao.EntityFrameworkCore", "src/TheHome.SistemaDeGestao.EntityFrameworkCore"]
WORKDIR "/src/src/TheHome.SistemaDeGestao.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "TheHome.SistemaDeGestao.Web.Host.dll"]
