import React from "react";

const socialLinks = [
  { icon: "🌐", url: "https://yourwebsite.com", label: "Website" },
  { icon: "📱", url: "#", label: "Mobile App (Coming Soon)" },
  { icon: "📧", url: "mailto:support@busticketnepal.com", label: "Email" },
  { icon: "🔗", url: "https://facebook.com/", label: "Facebook" },
];

const quickLinks = [
  { text: "Home", url: "/" },
  { text: "About Us", url: "/about" },
  { text: "Contact", url: "/contact" },
  { text: "Terms", url: "/terms" },
  { text: "Privacy", url: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-8 pb-3 mt-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            alt="Logo"
            className="w-11 h-11 rounded-xl bg-white shadow-xl"
          />
          <div>
            <div className="font-extrabold text-2xl tracking-wide">Jaljala Yatayat</div>
            <div className="text-xs text-blue-200 font-medium">
              Since 2064 B.S.
            </div>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-wrap gap-5 text-blue-100 text-sm font-medium">
          {quickLinks.map((link, idx) => (
            <a
              href={link.url}
              key={idx}
              className="hover:underline hover:text-blue-200 transition"
            >
              {link.text}
            </a>
          ))}
        </div>
        {/* Social Icons */}
        <div className="flex gap-5">
          {socialLinks.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              title={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:scale-125 hover:text-yellow-200 transition"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-blue-300/30 pt-2 text-center text-sm text-blue-200 font-light">
        © {new Date().getFullYear()} Jaljala Yatayat. All rights reserved. | Designed with ♥ in Nepal.
      </div>
    </footer>
  );
};

export default Footer;
