export type typePT = {
  _id?: string;
  name: string;
  contactInfor: {
    email: string | undefined;
    phone: string;
  };
  specialty: string;
  experienceYears?: number | undefined;
  address: string;
  bio: string | undefined;
  profileImage: string | undefined;
  status?: string;
};
