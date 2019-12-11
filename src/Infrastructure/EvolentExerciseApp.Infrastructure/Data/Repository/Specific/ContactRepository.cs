using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ContactManagerApp.Infrastructure.Data.Context;
using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Interfaces.Specific;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using ContactManagerApp.Core.Entities.App.ViewModels;
using ContactManagerApp.Core.Entities.Common;

namespace ContactManagerApp.Infrastructure.Data.Repository.Specific
{
    public class ContactRepository<T> : EfRepository<Contact>, IContactRepository<Contact>
    {
        private ILogger<ContactRepository<T>> _logger;

        public ContactRepository(AppDbContext dbContext, ILogger<ContactRepository<T>> logger) : base(dbContext)
        {
            _logger = logger;
        }

        public async Task<IList<VmContact>> GetList()
        {
            IList<VmContact> contactList = new List<VmContact>();
            try
            {
                contactList = await _dbContext.Contact.Select(a => new VmContact()
                {
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    City = a.City,
                    Email = a.Email,
                    Phone = a.Phone,
                    Status = a.Status
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            finally
            {

            }
            return contactList;
        }

        public async Task<VmContact> View(int Id)
        {
            VmContact _vmContact = new VmContact();
            try
            {
                _vmContact = await _dbContext.Contact.Where(a => a.Id == Id).Select(a => new VmContact()
                {
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    City = a.City,
                    Email = a.Email,
                    Phone = a.Phone,
                    Status = a.Status
                }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            finally
            {

            }
            return _vmContact;
        }

        public async Task<ApiResponse> Create(VmContact _vmContact)
        {
            ApiResponse apiResponse;
            try
            {
                Contact _contact = new Contact();
                _contact.FirstName = _vmContact.FirstName;
                _contact.LastName = _vmContact.LastName;
                _contact.City = _vmContact.City;
                _contact.Email = _vmContact.Email;
                _contact.Phone = _vmContact.Phone;
                _contact.Status = _vmContact.Status;
                _contact.CreateDate = DateTime.Now;
                await _dbContext.Contact.AddAsync(_contact);
                await _dbContext.SaveChangesAsync();
                apiResponse = new ApiResponse(true, ApiMessage.Success, null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }
            return apiResponse;
        }

        public async Task<ApiResponse> Update(VmContact _vmContact)
        {
            ApiResponse apiResponse;
            try
            {
                var _contact = await _dbContext.Contact.Where(a => a.Id == _vmContact.Id).FirstOrDefaultAsync();
                if (_contact != null)
                {
                    _contact.FirstName = _vmContact.FirstName;
                    _contact.LastName = _vmContact.LastName;
                    _contact.City = _vmContact.City;
                    _contact.Email = _vmContact.Email;
                    _contact.Phone = _vmContact.Phone;
                    _contact.Status = _vmContact.Status;
                    _contact.ModifyDate = DateTime.Now;
                    await _dbContext.SaveChangesAsync();
                    apiResponse = new ApiResponse(true, ApiMessage.Success, null);
                }
                else
                {
                    apiResponse = new ApiResponse(false, ApiMessage.Not_Found, null); ;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }
            return apiResponse;
        }

        public async Task<ApiResponse> Status(int Id, bool Status)
        {
            ApiResponse apiResponse;
            try
            {
                var _contact = await _dbContext.Contact.Where(a => a.Id == Id).FirstOrDefaultAsync();
                if (_contact != null)
                {
                    _contact.Status = Status;
                    _contact.ModifyDate = DateTime.Now;
                    await _dbContext.SaveChangesAsync();
                    apiResponse = new ApiResponse(true, ApiMessage.Success, null);
                }
                else
                {
                    apiResponse = new ApiResponse(false, ApiMessage.Not_Found, null); ;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }
            return apiResponse;
        }

        public async Task<ApiResponse> Delete(int Id)
        {
            ApiResponse apiResponse;
            try
            {
                var result = await _dbContext.Contact.Where(a => a.Id == Id).FirstOrDefaultAsync();
                if (result != null)
                {
                    _dbContext.Contact.Remove(result);
                    await _dbContext.SaveChangesAsync();
                    apiResponse = new ApiResponse(true, ApiMessage.Success, null);
                }
                else
                {
                    apiResponse = new ApiResponse(false, ApiMessage.Not_Found, null); ;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }
            return apiResponse;
        }
    }
}

