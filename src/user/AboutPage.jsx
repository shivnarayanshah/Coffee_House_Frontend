import Footer from "./components/Footer.jsx";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="min-h-screen bg-white px-6 py-12 lg:px-32 text-gray-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#6F4E37] mb-4">About Us</h1>
            <p className="text-lg text-gray-600">
              Himalayan Java is Nepal’s leading coffee brand, deeply rooted in
              the local community and culture. From farm to cup, we ensure every
              coffee experience is authentic, fresh, and exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#6F4E37] mb-2">
                Our Story
              </h2>
              <p className="text-gray-700">
                What began as a small initiative to promote Nepali coffee has
                grown into a nationally recognized brand. We take pride in
                sourcing, roasting, and serving locally grown beans, promoting
                Nepal's rich coffee heritage globally.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6F4E37] mb-2">
                Our Mission
              </h2>
              <p className="text-gray-700">
                Our mission is to craft memorable coffee experiences through
                sustainable practices, high-quality ingredients, and skillful
                preparation — all while uplifting local communities and
                promoting vocational training through our Barista School.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6F4E37] mb-2">
                What We Offer
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Freshly brewed Nepali coffee</li>
                <li>Professional barista training programs</li>
                <li>Premium coffee equipment distribution</li>
                <li>Freshly baked goods and café menu items</li>
                <li>Multiple outlets across major cities of Nepal</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6F4E37] mb-2">
                Our Values
              </h2>
              <p className="text-gray-700">
                At Himalayan Java, quality, community, and authenticity come
                first. We believe in empowering people, celebrating local
                products, and delivering excellence in every sip.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-[#6F4E37] mb-4">
              Join Us on This Journey
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Whether you’re sipping coffee at one of our cozy outlets or
              learning the art of coffee making at our training center — you're
              a part of our story. Thank you for supporting local, one cup at a
              time.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
