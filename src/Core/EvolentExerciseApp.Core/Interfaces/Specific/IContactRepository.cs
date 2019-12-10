using ContactManagerApp.Core.Entities.App;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagerApp.Core.Interfaces.Specific
{
    public interface IContactRepository<T> : IRepository<Contact>, IAsyncRepository<Contact>
    {
        Task<IList<Contact>> GetList();
    }
}
