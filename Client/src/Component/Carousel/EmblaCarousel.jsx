import useEmblaCarousel from "embla-carousel-react";
import {useEffect} from "react";
import Autoplay from "embla-carousel-autoplay";
import {Link} from "react-router-dom";
function EmblaCarousel() {
  const images = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1508790762848-8a3096277c8f?q=80&w=1488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509389928833-fe62aef36deb?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: false, align: "center", skipSnaps: true},
    [Autoplay()],
  );

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="embla m-4 p-4 bg-blue-900 rounded-xl shadow-2xl">
        <div
          className="embla__viewport overflow-hidden rounded-xl"
          ref={emblaRef}
        >
          <div className="embla__container flex transition-transform duration-700 ease-in-out">
            {images.map((image, index) => (
              <div
                key={index}
                className="embla__slide flex-shrink-0 flex-grow-0 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-4"
              >
                <div className="relative group transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-64 bg-center bg-cover bg-no-repeat rounded-lg shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link
                      to="/Order"
                      className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="embla__button embla__button--prev absolute top-1/2 -left-5 transform -translate-y-1/2 bg-blue-600 text-white font-bold  p-3 rounded-sm hover:bg-blue-800 transition-colors duration-300 z-10 shadow-lg"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
        >
          &#8249;
        </button>
        <button
          className="embla__button embla__button--next absolute top-1/2 -right-5 transform -translate-y-1/2 bg-blue-600 text-white font-bold  p-3 rounded-sm hover:bg-blue-800 transition-colors duration-300 z-10 shadow-lg"
          onClick={() => emblaApi && emblaApi.scrollNext()}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}

export default EmblaCarousel;
