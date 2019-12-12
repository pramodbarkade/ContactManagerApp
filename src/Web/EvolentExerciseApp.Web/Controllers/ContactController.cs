using System;
using System.Threading.Tasks;
using ContactManagerApp.Core.Entities.App;
using ContactManagerApp.Core.Entities.App.ViewModels;
using ContactManagerApp.Core.Entities.Common;
using ContactManagerApp.Core.Interfaces.Specific;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContactManagerApp.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v.{version:apiVersion}.0/[controller]")]
    public class ContactController : Controller
    {
        //===||
        private IContactRepository<Contact> _contact;
        private ILogger<ContactController> _logger;
        private ApiResponse apiResponse;

        //===|| 
        public ContactController(IContactRepository<Contact> contact, ILogger<ContactController> logger)
        {
            _contact = contact;
            _logger = logger;
        }

        //===|| List
        [HttpGet("[action]")]
        public async Task<IActionResult> List(VmContact vmContact)
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

        //===|| View
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> View(int Id)
        {
            try
            {
                var contact = await _contact.View(Id);
                apiResponse = new ApiResponse(true, ApiMessage.Success, contact);
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

        //===|| Create
        [HttpPost("[action]")]
        public async Task<IActionResult> Create([FromBody]VmContact _vmContact)
        {
            try
            {
                apiResponse = await _contact.Create(_vmContact);
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

        //===|| Update
        [HttpPut("[action]")]
        public async Task<IActionResult> Update([FromBody]VmContact _vmContact)
        {
            try
            {
                apiResponse = await _contact.Update(_vmContact);
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

        //===|| Status
        [HttpPatch("[action]")]
        public async Task<IActionResult> Status([FromBody] VmContact _vmContact)
        {
            try
            {
                apiResponse = await _contact.Status(_vmContact);
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

        //===|| Delete
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                apiResponse = await _contact.Delete(Id);                
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
