import { Button } from "./button";

interface AppbarProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
}
// type AuththenticatedAppbarProps = {
//   isAuthenticated: true;
//   onSignOut: () => void;
// };
// type UnauthenticatedAppbarProps = {
//   isAuthenticated: false;
//   onSignIn: () => void;
// };
// type AppbarProps = AuththenticatedAppbarProps | UnauthenticatedAppbarProps;
const Appbar = (props: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">Quickpay</div>
      <div className="flex flex-col justify-center pt-2">
        <Button
          onClick={props.isAuthenticated ? props.onSignOut : props.onSignIn}
        >
          {props.isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Appbar;
