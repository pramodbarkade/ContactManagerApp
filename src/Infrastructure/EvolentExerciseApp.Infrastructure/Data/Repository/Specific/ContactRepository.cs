using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ContactManagerApp.Infrastructure.Data.Context;
using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Interfaces.Specific;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ContactManagerApp.Infrastructure.Data.Repository.Specific
{
    public class ContactRepository<T> : EfRepository<Contact>, IContactRepository<Contact>
    {
        private ILogger<ContactRepository<T>> _logger;
        public ContactRepository(AppDbContext dbContext, ILogger<ContactRepository<T>> logger) : base(dbContext)
        {
            _logger = logger;
        }

        public async Task<IList<Contact>> GetList()
        {
            IList<Contact> contactList = new List<Contact>();
            try
            {
                contactList = await _dbContext.Contact.ToListAsync();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            finally
            {
                
            }
            return contactList;
        }
    }
}
