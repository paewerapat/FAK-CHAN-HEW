import React from 'react'

const Carousel = ({images, id}) => {

    const isActive = index => {
        if(index === 0) return "active";
    }

    return (
        <div id={`imagesPictureId${id}`} key={id} className="carousel slide" data-bs-ride="carousel">
            
            {
                images.length > 1 &&
                <div className="carousel-indicators">
                {
                    images.map((img, index) => (
                        <button type="button" data-bs-target={`#imagesPictureId${id}`} data-bs-slide-to={index} className={`${isActive(index)}`} aria-current="true" key={index} aria-label="Slide 1" />
                    ))
                }
                </div>
            }
            
            <div className="carousel-inner">

                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            <img src={img.url} className="images-carousel" alt={img.url} />
                        </div>
                    ))
                }
                
            </div> 
            {
                images.length > 1 &&
                <>
                <button className="carousel-control-prev" type="button" data-bs-target={`#imagesPictureId${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#imagesPictureId${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
                </>
            }
        </div>

    )
}

export default Carousel
