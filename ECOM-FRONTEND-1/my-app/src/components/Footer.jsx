import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [message,setMessage] = useState("")
  const currentYear = new Date().getFullYear();

  const handleSubmit = ((e)=>{
    e.preventDefault();
    console.log(message);
    setMessage("");
  })

  return (
<footer className="w-full flex justify-between border-t border-gray-800 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl  px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          
          {/* Brand Info & Feedback */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white">
              MoniMart<span className="text-blue-500">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Your one-stop destination for quality products and seamless shopping experiences. Built with modern web performance in mind.
            </p>
            
            {/* Feedback form */}
            <div className="mt-6 max-w-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Feedback
              </span>
              <form  className="mt-2  flex gap-4" onSubmit={handleSubmit}>
                <textarea 
                  placeholder="Add your message here..." 
                  rows={1}
                  value={message}
                   onChange={(e) => setMessage(e.target.value)}

                  className="w-full rounded-lg border border-gray-800 bg-gray-900 px-3.5 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
            
            {/* Column 1: About Us */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                About Us
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Crafting dependable digital commerce experiences through performance and transparency.
              </p>
              <ul className="mt-2.5 space-y-2.5 text-sm">
                <li>
                  <Link to="/ourstory" className="transition-colors hover:text-white">
                    Our Story &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Shop */}
            {/* <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Shop
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/products" className="transition-colors hover:text-white">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="transition-colors hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="transition-colors hover:text-white">
                    Deals & Offers
                  </Link>
                </li>
              </ul>
            </div> */}

            {/* Column 3: Contact */}
            <div id="contacts">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Contact
              </h3>
              <address className="mt-4 not-italic space-y-2.5 text-sm text-gray-400">
                <p>Marcos hs, Kikuyu, KE</p>
                <p>
                  <a href="mailto:support@monimart.com" className="transition-colors hover:text-white">
                    support@monimart.com
                  </a>
                </p>
                <p>
                  <a href="tel:+1234567890" className="transition-colors hover:text-white">
                    +254 740 314 228
                  </a>
                </p>
              </address>
            </div>

            {/* Column 4: Legal & Policy */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Legal & Policy
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="#" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800/80 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MoniMart, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-gray-400">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white" aria-label="Twitter">
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white" aria-label="GitHub">
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}