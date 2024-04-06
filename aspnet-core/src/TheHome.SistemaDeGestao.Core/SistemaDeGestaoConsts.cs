using TheHome.SistemaDeGestao.Debugging;

namespace TheHome.SistemaDeGestao
{
    public class SistemaDeGestaoConsts
    {
        public const string LocalizationSourceName = "SistemaDeGestao";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "a4938c6cf08a447884553d3e1c4903c9";
    }
}
