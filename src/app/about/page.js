const AboutPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-20">
      <h1 className="text-4xl md:text-5xl font-roadrage text-center mb-12">About The Project</h1>

      <div className="space-y-8">
        <div className="p-6 bg-greenfour rounded-[32px] border border-greenthree">
          <h2 className="text-2xl font-roadrage mb-4">Tech Stack</h2>
          <div className="font-roboto space-y-2">
            <p>Welcome to our Conference Ticket Generator project! This application is built using React to help users easily create personalized conference tickets. With a focus on accessibility, responsiveness, and user-friendly design, our platform ensures a seamless experience for all participants.</p>
            <p>Project Overview:
            The Conference Ticket Generator allows users to fill in their details and instantly receive a digital ticket. The application includes form validation, state persistence, and ticket generation features, making it an ideal practice project for mastering React and front-end development.</p>
          </div>
          <h2 className="text-2xl my-4 font-roadrage mb-4">Key Features</h2>

          <div className="font-roboto space-y-2">
            <p>• User-Friendly Form</p>
            <p>• Form Validation</p>
            <p>• Instant Ticket Generation</p>
            <p>• Downloadable tickets as PNG images</p>
          </div>
          <h2 className="text-2xl my-4 font-roadrage mb-4">Technologies Used:</h2>

          <div className="font-roboto space-y-2">
            <p>• Next js</p>
            <p>• Cloudinary</p>
            <p>• TailwindCSS</p>
            <p>• Local Storage</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AboutPage;
