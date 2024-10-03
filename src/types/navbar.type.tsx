export type typeNavBar = {
  name: string;
  path: string;
  dropdown: React.ReactNode; // This can be a component or null
};

export type typeNavInfor = {
  icon: React.ReactElement;
  name: string;
  path: string;
  detail: string;
};

export type typeFunctionNav = {
  name: string;
  path: string;
  icon: React.ReactElement;
};
