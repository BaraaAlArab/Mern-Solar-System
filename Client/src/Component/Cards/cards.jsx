import {FaTruckFast, FaLock, FaPhone} from "react-icons/fa6";

function Cards() {
  return (
    <div className="flex flex-wrap justify-center mb-4">
      <div className="card w-1/3 p-4 mx-4 mb-4 bg-blue-900 rounded-md shadow-md">
        <div className="card-header flex justify-center mb-2 flex-wrap">
          <p className="text-lg text-center text-white">
            Fast delivery <FaTruckFast className="mr-2" />
          </p>
        </div>
        <p className="text-base text-white">
          Get your packages delivered quickly and efficiently with our fast
          delivery service.
        </p>
      </div>
      <div className="card w-1/3 p-4 mx-4 mb-4 bg-blue-900 rounded-md shadow-md">
        <div className="card-header flex justify-center mb-2">
          <p className="text-lg text-center text-white">
            Secure Payment <FaLock className="mr-2" />
          </p>
        </div>
        <p className="text-base text-white">
          Your payments are secure with our trusted payment gateway.
        </p>
      </div>
      <div className="card w-1/3 p-4 mx-4 mb-4 bg-blue-900 rounded-md shadow-md">
        <div className="card-header flex justify-center mb-2">
          <p className="text-lg text-center text-white">
            24/7 Support <FaPhone className="mr-2" />
          </p>
        </div>
        <p className="text-base text-white">
          Our customer support team is available 24/7 to assist you with any
          queries.
        </p>
      </div>
    </div>
  );
}

export default Cards;
