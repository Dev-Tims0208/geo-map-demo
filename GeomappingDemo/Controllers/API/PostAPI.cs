using AutoMapper;
using GeomappingDemo.DTO;
using GeomappingDemo.TopographyModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GeomappingDemo.Controllers.API
{
    [Route("api/post")]
    [ApiController]
    public class PostAPI : ControllerBase
    {
        private readonly TopographyDemoContext ctx;
        private readonly IMapper map;
        public PostAPI(TopographyDemoContext ctx, IMapper map)
        {
            this.ctx = ctx;
            this.map = map;
        }

        [HttpPost("propertysave")]
        public async Task<ActionResult> Post([FromBody] PostPropertyDTO props)
        {
            var entity = map.Map<Property>(props);
            ctx.Properties.Add(entity);
            await ctx.SaveChangesAsync();
            return Ok("200");
        }
    }
}
