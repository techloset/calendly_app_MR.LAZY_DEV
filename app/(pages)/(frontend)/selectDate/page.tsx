import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import SelectDate from "./component/SelectDate";

const page: React.FC = () => {
  return (
    <div>
      <div>
        <MenuHeader />
      </div>
      <SelectDate />
    </div>
  );
};

export default page;
