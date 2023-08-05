using AutoMapper;
using GeomappingDemo.DTO;
using GeomappingDemo.TopographyModel;

namespace GeomappingDemo.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Property, PostPropertyDTO>().ReverseMap();
            CreateMap<Property, FetchPropertyDTO>().ReverseMap();
        }
    }
}