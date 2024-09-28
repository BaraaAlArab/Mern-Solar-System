import Header from "../Component/Header";
import Cards from "../Component/Cards/cards";
import MyImage from "../assets/panles1.jpg";
import Footer from "../Component/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <section className="bg-cover bg-no-repeat w-full p-2 cursor-pointer">
        <div className="relative">
          <img src={MyImage} alt="" className="rounded-lg w-fit" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black border-2 border-b-white p-2 md:p-4 lg:p-6 blur-sm hover:blur-0">
              Harness the power of the sun today for a brighter, cleaner
              tomorrow.
            </h2>
          </div>
        </div>
      </section>
      <section className="p-2 flex flex-row flex-wrap h-fit ">
        <Cards />
      </section>

      <Footer />
    </>
  );
};

export default Home;
