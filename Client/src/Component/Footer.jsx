function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Follow Us On:</h2>
            <ul className="flex space-x-4 text-blue-300">
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-blue-300">
              &copy; 2024 Solaries. All rights reserved.
            </p>
            <p className="text-blue-300 text-center text-pretty">
              text us on (+961) 76 455 644
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
