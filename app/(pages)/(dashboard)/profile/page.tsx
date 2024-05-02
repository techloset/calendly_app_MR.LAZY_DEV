import Profile from "./component/Profile";
interface Props {
  handleFileChange: (files: FileList | null) => void;
}
const Page: React.FC<Props> = ({ handleFileChange }) => {
  return (
    <div>
      <Profile handleFileChange={handleFileChange} />{" "}
    </div>
  );
};

export default Page;
