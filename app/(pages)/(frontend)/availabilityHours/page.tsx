import image from "../../../../public/images/logo1.png";
import Image from "next/image";
import AvailabilityHours from "./component/AvailabilityHours";

const Page: React.FC = () => {
  return (
    <div>
      <div className="bg-white h-[60px] flex justify-center">
        <div className="flex justify-center">
          <Image src={image} className="w-[182px] mt-3 h-[43px]" alt="Logo" />
        </div>
      </div>
      <AvailabilityHours />
    </div>
  );
};

export default Page;
