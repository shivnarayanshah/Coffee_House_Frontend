import React from "react";

const FooterMap = () => {
  return (
    <div className=" max-w-[468px] mx-auto lg:mx-0">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg aspect-video">
        <iframe
          title="Patan Durbar Square"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.6112391557817!2d85.32274617525249!3d27.67269807620247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c50daa2fb1%3A0x6f197fa38097b530!2sPatan%20Darbar%20Square!5e1!3m2!1sen!2snp!4v1755538164974!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: "1px solid #6F4E37" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default FooterMap;
