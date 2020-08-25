import React from "react";
import Slider from "react-slick";

export default (props) => {
    const settings = {
        dots: true,
        infinite: true,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    // console.log("carousel", props.dataSlider)
    // console.log(props.dataSlider)
    return (
        <Slider {...settings}>
            {
                props.dataSlider !== null ?
                    props.dataSlider.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.video != null ? <iframe width="100%" height="500"
                                                              src={item.video}>
                                </iframe> : <img src={item} alt={`slider${index}`} width="100%" height="100%" />
                                }
                            </div>
                        )
                    }) :
                    null
            }
        </Slider>
    )
}
