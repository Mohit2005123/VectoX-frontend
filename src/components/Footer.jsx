const Footer = () => {
    return (
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            <p>&copy; 2024 SVG Editor. All rights reserved.</p>
            <div className="space-x-4">
              <a href="/terms" className="hover:text-white transition duration-300">Terms</a>
              <a href="/privacy" className="hover:text-white transition duration-300">Privacy</a>
              <a href="/contact" className="hover:text-white transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;