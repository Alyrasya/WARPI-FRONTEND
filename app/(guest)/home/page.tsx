"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Home = () => {
  const router = useRouter();
  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#543310] py-1 px-6 sm:px-8 md:px-10 lg:px-32 xl:px-8 flex justify-between items-center">
        <div
          className="logo"
          style={{
            padding: "2px",
            textAlign: "center",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.svg" // Ganti dengan path ke logo Anda
            alt="Logo"
            style={{ width: "60px", height: "60px", marginRight: "4px" }}
          />
          <div
            style={{ fontSize: "35px", fontWeight: "bold", color: "#FFF7E9" }}
          >
            warπ
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => router.push("/login")} // Using router after mount
            className="bg-[#D6A074] text-white text-base px-4 py-1.5 rounded hover:bg-[#A67B5B] transition duration-200 outline-none"
            style={{ borderRadius: "6px" }}
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")} // Using router after mount
            className="bg-[#D6A074] text-white text-base px-4 py-1.5 rounded hover:bg-[#A67B5B] transition duration-200 outline-none"
            style={{ borderRadius: "6px" }}
          >
            Register
          </button>
        </div>
      </nav>

      {/* About Us Section */}
      <section className="text-center py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          About Us
        </h2>
        <p className="max-w-xl mx-auto mb-4 sm:mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
          {/* First Card */}
          <div className="w-full sm:w-1/3 group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden rounded-full w-32 h-32 mx-auto">
              <Image
                src="/roundedKopi.svg"
                alt="Coffee"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="mt-4 text-sm sm:text-base max-w-xs mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>

          {/* Second Card */}
          <div className="w-full sm:w-1/3 group hover:scale-105 transition-transform duration-300">
            <div className="relative overflow-hidden rounded-full w-32 h-32 mx-auto">
              <Image
                src="/roundedKopi.svg"
                alt="Coffee"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="mt-4 text-sm sm:text-base max-w-xs mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>
        </div>
      </section>

      {/* Fun Fact Section */}
      <section className="py-8 sm:py-12 bg-gray-100 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Fun Fact
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Image src="/kopi.svg" alt="Fun Fact" width={100} height={100} />
          <p className="max-w-md text-sm sm:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </section>

      {/* Best Food Section */}
      <section className="py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
          Best Food
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/makanan.svg"
              alt="Coffee"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">satay</h3>
            <p className="text-sm">Rp139.900</p>
            <p className="text-sm text-gray-500">4rb+ sold</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/makanan.svg"
              alt="Satay"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">Satay</h3>
            <p className="text-sm">Rp139.900</p>
            <p className="text-sm text-gray-500">4rb+ sold</p>
          </div>
          {/* Card Baru */}
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/makanan.svg"
              alt="Noodles"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">satay</h3>
            <p className="text-sm">Rp129.900</p>
            <p className="text-sm text-gray-500">3rb+ sold</p>
          </div>
        </div>
      </section>

      {/* Best Coffee & Drink Section */}
      <section className="py-8 sm:py-12 bg-gray-100">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
          Best Coffee & Drink
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/templateKopi.svg"
              alt="Coffee Latte"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">coffe</h3>
            <p className="text-sm">Rp139.900</p>
            <p className="text-sm text-gray-500">4rb+ sold</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/templateKopi.svg"
              alt="Satay"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">Coffe</h3>
            <p className="text-sm">Rp139.900</p>
            <p className="text-sm text-gray-500">4rb+ sold</p>
          </div>
          {/* Card Baru */}
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <Image
              src="/templateKopi.svg"
              alt="Iced Americano"
              width={250}
              height={200}
              className="rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">Coffe</h3>
            <p className="text-sm">Rp119.900</p>
            <p className="text-sm text-gray-500">2rb+ sold</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#543310] text-white py-6 ">
        <div className="flex justify-center items-center gap-5 text-center">
          {/* Facebook Section */}
          <a
            href="https://www.facebook.com/yourpage" // Ganti dengan URL halaman Facebook Anda
            target="_blank" // Membuka di tab baru
            rel="noopener noreferrer" // Keamanan tambahan saat membuka tab baru
            className="flex items-center gap-1.5 text-white hover:text-[#3b5998] transition duration-300 no-underline"
          >
            <FacebookOutlined style={{ fontSize: "24px" }} />
            Facebook
          </a>

          {/* Instagram Section */}
          <a
            href="https://www.instagram.com/yourprofile" // Ganti dengan URL profil Instagram Anda
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-[#e1306c] transition duration-300 no-underline"
          >
            <InstagramOutlined style={{ fontSize: "24px" }} />
            Instagram
          </a>

          {/* Phone Section */}
          <a
            className="flex items-center gap-1.5 text-white hover:text-[#ffcc00] transition duration-300 no-underline"
          >
            <PhoneOutlined style={{ fontSize: "24px" }} />
            +621024089088
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
