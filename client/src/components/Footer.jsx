const Footer = () => {
  return (
    <footer className="bg-secondary text-black py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} TripLog. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:underline text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline text-sm"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
