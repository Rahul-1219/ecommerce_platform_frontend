import Profile from "@/components/custom/profile";
import { getUserProfile } from "../action";

const page = async () => {
  const response = await getUserProfile();
  const userProfile = response?.data;
  const defaultAddress =
    userProfile?.addresses.find((address) => address.isDefault) || null;
  return <Profile userProfile={userProfile} defaultAddress={defaultAddress} />;
};

export default page;
