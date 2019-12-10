using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagerApp.Core.Interfaces.Specific
{
    public interface IContactService
    {
        Task CreateRequestLog(string RequestMethod, string ResponseStatusCode, string UrlPath, long ElapsedTicks);
    }
}
