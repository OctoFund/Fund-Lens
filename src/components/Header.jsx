import PLACEHOLDERS from "../common/placeholders";

function Header() {  
  return (
    <>
      <h1 className="text-2xl font-bold mb-2 text-center">
        {PLACEHOLDERS.home.header.title}
      </h1>
      <p className="text-center text-gray-500 mb-6">
        {PLACEHOLDERS.home.header.subtitle}
      </p>
    </>
  );
}

export default Header; 