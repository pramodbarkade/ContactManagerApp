using System;
using System.Threading.Tasks;
using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Entities.Common;
using ContactManagerApp.Core.Interfaces.Specific;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContactManagerApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        //===||
        private IContactRepository<Contact> _contact;
        private ILogger _logger;
        private ApiResponse apiResponse;

        //===|| 
        public ContactController(IContactRepository<Contact> contact, ILogger logger)
        {
            _contact = contact;
            _logger = logger;
        }

        //===|| GetList
        [HttpGet("[action]")]
        public async Task<IActionResult> GetList()
        {            
            try
            {
                var contactList = await _contact.GetList();
                apiResponse = new ApiResponse(true, ApiMessage.Success, contactList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                apiResponse = new ApiResponse(false, ApiMessage.Error, null);
            }
            finally
            {

            }           
            return Ok(apiResponse);
        }       
    }
}
