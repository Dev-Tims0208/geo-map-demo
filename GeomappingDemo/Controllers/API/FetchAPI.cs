using AutoMapper;
using GeomappingDemo.DTO;
using GeomappingDemo.TopographyModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeomappingDemo.Controllers.API
{
    [Route("api/fetch")]
    [ApiController]
    public class FetchAPI : ControllerBase
    {
        private readonly TopographyDemoContext ctx;
        private readonly IMapper map;
        public FetchAPI(TopographyDemoContext ctx, IMapper map)
        {
            this.ctx = ctx;
            this.map = map;
        }

        [HttpGet("property")]
        public async Task<ActionResult<List<FetchPropertyDTO>>> Get()
        {
            var entities = await ctx.Properties.ToListAsync();
            return map.Map<List<FetchPropertyDTO>>(entities);
        }



    }
}
