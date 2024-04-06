using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace TheHome.SistemaDeGestao.Localization
{
    public static class SistemaDeGestaoLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(SistemaDeGestaoConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(SistemaDeGestaoLocalizationConfigurer).GetAssembly(),
                        "TheHome.SistemaDeGestao.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
