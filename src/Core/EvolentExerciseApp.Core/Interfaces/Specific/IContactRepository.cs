using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Entities.App.ViewModels;
using ContactManagerApp.Core.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagerApp.Core.Interfaces.Specific
{
    public interface IContactRepository<T> : IRepository<Contact>, IAsyncRepository<Contact>
    {
        Task<IList<VmContact>> GetList();
        Task<VmContact> View(int Id);
        Task<ApiResponse> Create(VmContact _vmContact);
        Task<ApiResponse> Update(VmContact _vmContact);
        Task<ApiResponse> Status(int Id, bool Status);
        Task<ApiResponse> Delete(int Id);      
    }
}
